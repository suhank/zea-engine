import { Color } from '../Math/index'
import { BaseItem } from './BaseItem-temp.js'
import { BooleanParameter, NumberParameter, ColorParameter, ImageParameter } from './Parameters/index'

/**
 * `BaseItem` type of class
 *
 * **Parameters**
 * * **BackgroundColor(`ColorParameter`):** Changes background color of the scene
 * * **EnvMap(`ImageParameter`):** _todo_
 * * **Display(`BooleanParameter`):** _todo_
 * * **EnvMapLOD(`NumberParameter`):** _todo_
 * @extends BaseItem
 */
class SceneSettings extends BaseItem {
  /**
   * Create scene settings.
   * @param {string} name - The name of the scene settings item.
   */
  constructor(name) {
    super(name)
    this.addParameter(new ColorParameter('BackgroundColor', new Color('#eeeeee')))
    this.addParameter(new ImageParameter('EnvMap'))
    this.addParameter(new BooleanParameter('Display EnvMap', false))
    this.addParameter(new NumberParameter('EnvMapLOD', 0))
  }
}

export { SceneSettings }
