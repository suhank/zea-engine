import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import frag from './FatLines.frag'
import vert from './FatLines.vert'

/** Shader for drawing Fat lines
 * @extends GLShader
 * @private
 */
class FatLinesShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'FatLinesShader')
    this.setShaderStage('VERTEX_SHADER', vert)

    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: Record<any, any>) {
    if (super.bind(renderstate, 'FatLinesShader')) {
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
    paramDescs.push({ name: 'LineThickness', defaultValue: 0.01 })
    paramDescs.push({ name: 'Overlay', defaultValue: 0.0 })
    return paramDescs
  }

  static getGeomDataShaderName() {
    return 'FatLinesGeomDataShader'
  }

  // static getSelectedShaderName() {
  //   return 'FatLinesShaderHighlightShader'
  // }

  /**
   * The supportsInstancing method.
   * @return {boolean} - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}

// Registry.register('FatLinesShader', FatLinesShader)
export { FatLinesShader }
