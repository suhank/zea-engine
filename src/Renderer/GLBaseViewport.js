import { Color } from '../Math/index'
import { Plane, ParameterOwner, BaseImage, NumberParameter, BaseTool } from '../SceneTree/index'
import { GLRenderTarget } from './GLRenderTarget.js'
import { GLBaseRenderer } from './GLBaseRenderer'
import { GLHDRImage } from './GLHDRImage.js'
import { GLTexture2D } from './GLTexture2D.js'
import { GLFbo } from './GLFbo.js'
import { HighlightsShader } from './Shaders/HighlightsShader.js'
import { GLMesh } from './Drawing/GLMesh.js'

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

    this.offscreenBuffer = new GLTexture2D(gl, {
      type: 'UNSIGNED_BYTE',
      format: 'RGBA',
      filter: 'LINEAR',
      width: 4,
      height: 4,
    })
    // this.offscreenDepthBuffer = new GLTexture2D(gl, {
    //   type: 'UNSIGNED_BYTE',
    //   format: 'RGBA',
    //   filter: 'NEAREST',
    //   width: 4,
    //   height: 4,
    // })

    // this.offscreenBufferFbo = new GLFbo(gl, this.offscreenBuffer, true)
    // this.offscreenBufferFbo.setClearColor(this.__backgroundColor.asArray())

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

          if (this.offscreenBufferFbo) {
            this.offscreenBufferFbo.setClearColor(value.asArray())
          }
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
    if (this.__canvasWidth == canvasWidth && this.__canvasHeight == canvasHeight) return
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
    // if (this.offscreenBuffer)
    {
      const gl = this.__renderer.gl

      if (this.fb) {
        gl.deleteFramebuffer(this.fb[0])
        gl.deleteFramebuffer(this.fb[1])
        gl.deleteFramebuffer(this.fb[2])
        gl.deleteRenderbuffer(this.colorRenderbuffer)
        gl.deleteRenderbuffer(this.depthBuffer)

        gl.deleteTexture(this.depthTexture)
      }
      // Create and bind the framebuffer
      this.offscreenBuffer.resize(width, height)
      // this.offscreenDepthBuffer.resize(width, height)

      this.fb = []
      this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER] = gl.createFramebuffer()

      this.colorRenderbuffer = gl.createRenderbuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])

      // Create the color buffer
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.colorRenderbuffer)
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.RGBA8, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.colorRenderbuffer)

      // Create the depth buffer
      this.depthBuffer = gl.createRenderbuffer()
      gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer)
      gl.renderbufferStorageMultisample(gl.RENDERBUFFER, 4, gl.DEPTH_COMPONENT16, width, height)
      gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer)

      this.fb[FRAMEBUFFER.COLORBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.offscreenBuffer.glTex, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)

      // //////////////////////////////////
      // DEPTHBUFFER
      this.fb[FRAMEBUFFER.DEPTHBUFFER] = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb[FRAMEBUFFER.DEPTHBUFFER])
      // Create the depth texture that will be bitted to.

      this.depthTexture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, this.depthTexture)
      // TODO: Copy params from the color image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      if (gl.name == 'webgl2') {
        // the proper texture format combination can be found here
        // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
        // https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/fbo_rtt_depth_texture.html
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.DEPTH_COMPONENT16,
          width,
          height,
          0,
          gl.DEPTH_COMPONENT,
          gl.UNSIGNED_SHORT,
          null
        )
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null)
      }
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
    if (this.highlightedGeomsBuffer) {
      this.highlightedGeomsBuffer.resize(width, height)
    }
  }

  /**
   * The draw method.
   */
  draw(renderstate = {}) {
    const gl = this.__renderer.gl

    if (this.fb) {
      // this.offscreenBufferFbo.bindForWriting(renderstate)
      // this.offscreenBufferFbo.clear()
      // render to our targetTexture by binding the framebuffer
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
      gl.viewport(0, 0, this.__width, this.__height)
      renderstate.boundRendertarget = this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
    } else {
      // Make sure the default fbo is bound
      // Note: Sometimes an Fbo is left bound
      // from another op(like resizing, populating etc..)
      // We need to unbind here to ensure rendering is to the
      // right target.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(...this.region)
    }

    gl.clearColor(...this.__backgroundColor.asArray())
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
    // "blit" the scene into the color buffer
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER])
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
    // gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    gl.clearBufferfv(gl.COLOR, 0, [0.0, 0.0, 0.0, 0.0])

    gl.blitFramebuffer(
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height,
      gl.COLOR_BUFFER_BIT,
      gl.LINEAR
    )

    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.fb[FRAMEBUFFER.COLORBUFFER])
    gl.clearBufferfv(gl.COLOR, 0, [0.0, 0.0, 0.0, 0.0])
    gl.blitFramebuffer(
      0,
      0,
      this.__width,
      this.__height,
      0,
      0,
      this.__width,
      this.__height,
      gl.COLOR_BUFFER_BIT,
      gl.LINEAR
    )

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(...this.region)

    gl.disable(gl.DEPTH_TEST)
    // Turn this on to debug the geom data buffer.
    // if (this.debugGeomShader)
    // {
    //   gl.screenQuad.bindShader(renderstate)
    //   gl.screenQuad.draw(renderstate, this.__geomDataBuffer)
    // }
    // Turn this on to debug the depth buffer.
    {
      gl.screenQuad.bindShader(renderstate)
      const unit = renderstate.boundTextures++
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, this.depthTexture)
      gl.uniform1i(renderstate.unifs.image.location, unit)
      gl.screenQuad.draw(renderstate)
    }
  }

  /**
   * Draws the Silhouettes around geometries.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawSilhouettes(renderstate) {
    // return

    const gl = this.__renderer.gl

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
    gl.viewport(0, 0, this.__width, this.__height)
    renderstate.boundRendertarget = this.fb[FRAMEBUFFER.MSAA_RENDERBUFFER]
  }

  /**
   * Draws the highlights around geometries.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @private
   */
  drawHighlights(renderstate) {
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
      gl.viewport(...this.region)

      // Turn this on to debug the highlight data buffer.
      // {
      //   gl.screenQuad.bindShader(renderstate)
      //   this.highlightedGeomsBuffer.bindToUniform(renderstate, renderstate.unifs.image)
      //   gl.screenQuad.draw(renderstate)
      // }

      this.highlightsShader.bind(renderstate)
      gl.enable(gl.BLEND)
      gl.blendEquation(gl.FUNC_ADD)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA) // For add

      const unifs = renderstate.unifs
      this.highlightedGeomsBuffer.bindToUniform(renderstate, unifs.highlightDataTexture)
      gl.uniform2f(unifs.highlightDataTextureSize.location, renderstate.region[2], renderstate.region[3])
      this.quad.bindAndDraw(renderstate)

      gl.disable(gl.BLEND)
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

export { GLBaseViewport, FRAMEBUFFER }
