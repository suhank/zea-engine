import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing euler angles.
 * @extends AttrValue
 */
class EulerAngles extends AttrValue {
  /**
   * Create a euler angle.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The y value.
   * @param {number} order - The order value.
   */
  constructor(x = 0, y = 0, z = 0, order = 0) {
    super()

    if (!isNaN(order)) this.order = order
    else {
      switch (order) {
        case 'XYZ':
          this.order = 0
          break
        case 'YZX':
          this.order = 1
          break
        case 'ZXY':
          this.order = 2
          break
        case 'XZY':
          this.order = 3
          break
        case 'ZYX':
          this.order = 4
          break
        case 'YXZ':
          this.order = 5
          break
        default:
          throw new Error('Invalid Euler Angles Order:' + order)
      }
    }
    if (x instanceof ArrayBuffer) {
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 4)
    } else {
      this.__data = new Float32Array(3)
      this.__data[0] = x
      this.__data[1] = y
      this.__data[2] = z
    }
  }

  /**
   * Getter for x.
   */
  get x() {
    return this.__data[0]
  }

  /**
   * Setter for x.
   * @param {number} val - The val param.
   */
  set x(val) {
    this.__data[0] = val
  }

  /**
   * Getter for y.
   */
  get y() {
    return this.__data[1]
  }

  /**
   * Setter for y.
   * @param {number} val - The val param.
   */
  set y(val) {
    this.__data[1] = val
  }

  /**
   * Getter for z.
   */
  get z() {
    return this.__data[2]
  }

  /**
   * Setter for z.
   * @param {number} val - The val param.
   */
  set z(val) {
    this.__data[2] = val
  }

  /**
   * The set method
   * @param {number} x - The x param.
   * @param {number} y  - The y param.
   * @param {number} z  - The y param.
   */
  set(x, y, z) {
    this.__data[0] = x
    this.__data[1] = y
    this.__data[2] = z
  }
}

typeRegistry.registerType('EulerAngles', EulerAngles)

export { EulerAngles }
