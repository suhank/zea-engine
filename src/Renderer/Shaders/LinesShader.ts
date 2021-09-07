/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { Material } from '../../SceneTree/Material'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './Lines.vert'
// @ts-ignore
import frag from './Lines.frag'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../../SceneTree/Parameters/MaterialFloatParam'
import { NumberParameter } from '../../SceneTree/Parameters/NumberParameter'

class LinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'LinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(12)
    const baseColor = material.getParameter('BaseColor')!.getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    // Note: By avoiding calling this value 'Opacity', the lines will not be considered 'Transparent'
    // Lines do not need to be depth sorted....
    matData[4] = material.getParameter('Opacity')!.getValue()
    matData[5] = material.getParameter('Overlay')!.getValue()
    matData[6] = material.getParameter('StippleScale')!.getValue()
    matData[7] = material.getParameter('StippleValue')!.getValue()

    matData[8] = material.getParameter('OccludedStippleValue')!.getValue()
    return matData
  }
}

const material = new Material('LinesShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))

material.addParameter(new MaterialFloatParam('Opacity', 0.7, [0, 1]))
material.addParameter(new NumberParameter('Overlay', 0.000001)) // Provide a slight overlay so lines draw over meshes.

material.addParameter(new NumberParameter('StippleScale', 0.01))
material.addParameter(new NumberParameter('StippleValue', 0, [0, 1]))

material.addParameter(new NumberParameter('OccludedStippleValue', 1.0, [0, 1]))
shaderLibrary.registerMaterialTemplate('LinesShader', material)

Registry.register('LinesShader', LinesShader)

export { LinesShader }
