import { BaseItem } from './BaseItem'

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
  width: number = 0
  height: number = 0
  format: string = 'RGB'
  type: string = 'UNSIGNED_BYTE'
  mipMapped: boolean = true

  protected wrapS: string = 'REPEAT'
  protected wrapT: string = 'REPEAT'
  protected minFilter: string = 'LINEAR'
  protected magFilter: string = 'LINEAR'
  loaded: boolean = false
  /**
   * Creates an instance of BaseImage.
   * @param {string} name - name of the item
   */
  constructor(name?: string) {
    super(name)
    this.on('parameterValueChanged', (event: Record<string, any>) => {
      this.emit('updated')
    })
  }

  /**
   * Returns true if loaded.
   * @private
   * @return {boolean} - Returns a boolean.
   */
  isLoaded(): boolean {
    return this.loaded
  }

  /**
   * Returns all parameters and class state values.
   *
   * @return {Record<string, any>} - The return value.
   */
  getParams(): Record<string, any> {
    return {
      type: this.type,
      format: this.format,
      width: this.width,
      height: this.height,
      wrapS: this.wrapS,
      wrapT: this.wrapT,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      mipMapped: this.mipMapped,
    }
  }
}

export { BaseImage }
