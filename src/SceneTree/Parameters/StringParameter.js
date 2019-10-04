import { Signal } from '../../Utilities'
import { sgFactory } from '../SGFactory'
import { Parameter, ValueSetMode } from './Parameter.js'

/** Class representing a string parameter.
 * @extends Parameter
 */
class StringParameter extends Parameter {
  /**
   * Create a string parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value = '') {
    super(name, value, 'String')
    this.multiLine = false
  }

  /**
   * The setMultiLine method.
   * @param {any} multiLine - The multiLine param.
   */
  setMultiLine(multiLine) {
    this.multiLine = multiLine
  }

  /**
   * The getMultiLine method.
   * @return {any} - The return value.
   */
  getMultiLine() {
    return this.multiLine
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new StringParameter(this.__name, this.__value)
    return clonedParam
  }

  /**
   * The readBinary method.
   * @param {object} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader, context) {
    const value = reader.loadStr()
    this.setValue(value, ValueSetMode.DATA_LOAD)
  }
}

sgFactory.registerClass('StringParameter', StringParameter)
sgFactory.registerClass('Property_String', StringParameter)

export { StringParameter }
