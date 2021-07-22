/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader.js'

import './GLSL/index'
import frag from './PreComputeBRDF.frag'
import vert from './PreComputeBRDF.vert'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class PreComputeBRDFShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param {WebGLRenderingContext} gl - The options value.
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl,'PreComputeBRDFShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { PreComputeBRDFShader }
