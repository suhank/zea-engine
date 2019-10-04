import { Signal } from '../../Utilities'
import { Parameter } from './Parameter.js'
import { sgFactory } from '../SGFactory.js'

/** Class representing an image parameter.
 * @extends Parameter
 */
class ImageParameter extends Parameter {
  /**
   * Create an image parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value, 'BaseImage')
    this.valueParameterValueChanged = new Signal()
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new ImageParameter(this.__name, this.__value)
    return clonedParam
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags)
    if (this.__value) {
      j.imageType = this.__value.constructor.name
    }
    return j
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  fromJSON(j, context, flags) {
    if (j.imageType) {
      this.__value = sgFactory.constructClass(j.imageType)
    }
    return super.fromJSON(j, context, flags)
  }
}

export { ImageParameter }
