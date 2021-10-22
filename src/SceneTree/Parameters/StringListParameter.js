import { Parameter } from './Parameter.js'
import { Registry } from '../../Registry'

/**
 * A parameter for storing an array of string values.
 *
 * @extends Parameter
 */
class StringListParameter extends Parameter {
  /**
   * Create a string parameter.
   * @param {string} name - The name of the material color parameter.
   * @param {string} value - The value of the parameter.
   */
  constructor(name, value = []) {
    super(name, value, 'String[]')
    this.multiLine = false
  }

  /**
   * Extracts the string value from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context) {
    this.__value = reader.loadStrArray()
  }

  /**
   * The clone method constructs a new string parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {StringListParameter} - Returns a new string parameter.
   */
  clone() {
    const clonedParam = new StringListParameter(this.__name, this.__value)
    return clonedParam
  }
}

Registry.register('StringListParameter', StringListParameter)
Registry.register('Property_StringList', StringListParameter)

export { StringListParameter }
