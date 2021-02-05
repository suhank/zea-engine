import { EventEmitter } from '../Utilities/index'
import { hammersley } from './hammersley.js'
import { GLTexture2D } from './GLTexture2D.js'
import { GLImageAtlas } from './GLImageAtlas.js'
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
   * @param {any} gl - The gl value.
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
   * The generateHammersleySamples method.
   * @param {any} numSamples - The numSamples value.
   * @return {any} - The return value.
   */
  generateHammersleySamples(numSamples) {
    const gl = this.__gl
    if (!gl['Hammersley' + numSamples]) {
      const dataArray = new Float32Array(numSamples * 3)
      for (let i = 0; i < numSamples; i++) {
        const Xi = hammersley(i, numSamples)
        const offset = i * 3
        dataArray[offset + 0] = Xi[0]
        dataArray[offset + 1] = Xi[1]
      }
      gl['Hammersley' + numSamples] = new GLTexture2D(gl, {
        format: 'RGB',
        type: 'FLOAT',
        filter: 'NEAREST',
        wrap: 'CLAMP_TO_EDGE',
        width: numSamples,
        height: 1,
        data: dataArray,
        mipMapped: false,
      })
    }
    return gl['Hammersley' + numSamples]
  }

  /**
   * The convolveProbe method.
   * @param {any} srcGLTex - The srcGLTex value.
   */
  convolveProbe(srcGLTex, faceSize) {
    const gl = this.__gl

    // Compile and bind the convolver shader.
    const numSamples = 1024
    // const numSamples = 64;

    if (!this.__convolved) {
      this.hammersleyTexture = this.generateHammersleySamples(numSamples)

      this.gltex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.gltex)

      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.GL_LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE)

      // Resize all the faces first.
      for (let i = 0; i < 6; i++) {
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA32F, 128, 128, 0, gl.RGBA, gl.FLOAT, null)
      }
      gl.generateMipmap(gl.TEXTURE_CUBE_MAP)
      // gl.enable(gl.TEXTURE_CUBE_MAP_SEAMLESS) // not supported in webgl

      this.__convolverShader = new ConvolverShader(gl)
      const covolverShaderComp = this.__convolverShader.compileForTarget(
        'GLProbe',
        Object.assign(
          {
            repl: {
              NUM_SAMPLES: numSamples,
            },
          },
          gl.shaderopts
        )
      )
      this.__covolverShaderBinding = generateShaderGeomBinding(
        gl,
        covolverShaderComp.attrs,
        gl.__quadattrbuffers,
        gl.__quadIndexBuffer
      )
    }

    // TODO: Refactor this code.
    // We only need one target image for the probe. (not all these Fbos.)
    // Instead we can simply move the viewport around the target image atlas.
    const renderstate = {}
    this.__convolverShader.bind(renderstate, 'GLProbe')
    this.__covolverShaderBinding.bind(renderstate)
    const unifs = renderstate.unifs

    const maxMipLevels = 5
    for (const mip = 0; mip < maxMipLevels; ++mip) {
      // resize framebuffer according to mip-level size.
      const mipWidth = 128 * Math.pow(0.5, mip)
      const mipHeight = 128 * Math.pow(0.5, mip)
      gl.bindRenderbuffer(GL_RENDERBUFFER, captureRBO)
      gl.renderbufferStorage(GL_RENDERBUFFER, GL_DEPTH_COMPONENT24, mipWidth, mipHeight)
      gl.viewport(0, 0, mipWidth, mipHeight)

      const roughness = mip / (maxMipLevels - 1)
      gl.uniform1f(unifs.roughness.location, roughness)
      for (let i = 0; i < 6; ++i) {
        gl.uniformMatrix4fv(unifs.view.location, false, captureViews[i])
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          this.gltex,
          mip
        )

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        renderCube()
      }
    }

    // for (let i = 0; i < this.__fbos.length; i++) {
    //   this.__fbos[i].bindAndClear()

    //   // Note: we should not need to bind the texture every iteration.
    //   this.__lodPyramid.bindToUniform(renderstate, unifs.envMapPyramid)
    //   if ('hammersleyMap' in unifs) {
    //     hammersleyTexture.bindToUniform(renderstate, unifs.hammersleyMap)
    //   }

    //   // Set the roughness.
    //   if ('roughness' in unifs) {
    //     const roughness = (i + 1) / this.__fbos.length
    //     gl.uniform1f(unifs.roughness.location, roughness)
    //   }

    //   gl.drawQuad()
    // }

    // Attach one face of cube map
    const fboId = gl.createFramebuffer()
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, fboId)

    for (let i = 0; i < 6; i++) {
      let cubeFace = gl.TEXTURE_CUBE_MAP_POSITIVE_X + i
      if (cubeFace == gl.TEXTURE_CUBE_MAP_POSITIVE_Y) cubeFace = gl.TEXTURE_CUBE_MAP_NEGATIVE_Y
      else if (cubeFace == gl.TEXTURE_CUBE_MAP_NEGATIVE_Y) cubeFace = gl.TEXTURE_CUBE_MAP_POSITIVE_Y

      gl.viewport(0, 0, faceSize, faceSize) // Match the viewport to the texture size
      gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, cubeFace, this.gltex, 0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // const region = [
      //   ((i % 3) * faceSize) / ldr.width,
      //   (Math.floor(i / 3) * faceSize) / ldr.height,
      //   faceSize / ldr.width,
      //   faceSize / ldr.height,
      // ]
      // gl.uniform4fv(unifs.srcRegion.location, region)
      // gl.drawQuad()
    }
    gl.deleteFramebuffer(fboId)

    this.__convolved = true
    this.__convolverShader.destroy()

    // this.renderAtlas(false)
  }

  /**
   * The bindProbeToUniform method.
   * @param {any} renderstate - The renderstate value.
   * @param {any} unif - The unif value.
   */
  bindProbeToUniform(renderstate, unif) {
    // this.__lodPyramid.getSubImage(3).bind(renderstate, unif);
    // if (this.__convolved) super.bindToUniform(renderstate, unif)
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
