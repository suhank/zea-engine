import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class StandardSurfaceMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  normalParam: MaterialColorParam = new MaterialColorParam('Normal', new Color(1.0, 1, 0.5))
  ambientOcclusion: MaterialFloatParam = new MaterialFloatParam('AmbientOcclusion', 1, [0, 1])
  metallicParam: MaterialFloatParam = new MaterialFloatParam('Metallic', 0.05, [0, 1])

  roughnessParam: MaterialFloatParam = new MaterialFloatParam('Roughness', 0.5, [0, 1])
  reflectanceParam: MaterialFloatParam = new MaterialFloatParam('Reflectance', 0.5, [0, 1])
  emissiveStrengthParam: MaterialFloatParam = new MaterialFloatParam('EmissiveStrength', 0, [0, 1])
  opacityParam: MaterialFloatParam = new MaterialFloatParam('Opacity', 1, [0, 1])

  constructor(name?: string) {
    super(name)
    this.__shaderName = 'StandardSurfaceShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.normalParam)
    this.addParameter(this.ambientOcclusion)
    this.addParameter(this.metallicParam)
    this.addParameter(this.roughnessParam)
    this.addParameter(this.reflectanceParam)
    this.addParameter(this.emissiveStrengthParam)
    this.addParameter(this.opacityParam)
  }
}

Registry.register('StandardSurfaceMaterial', StandardSurfaceMaterial)
