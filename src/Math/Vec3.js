import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing a Vec3. A Vec3 represents a three-dimensional coordinate.
 * Vector classes in zea-engine internally store values in Float32Arrays and
 * expose getters and setters for the component values.
 * @extends AttrValue
 */
class Vec3 extends AttrValue {
  /**
   * Create a Vec3.
   * @param {number} x - The x value. Default is 0.
   * @param {number} y - The y value. Default is 0.
   * @param {number} z - The y value. Default is 0.
   */
  constructor(x = 0, y = 0, z = 0) {
    super()
    if (x instanceof Float32Array || x instanceof Uint32Array) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 3)
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(3)
      this.fromJSON(x)
    } else {
      this.__data = new Float32Array(3)
      this.__data[0] = x
      this.__data[1] = y
      this.__data[2] = z
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
   * @return {number} - Returns the z value.
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
   * Setter from scalar components.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The y value.
   */
  set(x, y, z) {
    this.x = x
    this.y = y !== undefined ? y : x
    this.z = z !== undefined ? z : x
  }

  /**
   * The setDataArray method.
   * @param {any} float32Array - The float32Array param.
   */
  setDataArray(float32Array) {
    this.__data = float32Array
  }

  /**
   * Setter from another Vec3.
   * @param {Vec3} other - The other Vec3 to set from.
   */
  setFromOther(other) {
    this.x = other.x
    this.y = other.y
    this.z = other.z
  }

  /**
   * Returns true if the Vec3 contains 0 0 0.
   * @return {boolean} - Returns true or false.
   */
  isNull() {
    return (
      Math.abs(this.x) < Number.EPSILON &&
      Math.abs(this.y) < Number.EPSILON &&
      Math.abs(this.z) < Number.EPSILON
    )
  }

  /**
   * The is111 method returns true if the Vec3 contains 1 1 1.
   * @return {boolean} - The return value.
   */
  is111() {
    return (
      Math.abs(1.0 - this.x) < Number.EPSILON &&
      Math.abs(1.0 - this.y) < Number.EPSILON &&
      Math.abs(1.0 - this.z) < Number.EPSILON
    )
  }

  /**
   * Returns true if this Vec3 is exactly the same as other.
   * @param {Vec3} other - The other Vec3 to compare with.
   * @param {number} precision - The precision between the two Vec3s.
   * @return {boolean} - Returns true or false.
   */
  equal(other, precision) {
    return this.x == other.x && this.y == other.y && this.z == other.z
  }

  /**
   * Returns true if this vector is NOT exactly the same other.
   * @param {Vec3} other - The other Vec3 to compare with.
   * @param {number} precision - The precision between the two Vec3s.
   * @return {boolean} - Returns true or false.
   */
  notEquals(other, precision) {
    return this.x != other.x && this.y != other.y && this.z != other.z
  }

  /**
   * Returns true if this vector is the same as other
   * (given a precision).
   * @param {Vec3} other - The other Vec3 to compare with.
   * @return {boolean} - Returns true or false.
   */
  approxEqual(other) {
    return (
      Math.abs(this.x - other.x) < Number.EPSILON &&
      Math.abs(this.y - other.y) < Number.EPSILON &&
      Math.abs(this.z - other.z) < Number.EPSILON
    )
  }

  /**
   * Adds other to this Vec3 and return the result as a new Vec3.
   * @param {Vec3} other - The other Vec3 to add.
   * @return {Vec3} - Returns a new Vec3.
   */
  add(other) {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  /**
   * Adds other to this Vec3.
   * @param {Vec3} other - The other Vec3 to add.
   */
  addInPlace(other) {
    this.x += other.x
    this.y += other.y
    this.z += other.z
  }

  /**
   * Subtracts other from this Vec3 and returns the result as a new Vec3.
   * @param {Vec3} other - The other Vec3 to subtract.
   * @return {Vec3} - Returns a new Vec3.
   */
  subtract(other) {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  /**
   * Subtracts other from this Vec3.
   * @param {Vec3} other - The other param.
   */
  subtractInPlace(other) {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
  }

  /**
   * Multiplies two Vec3s and returns the result as a new Vec3.
   * @param {Vec3} vec3 - The other Vec3 to multiply with..
   * @return {Vec3} - Returns a new Vec3.
   */
  multiply(vec3) {
    return new Vec3(this.x * vec3.x, this.y * vec3.y, this.z * vec3.z)
  }

  /**
   * Multiplies two Vec3s.
   * @param {Vec3} vec3 - The other Vec3 to multiply with.
   */
  multiplyInPlace(vec3) {
    this.x *= vec3.x
    this.y *= vec3.y
    this.z *= vec3.z
  }

  /**
   * Divides two Vec3s and returns the result as a new Vec3.
   * @param {Vec3} vec3 - The other Vec3 to divide by.
   * @return {Vec3} - Returns a new Vec3.
   */
  divide(vec3) {
    return new Vec3(this.x / vec3.x, this.y / vec3.y, this.z / vec3.z)
  }

  /**
   * Divides two Vec3s.
   * @param {Vec3} vec3 - The other Vec3 to divide by.
   */
  divideInPlace(vec3) {
    this.x /= vec3.x
    this.y /= vec3.y
    this.z /= vec3.z
  }

  /**
   * Scales this Vec3 by scalar and return the result as a new Vec3.
   * @param {number} scalar - The scalar value.
   * @return {Vec3} - Returns a new Vec3.
   */
  scale(scalar) {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar)
  }

  /**
   * Scales this Vec3 by scalar.
   * @param {number} scalar - The scalar value.
   */
  scaleInPlace(scalar) {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
  }

  /**
   * Negates this Vec3 (x = -x, y = -y and z = -z)
   * and returns the result as a new Vec3.
   * @return {Vec3} - Returns a new Vec3.
   */
  negate() {
    return new Vec3(-this.x, -this.y, -this.z)
  }

  /**
   * The inverse method.
   * @return {Vec3} - Returns a new Vec3.
   */
  inverse() {
    return new Vec3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z)
  }

  /**
   * Calculates the length of a Vec3 squared.
   * @return {number} - Returns the length.
   */
  lengthSquared() {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    return x * x + y * y + z * z
  }

  /**
   * Calculates the length of a Vec3.
   * @return {number} - Returns the length.
   */
  length() {
    return Math.sqrt(this.lengthSquared())
  }

  /**
   * Calculates the distance to another vector.
   * @param {Vec3} other - The other param.
   * @return {number} - Returns the distance between vectors.
   */
  distanceTo(other) {
    const x = this.__data[0] - other.x
    const y = this.__data[1] - other.y
    const z = this.__data[2] - other.z
    return Math.sqrt(x * x + y * y + z * z)
  }

  /**
   * Normalizes the Vec3 and returns it as a new Vec3.
   * @return {Vec3} - Returns the Vec3 normalized.
   */
  normalize() {
    let len =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2]
    if (len < Number.EPSILON) {
      return new Vec3()
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1.0 / Math.sqrt(len)
    return new Vec3(
      this.__data[0] * len,
      this.__data[1] * len,
      this.__data[2] * len
    )
  }

  /**
   * Normalizes the vector, modifying it and returning its original length.
   * @return {any} - The return value.
   */
  normalizeInPlace() {
    let len =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2]
    if (len < Number.EPSILON) {
      return
    }
    len = Math.sqrt(len)
    const tmp = 1.0 / len
    this.__data[0] *= tmp
    this.__data[1] *= tmp
    this.__data[2] *= tmp
    return len
  }

  /**
   * The resize method returns a new Vec3 with the given length.
   * @param {number} length - The length param.
   * @return {Vec3} - The return value.
   */
  resize(length) {
    const currlen =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2]
    if (currlen < Number.EPSILON) {
      return
    }
    const scl = length / Math.sqrt(currlen)
    return new Vec3(
      this.__data[0] * scl,
      this.__data[1] * scl,
      this.__data[2] * scl
    )
  }

  /**
   * The resizeInPlace method.
   * @param {number} length - The length param.
   */
  resizeInPlace(length) {
    const currlen =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2]
    if (currlen < Number.EPSILON) {
      return
    }
    const scl = length / Math.sqrt(currlen)
    this.__data[0] *= scl
    this.__data[1] *= scl
    this.__data[2] *= scl
  }

  /**
   * Calculates the dot product of this Vec3 against another Vec3.
   * @param {Vec3} other - The other Vec3 to compare with.
   * @return {number} - Returns the dot product.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  /**
   * Calculates the cross product of two Vec3s and returns the result as a new Vec3.
   * @param {Vec3} b - The second operand.
   * @return {Vec3} - Returns the cross products as a new Vec3.
   */
  cross(b) {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const bx = b.x
    const by = b.y
    const bz = b.z

    return new Vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx)
  }

  /**
   * Gets the angle between this Vec3 and b.
   * @param {Vec3} b - The other Vec3 to compare with.
   * @return {number} - Returns the angle in radians.
   */
  angleTo(b) {
    const cosine = this.dot(b)
    if (cosine > 1.0) {
      return 0
    } else {
      return Math.acos(cosine)
    }
  }

  /**
   * Performs a linear interpolation between two Vec3s.
   * @param {Vec3} b - The second operand.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {Vec3} - The return value.
   */
  lerp(b, t) {
    const ax = this.x
    const ay = this.y
    const az = this.z
    return new Vec3(
      ax + t * (b.x - ax),
      ay + t * (b.y - ay),
      az + t * (b.z - az)
    )
  }

  /**
   * Returns a new Vec3 whose component values are the abs of this Vec3s component values.
   * @return {Vec3} - Returns a new Vec3.
   */
  abs() {
    return new Vec3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
  }

  /**
   * Sets the vector a random vector on the surface of a sphere with the radius of the givenn scale value.
   * @param {number} scale - The radius of the surface sphere.
   * @return {Vec3} - The random Vec3.
   */
  setRandomDir(scale = 1.0) {
    const r = Math.random() * 2.0 * Math.PI
    const z = Math.random() * 2.0 - 1.0
    const zScale = Math.sqrt(1.0 - z * z) * scale

    this.__data[0] = Math.cos(r) * zScale
    this.__data[1] = Math.sin(r) * zScale
    this.__data[2] = z * scale
    return this
  }

  /**
   * Generates a randome vector anywhere in the sphere defined by the provided scale value.
   * @param {number} scale - The radius of the bounding sphere.
   * @return {Vec3} - The random Vec3.
   */
  setRandom(scale = 1.0) {
    this.__data[0] = (Math.random() - 0.5) * scale
    this.__data[1] = (Math.random() - 0.5) * scale
    this.__data[2] = (Math.random() - 0.5) * scale
    return this
  }

  /**
   * Clones this type returning a new instance.
   * @return {Vec3} - The return value.
   */
  clone() {
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
   * The createFromJSON method.
   * @param {object} json - The json param.
   * @return {Vec3} - The return value.
   */
  static createFromJSON(json) {
    const result = new Vec3()
    result.fromJSON(json)
    return result
  }

  /**
   * The createFromFloat32Buffer method.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {Vec3} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec3(buffer, offset * 4) // 4 bytes per 32bit float
  }

  /**
   * The createFromFloat32Array method.
   * @param {array} array - A Float32Array value
   * @return {Vec3} - The return value.
   */
  static createFromFloat32Array(array) {
    return new Vec3(array)
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.
   * @return {number} - The return value.
   */
  static numElements() {
    return 3
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
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.x = j.x
    this.y = j.y
    this.z = j.z
  }
}

typeRegistry.registerType('Vec3', Vec3)

export { Vec3 }
// export default Vec3;
