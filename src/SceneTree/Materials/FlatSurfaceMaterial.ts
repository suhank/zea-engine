import { MaterialColorParam } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class FlatSurfaceMaterial extends Material {
  constructor() {
    super('FlatSurfaceShader')
    this.__shaderName = 'FlatSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))

    this.__checkTransparency({})
  }

  get BaseColor(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('BaseColor')
  }

  setShaderName(shaderName: string) {
    throw ' Cannot change shader name'
  }
}
