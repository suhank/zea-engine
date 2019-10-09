import { Signal } from '../../Utilities'
import { sgFactory } from '../SGFactory'
import { ValueSetMode, Parameter } from './Parameter.js'

/** Class representing a number parameter.
 * @extends Parameter
 */
class NumberParameter extends Parameter {
  /**
   * Create a color parameter.
   * @param {string} name - The name value.
   * @param {number} value - The value value.
   * @param {any} range - The range value.
   * @param {any} step - The step value.
   */
  constructor(name, value = 0, range = undefined, step = undefined) {
    super(name, value, 'Number')
    // The value might not have a range.
    if (range && !Array.isArray(range))
      console.error('Range value must be an array of 2 numbers.')
    this.__range = range
    this.__step = step
  }

  /**
   * The setValue method.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   */
  setValue(value, mode) {
    if (mode == ValueSetMode.USER_SETVALUE) {
      if (this.__range) {
        value = Math.clamp(value, this.__range[0], this.__range[1])
      }
      if (this.__step) {
        value = Math.round(value / this.__step) * this.__step
      }
    }
    super.setValue(value, mode)
  }

  /**
   * The getValue method.
   * @param {any} mode - The mode param.
   * @return {any} - The return value.
   */
  getValue(mode) {
    // Still not sure if we should clamp the output.
    // if(this.__range) {
    //     return Math.clamp(super.getValue(), this.__range[0], this.__range[1]);
    // }
    return super.getValue(mode)
  }

  /**
   * The getRange method.
   * @return {any} - The return value.
   */
  getRange() {
    return this.__range
  }

  /**
   * The setRange method.
   * @param {any} range - The range param.
   * @return {any} - The return value.
   */
  setRange(range) {
    // Should be an array [0, 20]
    this.__range = range
    return this
  }

  /**
   * The getStep method.
   * @return {any} - The return value.
   */
  getStep() {
    return this.__step
  }

  /**
   * The setStep method.
   * @param {any} step - The step param.
   * @return {any} - The return value.
   */
  setStep(step) {
    this.__step = step
    return this
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new NumberParameter(this.__name, this.__value)
    clonedParam.__range = this.__range
    clonedParam.__step = this.__step
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
    if (this.__range) j.range = this.__range
    if (this.__step) j.step = this.__step
    return j
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)
    if (j.range) this.__range = j.range
    if (j.step) this.__step = j.step
  }

  /**
   * The readBinary method.
   * @param {object} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader, context) {
    const value = reader.loadFloat32()
    this.setValue(value, ValueSetMode.DATA_LOAD)
  }
}

sgFactory.registerClass('NumberParameter', NumberParameter)
sgFactory.registerClass('Property_SInt32', NumberParameter)
sgFactory.registerClass('Property_UInt32', NumberParameter)
sgFactory.registerClass('Property_Float32', NumberParameter)

export { NumberParameter }
