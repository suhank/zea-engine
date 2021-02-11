import { EventEmitter } from '../Utilities/index'
import { hammersley } from './hammersley.js'
import { GLTexture2D } from './GLTexture2D.js'
import { GLImageAtlas } from './GLImageAtlas.js'
import { PreComputeBRDFShader } from './Shaders/PreComputeBRDFShader.js'
import { ConvolverShader } from './Shaders/ConvolverShader.js'
import { GLFbo } from './GLFbo.js'
import { ImagePyramid } from './ImagePyramid.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'

/** Class representing a GL probe.
 * @private
 */
class GLProbe extends EventEmitter {
  /**
   * Create a GL probe.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   * @param {string} name - The name value.
   */
  constructor(gl, name) {
    super()
    this.__gl = gl

    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    this.textureType = 1 // Default 2d 8 bit texture image texture.
    this.textureDesc = [0, 0, 0, 0] // To be populated by derived classes.

    this.__convolved = false
    this.__fbos = []
  }

  /**
   * The convolveProbe method.
   * @param {any} srcGLTex - The srcGLTex value.
   */
  convolveProbe(srcGLTex) {
    const gl = this.__gl

    this.brdfLUTTexture = gl.createTexture()

    // pre-allocate enough memory for the LUT texture.
    gl.bindTexture(gl.TEXTURE_2D, this.brdfLUTTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, 512, 512, 0, gl.RG, gl.FLOAT, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const brdfShader = new PreComputeBRDFShader(gl)
    const brdfShaderComp = brdfShader.compileForTarget('GLProbe', gl.shaderopts)
    const brdfShaderBinding = generateShaderGeomBinding(
      gl,
      brdfShaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    const fboId = gl.createFramebuffer()
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fboId)
    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.brdfLUTTexture, 0)

    const renderstate = {}
    brdfShader.bind(renderstate)
    brdfShaderBinding.bind(renderstate)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, 512, 512)
    gl.drawQuad()

    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    gl.deleteFramebuffer(fboId)

    brdfShader.unbind(renderstate)
    brdfShader.destroy()

    // ////////////////////////////////////////////
    //

    this.glcubetex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glcubetex)

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE)

    // Resize all the faces first.
    for (let i = 0; i < 6; i++) {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA32F, 128, 128, 0, gl.RGBA, gl.FLOAT, null)
    }
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
    // gl.enable(gl.TEXTURE_CUBE_MAP_SEAMLESS) // not supported in webgl

    const convolverShader = new ConvolverShader(gl)
    const covolverShaderComp = convolverShader.compileForTarget('GLProbe', gl.shaderopts)
    const covolverShaderBinding = generateShaderGeomBinding(
      gl,
      covolverShaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    convolverShader.bind(renderstate, 'GLProbe')
    covolverShaderBinding.bind(renderstate)
    const unifs = renderstate.unifs

    srcGLTex.bindToUniform(renderstate, unifs.octMap)

    const maxMipLevels = 5
    for (let mip = 0; mip < maxMipLevels; ++mip) {
      // resize framebuffer according to mip-level size.
      const mipWidth = 128 * Math.pow(0.5, mip)
      const mipHeight = 128 * Math.pow(0.5, mip)

      // Attach one face of cube map
      const fboId = gl.createFramebuffer()
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fboId)
      gl.viewport(0, 0, mipWidth, mipHeight) // Match the viewport to the texture size

      const roughness = mip / (maxMipLevels - 1)
      gl.uniform1f(unifs.roughness.location, roughness)
      for (let i = 0; i < 6; ++i) {
        gl.uniform1i(unifs.faceId.location, i)
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          this.glcubetex,
          mip
        )

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawQuad()
      }

      gl.deleteFramebuffer(fboId)
    }
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)

    this.__convolved = true
    convolverShader.destroy()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    // super.destroy()
  }
}

export { GLProbe }
