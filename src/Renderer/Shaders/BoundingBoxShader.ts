/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './BoundingBox.frag'
import vert from './BoundingBox.vert'

class BoundingBoxShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'BoundingBoxShader')
    this.setShaderStage('VERTEX_SHADER', vert)

    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { BoundingBoxShader }
