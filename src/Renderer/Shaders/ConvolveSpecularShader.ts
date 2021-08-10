/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './ConvolveSpecular.vert'
import frag from './ConvolveSpecular.frag'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveSpecularShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param {WebGL12RenderingContext} gl - The options value.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'ConvolveSpecularShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { ConvolveSpecularShader }