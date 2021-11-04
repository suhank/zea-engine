import { SystemDesc } from '../../SystemDesc'
import { Vec3, Mat4, Xfo } from '../../Math/index'
import { TreeItem, VLAAsset } from '../../SceneTree/index'
import { GLBaseViewport } from '../GLBaseViewport'
import { VRHead } from './VRHead'
import { VRController } from './VRController'
import { VRViewManipulator } from './VRViewManipulator'
import { resourceLoader } from '../../SceneTree/resourceLoader'

// import { XRWebGLLayer } from 'webxr'
import { VRViewChangedEvent } from '../../Utilities/Events/VRViewChangedEvent'
import { ControllerAddedEvent } from '../../Utilities/Events/ControllerAddedEvent'
import { StateChangedEvent } from '../../Utilities/Events/StateChangedEvent'
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent'
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent'

/** This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 *  When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 *  instantiated ready for XR sessions
 *
 * **Events**
 * * **presentingChanged:** Emitted when presenting is started or stopped
 * * **controllerAdded:** Emitted when a new XR controller is detected.
 * * **viewChanged:** Emitted during presentation each time the frame is rendered.
 * * **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
 * * **pointerDown:** Emitted when the user presses an XR pointer
 * * **pointerUp:** Emitted when the user releases an XR pointer
 *
 * @extends GLBaseViewport
 */
class VRViewport extends GLBaseViewport {
  protected __projectionMatricesUpdated: boolean
  protected __stageTreeItem: TreeItem
  // __renderer: any // GLBaseRenderer
  protected __vrhead: VRHead
  protected controllersMap: Record<string, VRController>
  protected controllers: VRController[]
  protected controllerPointerDownTime: number[]
  protected spectatorMode: boolean
  protected tick: number

  protected __leftViewMatrix: Mat4
  protected __leftProjectionMatrix: Mat4
  protected __rightViewMatrix: Mat4
  protected __rightProjectionMatrix: Mat4
  protected __vrAsset?: VLAAsset
  protected __stageXfo: Xfo = new Xfo()

  protected __stageMatrix: Mat4 = new Mat4()
  protected __stageScale: any
  protected session: any
  protected __canPresent: any

  protected __hmd: string = ''
  protected __hmdAssetPromise?: Promise<VLAAsset | null>
  protected __region: any

  protected __refSpace: any

  protected capturedItem: any
  protected stroke: any

  protected capturedElement?: TreeItem
  protected __projectionMatrices: Array<Mat4> = []

  protected __hmdCanvasSize: any
  protected __viewMatrices: any
  protected __cameraMatrices: any
  /**
   * Create a VR viewport.
   * @param renderer - The renderer value.
   */
  constructor(renderer: any) {
    super(renderer)
    this.doubleClickTimeParam.value = 300

    // ////////////////////////////////////////////
    // Viewport params
    this.__projectionMatricesUpdated = false

    // ////////////////////////////////////////////
    // Tree

    this.__stageTreeItem = new TreeItem('VRStage')
    this.__stageTreeItem.setVisible(false)
    this.__renderer.addTreeItem(this.__stageTreeItem)

    this.__vrhead = new VRHead(this, this.__stageTreeItem)

    this.controllersMap = {}
    this.controllers = []
    this.controllerPointerDownTime = []
    this.spectatorMode = false
    this.tick = 0

    // ////////////////////////////////////////////
    // Xfos
    const xfo = new Xfo()
    // Convert Y-Up to Z-Up.
    xfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), Math.PI * 0.5)
    this.setXfo(xfo) // Reset the stage Xfo.

    this.__leftViewMatrix = new Mat4()
    this.__leftProjectionMatrix = new Mat4()
    this.__rightViewMatrix = new Mat4()
    this.__rightProjectionMatrix = new Mat4()

    this.setManipulator(new VRViewManipulator(this))
  }

  getRenderer() {
    return this.renderer
  }

  /**
   * The getAsset method.
   * @return - The return value.
   */
  getAsset() {
    return this.__vrAsset
  }

  /**
   * The getTreeItem method.
   * @return - The return value.
   */
  getTreeItem() {
    return this.__stageTreeItem
  }

  /**
   * The getVRHead method.
   * @return - The return value.
   */
  getVRHead() {
    return this.__vrhead
  }

  /**
   * The getXfo method.
   * @return - The return value.
   */
  getXfo() {
    return this.__stageXfo
  }

  /**
   * The setXfo method.
   * @param xfo - The xfo value.
   */
  setXfo(xfo: Xfo) {
    this.__stageXfo = xfo
    this.__stageTreeItem.globalXfoParam.value = xfo
    this.__stageMatrix = xfo.inverse().toMat4()
    // this.__stageMatrix.multiplyInPlace(this.__sittingToStandingMatrix);
    this.__stageScale = xfo.sc.x
  }

  /**
   * The getControllers method.
   * @return - The return value.
   */
  getControllers(): VRController[] {
    return this.controllers
  }

  // //////////////////////////
  // Presenting

  /**
   * The canPresent method.
   * @return - The return value.
   */
  canPresent() {
    return this.__canPresent
  }

  /**
   * The isPresenting method.
   * @return - The return value.
   */
  isPresenting() {
    return this.session
  }

  /**
   * Turns on and off the spectator mode.
   * Note: specator mode renders the scene an extra time to our regular viewport.
   * @param state -  true for enabling spectator mode, else false
   */
  setSpectatorMode(state: boolean) {
    if (!state) {
      // when disabling spectator mode, clear the screen to the background color.
      const gl = this.__renderer.gl
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      let col = this.__backgroundColor.asArray()
      gl.clearColor(col[0], col[1], col[2], col[3])
      gl.colorMask(true, true, true, true)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    }
    this.spectatorMode = state
  }

  /**
   * The __startSession method.
   * @private
   */
  __startSession() {
    const onAnimationFrame = (t: any, frame: any) => {
      if (this.session) {
        this.session.requestAnimationFrame(onAnimationFrame)
        this.drawXRFrame(frame)
      }
    }
    this.session.requestAnimationFrame(onAnimationFrame)
  }

  /**
   * The loadHMDResources method.
   * @return - The return value.
   */
  loadHMDResources(): Promise<VLAAsset | null> {
    if (SystemDesc.isMobileDevice) {
      return Promise.resolve(null)
    }
    // If the HMD has changed, reset it.
    let hmd = localStorage.getItem('ZeaEngine_XRDevice')
    if (!hmd) {
      hmd = 'Vive'
      localStorage.setItem('ZeaEngine_XRDevice', hmd)
    }
    if (this.__hmd != hmd) {
      this.__hmdAssetPromise = undefined
    } else if (this.__hmdAssetPromise) return this.__hmdAssetPromise

    this.__hmd = hmd
    this.__hmdAssetPromise = new Promise((resolve, reject) => {
      // ////////////////////////////////////////////
      // Resources
      {
        let hmdAssetId
        switch (hmd) {
          case 'Vive':
            hmdAssetId = 'ZeaEngine/Vive.vla'
            break
          case 'Oculus':
            hmdAssetId = 'ZeaEngine/Oculus.vla'
            break
          default:
            hmdAssetId = 'ZeaEngine/Vive.vla'
            break
        }
        if (!resourceLoader.commonResources[hmdAssetId]) {
          // Cache the asset so if an avatar needs to display,
          // it can use the same asset.
          const asset = new VLAAsset(hmdAssetId)
          asset.load(resourceLoader.systemUrls[hmdAssetId])
          resourceLoader.commonResources[hmdAssetId] = asset
        }
        this.__vrAsset = <VLAAsset>resourceLoader.getCommonResource(hmdAssetId)
        const bind = () => {
          const materialLibrary = this.__vrAsset!.getMaterialLibrary()
          const materialNames = materialLibrary.getMaterialNames()
          for (const name of materialNames) {
            const material = materialLibrary.getMaterial(name, false)
            if (material) {
              material.setShaderName('SimpleSurfaceShader')
            }
          }
          this.__vrAsset!.traverse((item: any) => {
            item.setSelectable(false)
          })
          resolve(this.__vrAsset!)
        }
        if (this.__vrAsset.isLoaded()) bind()
        else this.__vrAsset.once('loaded', bind)
      }
    })
    return this.__hmdAssetPromise
  }

  /**
   * The startPresenting method.
   */
  startPresenting(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.spectatorMode) {
        // clear the main viewport if spectator mode is off.
        this.setSpectatorMode(false)
      }

      // https://github.com/immersive-web/webxr/blob/master/explainer.md

      const startPresenting = () => {
        ;(navigator as any)?.xr
          .requestSession('immersive-vr', {
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['bounded-floor'],
          })
          .then((session) => {
            this.__renderer.__xrViewportPresenting = true

            const viewport = this.__renderer.getViewport()
            if (viewport) {
              const camera = viewport.getCamera()
              const cameraXfo = camera.globalXfoParam.value

              // Convert Y-Up to Z-Up.
              const stageXfo = new Xfo()
              stageXfo.tr = cameraXfo.tr.clone()
              stageXfo.tr.z -= 1.3 // assume sitting, and move the floor down a bit
              const dir = cameraXfo.ori.getZaxis()
              dir.z = 0
              dir.normalizeInPlace()
              stageXfo.ori.setFromDirectionAndUpvector(dir, new Vec3(0, 0, 1))
              this.setXfo(stageXfo)
            }

            session.addEventListener('end', (event: any) => {
              this.__stageTreeItem.setVisible(false)
              this.session = null
              this.emit('presentingChanged', { state: false })
            })

            const onSelectStart = (ev: any) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                controller.buttonPressed = true
                this.onPointerDown(new XRControllerEvent(1, controller))
              }
            }
            const onSelectEnd = (ev: any) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                controller.buttonPressed = false
                this.onPointerUp(new XRControllerEvent(1, controller))
              }
            }

            const createController = (inputSource: any) => {
              console.log('creating controller:', inputSource.handedness, inputSource.profiles)
              const id = this.controllers.length
              const controller = new VRController(this, inputSource, id)
              this.controllersMap[inputSource.handedness] = controller
              this.controllers[id] = controller

              const event = new ControllerAddedEvent(controller)
              this.emit('controllerAdded', event)
              return controller
            }
            const onInputSourcesChange = (event: Record<string, any>) => {
              // As input sources are connected if they are tracked-pointer devices
              // look up which meshes should be associated with their profile and
              // load as the controller model for that hand.
              for (const inputSource of event.added) {
                if (inputSource.profiles.length == 0) continue
                createController(inputSource)
              }
            }
            session.addEventListener('selectstart', onSelectStart)
            session.addEventListener('selectend', onSelectEnd)
            session.addEventListener('inputsourceschange', onInputSourcesChange)

            this.session = session

            // ////////////////////////////
            // @ts-ignore - Note: We could install the webxr type definitions and remove this ignore.
            const glLayer = new XRWebGLLayer(session, <WebGL2RenderingContext>this.__gl)
            session.updateRenderState({
              baseLayer: glLayer /* 
              // Output canvas not working anymore
              outputContext: mirrorCanvas ? mirrorCanvas.getContext('xrpresent') : null,
              ,*/,
            })

            this.__width = glLayer.framebufferWidth
            this.__height = glLayer.framebufferHeight
            this.__region = [0, 0, this.__width, this.__height]
            this.resizeRenderTargets(this.__width, this.__height)

            // ////////////////////////////

            // eslint-disable-next-line require-jsdoc
            const onRefSpaceCreated = (refSpace: any) => {
              this.__refSpace = refSpace
              this.__stageTreeItem.setVisible(true)
              const event = new StateChangedEvent(true)
              this.emit('presentingChanged', event)

              this.loadHMDResources().then(() => {
                this.__startSession()
                resolve()
              })
            }

            // Attempt to get a 'bounded-floor' reference space, which will align
            // the user's physical floor with Y=0 and provide boundaries that
            // indicate where the user can safely walk.
            session
              .requestReferenceSpace(SystemDesc.isMobileDevice ? 'local' : 'bounded-floor')
              .catch((e: any) => {
                // If a bounded reference space isn't supported, fall back to a
                // local-floor reference space. This still provides a floor-relative
                // space and will always be supported for immersive sessions. It
                // will not, however, provide boundaries and generally expects the
                // user to stand in one place. If the device doesn't have a way of
                // determining the floor level (for example, with a 3DoF device)
                // then it will return an emulated local-floor space, where the view
                // is translated up by a static height so that the scene still
                // renders in approximately the right place.
                console.log('Falling back to local-floor reference space')
                session.requestReferenceSpace('local-floor').then(onRefSpaceCreated)
              })
              .then((refSpace: any) => {
                onRefSpaceCreated(refSpace)
              })
              .catch((e: any) => {
                console.warn(e.message)
                reject(new Error('Unable to start XR Session:' + e.message))
              })
          })
          .catch((e: any) => {
            console.warn(e.message)
          })
      }

      startPresenting()
    })
  }

  /**
   * The stopPresenting method.
   */
  stopPresenting() {
    if (!this.session) return

    this.session.end()
  }

  /**
   * The togglePresenting method.
   */
  togglePresenting() {
    if (this.session) this.stopPresenting()
    else this.startPresenting()
  }

  /**
   * The getHMDCanvasSize method.
   * @return - The return value.
   */
  getHMDCanvasSize() {
    return this.__hmdCanvasSize
  }

  // //////////////////////////
  // Controllers

  /**
   * The updateControllers method.
   * @param xrFrame - The xrFrame value.
   * @param event - The pose changed event object that will be emitted for observers such as collab.
   */
  updateControllers(xrFrame: any, event: XRPoseEvent) {
    const inputSources = this.session.inputSources
    for (let i = 0; i < inputSources.length; i++) {
      const inputSource = inputSources[i]

      // Note: This is to avoid a bug/feature in WebXR where initially the
      // controllers have no handedness specified, then suddenly
      // get handedness. We need the handedness before we can setup the controller.
      if (inputSource.profiles.length == 0) return
      if (!this.controllers[i]) {
        console.warn('Missing controller')
        continue
        // this.__createController(i, inputSource)
      }
      this.controllers[i].updatePose(this.__refSpace, xrFrame, inputSource, event)
    }
  }

  /**
   * The drawXRFrame method.
   * @param xrFrame - The xrFrame value.
   */
  drawXRFrame(xrFrame: any) {
    const session = xrFrame.session

    const layer = session.renderstate.baseLayer

    const pose = xrFrame.getViewerPose(this.__refSpace)
    if (!pose) {
      // No pose available during XR present
      // Note: before the Headset is put on the pose is missing, or after it is taken off
      return
    }

    this.__vrhead.update(pose)
    const viewXfo = this.__vrhead.getTreeItem().globalXfoParam.value

    const views = pose.views

    if (!this.__projectionMatricesUpdated) {
      this.__projectionMatrices = []
      this.__viewMatrices = []
      this.__cameraMatrices = []
      for (let i = 0; i < views.length; i++) {
        const view = views[i]
        const projMat = new Mat4()
        projMat.setDataArray(view.projectionMatrix)
        this.__projectionMatrices[i] = projMat
        this.__viewMatrices[i] = new Mat4()
        this.__cameraMatrices[i] = new Mat4()
      }
      this.__projectionMatricesUpdated = true
    }

    const gl = this.__renderer.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer)
    let col = this.__backgroundColor.asArray()
    gl.clearColor(col[0], col[1], col[2], col[3])
    gl.colorMask(true, true, true, true)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    this.depthRange = [session.renderstate.depthNear, session.renderstate.depthFar] // TODO: check if this changes during session

    const renderstate: ColorRenderState = <ColorRenderState>{}

    renderstate.boundRendertarget = layer.framebuffer
    renderstate.region = this.__region
    renderstate.viewport = this
    renderstate.vrviewport = this
    renderstate.viewports = []

    // renderstate.boundRendertarget.vrfbo = true;

    for (let i = 0; i < views.length; i++) {
      const view = views[i]
      this.__viewMatrices[i].setDataArray(view.transform.inverse.matrix)
      this.__viewMatrices[i].multiplyInPlace(this.__stageMatrix)
      // this.__cameraMatrices[i].setDataArray(view.transform.matrix);

      const vp = layer.getViewport(view)
      renderstate.viewports.push({
        viewMatrix: this.__viewMatrices[i],
        projectionMatrix: this.__projectionMatrices[i],
        region: [vp.x, vp.y, vp.width, vp.height],
        isOrthographic: false,
      })
    }

    renderstate.viewXfo = viewXfo
    renderstate.viewScale = 1.0 / this.__stageScale
    renderstate.cameraMatrix = renderstate.viewXfo.toMat4()
    renderstate.region = this.__region
    renderstate.vrPresenting = true // Some rendering is adjusted slightly in VR. e.g. Billboards

    this.draw(renderstate)

    // ///////////////////////
    // Prepare the pointerMove event.
    const event = new XRPoseEvent(this, viewXfo, this.controllers)
    this.updateControllers(xrFrame, event)
    if (this.capturedElement && event.propagating) {
      this.capturedElement.onPointerMove(event)
    }
    if (this.manipulator && event.propagating) {
      this.manipulator.onPointerMove(event)
    }

    // ///////////////////////
    // Emit a signal for the shared session.

    const viewChangedEvent = new VRViewChangedEvent(renderstate.viewXfo)
    // TODO: better solution than setting members individually?
    viewChangedEvent.hmd = this.__hmd
    viewChangedEvent.controllers = this.controllers
    viewChangedEvent.viewport = this
    viewChangedEvent.vrviewport = this

    this.emit('viewChanged', viewChangedEvent)

    // If spectator mode is active, draw a 3rd person view of the scene to
    // the WebGL context's default back buffer.
    if (this.spectatorMode && !SystemDesc.isMobileDevice && this.tick % 5 == 0) {
      const viewport = this.__renderer.getViewport()
      if (viewport) {
        // display the head in spectator mode.
        this.__vrhead.setVisible(true)
        viewport.draw()
        this.__vrhead.setVisible(false)
      }
    }

    this.tick++
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param event - The DOM event produced by a pointer
   */
  onPointerDown(event: XRControllerEvent) {
    event.intersectionData = event.controller.getGeomItemAtTip()

    // //////////////////////////////////////
    // Double Tap
    // First check for double tap handlers.
    // If the manipulator or the viewport handle that
    // then skip the 'pointerDown' event.
    const downTime = Date.now()
    if (downTime - this.controllerPointerDownTime[event.controller.id] < this.doubleClickTimeParam.value) {
      this.emit('pointerDoublePressed', event)
      if (!event.propagating) return

      if (this.manipulator) {
        this.manipulator.onPointerDoublePress(event)
        if (!event.propagating) return
      }
    }
    this.controllerPointerDownTime[event.controller.id] = downTime

    // //////////////////////////////////////

    if (this.capturedItem) {
      this.capturedItem.onPointerDown(event)
      return
    }

    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onPointerDown(event)
      if (!event.propagating || this.capturedItem) return
    }

    this.emit('pointerDown', event)
    if (!event.propagating || this.capturedItem) return

    if (this.manipulator) {
      this.manipulator.onPointerDown(event)
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param event - The event that occurs.
   */
  onPointerUp(event: XRControllerEvent) {
    this.controllerPointerDownTime[event.controller.id] = 0

    if (this.capturedItem) {
      this.capturedItem.onPointerUp(event)
      return
    }

    event.intersectionData = event.controller.getGeomItemAtTip()
    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onPointerUp(event)
      if (!event.propagating) return
    }

    this.emit('pointerUp', event)
    if (!event.propagating) return

    if (this.manipulator) {
      this.manipulator.onPointerUp(event)

      if (!event.propagating) return
    }
  }
}

export { VRViewport }
