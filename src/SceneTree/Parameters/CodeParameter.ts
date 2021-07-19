/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { StringParameter } from './StringParameter'

const DEFAULT_LANG = 'js'
/**
 * Represents a specific type of parameter, that only stores `string` values.
 *
 * i.e.:
 * ```javascript
 * const codeStr = `const sayHello = () => console.log('Hello World')`
 * const codeParam = new CodeParameter('MyCode', codeStr)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(codeParam)
 * ```
 *
 * @deprecated
 * @extends StringParameter
 */
class CodeParameter extends StringParameter {
  protected lang: string

  /**
   * Creates a code parameter.
   * The default language is `js`.
   *
   * @param {string} name - The name of the code parameter.
   * @param {string} value - The value of the parameter.
   */
  constructor(name: string = '', value = '') {
    super(name, value)
    this.lang = DEFAULT_LANG
  }

  /**
   * Sets code language for parameter.
   *
   * @param {string} lang - The language value.
   */
  setLanguage(lang: string): void {
    this.lang = lang
  }

  /**
   * Returns code language of parameter.
   *
   * @return {string} - Returns the language.
   */
  getLanguage(): string {
    return this.lang
  }

  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {Record<string, boolean | undefined>} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, string | undefined> {
    return { value: this.value, lang: this.lang }
  }

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param {Record<string, boolean | undefined>} j - The json object this item must decode.
   * @param {Record<string, unknown>} context - The context value.
   */
  fromJSON(j: Record<string, string | undefined>, context?: Record<string, unknown>): void {
    this.value = j.value
    this.lang = j.lang || DEFAULT_LANG

    this.emit('valueChanged', { mode: 0 })
  }

  /**
   * The clone method constructs a new code parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {CodeParameter} - Returns a new cloned code parameter.
   */
  clone(): CodeParameter {
    const clonedParam = new CodeParameter(this.name, this.value)
    clonedParam.setLanguage(this.lang)
    return clonedParam
  }
}

Registry.register('CodeParameter', CodeParameter)

export { CodeParameter }
