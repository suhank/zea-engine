/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import { Float32, UInt32, SInt32, MathFunctions } from '../../Utilities/MathFunctions'
import { Registry } from '../../Registry'
import { AttrValue } from '../../Math/AttrValue'

/**
 * Class representing an attribute.
 */
class Attribute {
  protected __data: TypedArray
  protected __dataType: AttrValue | number
  protected __defaultElementValue: number
  protected __dimension: number
  normalized: boolean

  /**
   * Create an attribute.
   * @param {AttrValue|number} dataType - The dataType value.
   * @param {number|TypedArray} expectedSize - The expectedSize value.
   * @param {number} defaultValue - The defaultValue value.
   */
  constructor(dataType: AttrValue | number, expectedSize: number | TypedArray, defaultValue = Number.MAX_VALUE) {
    this.__dataType = dataType
    this.normalized = false

    if (typeof dataType != 'number') this.__dimension = this.__dataType.numElements() // TODO:
    else {
      switch (dataType) {
        case Float32:
        case UInt32:
        case SInt32:
          this.__dimension = 1
          break
        default:
          throw new Error('Invalid data type for attribute:' + dataType)
      }
    }
    this.__defaultElementValue = defaultValue

    if (typeof expectedSize != 'number') this.__data = expectedSize
    else {
      this.__data = new Float32Array(expectedSize * this.__dimension)
      this.initRange(0)
    }
  }

  /**
   * Resizes current data array to to a new size.
   * In case the new size is bigger than current size, the new values are filled up with default ones.
   *
   * @param {number} size - The size value.
   */
  resize(size: number): void {
    const prevLength = this.__data.length
    const newLength = size * this.__dimension

    if (newLength > prevLength) {
      const data = new Float32Array(newLength)
      data.set(this.__data)
      this.__data = data
      this.initRange(prevLength)
    } else if (newLength < prevLength) {
      this.__data = this.__data.slice(0, newLength)
    } else {
      // No change in size. (this can happen when an attribute was already loaded with data.)
    }
  }

  /**
   * Fills up data values with default ones starting from the specified index.
   *
   * @param {number} start - The start value.
   */
  initRange(start: number): void {
    // Initialize the values to invalid values.
    for (let i = start; i < this.__data.length; i++) {
      this.__data[i] = this.__defaultElementValue
    }
  }

  /**
   * Returns the count of attribute values in the data.
   *
   * @return {number} - The return value.
   */
  getCount(): number {
    return this.__data.length / this.__dimension
  }

  /**
   * Returns the count of attribute values in the data.
   *
   * @return {number} - The return value.
   */
  get length(): number {
    return this.__data.length / this.__dimension
  }

  /**
   * Returns the type of attribute value.
   *
   * @return {AttrValue|number} - The return value.
   */
  get dataType(): AttrValue | number {
    return this.__dataType
  }

  /**
   * Returns current data array.
   *
   * @return {TypedArray} - The return value.
   */
  get data(): TypedArray {
    return this.__data
  }

  /**
   * Sets data value.
   *
   * @param {TypedArray} data - The data value.
   */
  set data(data: TypedArray) {
    this.__data = data
  }

  /**
   * Returns the number of elements stored in each `AttrValue`.
   *
   * @return {number} - The return value.
   */
  get numElements(): number {
    return this.__dimension
  }

  /**
   * Returns data value of the specified index.
   *
   * @param {number} index - The index value.
   * @return {number} - The return value.
   */
  getFloat32Value(index: number): number {
    return this.__data[index]
  }

  /**
   * Sets data value in the specified index.
   *
   * @param {number} index - The index value.
   * @param {number} value - The value param.
   */
  setFloat32Value(index: number, value: number): void {
    this.__data[index] = value
  }

  /**
   * Returns the `AttrValue` object placed in the specified index.
   *
   * @param {number} index - The index value.
   * @return {AttrValue} - The return value.
   */
  getValueRef(index: number): AttrValue {
    const numElems = this.__dimension
    if (index >= this.__data.length / numElems)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.__data.length / 3)
    return this.__dataType.createFromBuffer(this.__data.buffer, index * numElems * 4)
  }

  /**
   * Sets `AttrValue` object in the specified index.
   *
   * @param {number} index - The index value.
   * @param {AttrValue} value - The value param.
   */
  setValue(index: number, value: AttrValue): void {
    const numElems = this.__dimension
    if (index >= this.__data.length / numElems)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.__data.length / 3)
    this.__dataType.createFromBuffer(this.__data.buffer, index * numElems * 4).setFromOther(value)
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @return {object} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    return {
      data: Array.from(this.__data),
      dataType: Registry.getBlueprintName(this.__dataType),
      defaultValue: this.__defaultElementValue,
      length: this.__data.length / this.__dimension,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   */
  fromJSON(j: Record<string, any>): void {
    const data = j.data.map((dataElement: any) =>
      MathFunctions.isNumeric(dataElement) ? dataElement : Number.POSITIVE_INFINITY
    )
    this.__data = Float32Array.from(data)
  }

  /**
   * Returns the string representation of the object's state.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}

export { Attribute }
