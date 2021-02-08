import { EnvMapMapping } from '../SceneTree/Images/EnvMap.js'
import { GLProbe } from './GLProbe.js'
import { GLHDRImage } from './GLHDRImage.js'
import { GLHDRCubeMap } from './GLHDRCubeMap.js'
import { DrawCubeMapShader, OctahedralEnvMapShader } from './Shaders/EnvMapShader.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'

/** Class representing a GL environment map.
 * @extends GLProbe
 * @private
 */
class GLEnvMap extends GLProbe {
  /**
   * Create a GL env map.
   * @param {any} renderer - The renderer value.
   * @param {any} envMap - The environment map.
   * @param {any} preproc - The preproc value.
   */
  constructor(renderer, envMap, preproc) {
    super(renderer.gl, 'EnvMap')
    this.__renderer = renderer
    this.__envMap = envMap
    this.__preproc = preproc
    this.__backgroundFocus = 0.0

    if (this.__envMap.isLoaded()) {
      this.init()
    } else {
      this.__envMap.once('loaded', this.init.bind(this))
    }
  }

  /**
   * @private
   */
  init() {
    const gl = this.__renderer.gl
    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    if (this.__envMap.mapping == EnvMapMapping.CUBE) {
      this.__srcGLTex = new GLHDRCubeMap(gl, this.__envMap)
      this.__envMapShader = new DrawCubeMapShader(gl)

      this.cubeFaceSize = this.__envMap.width / 3
    } else {
      this.__srcGLTex = new GLHDRImage(gl, this.__envMap)
      this.__envMapShader = new OctahedralEnvMapShader(gl)

      const side = this.__envMap.width / 2
      this.cubeFaceSize = Math.sqrt(side * side * 2)
    }

    const envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap', this.__preproc)
    this.__envMapShaderBinding = generateShaderGeomBinding(
      gl,
      envMapShaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    //
    const headlightParam = this.__envMap.getParameter('HeadLightMode')

    const updateHeadlightModeFlag = () => {
      const ENVMAP_FLAG_HEADLIGHT = 1 // 1<<0;
      if (headlightParam.getValue()) {
        this.textureDesc[3] |= ENVMAP_FLAG_HEADLIGHT
      } else {
        this.textureDesc[3] &= ~ENVMAP_FLAG_HEADLIGHT
      }
    }
    updateHeadlightModeFlag()
    headlightParam.on('valueChanged', () => {
      updateHeadlightModeFlag()
      this.emit('updated')
    })

    this.convolveProbe(this.__srcGLTex, this.cubeFaceSize)

    this.emit('updated')
  }

  /**
   * The getEnvMap method.
   * @return {any} - The return value.
   */
  getEnvMap() {
    return this.__envMap
  }

  /**
   * The getBackgroundFocus method.
   * @return {any} - The return value.
   */
  getBackgroundFocus() {
    return this.__backgroundFocus
  }

  /**
   * The setBackgroundFocus method.
   * @param {any} val - The val param.
   */
  setBackgroundFocus(val) {
    this.__backgroundFocus = val
    this.__renderer.requestRedraw()
  }

  /**
   * The draw method.
   * @param {any} renderstate - The renderstate value.
   */
  draw(renderstate) {
    if (this.__envMap.isLoaded()) {
      const gl = this.__gl
      const debug = false
      if (debug) {
        const screenQuad = gl.screenQuad
        screenQuad.bindShader(renderstate)
        const debugId = 2
        switch (debugId) {
          case 0:
            screenQuad.draw(renderstate, this.__srcGLTex.__srcLDRTex)
            break
          case 1:
            screenQuad.draw(renderstate, this.__srcGLTex.__srcCDMTex)
            break
          case 2:
            screenQuad.draw(renderstate, this.__srcGLTex)
            break
          case 3:
            screenQuad.draw(renderstate, this.__lodPyramid)
            break
          case 4:
            screenQuad.draw(renderstate, this.__fbos[0].getColorTexture())
            break
          case 5:
            screenQuad.draw(renderstate, this)
            break
        }
      } else {
        // /////////////////
        this.__envMapShader.bind(renderstate, 'GLEnvMap')
        const unifs = renderstate.unifs
        // this.__srcGLTex.bindToUniform(renderstate, unifs.envMap)
        this.bindProbeToUniform(renderstate, unifs.envMap)
        // this.bindToUniform(renderstate, unifs.envMapPyramid);

        // this.__lodPyramid.bind(renderstate, renderstate.unifs.envMap.location);
        // this.bindToUniform(renderstate, unifs.envMapPyramid);

        {
          const unif = unifs.focus
          if (unif) gl.uniform1f(unif.location, this.__backgroundFocus)
        }
        {
          const unif = unifs.exposure
          if (unif) gl.uniform1f(unif.location, renderstate.exposure)
        }

        this.__envMapShaderBinding.bind(renderstate)
        gl.depthMask(false)

        renderstate.bindViewports(unifs, () => {
          gl.drawQuad()
        })
      }
    }
  }

  /**
   * The bindToUniform method.
   * An EnvMap can be bound as a regular texture, but we want the
   * original source data, not the atlas of convolved images.
   * @param {any} renderstate - The renderstate value.
   * @param {any} unif - The unif value.
   * @param {any} bindings - The bindings value.
   * @return {any} - The return value.
   */
  bindToUniform(renderstate, unif, bindings) {
    return this.__srcGLTex.bindToUniform(renderstate, unif, bindings)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    this.__srcGLTex.loaded.disconnectScope(this)
    this.__srcGLTex.updated.disconnectScope(this)
    this.__srcGLTex.destroy()
  }
}

export { GLEnvMap }
