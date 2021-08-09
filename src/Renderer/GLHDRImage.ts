import { GLTexture2D } from './GLTexture2D'
import { UnpackHDRShader } from './Shaders/UnpackHDRShader'
import { GLFbo } from './GLFbo'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'
import { VLHImage } from '../SceneTree/Images/VLHImage'
import { BaseEvent } from '../Utilities/BaseEvent'

/** Class representing a GL high dynamic range (HDR) image.
 * @extends GLTexture2D
 * @private
 */
class GLHDRImage extends GLTexture2D {
  protected __gl: WebGL12RenderingContext
  protected __hdrImage: VLHImage
  protected __fbo: any
  protected __srcLDRTex: any
  protected __unpackHDRShader: any
  protected __shaderBinding: any
  protected __srcCDMTex: any
  /**
   * Create a GL HDR image.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {VLHImage} hdrImage - The HDR image.
   */
  constructor(gl: WebGL12RenderingContext, hdrImage: VLHImage) {
    super(gl)

    this.__hdrImage = hdrImage
    this.__hdrImage.setMetadata('gltexture', this)
    const loadImage = () => {
      this.__unpackHDRImage(this.__hdrImage.getParams())
    }
    this.__hdrImage.on('updated', loadImage)
    if (this.__hdrImage.isLoaded()) {
      loadImage()
    } else {
      this.__hdrImage.on('loaded', loadImage)
    }
  }

  /**
   * Returns the `BaseImage` of the GL Texture
   *
   * @return {BaseImage} - The return value.
   */
  getImage() {
    return this.__hdrImage
  }

  /**
   * The __unpackHDRImage method.
   * @param {Record<any,any>} hdrImageParams - The HDR image parameters.
   * @private
   */
  __unpackHDRImage(hdrImageParams: Record<any,any>) {
    const gl = <Record<any, any>>this.__gl

    const ldr = hdrImageParams.data.ldr
    const cdm = hdrImageParams.data.cdm

    if (!this.__fbo) {
      // Note: iOS devices create FLOAT Fbox.
      // If we want better quality, we could unpack the texture in JavaScript.
      this.configure({
        format: 'RGBA',
        type: 'FLOAT',
        width: ldr.width,
        height: ldr.height,
        filter: 'LINEAR',
        wrap: 'CLAMP_TO_EDGE',
      })
      this.__fbo = new GLFbo(this.__gl, this)
      this.__fbo.setClearColor([0, 0, 0, 0])

      this.__srcLDRTex = new GLTexture2D(this.__gl, {
        format: 'RGB',
        type: 'UNSIGNED_BYTE',
        width: ldr.width,
        height: ldr.height,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: ldr,
      })
      this.__srcCDMTex = new GLTexture2D(this.__gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
        type: 'UNSIGNED_BYTE',
        width: ldr.width /* 8*/,
        height: ldr.height /* 8*/,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: cdm,
      })

      this.__unpackHDRShader = new UnpackHDRShader(this.__gl)
      const shaderComp = this.__unpackHDRShader.compileForTarget('GLHDRImage')
      this.__shaderBinding = generateShaderGeomBinding(this.__gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer)
    } else {
      this.__srcLDRTex.bufferData(ldr)
      this.__srcCDMTex.bufferData(cdm)
    }

    this.__fbo.bindAndClear()

    const renderstate:Record<any,any> = {}
    this.__unpackHDRShader.bind(renderstate, 'GLHDRImage')
    this.__shaderBinding.bind(renderstate)

    const unifs = renderstate.unifs
    this.__srcLDRTex.bindToUniform(renderstate, unifs.ldrSampler)
    this.__srcCDMTex.bindToUniform(renderstate, unifs.cdmSampler)

    gl.uniform4fv(unifs.srcRegion.location, [0, 0, 1, 1])
    gl.drawQuad()

    // // Debug a block of pixels.
    // console.log(this.__hdrImage.getName());
    // gl.finish();
    // let numPixels = 4;
    // let pixels = new Float32Array(4 * numPixels);
    // gl.readPixels(ldr.width / 4, ldr.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
    // console.log(pixels);
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.__fbo.unbind()

    // if (!this.__hdrImage.isStream()) {
    //     this.__fbo.destroy();
    //     this.__srcLDRTex.destroy();
    //     this.__srcCDMTex.destroy();
    //     this.__fbo = null;
    //     this.__srcLDRTex = null;
    //     this.__srcCDMTex = null;
    // }

    this.emit('updated')
  }

  /**
   * The bindToUniform method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   * @param {WebGLUniformLocation} unif - The WebGL uniform
   * @param {Record<any,any>} bindings - The bindings value.
   * @return {boolean} - The return value.
   */
  bindToUniform(renderstate: Record<any,any>, unif: WebGLUniformLocation, bindings: Record<any,any>) {
    return super.bindToUniform(renderstate, unif, bindings)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    if (this.__fbo) {
      this.__fbo.destroy()
      this.__srcLDRTex.destroy()
      this.__srcCDMTex.destroy()
    }
    if (this.__unpackHDRShader) this.__unpackHDRShader.destroy()
    if (this.__shaderBinding) this.__shaderBinding.destroy()

    this.__hdrImage.loaded.disconnectScope(this) // TODO: works because of 'any' these functions don't exist
    this.__hdrImage.updated.disconnectScope(this)
  }
}

export { GLHDRImage }
