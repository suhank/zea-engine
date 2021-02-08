import { GLTexture2D } from './GLTexture2D.js'
import { UnpackHDRShader } from './Shaders/UnpackHDRShader.js'
import { GLFbo } from './GLFbo.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'
import { RefCounted } from '../SceneTree/index'

/** Class representing a GL high dynamic range (HDR) image.
 * @extends GLTexture2D
 * @private
 */
class GLHDRCubeMap extends RefCounted {
  /**
   * Create a GL HDR image.
   * @param {any} gl - The gl value.
   * @param {any} hdrImage - The HDR image.
   */
  constructor(gl, hdrImage) {
    super()
    this.__gl = gl

    this.faces = []

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
   * The __unpackHDRImage method.
   * @param {any} hdrImageParams - The HDR image parameters.
   * @private
   */
  __unpackHDRImage(hdrImageParams) {
    const gl = this.__gl

    const ldr = hdrImageParams.data.ldr
    const cdm = hdrImageParams.data.cdm

    if (!this.ldrTex) {
      // Note: iOS devices create FLOAT Fbox.
      // If we want better quality, we could unpack the texture in JavaScript.

      this.ldrTex = new GLTexture2D(gl, {
        format: 'RGB',
        type: 'UNSIGNED_BYTE',
        width: ldr.width,
        height: ldr.height,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: ldr,
      })
      this.cdmTex = new GLTexture2D(gl, {
        format: gl.name == 'webgl2' ? 'RED' : 'ALPHA',
        type: 'UNSIGNED_BYTE',
        width: ldr.width /* 8*/,
        height: ldr.height /* 8*/,
        filter: 'NEAREST',
        mipMapped: false,
        wrap: 'CLAMP_TO_EDGE',
        data: cdm,
      })

      this.unpackHDRShader = new UnpackHDRShader(gl)
      const shaderComp = this.unpackHDRShader.compileForTarget('GLHDRCubeMap')
      this.shaderBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer)
    } else {
      this.ldrTex.bufferData(ldr)
      this.cdmTex.bufferData(cdm)
    }

    this.gltex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.gltex)

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE)

    const faceSizeX = ldr.width / 3
    const faceSizeY = ldr.height / 2

    // Resize all the faces first.
    for (let i = 0; i < 6; i++) {
      gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA32F, faceSizeX, faceSizeY, 0, gl.RGBA, gl.FLOAT, null)
    }

    const renderstate = { boundTextures: 0 }
    this.unpackHDRShader.bind(renderstate, 'GLHDRCubeMap')
    this.shaderBinding.bind(renderstate)

    const unifs = renderstate.unifs
    this.ldrTex.bindToUniform(renderstate, unifs.ldrSampler)
    this.cdmTex.bindToUniform(renderstate, unifs.cdmSampler)

    // Attach one face of cube map
    const fboId = gl.createFramebuffer()
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fboId)

    for (let i = 0; i < 6; i++) {
      let cubeFace = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i
      if (cubeFace == gl.TEXTURE_CUBE_MAP_POSITIVE_Y) cubeFace = gl.TEXTURE_CUBE_MAP_NEGATIVE_Y
      else if (cubeFace == gl.TEXTURE_CUBE_MAP_NEGATIVE_Y) cubeFace = gl.TEXTURE_CUBE_MAP_POSITIVE_Y

      gl.viewport(0, 0, faceSizeX, faceSizeY) // Match the viewport to the texture size
      gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, cubeFace, this.gltex, 0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      const region = [
        ((i % 3) * faceSizeX) / ldr.width,
        (Math.floor(i / 3) * faceSizeY) / ldr.height,
        faceSizeX / ldr.width,
        faceSizeY / ldr.height,
      ]
      gl.uniform4fv(unifs.srcRegion.location, region)
      gl.drawQuad()
    }

    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    gl.deleteFramebuffer(fboId)

    this.ldrTex.destroy()
    this.cdmTex.destroy()

    this.emit('updated', {})
  }

  /**
   * The bindToUniform method.
   * @param {any} renderstate - The renderstate value.
   * @param {any} unif - The unif value.
   * @param {any} bindings - The bindings value.
   * @return {any} - The return value.
   */
  bindToUniform(renderstate, unif, bindings) {
    if (!this.gltex) {
      return false
    }

    const unit = renderstate.boundTextures++
    const texId = this.__gl.TEXTURE0 + unit
    const gl = this.__gl
    gl.activeTexture(texId)
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.gltex)
    gl.uniform1i(unif.location, unit)

    return true
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    if (this.__fbo) {
      this.__fbo.destroy()
      this.ldrTex.destroy()
      this.cdmTex.destroy()
    }
    if (this.unpackHDRShader) this.unpackHDRShader.destroy()
    if (this.shaderBinding) this.shaderBinding.destroy()

    this.__hdrImage.loaded.disconnectScope(this)
    this.__hdrImage.updated.disconnectScope(this)
  }
}

export { GLHDRCubeMap }
