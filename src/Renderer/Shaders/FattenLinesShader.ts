/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './FattenLines.vert'
import frag from './FattenLines.frag'

class FattenLinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'FattenLinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { FattenLinesShader }
