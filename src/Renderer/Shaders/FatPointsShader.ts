/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { GLShader } from '../GLShader'

import './GLSL/index'
import vert from './FatPoints.vert'
import frag from './FatPoints.frag'
import GeomDataFrag from './FatPointsGeomData.frag'
import SelectedFrag from './FatPointsSelected.frag'
import { shaderLibrary } from '..'
import { Material, MaterialColorParam, MaterialFloatParam, NumberParameter } from '../..'
class FatPointsShader extends GLShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl, 'FatPointsShader')
    this.setShaderStage('VERTEX_SHADER', vert)
    this.setShaderStage('FRAGMENT_SHADER', frag)
  }

  bind(renderstate: Record<any, any>) {
    if (super.bind(renderstate, 'FatPointsShader')) {
      renderstate.supportsInstancing = false
      return true
    }
    return false
  }

  static getGeomDataShaderName() {
    return 'FatPointsGeomDataShader'
  }

  static getSelectedShaderName() {
    return 'FatPointsSelectedShader'
  }

  /**
   * The supportsInstancing method.
   * @return {boolean} - return false for shaders that cannot be rendered in instanced mode.
   */
  static supportsInstancing() {
    return false
  }
}

class FatPointsGeomDataShader extends FatPointsShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl)

    this.setShaderStage('FRAGMENT_SHADER', GeomDataFrag)
  }
}

class FatPointsSelectedShader extends FatPointsShader {
  /**
   * Create a GL shader.
   * @param {WebGL12RenderingContext} gl - The webgl rendering context.
   */
  constructor(gl: WebGL12RenderingContext) {
    super(gl)

    this.setShaderStage('FRAGMENT_SHADER', SelectedFrag)
  }
}

export { FatPointsShader, FatPointsGeomDataShader, FatPointsSelectedShader }
const material = new Material('FatPointsShader_template')
material.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
material.addParameter(new NumberParameter('PointSize', 0.05))
material.addParameter(new NumberParameter('Rounded', 1.0))
material.addParameter(new MaterialFloatParam('BorderWidth', 0.2))
material.addParameter(new NumberParameter('Overlay', 0.0))
shaderLibrary.registerMaterialTemplate('FatPointsShader', material)
