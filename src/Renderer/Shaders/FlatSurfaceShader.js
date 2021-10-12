/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader.js'

import './GLSL/index'
import vert from './FlatSurface.vert'
import frag from './FlatSurface.frag'

class FlatSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl) {
    super(gl)

    this.setShaderStage('VERTEX_SHADER', vert)

    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {string} key - The key value.
   * @return {boolean} - The return value.
   */
  bind(renderstate, key) {
    super.bind(renderstate, key)

    const gl = this.__gl
    gl.disable(gl.CULL_FACE)

    return true
  }

  /**
   * The unbind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  unbind(renderstate) {
    super.unbind(renderstate)

    return true
  }

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    return paramDescs
  }

  /**
   * The getPackedMaterialData method.
   * @param {any} material - The material param.
   * @return {any} - The return value.
   */
  static getPackedMaterialData(material) {
    const matData = new Float32Array(8)
    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
    return matData
  }

  // static getGeomDataShaderName() {
  //   return 'StandardSurfaceGeomDataShader'
  // }

  // static getSelectedShaderName() {
  //   return 'StandardSurfaceSelectedGeomsShader'
  // }
}

Registry.register('FlatSurfaceShader', FlatSurfaceShader)
export { FlatSurfaceShader }
