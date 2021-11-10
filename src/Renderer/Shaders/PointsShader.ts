/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { Material } from '../../SceneTree/Material'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { NumberParameter } from '../../SceneTree/Parameters/NumberParameter'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import frag from './Points.frag'
// @ts-ignore
import vert from './Points.vert'
class PointsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'PointsShader')
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
    matData[4] = material.getParameter('PointSize')!.value
    matData[5] = material.getParameter('Overlay')!.value
    return matData
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

export { PointsShader }

const material = new Material('PointsShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new NumberParameter('PointSize', 2))
material.addParameter(new NumberParameter('Overlay', 0.00002))

Registry.register('PointsShader', PointsShader)
