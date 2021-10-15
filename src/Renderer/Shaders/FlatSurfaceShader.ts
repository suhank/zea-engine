/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { Material, MaterialColorParam } from '../../SceneTree'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './FlatSurface.vert'
// @ts-ignore
import frag from './FlatSurface.frag'

class FlatSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'FlatSurfaceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {string} key - The key value.
   * @return {boolean} - The return value.
   */
  bind(renderstate: RenderState, key?: string) {
    super.bind(renderstate, key)

    // Note: The GLTransparentGeoms pass only  renders the font faces of objects because for complex geoms, this makes sense
    // but flat surfaces should be double sided, as they are almost always labels, or UI elements.
    const gl = this.__gl!
    gl.disable(gl.CULL_FACE)

    return true
  }

  /**
   * The unbind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  unbind(renderstate: RenderState) {
    super.unbind(renderstate)

    const gl = this.__gl!
    gl.enable(gl.CULL_FACE)

    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(4)
    const baseColor = material.getParameter('BaseColor')!.getValue()
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

Registry.register('FlatSurfaceShader', FlatSurfaceShader)
