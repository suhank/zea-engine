import { Attribute } from './Attribute'
import { Color } from '../../Math/Color'

/**
 * Class representing an attribute.
 */
class ColorAttribute extends Attribute {
  /**
   * Create a ColorAttribute.
   */
  constructor() {
    super('Color', 4)
    this.normalized = false
  }

  /**
   * Returns the `T` object placed in the specified index.
   * @deprecated
   *
   * @param {number} index - The index value.
   */
  getValueRef(index: number): Color {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.subarray(offset, this.stride)
    return new Color(valueData)
  }

  /**
   * Returns the Color from the specified index.
   *
   * @param {number} index - The index value.
   * @return Color - The return value.
   */
  getValue(index: number): Color {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    const valueData = this.data.slice(offset, this.stride)
    return new Color(valueData)
  }

  /**
   * Sets Color in the specified index.
   *
   * @param {number} index - The index value.
   * @param {Color} value - The value param.
   */
  setValue(index: number, value: Color): void {
    if (index >= this.data.length / this.stride)
      throw new Error('Invalid vertex index:' + index + '. Num Vertices:' + this.data.length / 3)

    const offset = index * this.stride
    this.data.set(value.asArray(), offset)
  }
}

export { ColorAttribute }
