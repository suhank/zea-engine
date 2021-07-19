import { Attribute } from './Attribute'
import { Vec3 } from '../../Math/Vec3'
import { Registry } from '../../Registry'

/**
 * Class representing an attribute.
 */
class Vec3Attribute extends Attribute {
  /**
   * Create a Vec3Attribute.
   */
  constructor() {
    super('Vec3', 3)
    this.normalized = false
  }

  /**
   * Returns the `T` object placed in the specified index.
   *
   * @param {number} index - The index value.
   */
  getValueRef(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, this.stride)
    return new Vec3(valueData)
  }

  /**
   * Returns the Vec3 from the specified index.
   *
   * @param {number} index - The index value.
   * @return Vec3 - The return value.
   */
  getValue(index: number): Vec3 {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, this.stride)
    return new Vec3(valueData)
  }

  /**
   * Sets Vec3 in the specified index.
   *
   * @param {number} index - The index value.
   * @param {Vec3} value - The value param.
   */
  setValue(index: number, value: Vec3): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }
}

export { Vec3Attribute }
