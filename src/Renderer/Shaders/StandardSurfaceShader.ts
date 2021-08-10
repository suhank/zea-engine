/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './StandardSurface.vert'
import frag from './StandardSurface.frag'
import { ColorParameter } from '../../SceneTree/Parameters/ColorParameter'
import { Material } from '../../SceneTree/Material'
import { shaderLibrary } from '../ShaderLibrary'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../../SceneTree/Parameters/MaterialFloatParam'
import { NumberParameter } from '../../SceneTree/Parameters/NumberParameter'

/** A standard shader handling Opaque and transparent items and PBR rendering.
 * @extends GLShader
 * @private
 */
class StandardSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'StandardSuraceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {string} key - The key value.
   * @return {any} - The return value.
   */
  bind(renderstate: Record<any, any>, key: string) {
    super.bind(renderstate, key)

    const gl = this.__gl
    if (renderstate.envMap) {
      renderstate.envMap.bind(renderstate)
    }

    const { exposure } = renderstate.unifs
    if (exposure) {
      gl.uniform1f(exposure.location, renderstate.exposure)
    }
    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param {Material} material - The material param.
   * @return {Float32Array} - The return value.
   */
  getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(12) // TODO: no extra space needed right?

    const baseColor = material.getParameter('BaseColor').getValue()
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a

    matData[4] = material.getParameter('AmbientOcclusion').getValue()
    matData[5] = material.getParameter('Metallic').getValue()
    matData[6] = material.getParameter('Roughness').getValue()
    matData[7] = material.getParameter('Reflectance').getValue()

    matData[8] = material.getParameter('EmissiveStrength').getValue()
    matData[9] = material.getParameter('Opacity').getValue()

    return matData
  }
}

export { StandardSurfaceShader }

const material = new Material('StandardSurfaceShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
// material.addParameter(new MaterialColorParam('Normal', new Color(1.0, 1, 0.5)))
material.addParameter(new MaterialFloatParam('AmbientOcclusion', 1, [0, 1]))
material.addParameter(new MaterialFloatParam('Metallic', 0.5, [0, 1]))
material.addParameter(new NumberParameter('Roughness', 0.5, [0, 1])) // added
material.addParameter(new NumberParameter('Reflectance', 0.5, [0, 1]))
material.addParameter(new NumberParameter('EmissiveStrength', 0.5, [0, 1]))
material.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))

shaderLibrary.registerMaterialTemplate('StandardSurfaceShader', material)