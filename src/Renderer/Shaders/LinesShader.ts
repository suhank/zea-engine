/* eslint-disable require-jsdoc */
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { Material } from '../../SceneTree/Material'
import { LinesMaterial } from '../../SceneTree/Materials/LinesMaterial'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './Lines.vert'
// @ts-ignore
import frag from './Lines.frag'

class LinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'LinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(12)
    const baseColor = material.getParameter('BaseColor')!.value
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    // Note: By avoiding calling this value 'Opacity', the lines will not be considered 'Transparent'
    // Lines do not need to be depth sorted....
    matData[4] = material.getParameter('Opacity')!.value
    matData[5] = material.getParameter('Overlay')!.value
    matData[6] = material.getParameter('StippleScale')!.value
    matData[7] = material.getParameter('StippleValue')!.value

    matData[8] = material.getParameter('OccludedStippleValue')!.value
    return matData
  }
}

const material = new LinesMaterial('LinesShader_template')
shaderLibrary.registerMaterialTemplate('LinesShader', material)
Registry.register('LinesShader', LinesShader)

export { LinesShader }
