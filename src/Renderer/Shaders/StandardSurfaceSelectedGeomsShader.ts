/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'
import { Registry } from '../../Registry'

import './GLSL/index'
import frag from './StandardSurfaceSelectedGeoms.frag'
import vert from './StandardSurfaceSelectedGeoms.vert'
class StandardSurfaceSelectedGeomsShader extends GLShader {
  constructor(gl: WebGL12RenderingContext) {
    // floatGeomBuffer
    super(gl, 'StandardSurfaceSelectedGeomsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

// Registry.register('StandardSurfaceSelectedGeomsShader', StandardSurfaceSelectedGeomsShader)
export { StandardSurfaceSelectedGeomsShader }
