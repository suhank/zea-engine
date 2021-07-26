import { BaseItem } from './BaseItem'

import { BooleanParameter } from './Parameters/index'

/**
 * Represents a 2D image item, containing width and height.
 *
 * **Parameters**
 * * **AlphaFromLuminance(`BooleanParameter`):** Sets alpha chanel to the luminance of the image and all color channels to `0`.
 * * **Invert(`BooleanParameter`):** Horizontally flips the image(Basically inverting X pixels).
 * * **FlipY(`BooleanParameter`):** Vertically flips the image, meaning that it would be upside down if enabled.
 *
 * **Events**
 * * **updated:** Triggered when the value of any of the parameters listed above changes.
 *
 * @extends BaseItem
 */
class BaseImage extends BaseItem {
  /**
   * Creates an instance of BaseImage.
   * @param {string} name - name of the item
   */
  constructor(name) {
    super(name)
    this.width = 0
    this.height = 0
    this.format = 'RGB'
    this.type = 'UNSIGNED_BYTE'
    this.wrapS = 'CLAMP_TO_EDGE'
    this.wrapT = 'CLAMP_TO_EDGE'
    this.minFilter = 'LINEAR'
    this.magFilter = 'LINEAR'

    this.on('parameterValueChanged', (event) => {
      this.emit('updated')
    })

    // Note: Many parts of the code assume a 'loaded' signal.
    // We should probably deprecate and use only 'updated'.
    // Instead we should start using a loaded Promise.
    this.loaded = false
  }

  /**
   * Returns true if loaded.
   * @private
   * @return {boolean} - Returns a boolean.
   */
  isLoaded() {
    return true
  }

  /**
   * Returns all parameters and class state values.
   *
   * @return {object} - The return value.
   */
  getParams() {
    return {
      type: this.type,
      format: this.format,
      width: this.width,
      height: this.height,
      wrapS: this.wrapS,
      wrapT: this.wrapT,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
    }
  }
}

export { BaseImage }
