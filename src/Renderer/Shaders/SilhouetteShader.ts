/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'
import { WebGL12RenderingContext } from '../types/webgl'

import './GLSL/index'
// @ts-ignore
import frag from './Silhouette.frag'
// @ts-ignore
import vert from './Silhouette.vert'

class SilhouetteShader extends GLShader {
  /**
   * Create a GL shader.
   * @param gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'SilhouetteShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

export { SilhouetteShader }
