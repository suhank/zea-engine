/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import vert from './StandardSurface.vert'
// @ts-ignore
import frag from './StandardSurface.frag'
import { Material } from '../../SceneTree/Material'
import { shaderLibrary } from '../ShaderLibrary'
import { MaterialColorParam } from '../../SceneTree/Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../../SceneTree/Parameters/MaterialFloatParam'
import { StandardSurfaceMaterial } from '../../SceneTree/Materials/StandardSurfaceMaterial'

/** A standard shader handling Opaque and transparent items and PBR rendering.
 * @extends GLShader
 * @private
 */
class StandardSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'StandardSuraceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param key - The key value.
   * @return - The return value.
   */
  bind(renderstate: RenderState, key: string) {
    const colorRenderState = <ColorRenderState>renderstate
    super.bind(renderstate, key)

    const gl = this.__gl!
    if (colorRenderState.envMap) {
      colorRenderState.envMap.bind(colorRenderState)
    }

    const { exposure } = colorRenderState.unifs
    if (exposure) {
      gl.uniform1f(exposure.location, colorRenderState.exposure)
    }
    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(12) // TODO: no extra space needed right?

    const baseColor = material.getParameter('BaseColor')!.value
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a

    matData[4] = material.getParameter('AmbientOcclusion')!.value
    matData[5] = material.getParameter('Metallic')!.value
    matData[6] = material.getParameter('Roughness')!.value
    matData[7] = material.getParameter('Reflectance')!.value

    matData[8] = material.getParameter('EmissiveStrength')!.value
    matData[9] = material.getParameter('Opacity')!.value

    return matData
  }
}

const material = new StandardSurfaceMaterial('StandardSurfaceShader_template')

shaderLibrary.registerMaterialTemplate('StandardSurfaceShader', material)
shaderLibrary.registerMaterialTemplate('TransparentSurfaceShader', material)

Registry.register('StandardSurfaceShader', StandardSurfaceShader)
Registry.register('TransparentSurfaceShader', StandardSurfaceShader)

export { StandardSurfaceShader }
