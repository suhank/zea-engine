import { SystemDesc } from '../SystemDesc'
import { Color } from '../Math/index'
import { Plane, ParameterOwner, BaseImage, NumberParameter, BaseTool, Scene } from '../SceneTree/index'
import { GLRenderTarget } from './GLRenderTarget'
import { GLRenderer } from './GLRenderer'
import { GLHDRImage } from './GLHDRImage'
import { GLTexture2D } from './GLTexture2D'
import { GLFbo } from './GLFbo'
import { GLMesh } from './Drawing/GLMesh'

import { BaseEvent } from '../Utilities/BaseEvent'
import { VLHImage } from '../SceneTree/Images/VLHImage'
import { ResizedEvent } from '../Utilities/Events/ResizedEvent'
import { GLBaseRenderer } from './GLBaseRenderer'

const FRAMEBUFFER = {
  MSAA_RENDERBUFFER: 0,
  COLORBUFFER: 1,
  DEPTHBUFFER: 2,
}

/**
 * Class representing a GL base viewport.
 * @extends ParameterOwner
 * @private
 */
class GLBaseViewport extends ParameterOwner {
  protected __gl: WebGL12RenderingContext
  protected renderer: GLRenderer
  protected __renderer: GLRenderer
  protected __doubleClickTimeMSParam: NumberParameter
  protected __fbo: WebGLFramebuffer | null
  protected __ongoingPointers: any[]
  protected __backgroundColor: Color
  protected quad: GLMesh
  protected offscreenBuffer: GLTexture2D
  protected depthTexture: GLTexture2D
  protected highlightedGeomsBuffer: GLTexture2D
  protected highlightedGeomsBufferFbo: GLFbo
  protected __backgroundTexture: BaseImage
  protected __backgroundGLTexture: GLHDRImage | GLTexture2D
  protected offscreenBufferFbo: GLFbo
  protected __width: number
  protected __height: number
  protected __canvasWidth: number
  protected __canvasHeight: number
  protected fb: WebGLFramebuffer | null
  protected colorRenderbuffer: any
  protected depthBuffer: WebGLRenderbuffer
  protected EXT_frag_depth: EXT_frag_depth
  protected manipulator: any
  /**
   * Create a GL base viewport.
   * @param {GLRenderer} renderer - The renderer value.
   */
  constructor(renderer: GLRenderer) {
    super()
    this.renderer = renderer
    this.__renderer = renderer
    this.__doubleClickTimeMSParam = <NumberParameter>this.addParameter(new NumberParameter('DoubleClickTimeMS', 200))
    // Since there is not multi touch on `PointerEvent`, we need to store pointers pressed.
    this.__ongoingPointers = []
    this.__backgroundColor = new Color(0.3, 0.3, 0.3, 1)

    const gl = this.__renderer.gl
    this.__gl = gl

    this.quad = new GLMesh(gl, new Plane(1, 1))

    // //////////////////////////////////
    // Setup Offscreen Render Targets
    // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
    // and so we are simply disabling silhouettes on all low end devices now.
    if (gl.name == 'webgl2') {
      this.offscreenBuffer = new GLTexture2D(gl, {
        type: 'UNSIGNED_BYTE',
        format: 'RGBA',
        filter: 'LINEAR',
        width: 4,
        height: 4,
      })
      this.depthTexture = new GLTexture2D(gl, {
        type: gl.UNSIGNED_INT_24_8,
        format: gl.DEPTH_STENCIL,
        internalFormat: gl.name == 'webgl2' ? gl.DEPTH24_STENCIL8 : gl.DEPTH_COMPONENT,
        filter: gl.NEAREST,
        wrap: gl.CLAMP_TO_EDGE,
        width: 4,
        height: 4,
      })
      // this.offscreenBufferFbo = new GLFbo(gl, this.offscreenBuffer, true)
      // this.offscreenBufferFbo.setClearColor(this.__backgroundColor.asArray())
    }

    this.highlightedGeomsBuffer = new GLTexture2D(gl, {
      type: 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'NEAREST',
      width: 4,
      height: 4,
    })
    this.highlightedGeomsBufferFbo = new GLFbo(gl, this.highlightedGeomsBuffer, true)
    this.highlightedGeomsBufferFbo.setClearColor(new Color(0, 0, 0, 0))

    // //////////////////////////////////
    // Setup Camera Manipulator
    const sceneSet = (scene?: Scene) => {
      const settings = renderer.getScene().settings
      const bgColorParam = settings.getParameter('BackgroundColor')
      const processBGValue = () => {
        const value = bgColorParam.getValue()
        if (value instanceof BaseImage) {
          if (value.type === 'FLOAT') {
            this.__backgroundTexture = value
            this.__backgroundGLTexture = new GLHDRImage(gl, <VLHImage>value) // TODO: is casting a baseimage to <VLHImage> ok?
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

          if (this.offscreenBufferFbo) {
            this.offscreenBufferFbo.setClearColor(new Color(value.asArray()))
          }
        } else {
          console.warn('Invalid background:' + value)
        }
        this.emit('updated')
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
   * @return {GLRenderer} - The return value.
   */
  getRenderer(): GLRenderer {
    return this.__renderer
  }

  /**
   * The getWidth method.
   * @return {number} - The return value.
   */
  getWidth(): number {
    return this.__width
  }

  /**
   * The getHeight method.
   * @return {number} - The return value.
   */
  getHeight(): number{
    return this.__height
  }

  /**
   * The getBackground method.
   * @return {Color} - The return value.
   */
  getBackground(): Color | null{
    console.warn('Deprecated Function. Please access the Scene Settings object.')
    const settings = this.__renderer.getScene().settings
    const bgColorParam = settings.getParameter('BackgroundColor')
    return bgColorParam.getValue()
  }

  /**
   * The setBackground method.
   * @param {Color} background - The background value.
   */
  setBackground(background: Color) {
    console.warn('Deprecated Function. Please access the Scene Settings object.')
    const settings = this.__renderer.getScene().settings
    const bgColorParam = settings.getParameter('BackgroundColor')
    bgColorParam.setValue(background)
    this.emit('updated')
  }

  /**
   * The resize method.
   * @param {number} canvasWidth - The canvasWidth value.
   * @param {number} canvasHeight - The canvasHeight value.
   */
  resize(canvasWidth: number, canvasHeight: number) {
    if (this.__canvasWidth == canvasWidth && this.__canvasHeight == canvasHeight) return
    this.__canvasWidth = canvasWidth
    this.__canvasHeight = canvasHeight
    this.__width = canvasWidth
    this.__height = canvasHeight
    this.resizeRenderTargets(canvasWidth, canvasHeight)
    const event = new ResizedEvent(this.__width, this.__height)
    this.emit('resized', event)
  }

  /**
   * Resize any offscreen render targets.
   * > Note: Values ,ay not be the entire canvas with if multiple viewports exists.
   * @param {number} width - The width used by this viewport.
   * @param {number} height - The height  used by this viewport.
   */
  resizeRenderTargets(width: number, height: number) {
    // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
    // and so we are simply disabling silhouettes on all low end devices now.
    const gl = this.__renderer.gl
    if (gl.name == 'webgl2') {
      if (this.fb) {
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.COLORBUFFER])
        gl.deleteFramebuffer(this.fb[FRAMEBUFFER.DEPTHBUFFER])
        if (this.colorRenderbuffer) gl.deleteRenderbuffer(this.colorRenderbuffer)
        if (this.depthBuffer) gl.deleteRenderbuffer(this.depthBuffer)
      }
      // Create and bind the framebuffer
      this.offscreenBuffer.resize(width, height)
      this.depthTexture.resize(width, height)

      this.fb = []
      this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
      this.colorRenderbuffer = gl.createRenderbuffer()

      // Create the color buffer
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer)
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.colorRenderbuffer)

      this.depthBuffer = gl.createRenderbuffer()
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH24_STENCIL8, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer)

      // //////////////////////////////////
      // COLORBUFFER
      this.fb[FRAMEBUFFER.COLORBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.offscreenBuffer.glTex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      const check = gl.checkFramebufferStatus(
        gl.name == 'webgl2' ? (<WebGL2RenderingContext>gl).DRAW_FRAMEBUFFER : gl.FRAMEBUFFER
      )
      if (check !== gl.FRAMEBUFFER_COMPLETE) {
        switch (check) {
          case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            throw new Error(
              'The attachment types are mismatched or not all framebuffer attachment points are framebuffer attachment complete.'
            )
          case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            throw new Error('There is no attachment.')
          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw new Error('Height and width of the attachment are not the same.')
          case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            throw new Error(
              'The format of the attachment is not supported or if depth and stencil attachments are not the same renderbuffer.'
            )
          case 36061: // gl.GL_FRAMEBUFFER_UNSUPPORTED:
            throw new Error('The framebuffer is unsupported')
          default:
            throw new Error('Incomplete Frambuffer')
        }
      }
    }
    if (this.highlightedGeomsBuffer) {
      this.highlightedGeomsBuffer.resize(width, height)
    }
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: RenderState) {
    const gl = this.__renderer.gl

    const prevRendertarget = renderstate.boundRendertarget

    if (this.fb) {
      // this.offscreenBufferFbo.bindForWriting(renderstate)
      // this.offscreenBufferFbo.clear()
      // render to our targetTexture by binding the framebuffer
      gl.bindFramebuffer(
        gl.name == 'webgl2' ? (<WebGL2RenderingContext>gl).DRAW_FRAMEBUFFER : gl.FRAMEBUFFER,
        this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
      )
      renderstate.boundRendertarget = this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
    } else {
      // Make sure the default fbo is bound
      // Note: Sometimes an Fbo is left bound
      // from another op(like resizing, populating etc..)
      // We need to unbind here to ensure rendering is to the
      // right target.
      if (!renderstate.boundRendertarget) gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    gl.viewport(0, 0, this.__width, this.__height)
    const bg = this.__backgroundColor.asArray()
    gl.clearColor(bg[0], bg[1], bg[2], bg[3])
    // Note: in Chrome's macOS the alpha channel causes strange
    // compositing issues. Here where we disable the alpha channel
    // in the color mask which addresses the issues on MacOS.
    // To see the artifacts, pass 'true' as the 4th parameter, and
    // open a simple testing scene containing a grid. Moving the
    // camera causes a ghosting effect to be left behind.
    gl.colorMask(true, true, true, false)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.enable(gl.DEPTH_TEST)

    this.__renderer.drawScene(renderstate)

    this.drawHighlights(renderstate)

    // //////////////////////////////////
    // Post processing.
    if (this.fb && gl.name == 'webgl2') {
      // "blit" the scene into the color buffer
      const gl2 = <WebGL2RenderingContext>gl
      gl2.bindFramebuffer(gl2.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
      gl2.bindFramebuffer(gl2.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
      gl2.clearBufferfv(gl2.COLOR, 0, [0.0, 0.0, 0.0, 0.0])

      gl2.blitFramebuffer(
        0,
        0,
        this.__width,
        this.__height,
        0,
        0,
        this.__width,
        this.__height,
        gl2.COLOR_BUFFER_BIT,
        gl2.LINEAR
      )

      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, prevRendertarget)
      renderstate.boundRendertarget = prevRendertarget
      gl.viewport(0, 0, this.__width, this.__height)

      gl.disable(gl.DEPTH_TEST)
      const screenQuad = this.__renderer.screenQuad
      screenQuad.bindShader(renderstate)
      screenQuad.draw(renderstate, this.offscreenBuffer)
    }
  }

  /**
   * Draws the Silhouettes around geometries.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawSilhouettes(renderstate: RenderState) {
    // We cannot render silhouettes in iOS because EXT_frag_depth is not supported
    // and without it, we cannot draw lines over the top of geometries.
    // Note: On low end devices, such as Oculus, blitting the multi-sampled depth buffer is throwing errors,
    // and so we are simply disabling silhouettes on all low end devices now.
    const gl = this.__renderer.gl
    if (gl.name != 'webgl2' || !this.fb) return

    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.DEPTHBUFFER])
    gl.clearBufferfv(gl.COLOR, 0, [1, 1, 1, 1])

    gl.blitFramebuffer(
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height,
      gl.DEPTH_BUFFER_BIT,
      gl.NEAREST
    )
    // Rebind the MSAA RenderBuffer.
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
    renderstate.boundRendertarget = this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
    gl.viewport(0, 0, this.__width, this.__height)

    if (this.renderer.outlineThickness == 0) return

    // ////////////////////////////////////
    //
    gl.enable(gl.BLEND)
    gl.blendEquation(gl.FUNC_ADD)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add
    gl.disable(gl.DEPTH_TEST)
    gl.depthMask(false)

    this.renderer.silhouetteShader.bind(renderstate)

    const unifs = renderstate.unifs

    this.depthTexture.bindToUniform(renderstate, unifs.depthTexture)

    gl.uniform2f(unifs.screenSize.location, this.__width, this.__height)
    gl.uniform1f(unifs.outlineThickness.location, this.renderer.outlineThickness)

    const oc = this.renderer.outlineColor.asArray()
    gl.uniform4f(unifs.outlineColor.location, oc[0], oc[1], oc[2], oc[3])
    gl.uniform1f(unifs.outlineSensitivity.location, this.renderer.outlineSensitivity)
    gl.uniform1f(unifs.outlineDepthBias.location, this.renderer.outlineDepthBias)

    gl.uniform2f(unifs.depthRange.location, renderstate.depthRange[0], renderstate.depthRange[1])

    this.quad.bindAndDraw(renderstate)

    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
  }

  /**
   * Draws the highlights around geometries.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawHighlights(renderstate: RenderState) {
    if (this.highlightedGeomsBufferFbo) {
      const gl = this.__renderer.gl

      this.highlightedGeomsBufferFbo.bindForWriting(renderstate)
      this.highlightedGeomsBufferFbo.clear()

      gl.disable(gl.BLEND)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LESS)
      gl.depthMask(true)
      renderstate.glShader = null // clear any bound shaders.

      this.__renderer.drawHighlightedGeoms(renderstate)

      // Unbind and restore the bound fbo
      this.highlightedGeomsBufferFbo.unbindForWriting(renderstate)

      // Now render the outlines to the entire screen.
      gl.viewport(0, 0, this.__width, this.__height)

      // Turn this on to debug the highlight data buffer.
      const debugHighlightBuffer = false
      if (debugHighlightBuffer) {
        this.__renderer.screenQuad.bindShader(renderstate)
        this.highlightedGeomsBuffer.bindToUniform(renderstate, renderstate.unifs.image)
        this.__renderer.screenQuad.draw(renderstate)
      } else {
        this.renderer.highlightsShader.bind(renderstate)
        gl.enable(gl.BLEND)
        gl.blendEquation(gl.FUNC_ADD)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

        const unifs = renderstate.unifs
        gl.uniform1f(unifs.outlineThickness.location, this.renderer.highlightOutlineThickness)
        this.highlightedGeomsBuffer.bindToUniform(renderstate, unifs.highlightDataTexture)
        gl.uniform2f(unifs.highlightDataTextureSize.location, renderstate.region[2], renderstate.region[3])
        this.quad.bindAndDraw(renderstate)

        gl.disable(gl.BLEND)
      }
    }
  }

  // ///////////////////////////
  // Events

  /**
   * The getManipulator method.
   * @return {BaseTool} - The return value.
   */
  getManipulator(): BaseTool{
    return this.manipulator
  }

  /**
   * Sets the tool that will receive mouse, touch and keyboard events from the viewport.
   * @param {BaseTool} tool - The manipulator value.
   */
  setManipulator(tool: BaseTool) {
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
  onPointerDown(event: Record<any, any>) {
    console.warn('@GLBaseViewport#onPointerDown - Implement me!')
  }

  /**
   * Handler of the `pointerup` event fired when the pointer device is finally released.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerUp(event: Record<any, any>) {
    console.warn('@GLBaseViewport#onPointerUp - Implement me!')
  }

  /**
   * Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerMove(event: Record<any, any>) {
    console.warn('@GLBaseViewport#onPointerMove - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved into this viewport.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerEnter(event: Record<any, any>) {
    console.warn('@GLBaseViewport#onPointerEnter - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of this viewport.
   *
   * @param {MouseEvent|TouchEvent} event - The DOM event produced by a pointer
   */
  onPointerLeave(event: Record<any, any>) {
    console.warn('@GLBaseViewport#onPointerLeave - Implement me!')
  }

  /**
   * Invoked when the mouse pointer is moved out of an element.
   * @param {MouseEvent} event - The event that occurs.
   */
  onMouseLeave(event: Record<any, any>) {}

  /**
   * Invoked when the user is pressing a key on the keyboard.
   * @param {KeyboardEvent} event - The event that occurs.
   */
  onKeyDown(event: Record<any, any>) {}

  /**
   * Causes an event to occur  when the user releases a key on the keyboard.
   * @param {KeyboardEvent} event - The event that occurs.
   */
  onKeyUp(event: Record<any, any>) {}

  /**
   *
   * @param {id} pointerId
   * @return {number} - index result of the find.
   */
  _getOngoingPointerIndexById(pointerId: number): number {
    return this.__ongoingPointers.findIndex((pointer) => pointer.pointerId === pointerId)
  }
}

export { GLBaseViewport, FRAMEBUFFER }
