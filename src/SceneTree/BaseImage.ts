import { BaseItem } from './BaseItem'

/**
 * Represents a 2D image item, containing width and height.
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
  loaded: boolean = false
  mipMapped: boolean = true
  wrapS: string = 'REPEAT'
  wrapT: string = 'REPEAT'
  minFilter: string = 'LINEAR'
  magFilter: string = 'LINEAR'

  /**
   * Creates an instance of BaseImage.
   * @param name - name of the item
   */
  constructor(name?: string) {
    super(name)
    this.on('parameterValueChanged', () => {
      this.emit('updated')
    })
  }

  /**
   * Returns true if loaded.
   * @private
   * @return - Returns a boolean.
   */
  isLoaded(): boolean {
    return this.loaded
  }

  /**
   * Returns all parameters and class state values.
   *
   * @return - The return value.
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
