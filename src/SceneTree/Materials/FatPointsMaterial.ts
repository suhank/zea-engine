import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class FatPointsMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  pointSizeParam: NumberParameter = new NumberParameter('PointSize', 1)
  roundedParam: NumberParameter = new NumberParameter('Rounded', 1)
  borderWidthParam: NumberParameter = new NumberParameter('BorderWidth', 0.2)
  overlayParam: NumberParameter = new NumberParameter('Overlay', 0.0)

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'FatPointsShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.pointSizeParam)
    this.addParameter(this.roundedParam)
    this.addParameter(this.borderWidthParam)
    this.addParameter(this.overlayParam)
  }
}
