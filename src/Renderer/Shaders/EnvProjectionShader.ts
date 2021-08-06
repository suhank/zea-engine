/* eslint-disable require-jsdoc */
import { Color, Vec3 } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './EnvProjection.vert'
import LatLongEnvProjectionFrag from './LatLongEnvProjection.frag'
import OctahedralEnvProjectionFrag from './OctahedralEnvProjection.frag'
import { shaderLibrary } from '..'
import { Material, MaterialColorParam, NumberParameter } from '../..'
import { Vec3Parameter } from '../../SceneTree'

class EnvProjectionShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'EnvProjectionShader')
    this.setShaderStage('VERTEX_SHADER', vert)
  }
}

class OctahedralEnvProjectionShader extends EnvProjectionShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl)
    this.setShaderStage('FRAGMENT_SHADER', OctahedralEnvProjectionFrag)
  }
}

// Registry.register('OctahedralEnvProjectionShader', OctahedralEnvProjectionShader)

class LatLongEnvProjectionShader extends EnvProjectionShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl)
    this.setShaderStage('FRAGMENT_SHADER', LatLongEnvProjectionFrag)
  }
}

// Registry.register('LatLongEnvProjectionShader', LatLongEnvProjectionShader)
export { EnvProjectionShader, OctahedralEnvProjectionShader, LatLongEnvProjectionShader }
const material = new Material('EnvProjectionShader_template')
material.addParameter(new Vec3Parameter('projectionCenter', new Vec3(0.0, 0.0, 1.7)))
shaderLibrary.registerMaterialTemplate('EnvProjectionShader', material)
