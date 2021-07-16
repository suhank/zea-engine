/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-jsdoc */
import { Float32, UInt32, SInt32, MathFunctions } from '../../Utilities/MathFunctions'
import { Registry } from '../../Registry'
// import { AttrValue } from '../../Math/AttrValue'

// Attribute<Vec3, Float32Array>()
// new Attribute<Vec3, Float32Array>('Vec3')
// const glslTypes = {
//   bool: Boolean,
//   int: SInt32,
//   uint: UInt32,
//   float: Float32,
//   ivec2: Vec2,
//   ivec3: Vec3,
//   ivec4: Vec4,
//   vec2: Vec2,
//   vec3: Vec3,
//   vec4: Vec4,
//   color: Color,
//   mat3: Mat3,
//   mat4: Mat4,
//   sampler2D: BaseImage,
//   samplerCube: BaseImage,
// }

// const glslTypes = {
//   Vec3 : 3,

// }

interface AttrValue {
  setElementValue(index: number, elemValue: number)
  getElementValue(index: number): number
}

function createTypedArray<U extends TypedArray>(c: new (size: number) => U, size: number): U {
  return new c(size)
}

/**
 * Class representing an attribute.
 */
class Attribute {
  protected __data: Float32Array
  protected __dataTypeName: string
  protected __stride: number
  protected __defaultElementValue: number
  normalized: boolean

  /**
   * Create an attribute.
   * @param {number} stride - The dataType value.
   * @param {number} initialSize - The initialSize value.
   * @param {number} defaultValue - The defaultValue value.
   */
  constructor(stride: number, initialSize: number, defaultValue = Number.MAX_VALUE) {
    this.normalized = false
    this.__stride = stride
    this.__defaultElementValue = defaultValue
    this.__data = new Float32Array(initialSize * stride)
    this.initRange(0)
  }

  /**
   * Resizes current data array to to a new size.
   * In case the new size is bigger than current size, the new values are filled up with default ones.
   *
   * @param {number} size - The size value.
   */
  resize(size: number): void {
    const prevLength = this.__data.length
    const newLength = size * this.__stride

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
    return this.__data.length / this.__stride
  }

  /**
   * Returns the count of attribute values in the data.
   *
   * @return {number} - The return value.
   */
  get length(): number {
    return this.__data.length / this.__stride
  }

  /**
   * Returns the type of attribute value.
   *
   * @return {T} - The return value.
  get dataType(): T {
    return this.sampleValue.constructor
  }
   */

  /**
   * Returns current data array.
   *
   * @return {TypedArray} - The return value.
   */
  get data(): TypedArray {
    return this.__data
  }

  /**
   * Returns the number of elements stored in each `T`.
   *
   * @return {number} - The return value.
   */
  get numElements(): number {
    return this.__stride
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
   * Returns the `T` object placed in the specified index.
   * @deprecated
   *
   * @param {number} index - The index value.
   */
  getValueRef<T extends AttrValue>(c: { new (arr: ArrayBuffer, byteOffset: number): T }, index: number) : void {
    throw new Error(" getValueRef is deprecated. Please use 'getValue' instead.")
  }

  /**
   * Returns the `T` object placed in the specified index.
   *
   * @param {number} index - The index value.
   * @return {T} - The return value.
   */
  getValue<T extends AttrValue>(c: { new (): T }, index: number): T {
    if (index >= this.__data.length / this.__stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.__data.length / 3)
    const value = new c()
    const offset = index * this.__stride
    for (let i = 0; i < this.__stride; i++) value.setElementValue(i, this.__data[offset + i])
    return value
  }

  /**
   * Sets `T` object in the specified index.
   *
   * @param {number} index - The index value.
   * @param {T} value - The value param.
   */
  setValue<T extends AttrValue>(index: number, value: T): void {
    if (index >= this.__data.length / this.__stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.__data.length / 3)

    const offset = index * this.__stride
    for (let i = 0; i < this.__stride; i++) this.__data[offset + i] = value.getElementValue(i)
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
      dataType: this.__dataTypeName,
      defaultValue: this.__defaultElementValue,
      length: this.__data.length / this.__stride,
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
