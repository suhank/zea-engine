/* eslint-disable require-jsdoc */
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { shaderLibrary } from '../ShaderLibrary'
import { Material } from '../../SceneTree/Material'

import './GLSL/index'
// @ts-ignore
import frag from './SimpleSurface.frag'
// @ts-ignore
import vert from './SimpleSurface.vert'
import { SimpleSurfaceMaterial } from '../../SceneTree/Materials/SimpleSurfaceMaterial'
import { WebGL12RenderingContext } from '../types/webgl'

/** A simple shader with no support for PBR or textures
 * @ignore
 */
class SimpleSurfaceShader extends GLShader {
  /**
   * Create a SimpleSurfaceShader
   * @param gl - gl context
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'SimpleSurfaceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
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
    matData[4] = material.getParameter('Opacity')!.value
    matData[5] = material.getParameter('EmissiveStrength')!.value
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

const material = new SimpleSurfaceMaterial('SimpleSurfaceShader_template')
Registry.register('SimpleSurfaceShader', SimpleSurfaceShader)

export { SimpleSurfaceShader }
