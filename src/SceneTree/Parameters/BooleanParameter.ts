/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { BinReader } from '../BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'

/**
 * Represents a specific type of parameter, that only stores `boolean` values.
 *
 * i.e.:
 * ```javascript
 * const booleanParam = new BooleanParameter('MyBoolean', true)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(booleanParam)
 * ```
 * @extends Parameter
 */
class BooleanParameter extends Parameter<boolean> implements IBinaryReader {
  /**
   * Creates a new parameter with `Boolean` data type.
   *
   * @param {string} name - The name of the boolean parameter.
   * @param {boolean} value - The value of the parameter.
   */
  constructor(name: string = '', value?: boolean) {
    super(name, value != undefined ? value : false, 'Boolean')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Loads the boolean values from the binary buffer.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    this.__value = reader.loadUInt8() != 0
  }

  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, any> {
    return { value: this.__value}
  }

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, unknown>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void {
    this.__value = <boolean>j.value
    this.emit('valueChanged', { mode: 0 })
  }

  /**
   * The clone method constructs a new parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {BooleanParameter} - Returns a new cloned parameter.
   */
  clone(): BooleanParameter {
    return new BooleanParameter(this.name, this.__value)
  }
}

Registry.register('BooleanParameter', BooleanParameter)
Registry.register('Property_Boolean', BooleanParameter)

export { BooleanParameter }
