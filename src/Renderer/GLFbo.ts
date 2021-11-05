import { SystemDesc } from '../SystemDesc'
import '../Math/index'
import { GLTexture2D } from './GLTexture2D'
import { BaseEvent } from '../Utilities/BaseEvent'
import { Color } from '../Math/index'

/**
 * This class abstracts the rendering of a collection of geometries to screen.
 */
class GLFbo {
  protected colorTextureResizeEventId: number = -1
  protected __gl: WebGL12RenderingContext
  protected __colorTexture: GLTexture2D
  protected __createDepthTexture: boolean
  protected __clearColor: Color
  protected __depthTexture: WebGLTexture | null = null
  protected __fbo: WebGLFramebuffer | null = null
  protected __prevBoundFbo: WebGLFramebuffer | null = null
  /**
   * Creates a GL Framebuffer Object
   *
   * @param gl - The Canvas 3D Context.
   * @param colorTexture - Represents 2D Texture in GL.
   * @param createDepthTexture - The createDepthTexture value.
   */

  constructor(gl: WebGL12RenderingContext, colorTexture: GLTexture2D, createDepthTexture = false) {
    if (
      SystemDesc.isIOSDevice &&
      gl.name == 'webgl' &&
      (colorTexture.getType() == gl.FLOAT || colorTexture.getType() == gl.HALF_FLOAT)
    ) {
      // So iOS simply refuses to bind anything to a render target except a UNSIGNED_BYTE texture.

      // See the subtle error message here: "floating-point render targets not supported -- this is legal"
      // https://www.khronos.org/registry/webgl/conformance-suites/1.0.2/conformance/extensions/oes-texture-float.html
      console.error('IOS devices are unable to render to float textures.')
    }

    this.__gl = gl
    this.__colorTexture = colorTexture
    this.__createDepthTexture = createDepthTexture
    this.__clearColor = new Color(0, 0, 0, 0)

    if (this.__colorTexture) {
      this.colorTextureResizeEventId = this.__colorTexture.on('resized', (event) => {
        this.resize(this.__colorTexture.width, this.__colorTexture.height, false)
      })
    }

    this.setup()
  }

  /**
   * @private
   * @param event The event object providing the event details
   */
  textureResized(event: BaseEvent): void {
    this.resize(this.__colorTexture.width, this.__colorTexture.height, false)
  }

  /**
   * Sets FBO clear color using RGBA array structure.
   *
   * @param clearColor - The clearColor value.
   */
  setClearColor(clearColor: Color): void {
    this.__clearColor = clearColor
  }

  /**
   * Returns the `width` of the GL Texture
   *
   * @return - The return value.
   */
  getWidth(): number {
    return this.__colorTexture.width
  }

  /**
   * Returns the `height` of the GL Texture
   *
   * @return - The return value.
   */
  getHeight(): number {
    return this.__colorTexture.height
  }

  /**
   * Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.
   *
   * @return - The return value.
   */
  getSize(): Array<number> {
    return [this.__colorTexture.width, this.__colorTexture.height]
  }

  /**
   * Returns the ColorTexture of the Fbo
   *
   * @return - The return value.
   */
  getColorTexture(): GLTexture2D {
    return this.__colorTexture
  }

  /**
   * Returns the value of the deptTexture property.
   *
   * @return - The return value.
   */
  getDepthTextureGL(): WebGLTexture | null {
    return this.__depthTexture
  }

  /**
   * Returns the `width` of the GL Texture
   *
   * @return - width of GLTexture
   */
  get width(): number {
    return this.__colorTexture.width
  }

  /**
   * Returns the `height` of the GL Texture
   *
   * @return - height of GLTexture
   */
  get height(): number {
    return this.__colorTexture.height
  }

  /**
   * Returns the [width, height] of the GL Texture.
   *
   * @return - returns [width, height] of the __colorTexture
   */
  get size(): Array<number> {
    return [this.__colorTexture.width, this.__colorTexture.height]
  }

  /**
   * Returns the ColorTexture of the Fbo
   *
   * @returns {GLTexture2D} - returns this.__colorTexture
   */
  get colorTexture(): GLTexture2D {
    return this.__colorTexture
  }

  /**
   * Sets ColorTexture of the Fbo.
   *
   * @param colorTexture - The colorTexture value.
   */
  setColorTexture(colorTexture: GLTexture2D): void {
    const gl = this.__gl
    this.__colorTexture = colorTexture
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0)
  }

  /**
   * Returns the value of the depthTexture property.
   *
   * @return
   */
  get depthTextureGL(): WebGLTexture | null {
    return this.__depthTexture
  }

  /**
   * The setup method.
   */
  setup(): void {
    const gl = this.__gl

    this.__fbo = gl.createFramebuffer()
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.__fbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo)

    // TODO: Migrate to using GLRenderTarget... This system is a mess.
    // if(gl.name == 'webgl2'){
    //     if (this.__colorTexture && this.__colorTexture.getType() == 'FLOAT' && this.__colorTexture.getFilter() == 'LINEAR') {
    //         if (!gl.__ext_float_linear)
    //             throw ("Unable to use filtering on floating point textures");
    //     }
    // }
    // else {
    //     if (this.__colorTexture.getType() == 'FLOAT') {
    //         if(gl.__ext_float){
    //             if (this.__colorTexture.getFilter() == 'LINEAR') {
    //                 if (!gl.__ext_float_linear)
    //                     throw ("Unable to use filtering on floating point textures");
    //             }
    //         }
    //         else if(gl.__ext_half_float){
    //             if (this.__colorTexture.getFilter() == 'LINEAR') {
    //                 if (!gl.__ext_texture_half_float_linear)
    //                     throw ("Unable to use filtering on half-floating point textures");
    //             }
    //         }
    //         else{
    //             throw("floating point textures unsupported.");
    //         }
    //     }
    // }

    if (this.__colorTexture) {
      if (gl.name == 'webgl2')
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0)
      else gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0)
    }

    // Create the depth texture
    if (this.__createDepthTexture) {
      if (gl.name != 'webgl2' && !gl.__ext_WEBGL_depth_texture) {
        // Create the depth buffer
        const depthBuffer = gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height)
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer)
      } else {
        gl.activeTexture(gl.TEXTURE0)
        this.__depthTexture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture)
        // TODO: Copy params from the color image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        if (gl.name == 'webgl2') {
          // the proper texture format combination can be found here
          // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
          // https://github.com/WebGLSamples/WebGL2Samples/blob/master/samples/fbo_rtt_depth_texture.html
          // gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT16, this.width, this.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.DEPTH_COMPONENT24,
            this.width,
            this.height,
            0,
            gl.DEPTH_COMPONENT,
            gl.UNSIGNED_INT,
            null
          )
          gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.__depthTexture, 0)
        } else {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.DEPTH_COMPONENT,
            this.width,
            this.height,
            0,
            gl.DEPTH_COMPONENT,
            gl.UNSIGNED_INT,
            null
          )
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.__depthTexture, 0)
        }
      }
    }

    this.__checkFramebuffer()

    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  /**
   * Triggered Automatically when the texture resizes.
   *
   * @todo: Fbos should manage the textures assigned to them.
   * E.g. resizing and preserving data.
   */
  resize(width: number, height: number, resizeTexture: any): void {
    const gl = this.__gl

    if (resizeTexture) {
      this.__colorTexture.resize(width, height, false, false)
    }

    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.__fbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo)

    // The color texture is destoryed and re-created when it is resized,
    // so we must re-bind it here.
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.__colorTexture.glTex, 0)
    if (this.__depthTexture) {
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, this.__depthTexture)
      if (gl.name == 'webgl2') {
        // the proper texture format combination can be found here
        // https://www.khronos.org/registry/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.DEPTH_COMPONENT24,
          this.width,
          this.height,
          0,
          gl.DEPTH_COMPONENT,
          gl.UNSIGNED_INT,
          null
        )
      } else {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.DEPTH_COMPONENT,
          this.width,
          this.height,
          0,
          gl.DEPTH_COMPONENT,
          gl.UNSIGNED_INT,
          null
        )
      }
    }
    this.__checkFramebuffer()
  }

  /**
   * The __checkFramebuffer method.
   * @private
   */
  __checkFramebuffer(): void {
    const gl = this.__gl

    let check
    if (gl.name == 'webgl2') check = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER)
    else check = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
    if (check !== gl.FRAMEBUFFER_COMPLETE) {
      gl.bindTexture(gl.TEXTURE_2D, null)
      if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
      else gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      console.warn(
        'Error creating Fbo width:',
        this.width,
        ', height:',
        this.height,
        ' Texture Type:',
        this.__colorTexture.getType()
      )
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

  /**
   * Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.
   *
   * @param renderstate - The renderstate value.
   */
  bindForWriting(renderstate?: RenderState): void {
    if (renderstate) {
      this.__prevBoundFbo = renderstate.boundRendertarget
      renderstate.boundRendertarget = this.__fbo
    }
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.__fbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo)
    gl.viewport(0, 0, this.width, this.height) // Match the viewport to the texture size
  }

  /**
   * Unbinds the Fbo to the canvas context for WRITE operations.
   *
   * @param renderstate - The renderstate value.
   */
  unbindForWriting(renderstate: RenderState): void {
    if (renderstate) renderstate.boundRendertarget = this.__prevBoundFbo
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.__prevBoundFbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__prevBoundFbo)
  }

  /**
   * Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.
   *
   * @param renderstate - The renderstate value.
   */
  bind(renderstate?: RenderState): void {
    this.bindForWriting(renderstate)
  }

  /**
   * Unbinds the Fbo to the canvas context for WRITE operations.
   *
   * @param renderstate - The renderstate value.
   */
  unbind(renderstate?: RenderState): void {
    if (renderstate) {
      // For write operations
      this.unbindForWriting(renderstate)
    } else {
      const gl = this.__gl
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }
  }
  /**
   * Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo.
   *
   * @param renderstate - The renderstate value.
   */
  bindForReading(renderstate?: RenderState): void {
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.__fbo)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, this.__fbo)
  }

  /**
   * Unbinds the Fbo to the canvas context for READ operations.
   *
   * @param renderstate - The renderstate value.
   */
  unbindForReading(): void {
    const gl = this.__gl
    if (gl.name == 'webgl2') gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null)
    else gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  }

  /**
   * Enables all color components of the rendering context of the Fbo,
   * specifying the default color values when clearing color buffers and clears the buffers to preset values.
   */
  clear(): void {
    const gl = this.__gl
    gl.colorMask(true, true, true, true)
    const col = this.__clearColor.asArray()
    gl.clearColor(col[0], col[1], col[2], col[3])
    if (this.__createDepthTexture) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    } else {
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
  }

  /**
   * Runs [`bind`](#bind) then [`clear`](#clear) methods.
   * @param renderstate - The renderstate value.
   */
  bindAndClear(renderstate?: RenderState): void {
    this.bind(renderstate)
    this.clear()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    const gl = this.__gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.deleteFramebuffer(this.__fbo)
    this.__fbo = null
    this.__colorTexture.removeListenerById('resized', this.colorTextureResizeEventId)
  }
}

export { GLFbo }
