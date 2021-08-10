/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'

import frag from './UnpackHDR.frag'
import vert from './UnpackHDR.vert'

/** Shader for unpacking HDR images using Boost HDR algorithm.
 * @extends GLShader
 * @private
 */
class UnpackHDRShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'UnpackHDRShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { UnpackHDRShader }