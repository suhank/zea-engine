import { sgFactory } from '../SGFactory'
import { StringParameter } from './StringParameter.js'

/**
 * Represents a specific type of parameter, that only stores string values.
 *
 * i.e.:
 * ```javascript
 * const booleanParam = new BooleanParameter('MyBoolean', true)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(booleanParam)
 * ```
 *
 * @extends StringParameter
 */
class CodeParameter extends StringParameter {
  /**
   * Creates a code parameter.
   * The default language is `js`.
   *
   * @param {string} name - The name of the code parameter.
   * @param {string} value - The value of the parameter.
   */
  constructor(name, value = '') {
    super(name, value, 'String')
    this.lang = 'js'
  }

  /**
   * Sets code language for parameter.
   *
   * @param {string} lang - The language value.
   */
  setLanguage(lang) {
    this.lang = lang
  }

  /**
   * Returns code language of parameter.
   *
   * @return {string} - Returns the language.
   */
  getLanguage() {
    return this.lang
  }

  /**
   * The clone method constructs a new code parameter,
   * copies its values from this parameter and returns it.
   *
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
