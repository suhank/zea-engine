
import { sgFactory } from '../SGFactory'
import { StringParameter } from './StringParameter.js'

/** Class representing a string parameter.
 * @extends Parameter
 */
class CodeParameter extends StringParameter {
  /**
   * Create a string parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value = '') {
    super(name, value, 'String')
    this.lang = 'js'
  }

  /**
   * The setLanguage method.
   * @param {any} lang - The Language param.
   */
  setLanguage(lang) {
    this.lang = lang
  }

  /**
   * The getLanguage method.
   * @return {any} - The return value.
   */
  getLanguage() {
    return this.lang
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new CodeParameter(this.__name, this.__value)
    return clonedParam
  }

}

sgFactory.registerClass('CodeParameter', CodeParameter)

export { CodeParameter }
