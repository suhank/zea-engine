import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'
import { Vec3 } from './Vec3.js'

/** Class representing a Vec4. A Vec4 represents a four-dimensional coordinate.
 * Vector classes in zea-engine internally store values in Float32Arrays and
 * expose getters and setters for the component values.
 * @extends AttrValue
 */
class Vec4 extends AttrValue {
  /**
   * Create a Vec4.
   * @param {number} x - The x value. Default is 0.
   * @param {number} y - The y value. Default is 0.
   * @param {number} z - The y value. Default is 0.
   * @param {number} t - The t value. Default is 0.
   */
  constructor(x = 0, y = 0, z = 0, t = 0) {
    super()

    if (x instanceof ArrayBuffer) {
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 4)
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(4)
      this.fromJSON(x)
    } else {
      this.__data = new Float32Array(4)
      this.__data[0] = x
      this.__data[1] = y
      this.__data[2] = z
      this.__data[3] = t
    }
  }

  /**
   * Getter for x value.
   * @return {number} - Returns the x value.
   */
  get x() {
    return this.__data[0]
  }

  /**
   * Setter for x value.
   * @param {number} val - The val param.
   */
  set x(val) {
    this.__data[0] = val
  }

  /**
   * Getter for y value.
   * @return {number} - Returns the y value.
   */
  get y() {
    return this.__data[1]
  }

  /**
   * Setter for y value.
   * @param {number} val - The val param.
   */
  set y(val) {
    this.__data[1] = val
  }

  /**
   * Getter for z value.
   * @param {number} val - The val param.
   */
  get z() {
    return this.__data[2]
  }

  /**
   * Setter for z value.
   * @param {number} val - The val param.
   */
  set z(val) {
    this.__data[2] = val
  }

  /**
   * Getter for t value.
   * @param {number} val - The val param.
   */
  get t() {
    return this.__data[3]
  }

  /**
   * Setter for t value.
   * @param {number} val - The val param.
   */
  set t(val) {
    this.__data[3] = val
  }

  /**
   * Setter from scalar components.
   * @param {number} x - The x value.
   * @param {number} y  - The y value.
   * @param {number} z  - The y value.
   * @param {number} t  - The t value.
   */
  set(x, y, z, t) {
    this.x = x
    this.y = y
    this.z = z
    this.t = t
  }

  /**
   * Setter from another Vec4.
   * @param {Vec4} other - The other Vec4 to set from.
   */
  setFromOther(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.z
    this.t = other.t
  }

  /**
   * Returns true if this Vec4 is exactly the same as other.
   * @param {Vec4} other - The other Vec4 to compare with.
   * @param {number} precision - The precision between the two Vec4s.
   * @return {boolean} - Returns true or false.
   */
  equal(other, precision) {
    return (
      this.x == other.x &&
      this.y == other.y &&
      this.z == other.z &&
      this.t == other.t
    )
  }

  /**
   * Returns true if this Vec4 is NOT exactly the same as other.
   * @param {Vec4} other - The other Vec4 to compare with.
   * @param {number} precision - The precision between the two Vec4s.
   * @return {boolean} - Returns true or false.
   */
  notEquals(other, precision) {
    return (
      this.x != other.x &&
      this.y != other.y &&
      this.z != other.z &&
      this.t != other.t
    )
  }

  /**
   * Returns true if this Vec4 is the same as other
   * (given a precision).
   * @param {Vec4} other - The other Vec4 to compare with.
   * @return {boolean} - The return value.
   */
  approxEqual(other) {
    return (
      Math.abs(this.x - other.x) < Number.EPSILON &&
      Math.abs(this.y - other.y) < Number.EPSILON &&
      Math.abs(this.z - other.z) < Number.EPSILON &&
      Math.abs(this.t - other.t) < Number.EPSILON
    )
  }

  /**
   * Adds other to this Vec4 and returns the result as a new Vec4.
   * @param {Vec4} other - The other Vec4 to add.
   * @return {Vec4} - Returns a new Vec4.
   */
  add(other) {
    return new Vec4(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z,
      this.t + other.t
    )
  }

  /**
   * Adds other to this Vec4.
   * @param {Vec4} other - The other Vec4 to add.
   */
  addInPlace(other) {
    this.x += other.x
    this.y += other.y
    this.z += other.z
    this.t += other.t
  }

  /**
   * Subtracts other from this Vec4 and returns then result as a new Vec4.
   * @param {Vec4} other - The other Vec4 to subtract.
   * @return {Vec4} - Returns a new Vec4.
   */
  subtract(other) {
    return new Vec4(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z,
      this.t - other.t
    )
  }

  /**
   * Subtracts other from this Vec4.
   * @param {Vec4} other - The other Vec4 to subtract.
   */
  subtractInPlace(other) {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
    this.t -= other.t
  }

  /**
   * Multiplies two Vec4s and returns the result as a new Vec4.
   * @param {Vec4} other - The other Vec4 to multiply with.
   * @return {Vec4} - Returns a new Vec4.
   */
  multiply(other) {
    return new Vec4(
      this.x * other.x,
      this.y * other.y,
      this.z * other.z,
      this.t * other.t
    )
  }

  /**
   * Multiplies two Vec4s.
   * @param {Vec4} other - The other Vec4 to multiply with.
   */
  multiplyInPlace(other) {
    this.x *= other.x
    this.y *= other.y
    this.z *= other.z
    this.t *= other.t
  }

  /**
   * Divides two Vec4s and returns the result as a new Vec4.
   * @param {Vec4} other - The other Vec4 to divide by.
   * @return {Vec4} - Returns a new Vec4.
   */
  divide(other) {
    return new Vec4(
      this.x / other.x,
      this.y / other.y,
      this.z / other.z,
      this.t / other.t
    )
  }

  /**
   * Divides two Vec4s.
   * @param {Vec4} other - The other Vec4 to divide by.
   */
  divideInPlace(other) {
    this.x /= other.x
    this.y /= other.y
    this.z /= other.z
    this.t /= other.t
  }

  /**
   * Scales this Vec4 by scalar and return the result as a new Vec4.
   * @param {number} scalar - The scalar value.
   * @return {Vec4} - The return value.
   */
  scale(scalar) {
    return new Vec4(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.t * scalar
    )
  }

  /**
   * Scales this Vec4 by scalar.
   * @param {number} scalar - The scalar value.
   */
  scaleInPlace(scalar) {
    this.set(this.x * scalar, this.y * scalar, this.z * scalar, this.t * scalar)
  }

  /**
   * Calculates the length of a Vec4.
   * @return {number} - Returns the length.
   */
  length() {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[2]
    return Math.sqrt(x * x + y * y + z * z + t * t)
  }

  /**
   * Calculates the length of a Vec4 squared.
   * @return {number} - Returns the length.
   */
  lengthSquared() {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[3]
    return x * x + y * y + z * z + t * t
  }

  /**
   * Normalizes the Vec4 and returns it as a new Vec4.
   * @return {Vec4} - Returns the Vec4 normalized.
   */
  normalize() {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[3]
    let len = x * x + y * y + z * z + t * t
    if (len < Number.EPSILON) {
      return new Vec4()
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    return new Vec4(x * len, y * len, z * len)
  }

  /**
   * Normalizes the Vec4.
   */
  normalizeInPlace() {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[3]
    let len = x * x + y * y + z * z + t * t
    if (len < Number.EPSILON) {
      return
    }
    len = 1 / Math.sqrt(len)
    this.set(x * len, y * len, z * len, t * len)
  }

  /**
   * Calculates the dot product of this Vec4 against another Vec4.
   * @param {Vec4} other - The other Vec4 to compare with.
   * @return {number} - Returns the dot product.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.t * b.t
  }

  /**
   * Calculates the cross product of two Vec4s and returns the result as a new Vec4.
   * @param {Vec4} b - The other Vec4 to compare with.
   * @return {Vec4} - Returns the cross products as a new Vec4.
   */
  cross(b) {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const at = this.t
    const bx = b.x
    const by = b.y
    const bz = b.z
    const bt = b.t

    return new Vec4(
      ay * bz - az * by,
      az * bt - at * bz,
      at * bx - ax * bt,
      ax * by - ay * bx
    )
  }

  /**
   * Gets the angle between this Vec4 and b.
   * @param {Vec4} b - The other Vec4 to compare with.
   * @return {number} - Returns the angle in radians.
   */
  angle(b) {
    const tempA = this.normalize()
    const tempB = b.normalize()
    const cosine = tempA.dot(tempB)

    if (cosine > 1.0) {
      return 0
    } else {
      return Math.acos(cosine)
    }
  }

  /**
   * Performs a linear interpolation between two Vec4s.
   * @param {Vec4} b - The second operand.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {Vec4} - The return value.
   */
  lerp(b, t) {
    const ax = this.x
    const ay = this.y
    const az = this.z
    at = this.t
    return new Vec4(
      ax + t * (b.x - ax),
      ay + t * (b.y - ay),
      az + t * (b.z - az),
      at + t * (b.t - at)
    )
  }

  /**
   * Generates a random vector with the given scale.
   * @param {number} scale - Length of the resulting vector. If ommitted, a unit vector will be returned.
   * @return {Vec4} - The return value.
   */
  random(scale = 1.0) {
    const r = glMatrix.RANDOM() * 2.0 * Math.PI
    const z = glMatrix.RANDOM() * 2.0 - 1.0
    const zScale = Math.sqrt(1.0 - z * z) * scale

    out[0] = Math.cos(r) * zScale
    out[1] = Math.sin(r) * zScale
    out[2] = z * scale
    return out
  }

  /**
   * Clones this type returning a new instance.
   * @return {Vec4} - The return value.
   */
  clone() {
    return new Vec4(
      this.__data[0],
      this.__data[1],
      this.__data[2],
      this.__data[3]
    )
  }

  /**
   * Converts this Vec4 into a Vec3.
   * @return {Vec3} - Returns the value as a new Vec3.
   */
  toVec3() {
    return new Vec3(this.__data[0], this.__data[1], this.__data[2])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   * @return {any} - The return value.
   */
  asArray() {
    return this.__data
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {Vec3} - The return value.
   */
  static create(...args) {
    return new Vec3(...args)
  }

  /**
   * Creates a new Vec4 to wrap existing memory in a buffer.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {Vec4} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec4(buffer, offset * 4) // 4 bytes per 32bit float
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.
   * @return {number} - The return value.
   */
  static numElements() {
    return 4
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      t: this.t,
    }
  }
}

typeRegistry.registerType('Vec4', Vec4)

export { Vec4 }
