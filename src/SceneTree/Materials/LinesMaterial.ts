import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { NumberParameter } from '../Parameters/NumberParameter'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class LinesMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))

  opacityParam: MaterialFloatParam = new MaterialFloatParam('Opacity', 0.7, [0, 1])
  overlayParam: MaterialFloatParam = new MaterialFloatParam('Overlay', 0.000001) // Provide a slight overlay so lines draw over meshes

  stippleScaleParam: NumberParameter = new NumberParameter('StippleScale', 0.01)
  stippleValueParam: NumberParameter = new NumberParameter('StippleValue', 0, [0, 1])

  occludedStippleValueParam: NumberParameter = new NumberParameter('OccludedStippleValue', 1.0, [0, 1])
  constructor(name?: string) {
    super(name)
    this.__shaderName = 'LinesShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.opacityParam)
    this.addParameter(this.overlayParam)
    this.addParameter(this.stippleScaleParam)
    this.addParameter(this.stippleValueParam)
    this.addParameter(this.occludedStippleValueParam)
  }
}

Registry.register('LinesMaterial', LinesMaterial)
