import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam'
import { Color } from '../../Math/Color'
import { Material } from '../Material'
import { CloneContext } from '../CloneContext'

export class SimpleSurfaceMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  opacityParam: MaterialFloatParam = new MaterialFloatParam('Opacity', 1, [0, 1])
  emissiveStrengthParam: MaterialFloatParam = new MaterialFloatParam('EmissiveStrength', 0, [0, 1])
  constructor(name?: string) {
    super(name)
    this.__shaderName = 'SimpleSurfaceShader'
    this.addParameter(this.baseColorParam)
    this.addParameter(this.opacityParam)
    this.addParameter(this.emissiveStrengthParam)
  }

  /**
   * The clone method constructs a new material, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned material.
   */
  clone(context?: CloneContext): SimpleSurfaceMaterial {
    const cloned = new SimpleSurfaceMaterial()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('SimpleSurfaceMaterial', SimpleSurfaceMaterial)
