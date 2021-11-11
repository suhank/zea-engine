import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class FatLinesMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  opacityParam: NumberParameter = new NumberParameter('Opacity', 1.0)
  lineThicknessParam: NumberParameter = new NumberParameter('LineThickness', 0.01)
  overlayParam: NumberParameter = new NumberParameter('Overlay', 0.0)
  constructor(name?: string) {
    super(name)
    this.__shaderName = 'FatLinesShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.opacityParam)
    this.addParameter(this.overlayParam)
    this.addParameter(this.lineThicknessParam)
  }
}
