/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
// @ts-ignore
import frag from './Billboard.frag'
// @ts-ignore
import vert from './Billboard.vert'

class BillboardShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'BillboardShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { BillboardShader }
