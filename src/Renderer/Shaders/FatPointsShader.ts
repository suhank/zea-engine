/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { Material, NumberParameter, MaterialColorParam, FatPointsMaterial } from '../../SceneTree'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './FatPoints.vert'
// @ts-ignore
import frag from './FatPoints.frag'
class FatPointsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'FatPointsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: RenderState, key: any) {
    if (super.bind(renderstate, key)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  /**
   * The supportsInstancing method.
   * @return - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}

const material = new FatPointsMaterial('FatPointsShader_template')
shaderLibrary.registerMaterialTemplate('FatPointsShader', material)
Registry.register('FatPointsShader', FatPointsShader)

// Note: due to a bug in webpack, if these classes are not exported,
// then we get a mangling of the code _only_in_release_mode_.
// The factory returns FatPointsSelectedShader
// instead of FatPointsShader when the GLPAss tries to construct it.
export { FatPointsShader }
