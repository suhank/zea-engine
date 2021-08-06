import { MaterialColorParam, MaterialFloatParam, NumberParameter } from '..'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class SimpleSurfaceMaterial extends Material {
  constructor() {
    super('SimpleSurfaceShader', 'SimpleSurfaceShader') // TODO: check
    this.__shaderName = 'SimpleSurfaceShader'
    this.addParameter(new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5)))
    this.addParameter(new MaterialFloatParam('Opacity', 0.5, [0, 1]))
    this.addParameter(new NumberParameter('EmissiveStrength', 0.5, [0, 1]))

    this.__checkTransparency({})
  }

  get BaseColor(): MaterialColorParam {
    return <MaterialColorParam>this.getParameter('BaseColor')
  }

  get Opacity(): MaterialFloatParam {
    return <MaterialFloatParam>this.getParameter('Opacity')
  }
  get EmissiveStrength(): NumberParameter {
    return <NumberParameter>this.getParameter('EmissiveStrength')
  }
}
