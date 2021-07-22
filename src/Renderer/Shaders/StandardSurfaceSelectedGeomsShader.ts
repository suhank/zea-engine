/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader.js'
import { Registry } from '../../Registry'

import './GLSL/index'
import frag from './StandardSurfaceSelectedGeoms.frag'
import vert from './StandardSurfaceSelectedGeoms.vert'
class StandardSurfaceSelectedGeomsShader extends GLShader {
  constructor(gl: WebGLRenderingContext) {
    // floatGeomBuffer
    super(gl, 'StandardSurfaceSelectedGeomsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }
}

// Registry.register('StandardSurfaceSelectedGeomsShader', StandardSurfaceSelectedGeomsShader)
export { StandardSurfaceSelectedGeomsShader }
