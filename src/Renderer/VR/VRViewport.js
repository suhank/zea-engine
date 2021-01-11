import { SystemDesc } from '../../SystemDesc.js'
import { Vec3, Mat4, Xfo } from '../../Math/index'
import { TreeItem, VLAAsset } from '../../SceneTree/index'
import { GLBaseViewport } from '../GLBaseViewport.js'
import { VRHead } from './VRHead.js'
import { VRController } from './VRController.js'
import { VRViewManipulator } from './VRViewManipulator.js'
import { resourceLoader } from '../../SceneTree/resourceLoader.js'
import { POINTER_TYPES } from '../../Utilities/EnumUtils'

/** Class representing a VR viewport.
 * @extends GLBaseViewport
 */
class VRViewport extends GLBaseViewport {
  /**
   * Create a VR viewport.
   * @param {any} renderer - The renderer value.
   */
  constructor(renderer) {
    super(renderer)
    this.getParameter('DoubleClickTimeMS').setValue(300)

    // ////////////////////////////////////////////
    // Viewport params
    this.__projectionMatriciesUpdated = false

    // These values are in meters.
    this.__far = 1024.0
    this.__near = 0.1
    // ////////////////////////////////////////////
    // Tree

    this.__stageTreeItem = new TreeItem('VRStage')
    this.__stageTreeItem.setSelectable(false)
    this.__stageTreeItem.setVisible(false)
    this.__renderer.addTreeItem(this.__stageTreeItem)

    this.__vrhead = new VRHead(this, this.__stageTreeItem)

    this.controllersMap = {}
    this.controllers = []
    this.prevControllerDownTime = []
    this.spectatorMode = true
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

  /**
   * The getVRDisplay method.
   * @return {any} - The return value.
   */
  getVRDisplay() {
    return this.__vrDisplay
  }

  /**
   * The getAsset method.
   * @return {any} - The return value.
   */
  getAsset() {
    return this.__vrAsset
  }

  /**
   * The getTreeItem method.
   * @return {any} - The return value.
   */
  getTreeItem() {
    return this.__stageTreeItem
  }

  /**
   * The getVRHead method.
   * @return {any} - The return value.
   */
  getVRHead() {
    return this.__vrhead
  }

  /**
   * The getXfo method.
   * @return {Xfo} - The return value.
   */
  getXfo() {
    return this.__stageXfo
  }

  /**
   * The setXfo method.
   * @param {Xfo} xfo - The xfo value.
   */
  setXfo(xfo) {
    this.__stageXfo = xfo
    this.__stageTreeItem.getParameter('GlobalXfo').setValue(xfo)
    this.__stageMatrix = xfo.inverse().toMat4()
    // this.__stageMatrix.multiplyInPlace(this.__sittingToStandingMatrix);
    this.__stageScale = xfo.sc.x
  }

  /**
   * The getControllers method.
   * @return {any} - The return value.
   */
  getControllers() {
    return this.controllers
  }

  // //////////////////////////
  // Presenting

  /**
   * The canPresent method.
   * @return {any} - The return value.
   */
  canPresent() {
    return this.__canPresent
  }

  /**
   * The isPresenting method.
   * @return {boolean} - The return value.
   */
  isPresenting() {
    return this.__session
  }

  /**
   * The __startSession method.
   * @private
   */
  __startSession() {
    const gl = this.__renderer.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    // Clear the framebuffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Set the viewport to the whole canvas
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

    const onAnimationFrame = (t, frame) => {
      if (this.__session) {
        this.__session.requestAnimationFrame(onAnimationFrame)
        this.draw(frame)
      }
    }
    this.__session.requestAnimationFrame(onAnimationFrame)
  }

  /**
   * The loadHMDResources method.
   * @return {any} - The return value.
   */
  loadHMDResources() {
    if (SystemDesc.isMobileDevice) {
      return Promise.resolve()
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
        if (!resourceLoader.getCommonResource(hmdAssetId)) {
          // Cache the asset so if an avatar needs to display,
          // it can use the same asset.
          const asset = new VLAAsset(hmdAssetId)
          asset.getParameter('FilePath').setValue(hmdAssetId)
          resourceLoader.setCommonResource(hmdAssetId, asset)
        }
        this.__vrAsset = resourceLoader.getCommonResource(hmdAssetId)
        const bind = () => {
          const materialLibrary = this.__vrAsset.getMaterialLibrary()
          const materialNames = materialLibrary.getMaterialNames()
          for (const name of materialNames) {
            const material = materialLibrary.getMaterial(name, false)
            if (material) {
              material.visibleInGeomDataBuffer = false
              material.setShaderName('SimpleSurfaceShader')
            }
          }
          resolve(this.__vrAsset)
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
  startPresenting() {
    return new Promise((resolve, reject) => {
      // https://github.com/immersive-web/webxr/blob/master/explainer.md

      const gl = this.__renderer.gl

      const startPresenting = () => {
        navigator.xr
          .requestSession('immersive-vr', {
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['bounded-floor'],
          })
          .then((session) => {
            this.__renderer.__xrViewportPresenting = true

            const viewport = this.__renderer.getActiveViewport()
            const camera = viewport.getCamera()
            const cameraXfo = camera.getParameter('GlobalXfo').getValue()

            // Convert Y-Up to Z-Up.
            const stageXfo = new Xfo()
            stageXfo.tr = cameraXfo.tr.clone()
            stageXfo.tr.z -= 1.3 // assume sitting, and move the floor down a bit
            const dir = cameraXfo.ori.getZaxis()
            dir.z = 0
            dir.normalizeInPlace()
            stageXfo.ori.setFromDirectionAndUpvector(dir.negate(), new Vec3(0, 0, 1))
            this.setXfo(stageXfo)

            session.addEventListener('end', (event) => {
              this.__stageTreeItem.setVisible(false)
              this.__session = null
              this.emit('presentingChanged', { state: false })
            })

            const onSelectStart = (ev) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                this.onPointerDown({
                  button: 1,
                  controller,
                })
              }
            }
            const onSelectEnd = (ev) => {
              const controller = this.controllersMap[ev.inputSource.handedness]
              if (controller) {
                this.onPointerUp({
                  button: 1,
                  controller,
                })
              }
            }

            const createController = (inputSource) => {
              console.log('creating controller:', inputSource.handedness, inputSource.profiles)
              const id = this.controllers.length
              const controller = new VRController(this, inputSource, id)
              this.controllersMap[inputSource.handedness] = controller
              this.controllers[id] = controller
              this.emit('controllerAdded', { controller })
              return controller
            }
            const onInputSourcesChange = (event) => {
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

            this.__session = session

            // ////////////////////////////
            const glLayer = new XRWebGLLayer(session, gl)
            session.updateRenderState({
              baseLayer: glLayer /* 
              // Output canvas not working anymore
              outputContext: mirrorCanvas ? mirrorCanvas.getContext('xrpresent') : null,
              ,*/,
            })
            // ////////////////////////////

            // eslint-disable-next-line require-jsdoc
            const onRefSpaceCreated = (refSpace) => {
              this.__refSpace = refSpace
              this.__stageTreeItem.setVisible(true)
              this.emit('presentingChanged', { state: true })

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
              .catch((e) => {
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
              .then((refSpace) => {
                onRefSpaceCreated(refSpace)
              })
              .catch((e) => {
                console.warn(e.message)
                reject('Unable to start XR Session:' + e.message)
              })
          })
          .catch((e) => {
            console.warn(e.message)
          })
      }

      startPresenting()
      // if (SystemDesc.isMobileDevice) {
      //   startPresenting()
      // } else {
      //   // Note: we should not need to load the resources here
      //   // They could be loaded only once the controllers are
      //   // being created. However, I can't see the controllers if
      //   // the loading is defered
      //   this.loadHMDResources().then(startPresenting)
      // }
    })
  }

  /**
   * The stopPresenting method.
   */
  stopPresenting() {
    if (!this.__session) return

    this.__session.end()
  }

  /**
   * The togglePresenting method.
   */
  togglePresenting() {
    if (this.__session) this.stopPresenting()
    else this.startPresenting()
  }

  /**
   * The getHMDCanvasSize method.
   * @return {any} - The return value.
   */
  getHMDCanvasSize() {
    return this.__hmdCanvasSize
  }

  // //////////////////////////
  // Controllers

  /**
   * The updateControllers method.
   * @param {any} xrFrame - The xrFrame value.
   */
  updateControllers(xrFrame, event) {
    const inputSources = this.__session.inputSources
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
   * The draw method.
   * @param {any} xrFrame - The xrFrame value.
   */
  draw(xrFrame) {
    const session = xrFrame.session

    const layer = session.renderState.baseLayer

    const pose = xrFrame.getViewerPose(this.__refSpace)
    if (!pose) {
      console.warn('No pose available during XR present')
      return
    }

    this.__vrhead.update(pose)

    // Prepare the pointerMove event.
    const event = {}
    this.preparePointerEvent(event)
    this.updateControllers(xrFrame, event)
    if (this.capturedElement && event.propagating) {
      this.capturedElement.onPointerMove(event)
    }
    if (this.manipulator && event.propagating) {
      this.manipulator.onPointerMove(event)
    }

    const views = pose.views

    if (!this.__projectionMatriciesUpdated) {
      this.__projectionMatrices = []
      this.__viewMatrices = []
      this.__cameraMatrices = []
      this.__region = [0, 0, 0, 0]
      for (let i = 0; i < views.length; i++) {
        const view = views[i]
        const projMat = new Mat4()
        projMat.setDataArray(view.projectionMatrix)
        this.__projectionMatrices[i] = projMat
        this.__viewMatrices[i] = new Mat4()
        this.__cameraMatrices[i] = new Mat4()

        const vp = layer.getViewport(view)
        this.__region[2] = Math.max(this.__region[2], vp.x + vp.width)
        this.__region[3] = Math.max(this.__region[3], vp.y + vp.height)
      }

      this.__renderer.resizeFbos(this.__region[2], this.__region[3])
      this.__projectionMatriciesUpdated = true
    }

    const gl = this.__renderer.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, layer.framebuffer)

    gl.clearColor(...this.__backgroundColor.asArray())
    gl.colorMask(true, true, true, true)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const renderstate = {
      boundRendertarget: layer.framebuffer,
      region: this.__region,
      vrviewport: this,
      viewports: [],
    }
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
      })
    }

    renderstate.viewXfo = this.__vrhead.getTreeItem().getParameter('GlobalXfo').getValue()
    renderstate.viewScale = 1.0 / this.__stageScale
    renderstate.cameraMatrix = renderstate.viewXfo.toMat4()
    renderstate.region = this.__region
    renderstate.vrPresenting = true // Some rendering is ajusted slightly in VR. e.g. Billboards

    this.__renderer.drawScene(renderstate)

    // ///////////////////////
    // Emit a signal for the shared session.
    const data = {
      interfaceType: 'VR',
      hmd: this.__hmd,
      viewXfo: renderstate.viewXfo,
      controllers: this.controllers,
      vrviewport: this,
    }
    this.emit('viewChanged', data)

    // If spectator mode is active, draw a 3rd person view of the scene to
    // the WebGL context's default backbuffer.
    if (this.spectatorMode && !SystemDesc.isMobileDevice && this.tick % 5 == 0) {
      const viewport = this.__renderer.getActiveViewport()
      // display the head in spectator mode.
      this.__vrhead.setVisible(true)
      viewport.draw()
      this.__vrhead.setVisible(false)
    }

    this.tick++
  }

  /**
   * Prepares pointer event by adding properties of the engine to it.
   *
   * @param {XREvent} event - The event that occurs in the canvas
   * @private
   */
  preparePointerEvent(event) {
    event.viewport = this
    event.propagating = true
    event.pointerType = POINTER_TYPES.xr

    event.stopPropagation = () => {
      event.propagating = false
    }

    event.setCapture = (item) => {
      this.capturedItem = item
    }

    event.getCapture = (item) => {
      return this.capturedItem
    }

    event.releaseCapture = () => {
      this.capturedItem = null
    }
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerDown(event) {
    this.preparePointerEvent(event)

    if (this.capturedItem) {
      this.capturedItem.onPointerDown(event)
      return
    }

    event.intersectionData = event.controller.getGeomItemAtTip()
    if (event.intersectionData != undefined) {
      event.intersectionData.geomItem.onPointerDown(event)

      if (!event.propagating || this.capturedItem) return

      this.emit('pointerDownOnGeom', event)
    }

    const downTime = Date.now()
    if (downTime - this.prevControllerDownTime[event.controller.id] < this.__doubleClickTimeMSParam.getValue()) {
      if (this.manipulator) {
        this.manipulator.onPointerDoublePress(event)
        if (!event.propagating) return
      }

      this.emit('pointerDoublePressed', event)
    } else {
      this.prevControllerDownTime[event.controller.id] = downTime
      if (!event.propagating || this.capturedItem) return

      this.emit('pointerDown', event)
      if (!event.propagating) return

      if (this.manipulator) {
        this.manipulator.onPointerDown(event)

        if (!event.propagating) return
      }
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param {MouseEvent|TouchEvent} event - The event that occurs.
   */
  onPointerUp(event) {
    this.preparePointerEvent(event)

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
