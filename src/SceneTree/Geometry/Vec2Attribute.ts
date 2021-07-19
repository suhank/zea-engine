import { Attribute } from './Attribute'
import { Vec2 } from '../../Math/Vec2'

/**
 * Class representing an attribute.
 */
class Vec2Attribute extends Attribute {
  /**
   * Create a Vec2Attribute.
   */
  constructor() {
    super('Vec2', 2)
    this.normalized = false
  }

  /**
   * Returns the `T` object placed in the specified index.
   * @deprecated
   *
   * @param {number} index - The index value.
   */
  getValueRef(index: number): Vec2 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, this.stride)
    return new Vec2(valueData)
  }

  /**
   * Returns the Vec2 from the specified index.
   *
   * @param {number} index - The index value.
   * @return Vec2 - The return value.
   */
  getValue(index: number): Vec2 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, this.stride)
    return new Vec2(valueData)
  }

  /**
   * Sets Vec2 in the specified index.
   *
   * @param {number} index - The index value.
   * @param {Vec2} value - The value param.
   */
  setValue(index: number, value: Vec2): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }
}

export { Vec2Attribute }
