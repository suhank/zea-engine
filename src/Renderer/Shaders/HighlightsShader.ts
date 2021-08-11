/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

// @ts-ignore
import frag from './Highlights.frag'
// @ts-ignore
import vert from './Highlights.vert'
class HighlightsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'HighlightsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { HighlightsShader }
