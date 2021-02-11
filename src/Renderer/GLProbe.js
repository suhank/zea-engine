import { EventEmitter } from '../Utilities/index'
import { PreComputeBRDFShader } from './Shaders/PreComputeBRDFShader.js'
import { ConvolveIrradianceShader } from './Shaders/ConvolveIrradianceShader.js'
import { ConvolveSpecularShader } from './Shaders/ConvolveSpecularShader.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'
import { EnvMapMapping } from '../SceneTree/Images/EnvMap.js'

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

    const renderstate = { shaderopts: { directives: ['#define ENABLE_ES3', '#define ENABLE_FLOAT_TEXTURES'] } }

    this.brdfLUTTexture = gl.createTexture()

    // pre-allocate enough memory for the LUT texture.
    gl.bindTexture(gl.TEXTURE_2D, this.brdfLUTTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, 512, 512, 0, gl.RG, gl.FLOAT, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const brdfShader = new PreComputeBRDFShader(gl)
    const brdfShaderComp = brdfShader.compileForTarget('GLProbe', renderstate.shaderopts)
    const brdfShaderBinding = generateShaderGeomBinding(
      gl,
      brdfShaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    const brdfFboId = gl.createFramebuffer()
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, brdfFboId)
    gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.brdfLUTTexture, 0)

    brdfShader.bind(renderstate)
    brdfShaderBinding.bind(renderstate)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.viewport(0, 0, 512, 512)
    gl.drawQuad()

    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    gl.deleteFramebuffer(brdfFboId)

    brdfShader.unbind(renderstate)
    brdfShader.destroy()

    // Tell the convolve shader that the input is a cubmap, instead of octahedral.
    if (srcGLTex.getTexture().mapping == EnvMapMapping.CUBE) {
      renderstate.shaderopts.directives.push('#define ENVMAP_CUBE')
    }

    // ////////////////////////////////////////////
    // ConvolveIrradianceShader Shader

    {
      const convolveIrradianceShader = new ConvolveIrradianceShader(gl)
      const convolveIrradianceShaderComp = convolveIrradianceShader.compileForTarget('GLProbe', renderstate.shaderopts)
      const convolveIrradianceShaderBinding = generateShaderGeomBinding(
        gl,
        convolveIrradianceShaderComp.attrs,
        gl.__quadattrbuffers,
        gl.__quadIndexBuffer
      )

      convolveIrradianceShader.bind(renderstate, 'GLProbe')
      convolveIrradianceShaderBinding.bind(renderstate)
      const unifs = renderstate.unifs

      srcGLTex.bindToUniform(renderstate, unifs.envMap)

      // ////////////////////////////////////////////
      // Irradiance Cube
      const size = 32
      this.irradianceCubeTex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.irradianceCubeTex)

      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE)

      // Resize all the faces first.
      for (let i = 0; i < 6; i++) {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA32F, size, size, 0, gl.RGBA, gl.FLOAT, null)
      }

      // Attach one face of cube map
      const irradianceFboId = gl.createFramebuffer()
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, irradianceFboId)

      for (let i = 0; i < 6; ++i) {
        gl.uniform1i(unifs.faceId.location, i)
        gl.framebufferTexture2D(
          gl.DRAW_FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          this.irradianceCubeTex,
          0
        )
        gl.viewport(0, 0, size, size) // Match the viewport to the texture size
        gl.clearColor(1, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.drawQuad()
      }
      gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
      gl.deleteFramebuffer(irradianceFboId)

      // Note: without the mipmaps, te cube sampling seems a big broken.
      // No colors.
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
    }

    // ////////////////////////////////////////////
    // Specular Cube Pyramid
    {
      const convolverShader = new ConvolveSpecularShader(gl)
      const covolverShaderComp = convolverShader.compileForTarget('GLProbe', renderstate.shaderopts)
      const covolverShaderBinding = generateShaderGeomBinding(
        gl,
        covolverShaderComp.attrs,
        gl.__quadattrbuffers,
        gl.__quadIndexBuffer
      )

      convolverShader.bind(renderstate, 'GLProbe')
      covolverShaderBinding.bind(renderstate)
      const unifs = renderstate.unifs

      srcGLTex.bindToUniform(renderstate, unifs.envMap)

      this.specularCubetex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.specularCubetex)

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
            gl.DRAW_FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
            this.specularCubetex,
            mip
          )
          gl.drawQuad()
        }
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
        gl.deleteFramebuffer(fboId)
      }
      convolverShader.destroy()
    }

    this.__convolved = true
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {any} unif - The unif value.
   */
  bind(renderstate) {
    const gl = this.__gl
    const { irradianceMap, prefilterMap, brdfLUT, envMap } = renderstate.unifs
    if (irradianceMap) {
      const unit = renderstate.boundTextures++
      const texId = this.__gl.TEXTURE0 + unit
      gl.activeTexture(texId)
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.irradianceCubeTex)
      gl.uniform1i(irradianceMap.location, unit)
    }
    if (prefilterMap) {
      const unit = renderstate.boundTextures++
      const texId = this.__gl.TEXTURE0 + unit
      gl.activeTexture(texId)
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.specularCubetex)
      gl.uniform1i(prefilterMap.location, unit)
    }
    if (brdfLUT) {
      const unit = renderstate.boundTextures++
      gl.activeTexture(this.__gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, this.brdfLUTTexture)
      gl.uniform1i(brdfLUT.location, unit)
    }
    // if (shCoeffs) {
    //   // TODO: setup a Uniform buffer object.
    //   gl.uniform3fv(shCoeffs.location, this.__envMap.luminanceData.shCoeffs)
    // }

    if (envMap) {
      this.__srcGLTex.bindToUniform(renderstate, envMap)
    }
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
