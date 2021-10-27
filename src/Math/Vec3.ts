import { Vec2 } from './Vec2'
import { StringFunctions } from '../Utilities/StringFunctions'
import { BinReader } from '../SceneTree/BinReader'

/**
 * Represents a three dimensional coordinate, such as 3D scene values, or mesh vertex positions.
 *
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 */
class Vec3 {
  __data: Float32Array | Uint32Array | Int32Array
  /**
   * Creates a Vec3.
   *
   * The type of values of the `(x, y, z)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
   * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
   *
   * You can also pass one JSON object parameter.
   *
   * @param x - The x value. Default is 0.
   * @param y - The y value. Default is 0.
   * @param z - The z value. Default is 0.
   */
  constructor(x: number | Float32Array | Uint32Array | ArrayBuffer = 0, y = 0, z = 0) {
    if (x instanceof Float32Array || x instanceof Uint32Array) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      console.warn(`deprecated, please use new Vec3(new Float32Array(buffer, byteOffset, 3))`)
      const buffer = x
      const byteOffset = y
      this.__data = new Float32Array(buffer, byteOffset, 3)
    } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
      this.__data = new Float32Array(3)
      this.__data[0] = x
      this.__data[1] = y
      this.__data[2] = z
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(3)
      this.fromJSON(x)
    } else {
      this.__data = new Float32Array(3)
    }
  }

  /**
   * Getter for `x` component.
   *
   * @return - Returns the x component.
   */
  get x(): number {
    return this.__data[0]
  }

  /**
   * Setter for `x` component.
   *
   * @param val - The val param.
   */
  set x(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for `y` component.
   *
   * @return - Returns the y component.
   */
  get y(): number {
    return this.__data[1]
  }

  /**
   * Setter for `y` component.
   *
   * @param val - The val param.
   */
  set y(val: number) {
    this.__data[1] = val
  }

  /**
   * Getter for `z` component.
   *
   * @return - Returns the z component.
   */
  get z(): number {
    return this.__data[2]
  }

  /**
   * Setter for `z` component.
   *
   * @param val - The val param.
   */
  set z(val: number) {
    this.__data[2] = val
  }

  /**
   * Getter for `xy` swizzel.
   *
   * @return - Returns the xy components as a Vec2.
   */
  get xy(): Vec2 {
    return new Vec2(this.__data[0], this.__data[1])
  }

  /**
   * Getter for `yz` swizzel.
   *
   * @return - Returns the yz components as a Vec2.
   */
  get yz(): Vec2 {
    return new Vec2(this.__data[1], this.__data[2])
  }

  /**
   * Setter from scalar components.
   *
   * @param x - The x component.
   * @param y - The y component.
   * @param z - The y component.
   */
  set(x: number, y: number, z: number): void {
    this.x = x
    this.y = y !== undefined ? y : x
    this.z = z !== undefined ? z : x
  }

  /**
   * Sets the state of a Vec3 Object.
   *
   * @param float32Array - The float32Array value.
   */
  setDataArray(float32Array: Float32Array): void {
    this.__data = float32Array
  }

  /**
   * Sets the state of a Vec3 Object from another Vec3.
   *
   * @param other - The other Vec3 to set from.
   */
  setFromOther(other: Vec3): void {
    this.x = other.x
    this.y = other.y
    this.z = other.z
  }

  /**
   * Checks if the coordinates of this Vec3 are 0 0 0.
   *
   * @return - Returns `true` if the coordinates are(0, 0, 0), otherwise, `false`.
   */
  isNull(): boolean {
    return Math.abs(this.x) < Number.EPSILON && Math.abs(this.y) < Number.EPSILON && Math.abs(this.z) < Number.EPSILON
  }

  /**
   * Checks if the coordinates of this Vec3 are 1 1 1.
   *
   * @return - Returns `true` if the coordinates are(1, 1, 1), otherwise, `false`.
   */
  is111(): boolean {
    return (
      Math.abs(1.0 - this.x) < Number.EPSILON &&
      Math.abs(1.0 - this.y) < Number.EPSILON &&
      Math.abs(1.0 - this.z) < Number.EPSILON
    )
  }

  /**
   * Checks if this Vec3 contains the same values as the other Vec3.
   *
   * @param other - The other Vec3 to compare with.
   * @return - Returns `true` if the values are the same, otherwise, `false`.
   */
  isEqual(other: Vec3): boolean {
    return this.x == other.x && this.y == other.y && this.z == other.z
  }

  /**
   * Checks if this Vec2 is different from another Vec2.
   *
   * @param other - The other Vec3 to compare with.
   * @return - Returns `true` if the Vec3s are different, otherwise, `false`.
   */
  notEqual(other: Vec3): boolean {
    return this.x != other.x && this.y != other.y && this.z != other.z
  }

  /**
   * Returns true if this Vec2 is approximately the same as other.
   *
   * @param other - The other Vec3 to compare with.
   * @param precision - The precision to which the values must match.
   * @return - Returns true or false.
   */
  approxEqual(other: Vec3, precision = Number.EPSILON): boolean {
    return (
      Math.abs(this.x - other.x) < precision &&
      Math.abs(this.y - other.y) < precision &&
      Math.abs(this.z - other.z) < precision
    )
  }

  /**
   * Adds other to this Vec3 and return the result as a new Vec3.
   *
   * @param other - The other Vec3 to add.
   * @return - Returns a new Vec3.
   */
  add(other: Vec3): Vec3 {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  /**
   * Adds other to this Vec3.
   *
   * @param other - The other Vec3 to add.
   */
  addInPlace(other: Vec3): void {
    this.x += other.x
    this.y += other.y
    this.z += other.z
  }

  /**
   * Subtracts other from this Vec3 and returns the result as a new Vec3.
   *
   * @param other - The other Vec3 to subtract.
   * @return - Returns a new Vec3.
   */
  subtract(other: Vec3): Vec3 {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  /**
   * Subtracts other from this Vec3.
   *
   * @param other - The other Vec3 to subtract.
   */
  subtractInPlace(other: Vec3): void {
    this.x -= other.x
    this.y -= other.y
    this.z -= other.z
  }

  /**
   * Multiplies two Vec3s and returns the result as a new Vec3.
   *
   * @param other - The other Vec3 to multiply with.
   * @return - Returns a new Vec3.
   */
  multiply(other: Vec3): Vec3 {
    return new Vec3(this.x * other.x, this.y * other.y, this.z * other.z)
  }

  /**
   * Multiplies two Vec3s.
   *
   * @param other - The other Vec3 to multiply with.
   */
  multiplyInPlace(other: Vec3): void {
    this.x *= other.x
    this.y *= other.y
    this.z *= other.z
  }

  /**
   * Divides two Vec3s and returns the result as a new Vec3.
   *
   * @param vec3 - The other Vec3 to divide by.
   * @return - Returns a new Vec3.
   */
  divide(vec3: Vec3): Vec3 {
    return new Vec3(this.x / vec3.x, this.y / vec3.y, this.z / vec3.z)
  }

  /**
   * Divides two Vec3s.
   *
   * @param vec3 - The other Vec3 to divide by.
   */
  divideInPlace(vec3: Vec3): void {
    this.x /= vec3.x
    this.y /= vec3.y
    this.z /= vec3.z
  }

  /**
   * Scales this Vec3 by scalar and returns the result as a new Vec3.
   *
   * @param scalar - The scalar value.
   * @return - Returns a new Vec3.
   */
  scale(scalar: number): Vec3 {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar)
  }

  /**
   * Scales this Vec3 by scalar.
   *
   * @param scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
  }

  /**
   * Negates this Vec3 (x = -x, y = -y and z = -z), but returns the result as a new Vec3.
   *
   * @return - Returns a new Vec3.
   */
  negate(): Vec3 {
    return new Vec3(-this.x, -this.y, -this.z)
  }

  /**
   * Returns the inverse of this Vec3, but returns. the result as a new Vec3
   *
   * @return - Returns a new Vec3.
   */
  inverse(): Vec3 {
    return new Vec3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z)
  }

  /**
   * Calculates the squared length of this Vec3.
   *
   * @return - Returns the length.
   */
  lengthSquared(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    const z = this.__data[2]
    return x * x + y * y + z * z
  }

  /**
   * Calculates the length of this Vec3.
   *
   * @return - Returns the length.
   */
  length(): number {
    return Math.sqrt(this.lengthSquared())
  }

  /**
   * Calculates the distance to another Vec3.
   *
   * @param other - The other Vec3 to calculate the distance to.
   * @return - Returns the distance between vectors.
   */
  distanceTo(other: Vec3): number {
    const x = this.__data[0] - other.x
    const y = this.__data[1] - other.y
    const z = this.__data[2] - other.z
    return Math.sqrt(x * x + y * y + z * z)
  }

  /**
   * Normalizes the Vec3 and returns it as a new Vec3.
   * Multiplies coordinates value by the inverse of the vector length.
   *
   * @return - Returns the Vec3 normalized.
   */
  normalize(): Vec3 {
    let len = this.__data[0] * this.__data[0] + this.__data[1] * this.__data[1] + this.__data[2] * this.__data[2]
    if (len < Number.EPSILON) {
      return new Vec3()
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1.0 / Math.sqrt(len)
    return new Vec3(this.__data[0] * len, this.__data[1] * len, this.__data[2] * len)
  }

  /**
   * Normalizes this Vec3 multiplying coordinate values by the inverse of the vector length.
   *
   * @return - The return value.
   */
  normalizeInPlace(): number | void {
    let len = this.__data[0] * this.__data[0] + this.__data[1] * this.__data[1] + this.__data[2] * this.__data[2]
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
   * Creates and returns a new Vec3 with the new coordinates(calculated with this Vec3 coordinates and the specified length).
   *
   * @param length - The length value.
   * @return - The return value.
   */
  resize(length: number): Vec3 | void {
    const currLen = this.__data[0] * this.__data[0] + this.__data[1] * this.__data[1] + this.__data[2] * this.__data[2]
    if (currLen < Number.EPSILON) {
      return
    }
    const scl = length / Math.sqrt(currLen)
    return new Vec3(this.__data[0] * scl, this.__data[1] * scl, this.__data[2] * scl)
  }

  /**
   * Modifies current coordinates using the specified length.
   *
   * @param length - The length value.
   */
  resizeInPlace(length: number): void {
    const currLen = this.__data[0] * this.__data[0] + this.__data[1] * this.__data[1] + this.__data[2] * this.__data[2]
    if (currLen < Number.EPSILON) {
      return
    }
    const scl = length / Math.sqrt(currLen)
    this.__data[0] *= scl
    this.__data[1] *= scl
    this.__data[2] *= scl
  }

  /**
   * Calculates the dot product of this Vec3 against another Vec3.
   *
   * @param other - The other Vec3 to compare with.
   * @return - Returns the dot product.
   */
  dot(other: Vec3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  /**
   * Calculates the cross product of two Vec3s and returns the result as a new Vec3.
   *
   * @param other - The other Vec3 to calculate with.
   * @return - Returns the cross product as a new Vec3.
   */
  cross(other: Vec3): Vec3 {
    const ax = this.x
    const ay = this.y
    const az = this.z
    const bx = other.x
    const by = other.y
    const bz = other.z

    return new Vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx)
  }

  /**
   * Gets the angle between this Vec3 and b.
   *
   * @param other - The other Vec3 to compare with.
   * @return - Returns the angle in radians.
   */
  angleTo(other: Vec3): number {
    const cosine = this.dot(other)
    if (cosine > 1.0) {
      return 0
    } else {
      return Math.acos(cosine)
    }
  }

  /**
   * Performs a linear interpolation between this Vec3 and other.
   *
   * @param other - The other Vec3 to interpolate between.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new Vec3.
   */
  lerp(other: Vec3, t: number): Vec3 {
    const ax = this.x
    const ay = this.y
    const az = this.z
    return new Vec3(ax + t * (other.x - ax), ay + t * (other.y - ay), az + t * (other.z - az))
  }

  /**
   * Returns a new Vec3 whose component values are the abs of this Vec3s component values.
   *
   * @return - Returns a new Vec3.
   */
  abs(): Vec3 {
    return new Vec3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
  }

  /**
   * Sets the vector a random vector on the surface of a sphere with the radius of the given scale value.
   *
   * @param scale - The radius of the surface sphere.
   * @return - The random Vec3.
   */
  setRandomDir(scale = 1.0): Vec3 {
    const r = Math.random() * 2.0 * Math.PI
    const z = Math.random() * 2.0 - 1.0
    const zScale = Math.sqrt(1.0 - z * z) * scale

    this.__data[0] = Math.cos(r) * zScale
    this.__data[1] = Math.sin(r) * zScale
    this.__data[2] = z * scale
    return this
  }

  /**
   * Generates a random vector anywhere in the sphere defined by the provided scale value.
   *
   * @param scale - The radius of the bounding sphere.
   * @return - The random Vec3.
   */
  setRandom(scale = 1.0): Vec3 {
    this.__data[0] = (Math.random() - 0.5) * scale
    this.__data[1] = (Math.random() - 0.5) * scale
    this.__data[2] = (Math.random() - 0.5) * scale
    return this
  }

  /**
   * Clones this Vec3 and returns a new Vec3.
   *
   * @return - Returns a new Vec3.
   */
  clone(): Vec3 {
    return new Vec3(this.__data[0], this.__data[1], this.__data[2])
  }

  /**
   * Returns the type as an array. Often used to pass types to the GPU.
   *
   * @return - Returns as an array.
   */
  asArray(): Float32Array {
    return <Float32Array>this.__data // TODO: return type + cast is a temp fix
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
   * Encodes Vec3 Class as a JSON object for persistence.
   *
   * @return - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
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
  }

  isValid(): boolean {
    for (const v of this.__data) {
      if (v == Infinity || isNaN(v)) return false
    }

    return true
  }
}

export { Vec3 }
