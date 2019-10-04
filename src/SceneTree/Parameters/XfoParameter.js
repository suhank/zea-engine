import { Xfo } from '../../Math'
import { Parameter } from './Parameter.js'

/** Class representing a Xfo parameter.
 * @extends Parameter
 */
class XfoParameter extends Parameter {
  /**
   * Create a Xfo parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value ? value : new Xfo(), 'Xfo')
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new XfoParameter(this.__name, this.__value.clone())
    return clonedParam
  }
}

export { XfoParameter }
