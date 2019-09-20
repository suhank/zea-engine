import { Vec2 } from '../../Math';
import { Parameter } from './Parameter.js';

/** Class representing a Vec2 parameter.
 * @extends Parameter
 */
class Vec2Parameter extends Parameter {
  /**
   * Create a Vec2 parameter.
   * @param {any} name - The name value.
   * @param {any} value - The value value.
   * @param {any} range - The range value.
   */
  constructor(name, value, range = undefined) {
    super(name, value ? value : new Vec2(), 'Vec2');
    this.__range = range;
  }

  /**
   * The getRange method.
   * @return {any} - The return value.
   */
  getRange() {
    // Range should be an array of 2 vec2s. [min(x,y), max(x,y)]
    return this.__range;
  }

  /**
   * The __setRange method.
   * @param {any} range - The range param.
   * @private
   */
  __setRange(range) {
    // Should be an array [0, 20]
    this.__range = range;
    this.rangeChanged.emit();
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new Vec2Parameter(this.__name, this.__value.clone());
    return clonedParam;
  }
}

export { Vec2Parameter };
