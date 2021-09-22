/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { Material, ColorParameter, NumberParameter } from '../../SceneTree'
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
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
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

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({ name: 'PointSize', defaultValue: 0.05 })
    paramDescs.push({ name: 'Rounded', defaultValue: 1.0 })
    paramDescs.push({ name: 'BorderWidth', defaultValue: 0.2 })
    paramDescs.push({ name: 'Overlay', defaultValue: 0.0 })
    return paramDescs
  }

  /**
   * The supportsInstancing method.
   * @return {boolean} - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}

const material = new Material('LinesShader_template')
material.addParameter(new ColorParameter('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new NumberParameter('PointSize', 1.0, [0, 1]))
material.addParameter(new NumberParameter('BorderWidth', 0.2))
material.addParameter(new NumberParameter('Overlay', 0.0))

shaderLibrary.registerMaterialTemplate('FatPointsShader', material)

Registry.register('FatPointsShader', FatPointsShader)

// Note: due to a bug in webpack, if these classes are not exported,
// then we get a mangling of the code _only_in_release_mode_.
// The factory returns FatPointsSelectedShader
// instead of FatPointsShader when the GLPAss tries to construct it.
export { FatPointsShader }
