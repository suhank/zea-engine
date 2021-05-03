import { Color } from '../Math/index'
import { Plane, ParameterOwner, BaseImage, NumberParameter, BaseTool } from '../SceneTree/index'
import { GLRenderTarget } from './GLRenderTarget.js'
import { GLBaseRenderer } from './GLBaseRenderer'
import { GLHDRImage } from './GLHDRImage.js'
import { GLTexture2D } from './GLTexture2D.js'
import { GLFbo } from './GLFbo.js'
import { HighlightsShader } from './Shaders/HighlightsShader.js'
import { GLMesh } from './Drawing/GLMesh.js'

/**
 * Class representing a GL base viewport.
 * @extends ParameterOwner
 * @private
 */
class GLBaseViewport extends ParameterOwner {
  /**
   * Create a GL base viewport.
   * @param {GLRenderer} renderer - The renderer value.
   */
  constructor(renderer) {
    super()
    this.__renderer = renderer
    this.__doubleClickTimeMSParam = this.addParameter(new NumberParameter('DoubleClickTimeMS', 200))
    this.__fbo = undefined
    // Since there is not multi touch on `PointerEvent`, we need to store pointers pressed.
    this.__ongoingPointers = []
    this.__backgroundColor = new Color(0.3, 0.3, 0.3, 1)

    const gl = this.__renderer.gl

    this.highlightsShader = new HighlightsShader(gl)
    this.quad = new GLMesh(gl, new Plane(1, 1))

    // //////////////////////////////////
    // Setup Offscreen Render Targets
    // this.highlightedGeomsRenderTarget = new GLRenderTarget(gl, {
    //   type: gl.UNSIGNED_BYTE,
    //   format: gl.RGBA,
    //   filter: gl.NEAREST,
    //   width: 4,
    //   height: 4,
    //   numColorChannels: 1,
    //   depthInternalFormat: gl.DEPTH_COMPONENT24,
    //   depthFormat: gl.DEPTH_COMPONENT,
    //   depthType: gl.UNSIGNED_INT,
    // })

    this.highlightedGeomsBuffer = new GLTexture2D(gl, {
      type: 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: 4,
      height: 4,
    })
    this.highlightedGeomsBufferFbo = new GLFbo(gl, this.highlightedGeomsBuffer, true)
    this.highlightedGeomsBufferFbo.setClearColor([0, 0, 0, 0])

    // //////////////////////////////////
    // Setup Camera Manipulator
    const sceneSet = () => {
      const settings = renderer.getScene().settings
      const bgColorParam = settings.getParameter('BackgroundColor')
      const processBGValue = () => {
        const value = bgColorParam.getValue()
        if (value instanceof BaseImage) {
          if (value.type === 'FLOAT') {
            this.__backgroundTexture = value
            this.__backgroundGLTexture = new GLHDRImage(gl, value)
          } else {
            this.__backgroundTexture = value
            this.__backgroundGLTexture = new GLTexture2D(gl, value)
          }
        } else if (value instanceof Color) {
          if (this.__backgroundGLTexture) {
            this.__backgroundGLTexture.destroy()
            this.__backgroundGLTexture = undefined
            this.__backgroundTexture = undefined
          }
          this.__backgroundColor = value
        } else {
          console.warn('Invalid background:' + value)
        }
        this.emit('updated', {})
      }
      processBGValue()
      bgColorParam.on('valueChanged', processBGValue)
    }
    if (this.__renderer.getScene()) {
      sceneSet(this.__renderer.getScene())
    } else {
      this.__renderer.on('sceneSet', sceneSet)
    }
  }

  /**
   * The getRenderer method.
   * @return {GLBaseRenderer} - The return value.
   */
  getRenderer() {
    return this.__renderer
  }

  /**
   * The getWidth method.
   * @return {number} - The return value.
   */
  getWidth() {
    return this.__width
  }

  /**
   * The getHeight method.
   * @return {number} - The return value.
   */
  getHeight() {
    return this.__height
  }

  /**
   * The getBackground method.
   * @return {Color} - The return value.
   */
  getBackground() {
    console.warn('Deprecated Function. Please access the Scene Settings object.')
    const settings = this.__renderer.getScene().settings
    const bgColorParam = settings.getParameter('BackgroundColor')
    return bgColorParam.getValue()
  }

  /**
   * The setBackground method.
   * @param {Color} background - The background value.
   */
  setBackground(background) {
    console.warn('Deprecated Function. Please access the Scene Settings object.')
    const settings = this.__renderer.getScene().settings
    const bgColorParam = settings.getParameter('BackgroundColor')
    bgColorParam.setValue(background)
    this.emit('updated', {})
  }

  /**
   * The resize method.
   * @param {number} canvasWidth - The canvasWidth value.
   * @param {number} canvasHeight - The canvasHeight value.
   */
  resize(canvasWidth, canvasHeight) {
    this.__canvasWidth = canvasWidth
    this.__canvasHeight = canvasHeight
    this.__width = canvasWidth
    this.__height = canvasHeight
    this.resizeRenderTargets(canvasWidth, canvasHeight)
    this.emit('resized', { width: this.__width, height: this.__height })
  }

  /**
   * Resize any offscreen render targets.
   * > Note: Values ,ay not be the entire canvas with if multiple viewports exists.
   * @param {number} width - The width used by this viewport.
   * @param {number} height - The height  used by this viewport.
   */
  resizeRenderTargets(width, height) {
    console.log('resizeRenderTargets:', width, height)
    if (this.highlightedGeomsBuffer) {
      this.highlightedGeomsBuffer.resize(width, height)
    }
  }

  // ///////////////////////////
  // Events

  /**
   * The getManipulator method.
   * @return {BaseTool} - The return value.
   */
  getManipulator() {
    return this.manipulator
  }

  /**
   * Sets the tool that will receive mouse, touch and keyboard events from the viewport.
   * @param {BaseTool} tool - The manipulator value.
   */
  setManipulator(tool) {
    if (this.manipulator != tool) {
      if (this.manipulator && this.manipulator.deactivateTool) {
        this.manipulator.deactivateTool()
      }

      this.manipulator = tool

      if (this.manipulator.activateTool) {
        this.manipulator.activateTool()
      }
    }
  }

  /**
   * Handler of the `pointerdown` event fired when the pointer device is initially pressed.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerDown(event) {
    console.warn('@GLBaseViewport#onPointerDown - Implement me!')
  }

  /**
   * Handler of the `pointerup` event fired when the pointer device is finally released.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerUp(event) {
    console.warn('@GLBaseViewport#onPointerUp - Implement me!')
  }

  /**
   * Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerMove(event) {
    console.warn('@GLBaseViewport#onPointerMove - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved into this viewport.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerEnter(event) {
    console.warn('@GLBaseViewport#onPointerEnter - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of this viewport.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerLeave(event) {
    console.warn('@GLBaseViewport#onPointerLeave - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of an element.
   * @param {MouseEvent} event - The event that occurs.
   */
  onMouseLeave(event) {}

  /**
   * Invoked when the user is pressing a key on the keyboard.
   * @param {KeyboardEvent} event - The event that occurs.
   */
  onKeyDown(event) {}

  /**
   * Causes an event to occur  when the user releases a key on the keyboard.
   * @param {KeyboardEvent} event - The event that occurs.
   */
  onKeyUp(event) {}

  /**
   *
   * @param {id} pointerId
   * @return {number} - index result of the find.
   */
  _getOngoingPointerIndexById(pointerId) {
    return this.__ongoingPointers.findIndex((pointer) => pointer.pointerId === pointerId)
  }
}

export { GLBaseViewport }
