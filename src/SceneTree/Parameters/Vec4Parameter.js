import { Vec4 } from '../../Math';
import { Parameter } from './Parameter.js';

/** Class representing a Vec4 parameter.
 * @extends Parameter
 */
class Vec4Parameter extends Parameter {
  /**
   * Create a Vec2 parameter.
   * @param {any} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value ? value : new Vec4(), 'Vec4');
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new Vec4Parameter(this.__name, this.__value.clone());
    return clonedParam;
  }
}

export { Vec4Parameter };
