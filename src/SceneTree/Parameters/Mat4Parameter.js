import { Mat4 } from '../../Math'
import { Parameter } from './Parameter.js'

/** Class representing a Mat4 parameter.
 * @extends Parameter
 */
class Mat4Parameter extends Parameter {
  /**
   * Create a Mat4 parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value ? value : new Mat4(), 'Mat4')
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new Mat4Parameter(this.__name, this.__value.clone())
    return clonedParam
  }
}

export { Mat4Parameter }
