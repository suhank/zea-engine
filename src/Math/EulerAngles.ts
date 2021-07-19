import { Registry } from '../Registry'

/**
 * Class representing euler angles. Euler angles describe rotating an object
 * around its various axis in a specified axis order.
 *
 */
class EulerAngles {
  order: number
  __data
  /**
   * Create a euler angle. Receives the xyz values in radians and the order that the rotations are applied.
   * <br>
   * Order parameter values: `XYZ: 0`, `YZX: 1`, `ZXY: 2`, `XZY: 3`, `ZYX: 4`, `YXZ: 5`
   * <br>
   * It could be either the `string` or the `number` value.
   *
   * @param {number | ArrayBuffer} x - The angle of the x axis in degrees. Default is 0.
   * @param {number} y - The angle of the y axis in degrees. Default is 0.
   * @param {number} z - The angle of the z axis in degrees. Default is 0.
   * @param {number | string} order - The order in which the rotations are applied.
   */
  constructor(x: number | ArrayBuffer = 0, y = 0, z = 0, order: number | string = 0) {
    if (typeof order === 'number' && !isNaN(order)) this.order = order
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
   * Getter for x axis rotation.
   *
   * @return {number} - Returns the x axis rotation.
   */
  get x(): number {
    return this.__data[0]
  }

  /**
   * Setter for x axis rotation.
   *
   * @param {number} val - The val param.
   */
  set x(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for y axis rotation.
   *
   * @return {number} - Returns the y axis rotation.
   */
  get y(): number {
    return this.__data[1]
  }

  /**
   * Setter for y axis rotation.
   *
   * @param {number} val - The val param.
   */
  set y(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for z axis rotation.
   *
   * @return {number} - Returns the z axis rotation.
   */
  get z(): number {
    return this.__data[2]
  }

  /**
   * Setter for z axis rotation.
   *
   * @param {number} val - The val param.
   */
  set z(val: number) {
    this.__data[2] = val
  }

  /**
   * Sets the EulerAngles
   *
   * @param {number} x - The x axis rotation in radians.
   * @param {number} y - The y axis rotation in radians.
   * @param {number} z - The z axis rotation in radians.
   */
  set(x: number, y: number, z: number): void {
    this.__data[0] = x
    this.__data[1] = y
    this.__data[2] = z
  }

  toJSON(): Record<string, number> {
    return {
      x: this.__data[0],
      y: this.__data[1],
      z: this.__data[2],
      order: this.order,
    }
  }

  fromJSON(json: Record<string, number>): void {
    this.__data[0] = json.x
    this.__data[1] = json.y
    this.__data[2] = json.z
    this.order = json.order
  }
}

// Registry.register('EulerAngles', EulerAngles)

export { EulerAngles }
