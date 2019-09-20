import { Color } from '../../Math';
import { sgFactory } from '../SGFactory';
import { Parameter, ValueSetMode } from './Parameter.js';

/** Class representing a color parameter.
 * @extends Parameter
 */
class ColorParameter extends Parameter {
  /**
   * Create a color parameter.
   * @param {any} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, value ? value : new Color(), 'Color');
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new ColorParameter(this.__name, this.__value.clone());
    return clonedParam;
  }

  /**
   * The readBinary method.
   * @param {any} reader - The reader param.
   * @param {any} context - The context param.
   */
  readBinary(reader, context) {
    const value = reader.loadRGBAFloat32Color();
    // If the value is in linear space, then we should convert it to gamma space.
    // Note: !! this should always be done in preprocessing...
    value.applyGamma(2.2);

    this.setValue(value, ValueSetMode.DATA_LOAD);
  }
}

sgFactory.registerClass('ColorParameter', ColorParameter);

export { ColorParameter };
