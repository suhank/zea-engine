import { Vec3 } from '../../Math'
import { Parameter } from './Parameter.js'

/** Class representing a Vec3 parameter.
 * @extends Parameter
 */
class Vec3Parameter extends Parameter {
  /**
   * Create a Vec2 parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   * @param {any} range - The range value.
   */
  constructor(name, value, range = undefined) {
    super(name, value ? value : new Vec3(), 'Vec3')
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new Vec3Parameter(this.__name, this.__value.clone())
    return clonedParam
  }
}

export { Vec3Parameter }
