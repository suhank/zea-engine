import { Signal } from '../../Utilities';
import { Parameter } from './Parameter.js';
import { sgFactory } from '../SGFactory';

/** Class representing a boolean parameter.
 * @extends Parameter
 */
class BooleanParameter extends Parameter {
  /**
   * Create a boolean parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value, 'Boolean');
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new BooleanParameter(this.__name, this.__value);
    return clonedParam;
  }
}

sgFactory.registerClass('BooleanParameter', BooleanParameter);

export { BooleanParameter };
