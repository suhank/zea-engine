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
import { RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'
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

  bind(renderstate: RenderState, key: any): boolean {
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
  static supportsInstancing(): boolean {
    return false
  }

  /**
   * Each shader provides a template material that each material instance is
   * based on. The shader specifies the parameters needed by the shader, and
   * the material provides values to the shader during rendering.
   * @return - The template material value.
   */
  static getMaterialTemplate(): Material {
    return material
  }
}

const material = new FatPointsMaterial('FatPointsShader_template')
Registry.register('FatPointsShader', FatPointsShader)

export { FatPointsShader }
