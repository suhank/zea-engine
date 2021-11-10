/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { Material } from '../../SceneTree/Material'
import { ScreenSpaceMaterial } from '../../SceneTree/Materials/ScreenSpaceMaterial'
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
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'ScreenSpaceShader')

    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  static isOverlay() {
    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(8)
    const baseColor = material.getParameter('BaseColor')!.value
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }
}

const material = new ScreenSpaceMaterial('ScreenSpaceShader_template')
shaderLibrary.registerMaterialTemplate('ScreenSpaceShader', material)
Registry.register('ScreenSpaceShader', ScreenSpaceShader)

export { ScreenSpaceShader }
