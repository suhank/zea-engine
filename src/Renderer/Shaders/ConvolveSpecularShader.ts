/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import vert from './ConvolveSpecular.vert'
// @ts-ignore
import frag from './ConvolveSpecular.frag'
import { WebGL12RenderingContext } from '../types/webgl'

/** Shader for convolving Environment maps.
 * @extends GLShader
 * @private
 */
class ConvolveSpecularShader extends GLShader {
  /**
   * Create a GL renderer.
   * @param gl - The options value.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'ConvolveSpecularShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { ConvolveSpecularShader }
