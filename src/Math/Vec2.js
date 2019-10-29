import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing a Vec2. A Vec2 represents a two-dimensional coordinate.
 * Vector classes in zea-engine internally store values in Float32Arrays and
 * expose getters and setters for the component values.
 * @extends AttrValue
 */
class Vec2 extends AttrValue {
  /**
   * Create a Vec2.
   * @param {number} x - The x value. Default is 0.
   * @param {number} y - The y value. Default is 0.
   */
  constructor(x = 0, y = 0) {
    super()

    if (
      x instanceof Float32Array ||
      x instanceof Uint32Array ||
      x instanceof Int32Array
    ) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 2)
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(2)
      this.fromJSON(x)
    } else {
      this.__data = new Float32Array(2)
      this.__data[0] = x
      this.__data[1] = y
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
   * Setter from scalar components.
   * @param {number} x - The x value.
   * @param {number} y  - The y value.
   */
  set(x, y) {
    this.__data[0] = x
    this.__data[1] = y
  }

  /**
   * Setter from another Vec2.
   * @param {Vec2} other - The other Vec2 to set from.
   */
  setFromOther(other) {
    this.x = other.x
    this.y = other.y
  }

  /**
   * Returns true if this Vec2 is exactly the same as other.
   * @param {Vec2} other - The other Vec2 to compare with.
   * @return {boolean} - Returns true or false.
   */
  equal(other) {
    return this.x == other.x && this.y == other.y
  }

  /**
   * Returns true if this vector is NOT exactly the same as other.
   * @param {Vec2} other - The other Vec2 to compare with.
   * @return {boolean} - Returns true or false.
   */
  notEquals(other) {
    return this.x != other.x && this.y != other.y
  }

  /**
   * Returns true if this Vec2 is approximately the same as other.
   * @param {Vec2} other - The other Vec2 to compare with.
   * @param {number} precision - The precision to which the values must match.
   * @return {boolean} - Returns true or false.
   */
  approxEqual(other, precision = Number.EPSILON) {
    return (
      Math.abs(this.x - other.x) < precision &&
      Math.abs(this.y - other.y) < precision
    )
  }

  /**
   * Adds other to this Vec2 and returns the result as a new Vec2.
   * @param {Vec2} other - The other Vec2 to add.
   * @return {Vec2} - Returns a new Vec2.
   */
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y)
  }

  /**
   * Adds other to this Vec2.
   * @param {Vec2} other - The other Vec2 to add.
   */
  addInPlace(other) {
    this.x += other.x
    this.y += other.y
  }

  /**
   * Subtracts other from this Vec2 and returns the result as a new Vec2.
   * @param {Vec2} other - The other Vec2 to subtract.
   * @return {Vec2} - Returns a new Vec2.
   */
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y)
  }

  /**
   * Subtracts other from this Vec2.
   * @param {Vec2} other - The other Vec2 to subtract.
   * @return {Vec2} - Returns a new Vec2.
   */
  subtractInPlace(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  /**
   * Scales this Vec2 by scalar and returns the result as a new Vec2.
   * @param {number} scalar - The scalar value.
   * @return {Vec2} - Returns a new Vec2.
   */
  scale(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar)
  }

  /**
   * Scales this Vec2 by scalar.
   * @param {number} scalar - The scalar value.
   */
  scaleInPlace(scalar) {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Inverts this Vec2 and returns the result as a new Vec2.
   * @return {Vec2} - Returns a new Vec2.
   */
  invert() {
    return new Vec2(1.0 / this.x, 1.0 / this.y)
  }

  /**
   * Inverts this Vec2.
   * @return {Vec2} - The return value.
   */
  invertInPlace() {
    this.x = 1.0 / this.x
    this.y = 1.0 / this.y
    return this
  }

  /**
   * Multiplies two Vec2s and returns the result as a new Vec2.
   * @param {Vec2} other - The other Vec2 to multiply with.
   * @return {Vec2} - Returns a new Vec2.
   */
  multiply(other) {
    return new Vec2(this.x * other.x, this.y * other.y)
  }

  /**
   * Multiplies two Vec2s.
   * @param {Vec2} other - The other Vec2 to multiply with.
   */
  multiplyInPlace(other) {
    this.x *= other.x
    this.y *= other.y
  }

  /**
   * Calculates the squared length of this Vec2.
   * @return {number} - Returns the length squared.
   */
  lengthSquared() {
    const x = this.__data[0]
    const y = this.__data[1]
    return x * x + y * y
  }

  /**
   * Calculates the length of this Vec2.
   * @return {number} - Returns the length.
   */
  length() {
    return Math.sqrt(this.lengthSquared())
  }

  /**
   * Calculates the distance to another vector.
   * @param {Vec2} other - The other value.
   * @return {number} - Returns the distance between vectors.
   */
  distanceTo(other) {
    const x = this.__data[0] - other.x
    const y = this.__data[1] - other.y
    return Math.sqrt(x * x + y * y)
  }

  /**
   * Normalizes the Vec2 and returns it as a new Vec2.
   * @return {Vec2} - Returns the Vec2 normalized.
   */
  normalize() {
    const x = this.__data[0]
    const y = this.__data[1]
    let len = x * x + y * y
    if (len < Number.EPSILON) {
      return new Vec2()
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    return new Vec2(x * len, y * len)
  }

  /**
   * Normalizes the Vec2.
   */
  normalizeInPlace() {
    const x = this.__data[0]
    const y = this.__data[1]
    let len = x * x + y * y
    if (len < Number.EPSILON) {
      return
    }
    len = 1 / Math.sqrt(len)
    this.set(x * len, y * len)
  }

  /**
   * Calculates the dot product of this Vec2 against another Vec2.
   * @param {Vec2} other - The other Vec2 to compare with.
   * @return {number} - Returns the dot product.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y
  }

  /**
   * Gets the angle between this Vec2 and other.
   * @param {Vec2} other - The other Vec2 to compare with.
   * @return {number} - Returns the angle in radians.
   */
  angleTo(other) {
    return Math.Atan2(other.x - this.x, other.y - this.y)
  }

  /**
   * Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.
   * @param {number} angle - The angle of rotation.
   * @return {Vec2} - Returns the rotated vector.
   */
  rotate(angle) {
    const cosa = Math.cos(angle)
    const sina = Math.sin(angle)
    return new Vec2(
      this.x * cosa - this.y * sina,
      this.x * sina + this.y * cosa
    )
  }

  /**
   * Performs a linear interpolation between this Vec2 and other.
   * @param {Vec2} other - The other Vec2 to interpolate between.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {Vec2} - Returns a new Vec2.
   */
  lerp(other, t) {
    const ax = this.x
    const ay = this.y
    return new Vec2(ax + t * (other.x - ax), ay + t * (other.y - ay))
  }

  /**
   * Creates a new Vec2 to wrap existing memory in a buffer.
   * @param {any} buffer - The buffer value.
   * @param {number} offset - The offset value.
   * @return {Vec2} - Returns a new Vec2.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec2(buffer, offset * 4) // 4 bytes per 32bit float
  }

  /**
   * The createFromFloat32Array method.
   * @param {array} array - The array value.
   * @return {Vec2} - Returns a new Vec2.
   */
  static createFromFloat32Array(array) {
    return new Vec2(array)
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requi
   * ents for large arrays of this type.
   * @return {number} - The return value.
   */
  static numElements() {
    return 2
  }

  /**
   * Generates a random vector with the given scale.
   * @param {number} scale - Length of the resulting vector. If ommitted, a unit vector will be returned.
   * @return {Vec2} - The return value.
   */
  setRandomDir(scale = 1.0) {
    const r = Math.random() * 2.0 * Math.PI
    this.__data[0] = Math.cos(r) * zScale
    this.__data[1] = Math.sin(r) * zScale
    return this
  }

  /**
   * The setRandom method.
   * @param {number} scale - The scale value.
   * @return {any} - The return value.
   */
  setRandom(scale = 1.0) {
    this.__data[0] = Math.random() * scale
    this.__data[1] = Math.random() * scale
    return this
  }

  /**
   * Clones this Vec2 and returns a new Vec2.
   * @return {Vec2} - Returns a new Vec2.
   */
  clone() {
    return new Vec2(this.__data[0], this.__data[1])
  }

  /**
   * Returns the tpye as an array. Often used to pass types to the GPU.
   * @return {array} - Returns as an array.
   */
  asArray() {
    return this.__data
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new Vec2.
   * @param {...object} ...args - The ...args param.
   * @return {Vec2} - Returns a new Vec2.
   */
  static create(...args) {
    return new Vec2(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.x = j.x
    this.y = j.y
  }
}

typeRegistry.registerType('Vec2', Vec2)

export { Vec2 }
