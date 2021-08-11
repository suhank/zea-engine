/* eslint-disable require-jsdoc */
import { GLShader } from '../GLShader'
import { Registry } from '../../Registry'

import './GLSL/index'
// @ts-ignore
import frag from './StandardSurfaceGeomData.frag'
// @ts-ignore
import vert from './StandardSurfaceGeomData.vert'
class StandardSurfaceGeomDataShader extends GLShader {
  constructor(gl: WebGL12RenderingContext) {
    // , floatGeomBuffer
    super(gl, 'StandardSurfaceGeomDataShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
    // TODO: add finalize?
  }
}

// Registry.register('StandardSurfaceGeomDataShader', StandardSurfaceGeomDataShader)

export { StandardSurfaceGeomDataShader }
