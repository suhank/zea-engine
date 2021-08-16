/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import frag from './SimpleSurface.frag'
// @ts-ignore
import vert from './SimpleSurface.vert'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../../SceneTree/Parameters/MaterialFloatParam'
import { NumberParameter } from '../../SceneTree/Parameters/NumberParameter'
import { Material } from '../../SceneTree/Material'

/** A simple shader with no support for PBR or textures
 * @ignore
 */
class SimpleSurfaceShader extends GLShader {
  /**
   * Create a SimpleSurfaceShader
   * @param {any} gl - gl context
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'SimpleSurfaceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  static getGeomDataShaderName() {
    return 'StandardSurfaceGeomDataShader'
  }

  static getSelectedShaderName() {
    return 'StandardSurfaceSelectedGeomsShader'
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(8)
    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    matData[4] = material.getParameter('Opacity').getValue()
    matData[5] = material.getParameter('EmissiveStrength').getValue()
    return matData
  }

  // static getGeomDataShaderName() {
  //   return 'StandardSurfaceGeomDataShader'
  // }

  // static getSelectedShaderName() {
  //   return 'StandardSurfaceSelectedGeomsShader'
  // }
}

export { SimpleSurfaceShader }

const material = new Material('StandardSurfaceShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))
material.addParameter(new MaterialFloatParam('EmissiveStrength', 0.5, [0, 1]))
shaderLibrary.registerMaterialTemplate('SimpleSurfaceShader', material)
