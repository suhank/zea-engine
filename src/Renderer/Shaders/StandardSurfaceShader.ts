/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './StandardSurface.vert'
import frag from './StandardSurface.frag'
import { ColorParameter } from '../../SceneTree/Parameters/ColorParameter'
import { Material } from '../../SceneTree/Material'

/** A standard shader handling Opaque and transparent items and PBR rendering.
 * @extends GLShader
 * @private
 */
class StandardSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'StandardSuraceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {string} key - The key value.
   * @return {any} - The return value.
   */
  bind(renderstate: Record<any, any>, key: string) {
    super.bind(renderstate, key)

    const gl = this.__gl
    if (renderstate.envMap) {
      renderstate.envMap.bind(renderstate)
    }

    const { exposure } = renderstate.unifs
    if (exposure) {
      gl.uniform1f(exposure.location, renderstate.exposure)
    }
    return true
  }
}

// Registry.register('StandardSurfaceShader', StandardSurfaceShader)
// Registry.register('TransparentSurfaceShader', StandardSurfaceShader)

export { StandardSurfaceShader }

// const material = new Material()
// shaderLibrary.regieterMaterialTemplate('StandardSurfaceShader', material) // this is no longer needed?
