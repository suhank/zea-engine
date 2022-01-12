/* eslint-disable require-jsdoc */
import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'
import { FlatSurfaceMaterial, Material, MaterialColorParam } from '../../SceneTree'
import { shaderLibrary } from '../ShaderLibrary'

import './GLSL/index'
// @ts-ignore
import vert from './FlatSurface.vert'
// @ts-ignore
import frag from './FlatSurface.frag'
import { RenderState } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'

class FlatSurfaceShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl?: WebGL12RenderingContext) {
    super(gl, 'FlatSurfaceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param key - The key value.
   * @return - The return value.
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
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  unbind(renderstate: RenderState): boolean {
    super.unbind(renderstate)

    const gl = this.__gl!
    gl.enable(gl.CULL_FACE)

    return true
  }

  /**
   * The getPackedMaterialData method.
   * @param material - The material param.
   * @return - The return value.
   */
  static getPackedMaterialData(material: Material): Float32Array {
    const matData = new Float32Array(4)
    const baseColor = material.getParameter('BaseColor')!.value
    matData[0] = baseColor.r
    matData[1] = baseColor.g
    matData[2] = baseColor.b
    matData[3] = baseColor.a
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

const material = new FlatSurfaceMaterial('FlatSurfaceShader_template')
Registry.register('FlatSurfaceShader', FlatSurfaceShader)

export { FlatSurfaceShader }
