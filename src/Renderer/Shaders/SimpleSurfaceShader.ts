/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './SimpleSurface.frag'
import vert from './SimpleSurface.vert'

/** A simple shader with no support for PBR or textures
 * @ignore
 */
class SimpleSurfaceShader extends GLShader {
  /**
   * Create a SimpleSurfaceShader
   * @param {any} gl - gl context
   */
  constructor(gl: WebGLRenderingContext) {
    super(gl, 'SimpleSurfaceShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  static getGeomDataShaderName() {
    return 'StandardSurfaceGeomDataShader'
  }

  static getSelectedShaderName() {
    return 'StandardSurfaceSelectedGeomsShader'
  }
}

// Registry.register('SimpleSurfaceShader', SimpleSurfaceShader)
export { SimpleSurfaceShader }
