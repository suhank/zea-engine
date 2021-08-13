import { EventEmitter } from '../Utilities/index'
import { SystemDesc } from '../SystemDesc'
import { PreComputeBRDFShader } from './Shaders/PreComputeBRDFShader'
import { ConvolveIrradianceShader } from './Shaders/ConvolveIrradianceShader'
import { ConvolveSpecularShader } from './Shaders/ConvolveSpecularShader'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'

/** Class representing a GL probe.
 * @private
 */
class GLProbe extends EventEmitter {
  protected __gl: WebGL12RenderingContext
  // protected gl: Record<any,any>// to allow easier refactoring later

  protected maxFragmentShaderTextureUnits: any
  protected textureType: number
  protected textureDesc: number[]
  protected __convolved: boolean
  protected __fbos: any[]
  protected brdfLUTTexture: any
  protected irradianceCubeTex: any
  protected specularCubetex: any
  /**
   * Create a GL probe.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   * @param {string} name - The name value.
   */
  constructor(gl: WebGL12RenderingContext, name: string) {
    super()
    this.__gl = gl
    const gl_casted: Record<any, any> = gl

    this.maxFragmentShaderTextureUnits = gl.getParameter(this.__gl.MAX_TEXTURE_IMAGE_UNITS)

    if (!gl_casted.__quadVertexIdsBuffer) gl_casted.setupInstancedQuad()

    this.textureType = 1 // Default 2d 8 bit texture image texture.
    this.textureDesc = [0, 0, 0, 0] // To be populated by derived classes.

    this.__convolved = false
    this.__fbos = []
  }

  /**
   * The convolveProbe method.
   * @param {any} srcGLTex - The srcGLTex value.
   */
  convolveProbe(srcGLTex: any) {
    const gl = this.__gl

    const renderstate: RenderState = {
      shaderopts: { directives: ['#define ENABLE_ES3', '#define ENABLE_FLOAT_TEXTURES'] },
    }

    // Note: in testing we are running on the Google SwiftShader emulated GPU.
    if (SystemDesc.deviceCategory == 'Low') {
      renderstate.shaderopts.directives.push('#define SAMPLE_DELTA 0.1')
      renderstate.shaderopts.directives.push('#define SAMPLE_COUNT 64u')
    } else if (SystemDesc.deviceCategory == 'Medium') {
      renderstate.shaderopts.directives.push('#define SAMPLE_DELTA 0.08')
      renderstate.shaderopts.directives.push('#define SAMPLE_COUNT 256u')
    } else {
      renderstate.shaderopts.directives.push('#define SAMPLE_DELTA 0.025')
      renderstate.shaderopts.directives.push('#define SAMPLE_COUNT 1024u')
    }

    this.brdfLUTTexture = gl.createTexture()

    // pre-allocate enough memory for the LUT texture.
    gl.bindTexture(gl.TEXTURE_2D, this.brdfLUTTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG16F, 512, 512, 0, gl.RG, gl.FLOAT, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const brdfShader = new PreComputeBRDFShader(this.__gl)
    const brdfShaderComp = brdfShader.compileForTarget('GLProbe', renderstate.shaderopts)
    const brdfShaderBinding = generateShaderGeomBinding(
      this.__gl,
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

    // ////////////////////////////////////////////
    // ConvolveIrradianceShader Shader

    {
      const convolveIrradianceShader = new ConvolveIrradianceShader(this.__gl)
      const convolveIrradianceShaderComp = convolveIrradianceShader.compileForTarget('GLProbe', renderstate.shaderopts)
      const convolveIrradianceShaderBinding = generateShaderGeomBinding(
        this.__gl,
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
      const size = 64
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
      const convolverShader = new ConvolveSpecularShader(this.__gl)
      const covolverShaderComp = convolverShader.compileForTarget('GLProbe', renderstate.shaderopts)
      const covolverShaderBinding = generateShaderGeomBinding(
        this.__gl,
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
      const size = 256
      for (let i = 0; i < 6; i++) {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA32F, size, size, 0, gl.RGBA, gl.FLOAT, null)
      }
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
      // gl.enable(gl.TEXTURE_CUBE_MAP_SEAMLESS) // not supported in webgl

      const maxMipLevels = 5
      for (let mip = 0; mip < maxMipLevels; ++mip) {
        // resize framebuffer according to mip-level size.
        const mipWidth = size * Math.pow(0.5, mip)
        const mipHeight = size * Math.pow(0.5, mip)

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
   * @param {WebGLUniformLocation} unif - The WebGL uniform
   * @return {boolean} - Returns true if the Probe was successfully bound.
   */
  bind(renderstate: RenderState) {
    const gl = this.__gl
    const { irradianceMap, prefilterMap, brdfLUT } = renderstate.unifs

    if (!this.__convolved) {
      // By default, all the texture units are bound to unit:0
      // So if a shader contains cube maps, and they are left on unit 0
      // and also the shader contains regular textures, and they are also left on unit 0
      // then we get errors saying:
      // GL_INVALID_OPERATION: Two textures of different types use the same sampler location.
      // So bind to an unused texture unit...
      if (irradianceMap) {
        gl.uniform1i(irradianceMap.location, this.maxFragmentShaderTextureUnits - 1)
      }
      if (prefilterMap) {
        gl.uniform1i(prefilterMap.location, this.maxFragmentShaderTextureUnits - 1)
      }
      return false
    }

    // Note: a cube map can never be bound to texture unit 0.
    // This is because if any other samplers are left unbound
    // (e.g. a diffuse sampler left unbound because no diffuse texture is assigned)
    // then the texture unit binding defaults to 0.
    // If the cube map is then bound to unit 0, then we get the error message:
    // GL_INVALID_OPERATION: Two textures of different types use the same sampler location.
    // Ths simple workaround here is to bind the BRDF Lut first, which is a TEXTURE_2D, and the cube maps
    // to other units:(1 & 2).
    // This error started occuring when we moved PBR binding to the shader instead of in the renderer.
    // See: StandardSurfaceShader.bind
    if (brdfLUT) {
      const unit = renderstate.boundTextures++
      gl.activeTexture(this.__gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, this.brdfLUTTexture)
      gl.uniform1i(brdfLUT.location, unit)
    }
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
    return true
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
