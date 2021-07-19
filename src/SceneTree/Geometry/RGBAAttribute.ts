import { Attribute } from './Attribute'
import { RGBA } from '../../Math/RGBA'

/**
 * Class representing an attribute.
 */
class RGBAAttribute extends Attribute {
  /**
   * Create a RGBAAttribute.
   */
  constructor() {
    super('RGBA', 4)
    this.normalized = false
  }

  /**
   * Returns the `T` object placed in the specified index.
   * @deprecated
   *
   * @param {number} index - The index value.
   */
  getValueRef(index: number): RGBA {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, this.stride)
    return new RGBA(valueData)
  }

  /**
   * Returns the RGBA from the specified index.
   *
   * @param {number} index - The index value.
   * @return RGBA - The return value.
   */
  getValue(index: number): RGBA {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, this.stride)
    return new RGBA(valueData)
  }

  /**
   * Sets RGBA in the specified index.
   *
   * @param {number} index - The index value.
   * @param {RGBA} value - The value param.
   */
  setValue(index: number, value: RGBA): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }
}

export { RGBAAttribute }
