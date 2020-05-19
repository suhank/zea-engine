import { sgFactory } from '../SGFactory'
import { StringParameter } from './StringParameter.js'

/** Class representing a code parameter.
 * @extends StringParameter
 */
class CodeParameter extends StringParameter {
  /**
   * Create a code parameter.
   * @param {string} name - The name of the code parameter.
   * @param {any} value - The value of the parameter.
   */
  constructor(name, value = '') {
    super(name, value, 'String')
    this.lang = 'js'
  }

  /**
   * The setLanguage method.
   * @param {any} lang - The language value.
   */
  setLanguage(lang) {
    this.lang = lang
  }

  /**
   * The getLanguage method.
   * @return {any} - Returns the language.
   */
  getLanguage() {
    return this.lang
  }

  /**
   * The clone method constructs a new code parameter,
   * copies its values from this parameter and returns it.
   * @param {number} flags - The flags value.
   * @return {CodeParameter} - Returns a new cloned code parameter.
   */
  clone(flags) {
    const clonedParam = new CodeParameter(this.__name, this.__value)
    return clonedParam
  }
}

sgFactory.registerClass('CodeParameter', CodeParameter)

export { CodeParameter }
