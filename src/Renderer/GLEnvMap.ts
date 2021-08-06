import { GLProbe } from './GLProbe'
import { GLHDRImage } from './GLHDRImage'
import { EnvMapShader } from './Shaders/EnvMapShader'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'
import { EnvMap } from '../SceneTree/Images/EnvMap'
import { GLBaseRenderer } from './GLBaseRenderer'

/** Class representing a GL environment map.
 * @extends GLProbe
 * @private
 */
class GLEnvMap extends GLProbe {
  protected __renderer: Record<any, any>
  protected __envMap: any
  protected __backgroundFocus: number
  protected __srcGLTex: any
  protected __envMapShader: any
  protected __envMapShaderBinding: any
  protected __lodPyramid: any
  /**
   * Create a GL env map.
   * @param {GLBaseRenderer} renderer - The renderer value.
   * @param {EnvMap} envMap - The environment map.
   */
  constructor(renderer: GLBaseRenderer, envMap: EnvMap) {
    super(<WebGL12RenderingContext>renderer.gl, 'EnvMap')
    this.__renderer = renderer
    this.__envMap = envMap
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

    this.__srcGLTex = new GLHDRImage(gl, this.__envMap)
    this.__envMapShader = new EnvMapShader(gl)

    const envMapShaderComp = this.__envMapShader.compileForTarget('GLEnvMap')
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

    this.convolveProbe(this.__srcGLTex)

    this.emit('updated')
  }

  /**
   * The getEnvMap method.
   * @return {EnvMap} - The return value.
   */
  getEnvMap() {
    return this.__envMap
  }

  /**
   * The getBackgroundFocus method.
   * @return {number} - The return value.
   */
  getBackgroundFocus() {
    return this.__backgroundFocus
  }

  /**
   * The setBackgroundFocus method.
   * @param {number} val - The val param.
   */
  setBackgroundFocus(val: any) {
    this.__backgroundFocus = val
    this.__renderer.requestRedraw()
  }

  /**
   * The draw method.
   * @param {Record<any,any>} renderstate - The object tracking the current state of the renderer
   */
  draw(renderstate: Record<any, any>) {
    if (this.__envMap.isLoaded()) {
      const gl = <Record<any,any>>this.__gl
      const debug = false
      if (debug) {
        const screenQuad = gl.screenQuad
        screenQuad.bindShader(renderstate)
        const debugId = 2*1
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

        const { envMap, focus, exposure } = renderstate.unifs
        if (envMap) {
          this.__srcGLTex.bindToUniform(renderstate, envMap)
        }
        if (focus) gl.uniform1f(focus.location, this.__backgroundFocus)
        if (exposure) gl.uniform1f(exposure.location, renderstate.exposure)

        this.__envMapShaderBinding.bind(renderstate)
        gl.depthMask(false)

        renderstate.bindViewports(unifs, () => {
          gl.drawQuad()
        })
      }
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
    this.__srcGLTex.destroy()
  }
}

export { GLEnvMap }
