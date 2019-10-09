import { Mat3 } from '../../Math'
import { Parameter } from './Parameter.js'

/** Class representing a Mat3 parameter.
 * @extends Parameter
 */
class Mat3Parameter extends Parameter {
  /**
   * Create a Mat3 parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value ? value : new Mat3(), 'Mat3')
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new Mat3Parameter(this.__name, this.__value.clone())
    return clonedParam
  }
}

export { Mat3Parameter }
