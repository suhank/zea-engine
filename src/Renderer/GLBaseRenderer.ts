/* eslint-disable guard-for-in */
import { TreeItem, GeomItem, ParameterOwner, Scene, GridTreeItem } from '../SceneTree/index'
import { SystemDesc } from '../SystemDesc'
import { create3DContext } from './GLContext'
import { GLScreenQuad } from './GLScreenQuad'
import { GLViewport } from './GLViewport'
import { Registry } from '../Registry'
import { VRViewport } from './VR/VRViewport'
import { POINTER_TYPES } from '../Utilities/EnumUtils'
import { GLMaterialLibrary } from './Drawing/GLMaterialLibrary'
import { GLGeomLibrary } from './Drawing/GLGeomLibrary'
import { GLGeomItemLibrary } from './Drawing/GLGeomItemLibrary'
import { GLPass } from './Passes/GLPass'
import { Color } from '../Math/Color'
import { GLRenderer } from './GLRenderer'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { SceneSetEvent } from '../Utilities/Events/SceneSetEvent'
import { ViewChangedEvent } from '../Utilities/Events/ViewChangedEvent'
import { XrViewportEvent } from '../Utilities/Events/XrViewportEvent'

import { GLShader } from './GLShader'

let activeGLRenderer: GLBaseRenderer | undefined
let pointerIsDown = false
let pointerLeft = false
const registeredPasses: Record<string, any> = {}

/**
 * Class representing a GL base renderer.
 *
 * @extends ParameterOwner
 */
class GLBaseRenderer extends ParameterOwner {
  protected listenerIDs: Record<number, Record<string, number>> = {}
  protected directives: string[] = []
  solidAngleLimit: number = 0.004

  __gl: WebGL12RenderingContext
  protected __glcanvas: HTMLCanvasElement | null = null
  protected __scene: Scene | null = null

  protected __shaderDirectives: Record<string, string> = {}
  protected __renderGeomDataFbosRequested: boolean = false
  protected __shaders: Record<string, GLShader> = {}
  protected __passes: Record<number, GLPass[]> = {}
  protected __passesRegistrationOrder: GLPass[] = []
  protected __passCallbacks: any[] = []

  protected __viewports: GLViewport[] = []
  protected __activeViewport: GLViewport | undefined = undefined
  protected __continuousDrawing: boolean = false
  protected __redrawRequested: boolean = false
  protected __isMobile: boolean = false
  protected __drawSuspensionLevel = 0
  __xrViewportPresenting: boolean = false
  floatGeomBuffer: boolean = true

  protected __supportXR: boolean = false
  protected __xrViewport: VRViewport | undefined = undefined
  protected __xrViewportPromise: Promise<VRViewport>

  glMaterialLibrary: GLMaterialLibrary
  glGeomItemLibrary: GLGeomItemLibrary
  glGeomLibrary: GLGeomLibrary

  public screenQuad: GLScreenQuad | null = null

  // @ts-ignore: semantic error TS2304:
  private resizeObserver?: ResizeObserver

  /**
   * Create a GL base renderer.
   * @param {HTMLElement|HTMLCanvasElement} $canvas - The canvas element.
   * @param {Record<string, any>} options - The options value.
   */
  constructor($canvas: HTMLCanvasElement, options: Record<string, any> = {}) {
    super()

    if (!SystemDesc.gpuDesc) {
      throw new Error('Unable to create renderer. WebGL not Supported')
    }

    this.__isMobile = SystemDesc.isMobileDevice

    // Function Bindings.
    this.requestRedraw = this.requestRedraw.bind(this)

    this.__gl = this.setupWebGL($canvas, options)

    this.screenQuad = new GLScreenQuad(this.__gl, { directives: this.directives })
    this.bindEventHandlers()
    this.addViewport('main')

    this.glMaterialLibrary = new GLMaterialLibrary(this)
    this.glMaterialLibrary.on('updated', () => {
      this.requestRedraw()
    })
    this.glGeomLibrary = new GLGeomLibrary(this)
    this.glGeomLibrary.on('updated', () => {
      this.requestRedraw()
    })
    this.glGeomItemLibrary = new GLGeomItemLibrary(this, options)
    this.glGeomItemLibrary.on('updated', () => {
      this.requestRedraw()
    })

    // eslint-disable-next-line guard-for-in
    for (const passType in registeredPasses) {
      for (const cls of registeredPasses[passType]) {
        // eslint-disable-next-line new-cap
        this.addPass(new cls(), parseInt(passType), false) // TODO: is parseInt ok?
      }
    }

    // ////////////////////////////////////////////
    // WebXR
    this.__supportXR = options.supportXR !== undefined ? options.supportXR : true
    this.__xrViewportPromise = new Promise((resolve, reject) => {
      if (this.__supportXR) {
        // if(!navigator.xr && window.WebVRPolyfill != undefined) {
        //     this.__vrpolyfill = new WebVRPolyfill();
        // }
        if ((navigator as any)?.xr) {
          const setupXRViewport = () => {
            // Note: could cause a context loss on machines with
            // multi-gpus (integrated Intel).
            // This is because the may force the context to switch
            // to the discrete GPU.
            // TODO: Provide a system to re-load the GPU data.
            // this.__gl.setCompatibleXRDevice(device);
            this.__gl.makeXRCompatible().then(() => {
              this.__xrViewport = this.__setupXRViewport()
              let event = new XrViewportEvent(this.__xrViewport)
              this.emit('xrViewportSetup', event)
              resolve(this.__xrViewport)
            })
          }
          ;(navigator as any)?.xr
            .isSessionSupported('immersive-vr')
            .then((isSupported: boolean) => {
              if (isSupported) {
                setupXRViewport()
              }
            })
            .catch((reason: any) => {
              console.warn('Unable to setup XR:' + reason)
            })
          // TODO:
          // navigator.xr.on('devicechange', checkForXRSupport);
        }
      }
    })
  }

  /**
   * The addShaderPreprocessorDirective method.
   * @param {string} name - The name value.
   * @param {string} value - The value param.
   */
  addShaderPreprocessorDirective(name: string, value?: string) {
    // const gl = this.__gl
    if (value) this.__shaderDirectives[name] = '#define ' + name + ' = ' + value
    else this.__shaderDirectives[name] = '#define ' + name
    const directives = []
    // eslint-disable-next-line guard-for-in
    for (const key in this.__shaderDirectives) {
      directives.push(this.__shaderDirectives[key])
    }
    this.directives = directives
  }

  /**
   * Returns HTMLCanvasElement's width
   *
   * @return {number} - The return value.
   */
  getWidth(): number {
    return this.__glcanvas!.width
  }

  /**
   * Returns HTMLCanvasElement's Height
   * @return {number} - The return value.
   */
  getHeight(): number {
    return this.__glcanvas!.height
  }

  // //////////////////////////////////////
  // Viewports

  /**
   * Adds a new viewport(viewing region) to the scene.
   *
   * @param {string} name - The name of the viewport.
   * @return {GLViewport} - The return value.
   */
  addViewport(name: string): GLViewport {
    // TODO: We may need to merge GLBaseRenderer into GLRenderer to avoid this nasty cast.
    const renderer: GLRenderer = <GLRenderer>(<unknown>this)
    const vp = new GLViewport(renderer, name, this.getWidth(), this.getHeight())

    const updated = () => {
      this.requestRedraw()
    }
    const viewChanged = (data: any) => {
      if (!this.__xrViewportPresenting) {
        this.emit('viewChanged', data)
      }
    }
    vp.on('updated', updated)
    vp.on('viewChanged', viewChanged)

    this.__viewports.push(vp)
    return vp
  }

  /**
   * Returns a viewport element by specifying its index in the list of viewports.
   *
   * @param {number} index - The index value.
   * @return {GLViewport} - The return value.
   */
  getViewport(index = 0): GLViewport {
    return this.__viewports[index]
  }

  /**
   * Returns a viewport element under the specified XY coordinates.
   *
   * @param {number} offsetX - The viewport offset in the X axis.
   * @param {number} offsetY - The viewport offset in the Y axis.
   * @return {GLViewport} - The return value.
   */
  getViewportAtPos(offsetX: number, offsetY: number): GLViewport | undefined {
    for (const vp of this.__viewports) {
      const x = vp.getPosX()
      const y = vp.getPosY()
      const width = vp.getWidth()
      const height = vp.getHeight()
      if (offsetX >= x && offsetY >= y && offsetX <= width + x && offsetY <= height + y) return vp
    }
    return undefined
  }

  /**
   * Sets as `active` the specified viewport.
   *
   * @param {GLViewport} vp - The viewport.
   */
  activateViewport(vp: GLViewport) {
    if (this.__activeViewport == vp) return

    this.__activeViewport = vp
  }

  /**
   * Sets as àctive` the viewport under the specified XY coordinates.
   *
   * @param {number} offsetX - The viewport offset in the X axis.
   * @param {number} offsetY - The viewport offset in the Y axis.
   */
  activateViewportAtPos(offsetX: number, offsetY: number) {
    if (this.__xrViewportPresenting) return
    const vp = this.getViewportAtPos(offsetX, offsetY)
    if (vp && vp != this.__activeViewport) this.activateViewport(vp)
  }

  /**
   * Returns current active viewport.
   *
   * @return {GLViewport} - The return value.
   */
  getActiveViewport(): GLViewport | undefined {
    return this.__activeViewport
  }

  /**
   * The suspendDrawing method.
   */
  suspendDrawing(): void {
    this.__drawSuspensionLevel++
  }

  /**
   * The resumeDrawing method.
   */
  resumeDrawing(): void {
    this.__drawSuspensionLevel--
    if (this.__drawSuspensionLevel == 0) {
      this.renderGeomDataFbos()
      this.requestRedraw()
    }
  }

  /**
   * The renderGeomDataFbos method. Frame buffer (FBO).
   */
  renderGeomDataFbos(): void {
    if (this.__renderGeomDataFbosRequested == true) return

    this.__renderGeomDataFbosRequested = true
    const onAnimationFrame = () => {
      for (const vp of this.__viewports) vp.renderGeomDataFbo()
      this.__renderGeomDataFbosRequested = false
    }
    window.requestAnimationFrame(onAnimationFrame)
  }

  // //////////////////////////////////////
  // Scene

  /**
   * Returns current scene(Environment where all assets live) object.
   *
   * @return {Scene} - The return value.
   */
  getScene() {
    return this.__scene
  }

  /**
   * Sets scene to the renderer.
   *
   * @param {Scene} scene - The scene value.
   */
  setScene(scene: Scene): void {
    this.__scene = scene
    this.addTreeItem(this.__scene!.getRoot())

    let event = new SceneSetEvent(this.__scene)
    this.emit('sceneSet', event)
  }

  /**
   * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
   *
   * @param {TreeItem} treeItem - The tree item to add.
   */
  addTreeItem(treeItem: TreeItem) {
    // Note: we can have BaseItems in the tree now.
    if (!(treeItem instanceof TreeItem)) return

    const id = treeItem.getId()
    const listenerIDs = {}
    this.listenerIDs[id] = listenerIDs

    if (treeItem instanceof GeomItem) {
      const geomParam = treeItem.geomParam
      if (geomParam.value == undefined) {
        // we will add this geomItem once it receives its geom.
        const geomAssigned = () => {
          this.assignTreeItemToGLPass(treeItem)
        }
        listenerIDs['Geometry.valueChanged'] = geomParam.once('valueChanged', geomAssigned)
      } else {
        this.assignTreeItemToGLPass(treeItem)
      }
    } else {
      this.assignTreeItemToGLPass(treeItem)
    }

    // Traverse the tree adding items until we hit the leaves (which are usually GeomItems.)
    for (const childItem of treeItem.getChildren()) {
      if (childItem) this.addTreeItem(<TreeItem>childItem)
    }

    listenerIDs['childAdded'] = treeItem.on('childAdded', (event) => {
      this.addTreeItem(event.childItem)
    })
    listenerIDs['childRemoved'] = treeItem.on('childRemoved', (event) => {
      this.removeTreeItem(event.childItem)
    })

    this.renderGeomDataFbos()
  }

  /**
   * Searches through the passes and finds the appropriate pass to draw the given tree items.
   *
   * @param {TreeItem} treeItem - The tree item to assign.
   */
  assignTreeItemToGLPass(treeItem: TreeItem) {
    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      this.glGeomItemLibrary.addGeomItem(geomItem)
    }

    let handled = false
    for (let i = this.__passesRegistrationOrder.length - 1; i >= 0; i--) {
      const pass = this.__passesRegistrationOrder[i]

      const rargs = {
        continueInSubTree: true,
      }
      handled = pass.itemAddedToScene(treeItem, rargs)
      if (handled) {
        if (!rargs.continueInSubTree) return
        break
      }
    }

    if (!handled) {
      for (const passCbs of this.__passCallbacks) {
        const rargs = {
          continueInSubTree: true,
        }
        const handled = passCbs.itemAddedFn(treeItem, rargs)
        if (handled) {
          if (!rargs.continueInSubTree) return
          break
        }
      }
    }
  }

  /**
   * Remove tree items from the scene.
   *
   * @param {TreeItem} treeItem - The tree item to remove.
   */
  removeTreeItem(treeItem: TreeItem): void {
    // Note: we can have BaseItems in the tree now.
    if (!(treeItem instanceof TreeItem)) return

    const id = treeItem.getId()
    const listenerIDs = this.listenerIDs[id]
    delete this.listenerIDs[id]

    treeItem.removeListenerById('childAdded', listenerIDs['childAdded'])
    treeItem.removeListenerById('childRemoved', listenerIDs['childRemoved'])

    for (let i = this.__passesRegistrationOrder.length - 1; i >= 0; i--) {
      const pass = this.__passesRegistrationOrder[i]
      const rargs = {
        continueInSubTree: true,
      }
      const handled = pass.itemRemovedFromScene(treeItem, rargs)
      if (handled) {
        if (!rargs.continueInSubTree) return
        break
      }
    }

    for (const passCbs of this.__passCallbacks) {
      if (!passCbs.itemRemovedFn) continue
      const rargs = {
        continueInSubTree: true,
      }
      const handled = passCbs.itemRemovedFn(treeItem, rargs)
      if (handled) {
        if (!rargs.continueInSubTree) return
        break
      }
    }

    // Traverse the tree adding items till we hit the leaves (which are usually GeomItems).
    for (const childItem of treeItem.getChildren()) {
      if (childItem) this.removeTreeItem(<TreeItem>childItem)
    }

    if (treeItem instanceof GeomItem) {
      const geomItem = treeItem
      if (listenerIDs['Geometry.valueChanged']) {
        const geomParam = treeItem.geomParam
        geomParam.removeListenerById('valueChanged', listenerIDs['Geometry.valueChanged'])
      }

      this.glGeomItemLibrary.removeGeomItem(geomItem)
    }

    this.renderGeomDataFbos()
  }

  // ///////////////////////
  // Renderer Setup

  /**
   * Getter for gl.
   */
  get gl() {
    return this.__gl
  }

  /**
   * The getGL method.
   * @return {WebGL12RenderingContext} - The return value.
   */
  getGL(): WebGL12RenderingContext {
    return this.__gl
  }

  /**
   * Handle the canvas's parent resizing.
   *
   * @param {number} width - The new width of the canvas.
   * @param {number} height - The new height of the canvas.
   *
   * @private
   */
  handleResize(width: number, height: number): void {
    if (this.__xrViewportPresenting) {
      return
    }

    if (width != this.__glcanvas!.width || height != this.__glcanvas!.height) {
      this.__glcanvas!.width = width
      this.__glcanvas!.height = height

      for (const vp of this.__viewports) {
        vp.resize(width, height)
      }
      const event = new ResizedEvent(width, height)
      this.emit('resized', event)
    }
    this.requestRedraw()
  }

  /**
   * Returns host div of the canvas element.
   *
   * @return {HTMLElement} - The return value.
   */
  getDiv(): HTMLElement | null {
    return this.__glcanvas!.parentElement
  }

  /**
   * Setups the WebGL configuration for the renderer, specifying the canvas element where our
   * @private
   * @param {HTMLCanvasElement|HTMLElement} $canvas - The $canvas element.
   * @param { Record<string, any>} webglOptions - The webglOptions value.
   */
  private setupWebGL($canvas: HTMLCanvasElement, webglOptions: Record<string, any>): WebGL12RenderingContext {
    const { tagName } = $canvas

    if (!['DIV', 'CANVAS'].includes(tagName)) {
      throw new Error('Only CANVAS and DIV are valid root elements.')
    }

    const rootIsDiv = tagName === 'DIV'
    this.__glcanvas = $canvas

    if (rootIsDiv) {
      console.warn(
        '@GLBaseRenderer#setupWebGL.',
        'Using a DIV as root element is deprecated.',
        'Use a CANVAS instead.',
        'See: https://docs.zea.live/zea-engine/#/getting-started/get-started-with-engine?id=basic-setup'
      )

      this.__glcanvas = document.createElement('canvas')

      $canvas.appendChild(this.__glcanvas)
    } else {
      this.__glcanvas = $canvas
    }
    this.__glcanvas.style['touch-action'] = 'none'
    this.__glcanvas.style.width = 'auto'
    this.__glcanvas.style.height = 'auto'
    this.__glcanvas.style.margin = '0px'

    let lastResize = performance.now()
    let timoutId = 0
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!entry.contentRect) {
          return
        }
        const calcPixelsAndResize = () => {
          let width
          let height
          let dpr = window.devicePixelRatio
          // @ts-ignore
          if (entry.devicePixelContentBoxSize) {
            // NOTE: Only this path gives the correct answer
            // The other paths are imperfect fallbacks
            // for browsers that don't provide anyway to do this
            // @ts-ignore
            width = entry.devicePixelContentBoxSize[0].inlineSize
            // @ts-ignore
            height = entry.devicePixelContentBoxSize[0].blockSize
            dpr = 1 // it's already in width and height
          } else if (entry.contentBoxSize) {
            if (entry.contentBoxSize[0]) {
              width = entry.contentBoxSize[0].inlineSize
              height = entry.contentBoxSize[0].blockSize
            } else {
              // @ts-ignore
              width = entry.contentBoxSize.inlineSize
              // @ts-ignore
              height = entry.contentBoxSize.blockSize
            }
          } else {
            width = entry.contentRect.width
            height = entry.contentRect.height
          }
          const displayWidth = Math.round(width * dpr)
          const displayHeight = Math.round(height * dpr)
          this.handleResize(displayWidth, displayHeight)
        }
        // Note: Rapid resize events would cause WebGL to render black.
        // There appeared nothing to indicate why we get black, but throttling
        // the resizing of our canvas and buffers seems to work.
        const now = performance.now()
        if (now - lastResize > 100) {
          lastResize = now
          // If a delayed resize is scheduled, cancel it.
          if (timoutId) {
            clearTimeout(timoutId)
            timoutId = 0
          }
          calcPixelsAndResize()
        } else {
          // Set a timer to see if we can delay this resize by a few ms.
          // If a resize happens in the meantime that succeeds, then skip this one.
          // This ensures that after a drag to resize, the final resize event
          // should always eventually apply.
          // @ts-ignore
          timoutId = setTimeout(() => {
            const now = performance.now()
            if (now - lastResize > 100) {
              lastResize = now
              calcPixelsAndResize()
            }
          }, 100)
        }
      }
    })

    this.handleResize(this.__glcanvas.parentElement.clientWidth, this.__glcanvas.parentElement.clientHeight)
    // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    try {
      // only call us of the number of device pixels changed
      // @ts-ignore
      resizeObserver.observe(this.__glcanvas.parentNode, { box: 'device-pixel-content-box' })
    } catch (ex) {
      // device-pixel-content-box is not supported so fallback to this
      // @ts-ignore
      resizeObserver.observe(this.__glcanvas.parentNode, { box: 'content-box' })
    }

    webglOptions.preserveDrawingBuffer = true
    webglOptions.antialias = webglOptions.antialias != undefined ? webglOptions.antialias : true
    webglOptions.depth = true
    webglOptions.stencil = false
    webglOptions.alpha = webglOptions.alpha ? webglOptions.alpha : false
    // Note: Due to a change in Chrome (version 88-89), providing true here caused a pause when creating
    // an WebGL context, if the XR device was unplugged. We also call 'makeXRCompatible' when setting
    // up the XRViewport, so we to get an XR Compatible context anyway.
    webglOptions.xrCompatible = false

    // Most applications of our engine will prefer the high-performance context by default.
    webglOptions.powerPreference = webglOptions.powerPreference || 'high-performance'
    const gl = create3DContext(this.__glcanvas, webglOptions)
    if (!gl) alert('Unable to create WebGL context. WebGL not supported.')

    if (gl.name == 'webgl2') {
      this.addShaderPreprocessorDirective('ENABLE_ES3')
    }
    if (gl.floatTexturesSupported) {
      this.addShaderPreprocessorDirective('ENABLE_FLOAT_TEXTURES')
    }

    {
      const ext = gl.name == 'webgl2' ? gl.getExtension('WEBGL_multi_draw') : null
      if (ext && !webglOptions.disableMultiDraw) {
        gl.multiDrawArrays = ext.multiDrawArraysWEBGL.bind(ext)
        gl.multiDrawElements = ext.multiDrawElementsWEBGL.bind(ext)
        gl.multiDrawElementsInstanced = ext.multiDrawElementsInstancedWEBGL.bind(ext)
        gl.multiDrawArraysInstanced = ext.multiDrawArraysInstancedWEBGL.bind(ext)
      } else {
        this.addShaderPreprocessorDirective('EMULATE_MULTI_DRAW')
      }
    }

    // Note: Mobile devices don't provide much support for reading data back from float textures,
    // and checking compatibility is patchy at best.
    // Note: We are now pushing on high-end mobile devices.
    // Galaxy and above. We need this. We need to accurately determine
    // if the float buffer is not supported.
    this.floatGeomBuffer =
      webglOptions.floatGeomBuffer != undefined ? webglOptions.floatGeomBuffer : gl.floatTexturesSupported
    gl.floatGeomBuffer = this.floatGeomBuffer

    return gl
  }

  /**
   * Binds IO event handlers to the canvas
   */
  bindEventHandlers(): void {
    // ////////////////////////////////
    // Setup event handlers
    const isValidCanvas = () => this.getWidth() > 0 && this.getHeight()

    const prepareEvent = (event: Record<string, any>) => {
      event.propagating = true
      const sp = event.stopPropagation
      event.stopPropagation = () => {
        event.propagating = false
        if (sp) sp.call(event)
      }
    }
    const calcRendererCoords = (event: Record<string, any>) => {
      const rect = this.__glcanvas!.getBoundingClientRect()
      // Disabling devicePixelRatio for now. See: __onResize
      const DPR = 1.0 // window.devicePixelRatio
      // Note: the rendererX/Y values are relative to the viewport,
      // but are available outside the viewport. So when a mouse
      // drag occurs, and drags outside the viewport, these values
      // provide consistent coords.
      // offsetX/Y are only valid inside the viewport and so cause
      // jumps when the mouse leaves the viewport.
      event.rendererX = (event.clientX - rect.left) * DPR
      event.rendererY = (event.clientY - rect.top) * DPR
    }

    /** Mouse Events Start */
    const isMobileSafariMouseEvent = (event: Record<string, any>) => {
      if (SystemDesc.isMobileDevice && SystemDesc.browserName == 'Safari') {
        console.warn('Mobile Safari is triggering mouse event:', event.type)
        return true
      }
      return false
    }

    this.__glcanvas!.addEventListener('mousedown', (event: Record<string, any>) => {
      if (isMobileSafariMouseEvent(event)) {
        return
      }

      prepareEvent(event)
      calcRendererCoords(event)
      pointerIsDown = true
      activeGLRenderer = this
      this.activateViewportAtPos(event.rendererX, event.rendererY)
      const viewport = this.getActiveViewport()
      if (viewport) {
        event.pointerType = POINTER_TYPES.mouse
        viewport.onPointerDown(event)
      }

      pointerLeft = false
    })

    document.addEventListener('mouseup', (event: Record<string, any>) => {
      if (isMobileSafariMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      prepareEvent(event)
      calcRendererCoords(event)
      pointerIsDown = false
      const viewport = this.getActiveViewport()
      if (viewport) {
        event.pointerType = POINTER_TYPES.mouse
        viewport.onPointerUp(event)
      }

      if (pointerLeft) {
        if (viewport) {
          event.pointerType = POINTER_TYPES.mouse
          viewport.onPointerLeave(event)
        }
        activeGLRenderer = undefined
      }
    })

    document.addEventListener('mousemove', (event: Record<string, any>) => {
      if (isMobileSafariMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      prepareEvent(event)
      calcRendererCoords(event)
      if (!pointerIsDown) this.activateViewportAtPos(event.rendererX, event.rendererY)

      const viewport = this.getActiveViewport()
      if (viewport) {
        event.pointerType = POINTER_TYPES.mouse
        viewport.onPointerMove(event)
      }
    })

    this.__glcanvas!.addEventListener('mouseenter', (event: Record<string, any>) => {
      if (isMobileSafariMouseEvent(event)) {
        return
      }

      if (!pointerIsDown) {
        activeGLRenderer = this
        event.pointerType = POINTER_TYPES.mouse

        prepareEvent(event)
        calcRendererCoords(event)
        // TODO: Check mouse pos.
        this.activateViewportAtPos(event.rendererX, event.rendererY)

        if (!pointerIsDown) {
          const viewport = this.getActiveViewport()
          if (viewport) {
            event.pointerType = POINTER_TYPES.mouse
            viewport.onPointerEnter(event)
          }
        }

        pointerLeft = false
      }
    })

    this.__glcanvas!.addEventListener('mouseleave', (event: Record<string, any>) => {
      if (isMobileSafariMouseEvent(event)) {
        return
      }

      if (activeGLRenderer != this || !isValidCanvas()) return

      prepareEvent(event)
      if (!pointerIsDown) {
        const viewport = this.getActiveViewport()
        if (viewport) {
          event.pointerType = POINTER_TYPES.mouse
          viewport.onPointerLeave(event)
        }
        activeGLRenderer = undefined
      } else {
        pointerLeft = true
      }
    })

    /** Mouse Events End */

    /** Touch Events Start */
    this.__glcanvas!.addEventListener(
      'touchstart',
      (event: Record<string, any>) => {
        event.stopPropagation()

        // Touch events are passive and so cannot call prevent default
        // replace with a stub here...
        event.preventDefault = () => {}

        prepareEvent(event)
        for (let i = 0; i < event.touches.length; i++) {
          calcRendererCoords(event.touches[i])
        }

        event.pointerType = POINTER_TYPES.touch
        this.getViewport().onPointerDown(event)
      },
      { passive: true }
    )

    this.__glcanvas!.addEventListener(
      'touchend',
      (event: Record<string, any>) => {
        event.stopPropagation()

        // Touch events are passive and so cannot call prevent default
        // replace with a stub here...
        event.preventDefault = () => {}

        prepareEvent(event)
        for (let i = 0; i < event.changedTouches.length; i++) {
          calcRendererCoords(event.changedTouches[i])
        }

        event.pointerType = POINTER_TYPES.touch
        this.getViewport().onPointerUp(event)
      },
      { passive: true }
    )

    this.__glcanvas!.addEventListener(
      'touchmove',
      (event: Record<string, any>) => {
        event.stopPropagation()

        // Touch events are passive and so cannot call prevent default
        // replace with a stub here...
        event.preventDefault = () => {}

        prepareEvent(event)
        for (let i = 0; i < event.touches.length; i++) {
          calcRendererCoords(event.touches[i])
        }

        event.pointerType = POINTER_TYPES.touch
        this.getViewport().onPointerMove(event)
      },
      { passive: true }
    )
    /** Touch Events End */

    const onWheel = (event: Record<string, any>) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      if (activeGLRenderer) {
        prepareEvent(event)
        calcRendererCoords(event)
        const vp = activeGLRenderer.getActiveViewport()
        if (vp) {
          vp.onWheel(event)
        }
      }
    }
    /** DOMMouseScroll is for mozilla. */
    window.addEventListener('wheel', onWheel, { passive: false })

    window.oncontextmenu = function () {
      return false
    }

    document.addEventListener('keydown', (event: any) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      prepareEvent(event)
      const vp = activeGLRenderer.getActiveViewport()
      if (vp) {
        vp.onKeyDown(event)
      }
    })

    document.addEventListener('keyup', (event) => {
      if (activeGLRenderer != this || !isValidCanvas()) return
      prepareEvent(event)
      const vp = activeGLRenderer.getActiveViewport()
      if (vp) {
        vp.onKeyUp(event)
      }
    })
  }

  /**
   * Returns canvas that was used to generate the gl context.
   *
   * @return {HTMLCanvasElement} - The return value.
   */
  getGLCanvas(): HTMLCanvasElement | null {
    return this.__glcanvas
  }

  /**
   * Frames the specified viewport to the entire scene.
   * > See also: ${Viewport#frameView}
   * @param {number} viewportIndex - The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided.
   */
  frameAll(viewportIndex = 0): void {
    this.__viewports[viewportIndex].frameView([this.__scene!.getRoot()])
  }

  // ///////////////////////
  // Render Items Setup

  /**
   * A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.
   * @param {string} shaderName - The shader name.
   * @return {GLShader} - The return value.
   */
  getOrCreateShader(shaderName: string): GLShader {
    let glShader = this.__shaders[shaderName]
    if (!glShader) {
      glShader = <GLShader>Registry.constructClass(shaderName)
      if (!glShader)
        console.error('@GLBaseRenderer#getOrCreateShader - Shader not registered with the Registry:', shaderName)
      glShader.setGLContext(this.__gl)
      this.__shaders[shaderName] = glShader
    }
    return glShader
  }

  /**
   * The addPass method.
   * @param {GLPass} pass - The pass value.
   * @param {number} passType - The passType value.
   * @param {boolean} updateIndices - The updateIndices value.
   * @return {number} - The return value.
   */
  addPass(pass: GLPass, passType = -1, updateIndices = true): number {
    if (passType == -1) passType = pass.getPassType()
    if (!this.__passes[passType]) this.__passes[passType] = []

    let index = 0
    for (const key in this.__passes) {
      if (key == passType.toString()) break
      index += this.__passes[key].length
    }
    index += this.__passes[passType].length

    pass.on('updated', (event) => {
      this.requestRedraw()

      // If a pass is requesting an update, it is because geometry or
      // visibility is changing and the geom data Fbo will also be out
      // of date.
      this.renderGeomDataFbos()
    })
    pass.init(this, index)
    this.__passes[passType].push(pass)

    if (updateIndices) {
      // Now update all the  subsequent pass indices because the
      // indices after will have changed.
      let offset = 0
      for (const key in this.__passes) {
        const passSet = this.__passes[key]
        passSet.forEach((pass: GLPass, index: number) => {
          pass.setPassIndex(offset + index)
        })
        offset += passSet.length
      }
    }
    this.__passesRegistrationOrder.push(pass)
    this.requestRedraw()
    return index
  }

  /**
   * The getPass method.
   * @param {number} index - The index value.
   * @return {GLPass} - The return value.
   */
  getPass(index: number): GLPass | undefined {
    let offset = 0
    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      if (index - offset < passSet.length) return passSet[index - offset]
      offset += passSet.length
    }
    return undefined
  }

  // ///////////////////////
  // VR Setup

  /**
   * The supportsVR method.
   * @return {boolean} - The return value.
   */
  supportsVR(): boolean {
    console.warn('@GLBaseRenderer#supportVR - Deprecated Method. Please instead connect to the vrViewportSetup signal.')
    return this.__supportXR && (navigator as any)?.xr != null
  }

  /**
   * The __setupXRViewport method.
   * @return {VRViewport} - The return value.
   * @private
   */
  __setupXRViewport(): VRViewport {
    // Always get the last display. Additional displays are added at the end.(e.g. [Polyfill, HMD])
    const xrvp = new VRViewport(this)

    const emitViewChanged = (event: Record<string, any>) => {
      this.emit('viewChanged', event)
    }

    xrvp.on('presentingChanged', (event: any) => {
      const state = event.state
      this.__xrViewportPresenting = state
      if (state) {
        // Let the passes know that VR is starting.
        // They can do things like optimize shaders.
        for (const key in this.__passes) {
          const passSet = this.__passes[key]
          for (const pass of passSet) {
            pass.startPresenting()
          }
        }

        xrvp.on('viewChanged', emitViewChanged)
      } else {
        xrvp.off('viewChanged', emitViewChanged)
        this.emit('updated')

        for (const key in this.__passes) {
          const passSet = this.__passes[key]
          for (const pass of passSet) {
            pass.stopPresenting()
          }
        }

        const viewXfo = this.getViewport().getCamera().globalXfoParam.value
        const event = new ViewChangedEvent('CameraAndPointer', viewXfo)
        this.emit('viewChanged', event)

        this.requestRedraw()
      }
    })
    return xrvp
  }

  /**
   * The getVRViewport method.
   * @return {VRViewport} - The return value.
   */
  getVRViewport(): VRViewport | undefined {
    return this.__xrViewport
  }

  /**
   * The getXRViewport method.
   * @return {Promise} - The return value.
   */
  getXRViewport(): Promise<VRViewport> {
    return this.__xrViewportPromise
  }

  /**
   * The isXRViewportPresenting method.
   * @return {boolean} - The return value.
   */
  isXRViewportPresenting(): boolean {
    return this.__xrViewportPresenting
  }

  // //////////////////////////
  // Rendering

  /**
   * The isContinuouslyDrawing method.
   * @return {boolean} - The return value.
   */
  isContinuouslyDrawing(): boolean {
    return this.__continuousDrawing
  }

  /**
   * The startContinuousDrawing method.
   */
  startContinuousDrawing() {
    if (this.isContinuouslyDrawing() || this.__xrViewportPresenting) return

    const onAnimationFrame = () => {
      if (this.__continuousDrawing && !this.__xrViewportPresenting) window.requestAnimationFrame(onAnimationFrame)
      for (const vp of this.__viewports) vp.draw()
    }

    this.__continuousDrawing = true
    window.requestAnimationFrame(onAnimationFrame)
  }

  /**
   * The stopContinuousDrawing method.
   */
  stopContinuousDrawing(): void {
    this.__continuousDrawing = false
  }

  /**
   * The toggleContinuousDrawing method.
   */
  toggleContinuousDrawing(): void {
    if (!this.__continuousDrawing) {
      this.startContinuousDrawing()
    } else {
      this.stopContinuousDrawing()
    }
  }

  /**
   * The drawItemChanged method.
   */
  drawItemChanged(): void {
    for (const vp of this.__viewports) vp.invalidateGeomDataBuffer()
    this.requestRedraw()
  }

  /**
   * Request a single redraw, usually in response to a signal/event.
   * @return {boolean} - The return value.
   */
  requestRedraw(): boolean {
    // If a redraw has already been requested, then simply return and wait.
    if (
      this.__redrawRequested ||
      this.__continuousDrawing ||
      this.__xrViewportPresenting ||
      this.__drawSuspensionLevel > 0
    ) {
      return false
    }

    const onAnimationFrame = () => {
      this.__redrawRequested = false
      for (const vp of this.__viewports) {
        vp.draw()
      }
    }
    window.requestAnimationFrame(onAnimationFrame)
    this.__redrawRequested = true
    return true
  }

  /**
   * Forces a redraw of the viewports
   */
  forceRender(): void {
    if (!this.__redrawRequested) {
      console.warn('@GlBaseRenderer#forceRender - Scene is not dirty')
      return
    }

    this.__redrawRequested = false
    for (const vp of this.__viewports) {
      vp.draw()
    }
  }

  /**
   * The bindGLBaseRenderer method.
   * @param {RenderState} renderstate - The renderstate value.
   */
  bindGLBaseRenderer(renderstate: RenderState) {
    renderstate.gl = this.__gl
    renderstate.shaderopts = { directives: this.directives } // we will start deprecating this in favor os a simpler directives

    const gl = this.__gl
    if (!renderstate.viewports || renderstate.viewports.length == 1) {
      renderstate.bindRendererUnifs = (unifs: Uniforms) => {
        const { cameraMatrix, viewMatrix, projectionMatrix, eye, isOrthographic } = unifs
        if (cameraMatrix) {
          gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray())
        }

        const vp = renderstate.viewports[0]
        if (viewMatrix) {
          gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray())
        }

        if (projectionMatrix) {
          gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray())
        }

        if (eye) {
          // for monocular rendering, we just render viewport 0
          gl.uniform1i(eye.location, 0)
        }
        if (isOrthographic) {
          // Left or right eye, when rendering sterio VR.
          gl.uniform1i(isOrthographic.location, vp.isOrthographic)
        }
      }
      renderstate.bindViewports = (unifs: Uniforms, cb: any) => cb()
    } else {
      renderstate.bindRendererUnifs = (unifs: Uniforms) => {
        // Note: the camera matrix should be the head position instead
        // of the eye position. The inverse(viewMatrix) can be used
        // when we want the eye pos.
        const { cameraMatrix } = unifs
        if (cameraMatrix) {
          gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray())
        }
      }

      renderstate.bindViewports = (unifs: Uniforms, cb: any) => {
        renderstate.viewports.forEach((vp: any, index: number) => {
          let vp_region = vp.region
          gl.viewport(vp_region[0], vp_region[1], vp_region[2], vp_region[3])

          const { viewMatrix, projectionMatrix, eye, isOrthographic } = unifs
          if (viewMatrix) {
            gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray())
          }

          if (projectionMatrix) {
            gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray())
          }

          if (eye) {
            // Left or right eye, when rendering sterio VR.
            gl.uniform1i(eye.location, index)
          }
          if (isOrthographic) {
            // Left or right eye, when rendering sterio VR.
            gl.uniform1i(isOrthographic.location, vp.isOrthographic)
          }
          cb()
        })
      }
    }
  }

  /**
   * The drawScene method.
   * @param {RenderState} renderstate - The renderstate value.
   */
  drawScene(renderstate: RenderState): void {
    // Bind already called by GLRenderer.

    renderstate.directives = [...this.directives, '#define DRAW_COLOR']
    renderstate.shaderopts.directives = renderstate.directives

    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.draw(renderstate)
      }
    }
  }

  /**
   * The drawHighlightedGeoms method.
   * @param {RenderState} renderstate - The renderstate value.
   */
  drawHighlightedGeoms(renderstate: RenderState): void {
    this.bindGLBaseRenderer(renderstate)

    renderstate.directives = [...this.directives, '#define DRAW_HIGHLIGHT']
    renderstate.shaderopts.directives = renderstate.directives

    for (const key in this.__passes) {
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.drawHighlightedGeoms(renderstate)
      }
    }
  }

  /**
   * The drawSceneGeomData method.
   * @param {RenderState} renderstate - The renderstate value.
   * @param {number} [mask=255] - The mask value
   */
  drawSceneGeomData(renderstate: GeomDataRenderState, mask = 255): void {
    this.bindGLBaseRenderer(renderstate)

    renderstate.directives = [...this.directives, '#define DRAW_GEOMDATA']
    renderstate.shaderopts.directives = renderstate.directives
    renderstate.floatGeomBuffer = this.floatGeomBuffer

    for (const key in this.__passes) {
      // Skip pass categories that do not match
      // the mask. E.g. we may not want to hit
      // "Overlay" geoms such as labels,
      // or we might be trying to move labels and don't
      // want to grab normal geoms.
      if ((Number.parseInt(key) & mask) == 0) continue
      const passSet = this.__passes[key]
      for (const pass of passSet) {
        if (pass.enabled) pass.drawGeomData(renderstate)
      }
    }
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The registerPass method.
   * @param {function} cls - The cls value.
   * @param {PassType} passType - The passType value.
   */
  static registerPass(cls: any, passType: any): void {
    if (!registeredPasses[passType]) registeredPasses[passType] = []
    registeredPasses[passType].push(cls)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    this.resizeObserver!.disconnect()
  }
}

export { GLBaseRenderer }
