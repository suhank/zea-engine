/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { BinReader } from '../BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
/**
 * Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const stringParam = new StringParameter('MyString', 'A String value goes here')
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(stringParam)
 * ```
 *
 * @extends Parameter
 */
class StringParameter extends Parameter<string> implements IBinaryReader {
  multiLine: boolean

  /**
   * Create a string parameter.
   * @param {string} name - The name of the material color parameter.
   * @param {string} value - The value of the parameter.
   */
  constructor(name: string = '', value: string = '') {
    super(name, value, 'String')
    this.multiLine = false
  }

  /**
   * Sets flag that indicates if the string contains new line feeds.
   *
   * @param {boolean} multiLine - The multiLine value.
   */
  setMultiLine(multiLine: boolean): void {
    this.multiLine = multiLine
  }

  /**
   * Returns multi-line flag value.
   *
   * @return {boolean} - The return value.
   */
  getMultiLine(): boolean {
    return this.multiLine
  }

  /**
   * Extracts the string value from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    this.value = reader.loadStr()
  }

  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {Record<string, boolean | undefined>} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, string | undefined> {
    return { value: this.value }
  }

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param {Record<string, boolean | undefined>} j - The json object this item must decode.
   * @param {Record<string, unknown>} context - The context value.
   */
  fromJSON(j: Record<string, string | undefined>, context?: Record<string, unknown>): void {
    this.value = j.value
    this.emit('valueChanged', { mode: 0 })
  }

  /**
   * The clone method constructs a new string parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {StringParameter} - Returns a new string parameter.
   */
  clone(): StringParameter {
    return new StringParameter(this.name, this.value)
  }
}

Registry.register('StringParameter', StringParameter)
Registry.register('Property_String', StringParameter)

export { StringParameter }
