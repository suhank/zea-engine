import { BinReader } from '../SceneTree/BinReader'
import { StringFunctions } from '../Utilities/StringFunctions'
/**
 * Representing a Vec2(two-dimensional floating point vector). A Vec2 is for representing 2 dimensional values, such as screen coordinates or pixel coordinates within an image.
 *
 * Math types internally store values in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array} and
 * expose getters and setters for the component values.
 *
 */
class Vec2 {
  __data: Float32Array | Uint32Array | Int32Array
  /**
   * Creates a Vec2.
   *
   * The type of values of the `(x, y)` coordinates can be {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array|Float32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array|Uint32Array},
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array|Int32Array} and
   * {@link https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/ArrayBuffer|ArrayBuffer}.
   *
   *
   * ```javascript
   *  const myVec2 = new Vec2(1.2, 3.4)
   * ```
   *
   * Given an array of floats, create a Vec2 that wraps some part of it.
   * ```javascript
   *  const floatArray = new Float32Array(6)
   *  floatArray[0] = 1.2
   *  floatArray[1] = 3.4
   *  const myVec2 = new Vec2(floatArray)
   *  console.log(myVec2.toJSON())
   * ```
   * The resulting output
   * ```json
   *  > { x:1.2, y:3.4 }
   * ```
   *
   * Given an array of floats, create a Vec2 that wraps some part of it.
   * ```javascript
   *  const floatArray = new Float32Array(6)
   *  floatArray[0] = 1.2
   *  floatArray[1] = 3.4
   *  floatArray[2] = 5.6
   *  floatArray[3] = 7.8
   *  floatArray[4] = 9.0
   *  floatArray[5] = 1.9
   *  const myVec2 = new Vec2(floatArray.buffer, 8)
   *  console.log(myVec2.toJSON())
   * ```
   * The resulting output
   * ```json
   *  > { x:5.6, y:7.8 }
   * ```
   *
   * You can also pass one JSON object parameter.
   * ```javascript
   *  const myVec2 = new Vec2({ x:1.2, y:3.4 })
   * ```
   *
   * @param x - The x value. Default is 0.
   * @param y - The y value. Default is 0.
   */
  constructor(x: any = 0, y = 0) {
    //x: number | Float32Array | Uint32Array | Record<string, any> = 0

    if (x instanceof Float32Array || x instanceof Uint32Array || x instanceof Int32Array) {
      this.__data = x
    } else if (x instanceof ArrayBuffer) {
      console.warn(`deprecated, please use new Vec4(new Float32Array(buffer, byteOffset, 4))`)
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
   * Getter for `x` component.
   * @return - Returns the x component.
   */
  get x(): number {
    return this.__data[0]
  }

  /**
   * Setter for `x` component.
   * @param val - The val param.
   */
  set x(val: number) {
    this.__data[0] = val
  }

  /**
   * Getter for `y` component.
   * @return - Returns the y component.
   */
  get y(): number {
    return this.__data[1]
  }

  /**
   * Setter for `y` component.
   * @param val - The val param.
   */
  set y(val: number) {
    this.__data[1] = val
  }

  /**
   * Setter from scalar components.
   * @param x - The x component.
   * @param y  - The y component.
   */
  set(x: number, y: number): void {
    this.__data[0] = x
    this.__data[1] = y
  }

  /**
   * Replaces this Vec2 data with the Vec2 data passed as parameter.
   *
   * @param other - The other Vec2 to set from.
   */
  setFromOther(other: Vec2): void {
    this.x = other.x
    this.y = other.y
  }

  /**
   * Checks if this Vec2 contains the same values as the other Vec2.
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns `true` if are the same Vector, otherwise, `false`.
   */
  isEqual(other: Vec2): boolean {
    return this.x == other.x && this.y == other.y
  }

  /**
   * Checks if this Vec2 is different from another Vec2.
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns `true` if the Vec2s are different, otherwise, `false`.
   */
  notEqual(other: Vec2): boolean {
    return this.x != other.x && this.y != other.y
  }

  /**
   * Returns true if this Vec2 is approximately the same as other.
   *
   * @param other - The other Vec2 to compare with.
   * @param precision - The precision to which the values must match.
   * @return - Returns true or false.
   */
  approxEqual(other: Vec2, precision: number = Number.EPSILON): boolean {
    return Math.abs(this.x - other.x) < precision && Math.abs(this.y - other.y) < precision
  }

  /**
   * Adds other to this Vec2 and returns the result as a new Vec2.
   *
   * @param other - The other Vec2 to add.
   * @return - Returns a new Vec2.
   */
  add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y)
  }

  /**
   * Adds a Vec2 to this Vec2.
   *
   * @param other - The other Vec2 to add.
   */
  addInPlace(other: Vec2): void {
    this.x += other.x
    this.y += other.y
  }

  /**
   * Subtracts a Vec2 from this Vec2 and returns the result as a new Vec2.
   *
   * @param other - The other Vec2 to subtract.
   * @return - Returns a new Vec2.
   */
  subtract(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y)
  }

  /**
   * Subtracts a Vec2 from this Vec2.
   *
   * @param other - The other Vec2 to subtract.
   * @return - Returns a new Vec2.
   */
  subtractInPlace(other: Vec2): Vec2 {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  /**
   * Scales this Vec2 by scalar and returns the result as a new Vec2.
   *
   * @param scalar - The scalar value.
   * @return - Returns a new Vec2.
   */
  scale(scalar: number): Vec2 {
    return new Vec2(this.x * scalar, this.y * scalar)
  }

  /**
   * Scales this Vec2 by scalar.
   *
   * @param scalar - The scalar value.
   */
  scaleInPlace(scalar: number): void {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Inverts this Vec2 and returns the result as a new Vec2.
   *
   * @return - Returns a new Vec2.
   */
  invert(): Vec2 {
    return new Vec2(1.0 / this.x, 1.0 / this.y)
  }

  /**
   * Inverts this Vec2.
   *
   * @return - The return value.
   */
  invertInPlace(): Vec2 {
    this.x = 1.0 / this.x
    this.y = 1.0 / this.y
    return this
  }

  /**
   * Multiplies a Vec2 with this Vec2 and returns the result as a new Vec2.
   *
   * @param other - The other Vec2 to multiply with.
   * @return - Returns a new Vec2.
   */
  multiply(other: Vec2): Vec2 {
    return new Vec2(this.x * other.x, this.y * other.y)
  }

  /**
   * Multiplies a Vec2 with this Vec2.
   *
   * @param other - The other Vec2 to multiply with.
   */
  multiplyInPlace(other: Vec2): void {
    this.x *= other.x
    this.y *= other.y
  }

  /**
   * Calculates the squared length of this Vec2.
   *
   * @return - Returns the length squared.
   */
  lengthSquared(): number {
    const x = this.__data[0]
    const y = this.__data[1]
    return x * x + y * y
  }

  /**
   * Calculates the length of this Vec2.
   *
   * @return - Returns the length.
   */
  length(): number {
    return Math.sqrt(this.lengthSquared())
  }

  /**
   * Calculates the distance to another vector.
   *
   * @param other - The other value.
   * @return - Returns the distance between vectors.
   */
  distanceTo(other: Vec2): number {
    const x = this.__data[0] - other.x
    const y = this.__data[1] - other.y
    return Math.sqrt(x * x + y * y)
  }

  /**
   * Normalizes the Vec2 and returns it as a new Vec2.
   * Multiplies coordinates value by the inverse of the vector length.
   *
   * @return - Returns the Vec2 normalized.
   */
  normalize(): Vec2 {
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
   * Normalizes this Vec2 multiplying coordinate values by the inverse of the vector length.
   */
  normalizeInPlace(): void {
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
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns the dot product.
   */
  dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y
  }

  /**
   * Calculates the cross product of this Vec2 against another Vec2.
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns the cross product.
   */
  cross(other: Vec2): number {
    // just calculate the z-component
    return this.x * other.y - this.y * other.x
  }

  /**
   * Gets the angle between this Vec2 and other assuming both are normalized vectors.
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns the angle in radians.
   */
  angleTo(other: Vec2): number {
    const cosine = this.normalize().dot(other.normalize())
    if (cosine > 1.0) return 0.0
    else if (cosine < -1.0) return Math.PI
    else return Math.acos(cosine)
  }

  /**
   * Gets the angle between this Vec2 and other.
   *
   * @param other - The other Vec2 to compare with.
   * @return - Returns the angle in radians.
   */
  signedAngleTo(other: Vec2): number {
    const angle = this.angleTo(other)
    if (this.cross(other) < 0.0) return -angle
    else return angle
  }

  /**
   * Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.
   *
   * @param angle - The angle of rotation.
   * @return - Returns the rotated vector.
   */
  rotate(angle: number): Vec2 {
    const cosA = Math.cos(angle)
    const sinA = Math.sin(angle)
    return new Vec2(this.x * cosA - this.y * sinA, this.x * sinA + this.y * cosA)
  }

  /**
   * Performs a linear interpolation between this Vec2 and other Vec2.
   *
   * @param other - The other Vec2 to interpolate between.
   * @param t - Interpolation amount between the two inputs.
   * @return - Returns a new Vec2.
   */
  lerp(other: Vec2, t: number): Vec2 {
    const ax = this.x
    const ay = this.y
    return new Vec2(ax + t * (other.x - ax), ay + t * (other.y - ay))
  }

  /**
   * Generates a random vector with the given scale.
   *
   * @param scale - Length of the resulting vector. If omitted, a unit vector will be returned.
   * @return - The return value.
   */
  setRandomDir(scale = 1.0): Vec2 {
    const r = Math.random() * 2.0 * Math.PI
    this.__data[0] = Math.cos(r) * scale
    this.__data[1] = Math.sin(r) * scale
    return this
  }

  /**
   * Randomizes the scale of this Vec2 coordinates.
   *
   * @param scale - The scale value.
   * @return - The return value.
   */
  setRandom(scale = 1.0): Vec2 {
    this.__data[0] = Math.random() * scale
    this.__data[1] = Math.random() * scale
    return this
  }

  /**
   * Clones this Vec2 and returns a new Vec2.
   *
   * @return - Returns a new Vec2.
   */
  clone(): Vec2 {
    return new Vec2(this.__data[0], this.__data[1])
  }

  /**
   * Returns current Vec2 data as array. Often used to pass types to the GPU.
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
   * Encodes Vec2 Class as a JSON object for persistence.
   *
   * @return - The json object.
   */
  toJSON(): Record<string, number> {
    return {
      x: this.x,
      y: this.y,
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
  }

  /**
   * Loads the state of the value from a binary reader.
   *
   * @param reader - The reader value.
   */
  readBinary(reader: BinReader): void {
    this.x = reader.loadFloat32()
    this.y = reader.loadFloat32()
  }

  /**
   * Calculate the intersection point of 2 2d lines, returning the parameters values for each line.
   *
   * @param p0 - The point of the first line
   * @param d0 - The direction of the first line
   * @param p1 - The point of the second line
   * @param d1 - The direction of the second line
   * @return - Returns an array containing 2 parameter values for the 2 lines.
   */
  static intersectionOfLines(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2): Vec2 | null {
    // https://dirask.com/posts/JavaScript-how-to-calculate-intersection-point-of-two-lines-for-given-4-points-VjvnAj
    // down part of intersection point formula
    const d1 = (p1.x - p2.x) * (p3.y - p4.y) // (x1 - x2) * (y3 - y4)
    const d2 = (p1.y - p2.y) * (p3.x - p4.x) // (y1 - y2) * (x3 - x4)
    const d = d1 - d2

    if (d == 0) {
      return null
    }

    // upper part of intersection point formula
    const u1 = p1.x * p2.y - p1.y * p2.x // (x1 * y2 - y1 * x2)
    const u4 = p3.x * p4.y - p3.y * p4.x // (x3 * y4 - y3 * x4)

    const u2x = p3.x - p4.x // (x3 - x4)
    const u3x = p1.x - p2.x // (x1 - x2)
    const u2y = p3.y - p4.y // (y3 - y4)
    const u3y = p1.y - p2.y // (y1 - y2)

    // intersection point formula

    const px = (u1 * u2x - u3x * u4) / d
    const py = (u1 * u2y - u3y * u4) / d

    return new Vec2(px, py)
  }

  isValid(): boolean {
    for (const v of this.__data) {
      if (v == Infinity || isNaN(v)) return false
    }

    return true
  }
}

export { Vec2 }
