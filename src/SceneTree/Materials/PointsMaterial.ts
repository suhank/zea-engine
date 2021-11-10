import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class PointsMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))

  pointSizeParam: NumberParameter = new NumberParameter('PointSize', 2)
  overlayParam: MaterialFloatParam = new MaterialFloatParam('Overlay', 0.00002) // Provide a slight overlay so lines draw over meshes

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'PointsShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.pointSizeParam)
    this.addParameter(this.overlayParam)
  }
}
