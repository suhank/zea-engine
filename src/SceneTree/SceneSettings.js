import { Color } from '../Math'
import { BaseItem } from './BaseItem.js'
import { NumberParameter, ColorParameter, ImageParameter } from './Parameters'

class SceneSettings extends BaseItem {
  constructor(name) {
    super(name)
    this.addParameter(
      new ColorParameter('BackgroundColor', new Color('#808080'))
    )
    this.addParameter(new ImageParameter('EnvMap'))
    this.addParameter(new NumberParameter('EnvMapLOD', 0))
  }
}

export { SceneSettings }
