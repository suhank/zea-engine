import { GLTexture2D } from './GLTexture2D'
import { UnpackHDRShader } from './Shaders/UnpackHDRShader'
import { GLFbo } from './GLFbo'
import { generateShaderGeomBinding, IGeomShaderBinding } from './Drawing/GeomShaderBinding'
import { VLHImage } from '../SceneTree/Images/VLHImage'
import { Color } from '../Math/Color'
import { BaseImage } from '../SceneTree/BaseImage'
import { GLShader } from './GLShader'

/** Class representing a GL high dynamic range (HDR) image.
 * @extends GLTexture2D
 * @private
 */
class GLHDRImage extends GLTexture2D {
  //  protected __gl: WebGL12RenderingContext
  protected listenerIDs: Record<string, number> = {}
  protected hdrImage: VLHImage
  protected fbo: GLFbo | null = null
  protected srcLDRTex: GLTexture2D | null = null
  protected srcCDMTex: GLTexture2D | null = null
  protected unpackHDRShader: GLShader | null = null
  protected shaderBinding: IGeomShaderBinding | null = null

  /**
   * Create a GL HDR image.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {VLHImage} hdrImage - The HDR image.
   */
  constructor(gl: WebGL12RenderingContext, hdrImage: VLHImage) {
    super(gl)

    this.hdrImage = hdrImage
    this.hdrImage.setMetadata('gltexture', this)
    const loadImage = () => {
      this.__unpackHDRImage(this.hdrImage.getParams())
    }
    this.listenerIDs['updated'] = this.hdrImage.on('updated', loadImage)
    if (this.hdrImage.isLoaded()) {
      loadImage()
    } else {
      this.listenerIDs['loaded'] = this.hdrImage.on('loaded', loadImage)
    }
  }

  /**
   * Returns the `BaseImage` of the GL Texture
   *
   * @return {BaseImage} - The return value.
   */
  getImage(): BaseImage {
    return this.hdrImage
  }

  /**
   * The __unpackHDRImage method.
   * @param {Record<any,any>} hdrImageParams - The HDR image parameters.
   * @private
   */
  __unpackHDRImage(hdrImageParams: Record<string, any>): void {
    const gl = this.__gl

    const ldr = hdrImageParams.data.ldr
    const cdm = hdrImageParams.data.cdm

    if (!this.fbo) {
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
      this.fbo = new GLFbo(this.__gl, this)
      this.fbo.setClearColor(new Color(0, 0, 0, 0))

      this.srcLDRTex = new GLTexture2D(this.__gl, {
        format: 'RGB',
        type: 'UNSIGNED_BYTE',
        width: ldr.width,
        height: ldr.height,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: ldr,
      })
      this.srcCDMTex = new GLTexture2D(this.__gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
        type: 'UNSIGNED_BYTE',
        width: ldr.width /* 8*/,
        height: ldr.height /* 8*/,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: cdm,
      })

      this.unpackHDRShader = new UnpackHDRShader(this.__gl)
      const shaderComp = this.unpackHDRShader.compileForTarget('GLHDRImage', { directives: ['#define ENABLE_ES3'] })
      this.shaderBinding = generateShaderGeomBinding(
        this.__gl,
        shaderComp.attrs,
        gl.__quadattrbuffers,
        gl.__quadIndexBuffer
      )
    } else {
      this.srcLDRTex!.bufferData(ldr)
      this.srcCDMTex!.bufferData(cdm)
    }

    this.fbo.bindAndClear()

    const renderstate: RenderState = <RenderState>{}
    this.unpackHDRShader!.bind(renderstate, 'GLHDRImage')
    this.shaderBinding!.bind(renderstate)

    const unifs = renderstate.unifs
    this.srcLDRTex!.bindToUniform(renderstate, unifs.ldrSampler)
    this.srcCDMTex!.bindToUniform(renderstate, unifs.cdmSampler)

    gl.uniform4fv(unifs.srcRegion.location, [0, 0, 1, 1])
    gl.drawQuad()

    // // Debug a block of pixels.
    // console.log(this.hdrImage.getName());
    // gl.finish();
    // let numPixels = 4;
    // let pixels = new Float32Array(4 * numPixels);
    // gl.readPixels(ldr.width / 4, ldr.height/4, numPixels, 1, gl.RGBA, gl.FLOAT, pixels);
    // console.log(pixels);
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.fbo.unbind()

    // if (!this.hdrImage.isStream()) {
    //     this.fbo.destroy();
    //     this.srcLDRTex.destroy();
    //     this.srcCDMTex.destroy();
    //     this.fbo = null;
    //     this.srcLDRTex = null;
    //     this.srcCDMTex = null;
    // }

    this.emit('updated')
  }

  /**
   * The bindToUniform method.
   * @param {RenderState} renderstate - The object tracking the current state of the renderer
   * @param {Uniform} unif - The WebGL uniform
   * @param {Record<any,any>} bindings - The bindings value.
   * @return {boolean} - The return value.
   */
  bindToUniform(renderstate: RenderState, unif: Uniform, bindings?: Record<string, any>): boolean {
    return super.bindToUniform(renderstate, unif, bindings)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    super.destroy()
    if (this.fbo) {
      this.fbo.destroy()
      this.srcLDRTex!.destroy()
      this.srcCDMTex!.destroy()
    }
    if (this.unpackHDRShader) this.unpackHDRShader.destroy()
    if (this.shaderBinding) this.shaderBinding.destroy()

    if ('loaded' in this.listenerIDs) this.hdrImage.removeListenerById('loaded', this.listenerIDs['loaded'])
    this.hdrImage.removeListenerById('updated', this.listenerIDs['updated'])
  }
}

export { GLHDRImage }
