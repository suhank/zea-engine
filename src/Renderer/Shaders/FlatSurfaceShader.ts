/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './FlatSurface.vert'
import frag from './FlatSurface.frag'
import { Material, MaterialColorParam } from '../../SceneTree'
import { shaderLibrary } from '../ShaderLibrary'

class FlatSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'FlatSurfaceShader')
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
  getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(4)
    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }
}

export { FlatSurfaceShader }

const material = new Material('StandardSurfaceShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
shaderLibrary.registerMaterialTemplate('FlatSurfaceShader', material)
