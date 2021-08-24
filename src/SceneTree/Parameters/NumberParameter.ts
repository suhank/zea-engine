/* eslint-disable @typescript-eslint/no-unused-vars */
import { BinReader } from '../../SceneTree/BinReader'
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'

/**
 * Represents a specific type of parameter, that only stores numeric values.
 *
 * ```javascript
 * const numberParam = new NumberParameter('MyNumber', 15)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(numberParam)
 * ```
 *
 * @extends Parameter
 */
class NumberParameter extends Parameter<number> implements IBinaryReader {
  protected range?: Array<number> // TODO: should create type with two fields for range. Must change how range is used.
  protected step?: number

  /**
   * Create a number parameter.
   * @param {string} name - The name of the number parameter.
   * @param {number} value - The value of the parameter.
   * @param {number[]} range - An array with two numbers. If defined, the parameter value will be clamped.
   * @param {number} step - The step value. If defined, the parameter value will be rounded to the nearest integer.
   */
  constructor(name: string = '', value = 0, range?: number[], step?: number) {
    super(name, value, 'Number')
    this.range = range
    this.step = step
  }

  /**
   * Returns the range to which the parameter is restrained.
   *
   * @return {number[]} - The return value.
   */
  getRange(): number[] | undefined {
    return this.range
  }

  /**
   * Sets the range to which the parameter is restrained.
   *
   * @param {number[]} range - The range value.
   */
  setRange(range: number[]): void {
    this.range = range
  }

  /**
   * Returns the step number, which is the one used for rounding.
   *
   * @return {number} - The return value.
   */
  getStep(): number | undefined {
    return this.step
  }

  /**
   * Returns step value.
   *
   * @param {number} step - The step value.
   */
  setStep(step: number): void {
    this.step = step
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    const json = super.toJSON(context)
    if (this.range) j.range = this.range
    if (this.step) j.step = this.step
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, unknown>} j - The json object this item must decode.
   * @param {Record<string, unknown>} context - The context value.
   */
  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    this.value = j.value as number
    if (j.range) this.range = j.range as number[]
    if (j.step) this.step = j.step as number
  }

  /**
   * Extracts a number value from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    this.value = reader.loadFloat32()
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new number parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {NumberParameter} - Returns a new number parameter.
   */
  clone(): NumberParameter {
    console.log('clone:: ', this.range)
    return new NumberParameter(this.name, this.value, this.range, this.step)
  }
}

Registry.register('NumberParameter', NumberParameter)
Registry.register('Property_SInt32', NumberParameter)
Registry.register('Property_UInt32', NumberParameter)
Registry.register('Property_Float32', NumberParameter)

export { NumberParameter }
