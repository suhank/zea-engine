import { Color } from '../Math/index'
import { BaseItem } from './BaseItem'
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

  /**
   * @member {ColorParameter} backgroundColorParam - Changes background color of the scene
  */
  backgroundColorParam: ColorParameter = new ColorParameter('BackgroundColor', new Color('#eeeeee')) // owned by viewport

  /**
   * @member {ImageParameter} envMapParam - The image displayed and used for the environment map.
  */
  envMapParam: ImageParameter = new ImageParameter('EnvMap')

  /**
   * @member {BooleanParameter} displayEnvMapParam - Boolean that determines whether or not the environment map should be displayed.
  */
  displayEnvMapParam: BooleanParameter = new BooleanParameter('Display EnvMap', false)

  /**
   * @member {NumberParameter} envMapLODParam - TODO
  */
  envMapLODParam: NumberParameter = new NumberParameter('EnvMapLOD', 0)

  constructor(name: string) {
    super(name)
    this.addParameter(this.backgroundColorParam)
    this.addParameter(this.envMapParam) // owned by scene
    this.addParameter(this.displayEnvMapParam) // owned by viewport
    this.addParameter(this.envMapLODParam) // deprecate
  }
}

export { SceneSettings }
