/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import frag from './PreComputeBRDF.frag'
// @ts-ignore
import vert from './PreComputeBRDF.vert'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class PreComputeBRDFShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param gl - The options value.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'PreComputeBRDFShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { PreComputeBRDFShader }
