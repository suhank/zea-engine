/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { Material } from '../../SceneTree/Material'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import frag from './ScreenSpace.frag'
// @ts-ignore
import vert from './ScreenSpace.vert'

class ScreenSpaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'ScreenSpaceShader')

    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  static isOverlay() {
    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(8)
    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }
}

// Registry.register('ScreenSpaceShader', ScreenSpaceShader)
export { ScreenSpaceShader }
const material = new Material('ScreenSpaceShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
shaderLibrary.registerMaterialTemplate('ScreenSpaceShader', material)
