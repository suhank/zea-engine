/* eslint-disable new-cap */
import { Vec3 } from './Vec3'
import { BinReader } from '../SceneTree/BinReader'
import { StringFunctions } from '../Utilities/StringFunctions'
/**
 * Represents a four-dimensional coordinate.
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 *
 */
class Vec4 {
  __data: Float32Array | Uint32Array | Int32Array
  /**
   * Creates a Vec4.
   *
   * The type of values of the `(x, y, z, t)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
   * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
   *
   * You can also pass one JSON object parameter.
   *
   * @param x - The x value. Default is 0.
   * @param y - The y value. Default is 0.
   * @param z - The y value. Default is 0.
   * @param t - The t value. Default is 0.
   */
  constructor(x: number | Float32Array | ArrayBuffer = 0, y = 0, z = 0, t = 0) {
    if (x instanceof Float32Array || x instanceof Uint32Array) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      console.warn(`deprecated, please use new Vec4(new Float32Array(buffer, byteOffset, 4))`)
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 4)
    } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof t == 'number') {
      this.__data = new Float32Array(4)
      this.__data[0] = x
      this.__data[1] = y
      this.__data[2] = z
      this.__data[3] = t
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(4)
      this.fromJSON(x)
    } else {
      this.__data = new Float32Array(4)
    }
  }

  /**
   * Getter for `x` value.
   *
   * @return - Returns the x value.
   */
  get x(): number {
    return this.__data[0]
  }

  /**
   * Setter for `x` value.
   *
   * @param val - The val param.
   */
  set x(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for `y` value.
   *
   * @return - Returns the y value.
   */
  get y(): number {
    return this.__data[1]
  }

  /**
   * Setter for `y` value.
   *
   * @param val - The val param.
   */
  set y(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for `z` value.
   *
   * @param val - The val param.
   */
  get z(): number {
    return this.__data[2]
  }

  /**
   * Setter for `z` value.
   *
   * @param val - The val param.
   */
  set z(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for `t` value.
   *
   * @param val - The val param.
   */
  get t(): number {
    return this.__data[3]
  }

  /**
   * Setter for `t` value.
   *
   * @param val - The val param.
   */
  set t(val: number) {
    this.__data[3] = val
  }

  /**
   * Getter for `w` value.
   *
   * @param val - The val param.
   */
  get w(): number {
    return this.__data[3]
  }

  /**
   * Setter for `w` value.
   *
   * @param val - The val param.
   */
  set w(val: number) {
    this.__data[3] = val
  }

  /**
   * Getter for `xyz` swizzel.
   *
   * @return - Returns the z value.
   */
  get xyz(): Vec3 {
    return new Vec3(this.__data[0], this.__data[1], this.__data[2])
  }

  /**
   * Setter from scalar components.
   *
   * @param x - The x value.
   * @param y  - The y value.
   * @param z  - The y value.
   * @param t  - The t value.
   */
  set(x: number, y: number, z: number, t: number): void {
    this.x = x
    this.y = y
    this.z = z
    this.t = t
  }

  /**
   * Sets the state of a Vec4 Object from another Vec4.
   *
   * @param other - The other Vec4 to set from.
   */
  setFromOther(other: Vec4): void {
    this.x = other.x
    this.y = other.y
    this.z = other.z
    this.t = other.t
  }

  /**
   * Checks if this Vec4 contains the same values as the other Vec4.
   *
   * @param other - The other Vec4 to compare with.
   * @return - Returns true or false.
   */
  isEqual(other: Vec4): boolean {
    return this.x == other.x && this.y == other.y && this.z == other.z && this.t == other.t
  }

  /**
   * Checks if this Vec4 is different from another Vec4.
   *
   * @param other - The other Vec4 to compare with.
   * @return - Returns true or false.
   */
  notEqual(other: Vec4): boolean {
    return this.x != other.x && this.y != other.y && this.z != other.z && this.t != other.t
  }

  /**
   * Returns true if this Vec4 is approximately the same as other.
   *
   * @param other - The other Vec4 to compare with.
   * @param precision - The precision to which the values must match.
   * @return - The return value.
   */
  approxEqual(other: Vec4, precision: number = Number.EPSILON): boolean {
    return (
      Math.abs(this.x - other.x) < precision &&
      Math.abs(this.y - other.y) < precision &&
      Math.abs(this.z - other.z) < precision &&
      Math.abs(this.t - other.t) < precision
    )
  }

  /**
   * Adds other to this Vec4 and returns the result as a new Vec4.
   *
   * @param other - The other Vec4 to add.
   * @return - Returns a new Vec4.
   */
  add(other: Vec4): Vec4 {
    return new Vec4(this.x + other.x, this.y + other.y, this.z + other.z, this.t + other.t)
  }

  /**
   * Adds other to this Vec4 mutating the values of this instance
   *
   * @param other - The other Vec4 to add.
   */
  addInPlace(other: Vec4): void {
    this.x += other.x
    this.y += other.y
    this.z += other.z
    this.t += other.t
  }

  /**
   * Subtracts other from this Vec4 and returns then result as a new Vec4.
   *
   * @param other - The other Vec4 to subtract.
   * @return - Returns a new Vec4.
   */
  subtract(other: Vec4): Vec4 {
    return new Vec4(this.x - other.x, this.y - other.y, this.z - other.z, this.t - other.t)
  }

  /**
   * Subtracts other from this Vec4 mutating the values of this instance
   *
   * @param other - The other Vec4 to subtract.
   */
  subtractInPlace(other: Vec4): void {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
    this.t -= other.t
  }

  /**
   * Multiplies two Vec4s and returns the result as a new Vec4.
   *
   * @param other - The other Vec4 to multiply with.
   * @return - Returns a new Vec4.
   */
  multiply(other: Vec4): Vec4 {
    return new Vec4(this.x * other.x, this.y * other.y, this.z * other.z, this.t * other.t)
  }

  /**
   * Multiplies two Vec4s mutating the values of this instance
   *
   * @param other - The other Vec4 to multiply with.
   */
  multiplyInPlace(other: Vec4): void {
    this.x *= other.x
    this.y *= other.y
    this.z *= other.z
    this.t *= other.t
  }

  /**
   * Divides two Vec4s and returns the result as a new Vec4.
   *
   * @param other - The other Vec4 to divide by.
   * @return - Returns a new Vec4.
   */
  divide(other: Vec4): Vec4 {
    return new Vec4(this.x / other.x, this.y / other.y, this.z / other.z, this.t / other.t)
  }

  /**
   * Divides two Vec4s.
   *
   * @param other - The other Vec4 to divide by.
   */
  divideInPlace(other: Vec4): void {
    this.x /= other.x
    this.y /= other.y
    this.z /= other.z
    this.t /= other.t
  }

  /**
   * Scales this Vec4 by scalar and returns the result as a new Vec4.
   *
   * @param scalar - The scalar value.
   * @return - The return value.
   */
  scale(scalar: number): Vec4 {
    return new Vec4(this.x * scalar, this.y * scalar, this.z * scalar, this.t * scalar)
  }

  /**
   * Scales this Vec4 by scalar.
   *
   * @param scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.set(this.x * scalar, this.y * scalar, this.z * scalar, this.t * scalar)
  }

  /**
   * Calculates the length of this Vec4.
   *
   * @return - Returns the length.
   */
  length(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[2]
    return Math.sqrt(x * x + y * y + z * z + t * t)
  }

  /**
   * Calculates the squared length of this Vec4.
   *
   * @return - Returns the length.
   */
  lengthSquared(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    const t = this.__data[3]
    return x * x + y * y + z * z + t * t
  }

  /**
   * Normalizes the Vec4 and returns it as a new Vec4.
   * Multiplies coordinates value by the inverse of the vector length.
   *
   * @return - Returns the Vec4 normalized.
   */
  normalize(): Vec4 {
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
   * Normalizes this Vec4 multiplying coordinate values by the inverse of the vector length.
   */
  normalizeInPlace(): void {
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
   *
   * @param other - The other Vec4 to compare with.
   * @return - Returns the dot product.
   */
  dot(other: Vec4): number {
    return this.x * other.x + this.y * other.y + this.z * other.z + this.t * other.t // TODO: other.t used to be b.t?
  }

  /**
   * Calculates the cross product of two Vec4s and returns the result as a new Vec4.
   *
   * @param other - The other Vec4 to calculate with.
   * @return - Returns the cross product as a new Vec4.
   */
  cross(other: Vec4): Vec4 {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const at = this.t
    const bx = other.x
    const by = other.y
    const bz = other.z
    const bt = other.t

    return new Vec4(ay * bz - az * by, az * bt - at * bz, at * bx - ax * bt, ax * by - ay * bx)
  }

  /**
   * Gets the angle between this Vec4 and b.
   *
   * @param other - The other Vec4 to compare with.
   * @return - Returns the angle in radians.
   */
  angleTo(other: Vec4): number {
    const tempA = this.normalize()
    const tempB = other.normalize()
    const cosine = tempA.dot(tempB)

    if (cosine > 1.0) {
      return 0
    } else {
      return Math.acos(cosine)
    }
  }

  /**
   * Performs a linear interpolation between this Vec4 and other.
   *
   * @param other - The other Vec4 to interpolate between.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new Vec4.
   */
  lerp(other: Vec4, t: number): Vec4 {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const at = this.t
    return new Vec4(ax + t * (other.x - ax), ay + t * (other.y - ay), az + t * (other.z - az), at + t * (other.t - at))
  }

  /**
   * Generates a random vector with the given scale.
   *
   * @param scale - Length of the resulting vector. If omitted, a unit vector will be returned.
   * @return - The return value.
   */
  // random(scale = 1.0) {
  //   const r = glMatrix.RANDOM() * 2.0 * Math.PI
  //   const z = glMatrix.RANDOM() * 2.0 - 1.0
  //   const zScale = Math.sqrt(1.0 - z * z) * scale

  //   out[0] = Math.cos(r) * zScale
  //   out[1] = Math.sin(r) * zScale
  //   out[2] = z * scale
  //   return out
  // }

  /**
   * Clones this Vec4 and returns a new Vec4.
   *
   * @return - Returns a new Vec4.
   */
  clone(): Vec4 {
    return new Vec4(this.__data[0], this.__data[1], this.__data[2], this.__data[3])
  }

  /**
   * Converts this Vec4 into a Vec3.
   *
   * @return - Returns the value as a new Vec3.
   */
  toVec3(): Vec3 {
    return new Vec3(this.__data[0], this.__data[1], this.__data[2])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   *
   * @return - Returns as an array.
   */
  asArray(): Float32Array | Uint32Array | Int32Array {
    return this.__data
  }

  // ///////////////////////////
  // Persistence

  /**
   * Converts this Vec3 to a string in JSON format.
   *
   * @return - The return value.
   */
  toString() {
    // eslint-disable-next-line new-cap
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @return - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
      t: this.t,
    }
  }

  /**
   * Decodes a JSON object to set the state of this class.
   *
   * @param j - The json object.
   */
  fromJSON(j: Record<string, number>): void {
    this.x = j.x
    this.y = j.y
    this.z = j.z
    this.t = j.t
  }

  /**
   * Loads the state of the value from a binary reader.
   *
   * @param reader - The reader value.
   */
  readBinary(reader: BinReader): void {
    this.x = reader.loadFloat32()
    this.y = reader.loadFloat32()
    this.z = reader.loadFloat32()
    this.t = reader.loadFloat32()
  }

  /**
   * Verifies if the values stored in this Math type are valid numeric values.
   * Returns `false` If at least one of the values is either {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity|Infinity} or
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN|NaN}.
   *
   * @return - Returns the result as a boolean.
   */
  isValid(): boolean {
    for (const v of this.__data) {
      if (v == Infinity || isNaN(v)) return false
    }

    return true
  }
}

export { Vec4 }
