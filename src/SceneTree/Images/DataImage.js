import { sgFactory } from '../SGFactory.js'
import { BaseImage } from '../BaseImage.js'

// let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

/** Class representing a data image.
 * @extends BaseImage
 */
class DataImage extends BaseImage {
  /**
   * Create a data image.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super()

    if (name == undefined) name = this.constructor.name
    this.__name = name
    this.format = 'RGBA'
    this.type = 'UNSIGNED_BYTE'
    this.__loaded = false

    // this.__data = new Uint8Array(4);
    this.width = 1
    this.height = 1
  }

  /**
   * The isLoaded method.
   * @return {any} - The return value.
   */
  isLoaded() {
    return this.__loaded
  }

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name
  }

  /**
   * The isStream method.
   * @return {boolean} - The return value.
   */
  isStream() {
    return false
  }

  /**
   * The setData method.
   * @param {any} width - The width value.
   * @param {any} height - The height value.
   * @param {any} data - The data value.
   */
  setData(width, height, data) {
    this.width = width
    this.height = height
    this.__data = data
    if (!this.__loaded) {
      this.__loaded = true
      this.emitEvent('loaded', {})
    } else this.emitEvent('updated', {})
  }

  /**
   * The getParams method.
   * @return {any} - The return value.
   */
  getParams() {
    const params = super.getParams()
    params['data'] = this.__data
    return params
  }
}

sgFactory.registerClass('DataImage2D', DataImage)
sgFactory.registerClass('DataImage', DataImage)

export { DataImage }
