import { Attribute } from './Attribute'
import { Vec4 } from '../../Math/Vec4'

/**
 * Class representing an attribute.
 */
class Vec4Attribute extends Attribute {
  /**
   * Create a Vec4Attribute.
   */
  constructor() {
    super('Vec4', 4)
    this.normalized = false
  }

  /**
   * Returns the `T` object placed in the specified index.
   * @deprecated
   *
   * @param {number} index - The index value.
   */
  getValueRef(index: number): Vec4 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, this.stride)
    return new Vec4(valueData)
  }

  /**
   * Returns the Vec4 from the specified index.
   *
   * @param {number} index - The index value.
   * @return Vec4 - The return value.
   */
  getValue(index: number): Vec4 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, this.stride)
    return new Vec4(valueData)
  }

  /**
   * Sets Vec4 in the specified index.
   *
   * @param {number} index - The index value.
   * @param {Vec4} value - The value param.
   */
  setValue(index: number, value: Vec4): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }
}

export { Vec4Attribute }
