/* eslint-disable require-jsdoc */

import { Color } from '../../Math/index'
import { Registry } from '../../Registry'

import './GLSL/index'
// @ts-ignore
import vert from './FatLinesGeomData.vert'
// @ts-ignore
import frag from './FatLinesGeomData.frag'

import { FatLinesShader } from './FatLinesShader'
/** Shader for drawing Fat lines
 * @extends GLShader
 * @private
 */
class FatLinesGeomDataShader extends FatLinesShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl)
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: Record<any, any>) {
    if (super.bind(renderstate)) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  static getParamDeclarations() {
    const paramDescs = super.getParamDeclarations()
    paramDescs.push({
      name: 'BaseColor',
      defaultValue: new Color(1.0, 1.0, 0.5),
    })
    paramDescs.push({ name: 'Opacity', defaultValue: 1.0 })
    paramDescs.push({ name: 'LineThickness', defaultValue: 1.0 })
    paramDescs.push({ name: 'Overlay', defaultValue: 0.0 })
    return paramDescs
  }
}

// Registry.register('FatLinesGeomDataShader', FatLinesGeomDataShader)
export { FatLinesGeomDataShader }
