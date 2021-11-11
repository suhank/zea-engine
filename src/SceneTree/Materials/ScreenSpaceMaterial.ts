import { Registry } from '../../Registry'
import { MaterialColorParam } from '../Parameters/MaterialColorParam'
import { Color } from '../../Math/Color'
import { Material } from '../Material'

export class ScreenSpaceMaterial extends Material {
  baseColorParam: MaterialColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5))
  constructor(name?: string) {
    super(name)
    this.__shaderName = 'ScreenSpaceShader'
    this.addParameter(this.baseColorParam)
  }
}

Registry.register('ScreenSpaceMaterial', ScreenSpaceMaterial)
