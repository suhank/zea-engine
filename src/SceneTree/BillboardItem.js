import { Color } from '../Math/index'
import {
  BooleanParameter,
  NumberParameter,
  ColorParameter,
  ImageParameter,
} from './Parameters/index'
import { TreeItem } from './TreeItem.js'

/** Class representing a billboard item in a scene tree.
 * @extends TreeItem
 */
class BillboardItem extends TreeItem {
  /**
   * Create a billboard item.
   * @param {string} name - The name of the billboard item.
   * @param {any} image - The image value.
   */
  constructor(name, image) {
    super(name)
    const imageParam = this.addParameter(new ImageParameter('Image'))
    if (image) imageParam.setValue(image) // Note: this dirties the param and will ensure it is saved to JSON
    this.addParameter(new NumberParameter('PixelsPerMeter', 1000.0))
    this.addParameter(new NumberParameter('Alpha', 1.0))
    this.addParameter(new ColorParameter('Color', new Color(1.0, 1.0, 1.0)))
    this.addParameter(new BooleanParameter('AlignedToCamera', false))
  }
}

import { sgFactory } from './SGFactory.js'
sgFactory.registerClass('BillboardItem', BillboardItem)

export { BillboardItem }
