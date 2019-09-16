import { AttrValue } from './AttrValue.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a Vec3.
 * @extends AttrValue
 */
class Vec3 extends AttrValue {
  /**
   * Create a Vec3.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The y value.
   */
  constructor(x = 0, y = 0, z = 0) {
    super();
    if (x instanceof Float32Array || x instanceof Uint32Array) {
      this.__data = x;
    } else if (x instanceof ArrayBuffer) {
      const buffer = x;
      const byteOffset = y;
      this.__data = new Float32Array(buffer, byteOffset, 3);
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(3);
      this.fromJSON(x);
    } else {
      this.__data = new Float32Array(3);
      this.__data[0] = x;
      this.__data[1] = y;
      this.__data[2] = z;
    }
  }

  /**
   * Getter for x.
   */
  get x() {
    return this.__data[0];
  }

  /**
   * Setter for x.
   * @param {number} val - The val param.
   */
  set x(val) {
    this.__data[0] = val;
  }

  /**
   * Getter for y.
   */
  get y() {
    return this.__data[1];
  }

  /**
   * Setter for y.
   * @param {number} val - The val param.
   */
  set y(val) {
    this.__data[1] = val;
  }

  /**
   * Getter for z.
   */
  get z() {
    return this.__data[2];
  }

  /**
   * Setter for z.
   * @param {number} val - The val param.
   */
  set z(val) {
    this.__data[2] = val;
  }

  /**
   * Setter from scalar components.
   * @param {number} x - The x param.
   * @param {number} y  - The y param.
   * @param {number} z  - The y param.
   */
  set(x, y, z) {
    this.x = x;
    this.y = y !== undefined ? y : x;
    this.z = z !== undefined ? z : x;
  }

  /**
   * The setDataArray method.
   * @param {any} float32Array - The float32Array param.
   */
  setDataArray(float32Array) {
    this.__data = float32Array;
  }

  /**
   * Setter from another vector.
   * @param {any} other - The other param.
   */
  setFromOther(other) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
  }

  /**
   * The isNull method.
   * @return {any} - The return value.
   */
  isNull() {
    return (
      Math.abs(this.x) < Number.EPSILON &&
      Math.abs(this.y) < Number.EPSILON &&
      Math.abs(this.z) < Number.EPSILON
    );
  }

  /**
   * The is111 method.
   * @return {any} - The return value.
   */
  is111() {
    return (
      Math.abs(1.0 - this.x) < Number.EPSILON &&
      Math.abs(1.0 - this.y) < Number.EPSILON &&
      Math.abs(1.0 - this.z) < Number.EPSILON
    );
  }

  /**
   * Returns true if this vector is the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  equal(other, precision) {
    return this.x == other.x && this.y == other.y && this.z == other.z;
  }

  /**
   * Returns true if this vector is not the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  notequals(other, precision) {
    return this.x != other.x && this.y != other.y && this.z != other.z;
  }

  /**
   * Returns true if this vector is the same as another one
   * (given a precision).
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  approxEqual(other) {
    return (
      Math.abs(this.x - other.x) < Number.EPSILON &&
      Math.abs(this.y - other.y) < Number.EPSILON &&
      Math.abs(this.z - other.z) < Number.EPSILON
    );
  }

  /**
   * Returns a new vector which is this vector added to other.
   * @param {any} other - The other param.
   * @return {vec3} - The return value.
   */
  add(other) {
    return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  /**
   * The addInPlace method.
   * @param {any} other - The other param.
   */
  addInPlace(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
  }

  /**
   * Returns a new vector which is this vector subtracted from other.
   * @param {any} other - The other param.
   * @return {vec3} - The return value.
   */
  subtract(other) {
    return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  /**
   * The subtractInPlace method.
   * @param {any} other - The other param.
   */
  subtractInPlace(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
  }

  /**
   * The multiply method.
   * @param {any} vec3 - The vec3 param.
   * @return {vec3} - The return value.
   */
  multiply(vec3) {
    return new Vec3(this.x * vec3.x, this.y * vec3.y, this.z * vec3.z);
  }

  /**
   * The multiplyInPlace method.
   * @param {any} vec3 - The vec3 param.
   */
  multiplyInPlace(vec3) {
    this.x *= vec3.x;
    this.y *= vec3.y;
    this.z *= vec3.z;
  }

  /**
   * The divide method.
   * @param {any} vec3 - The vec3 param.
   * @return {vec3} - The return value.
   */
  divide(vec3) {
    return new Vec3(this.x / vec3.x, this.y / vec3.y, this.z / vec3.z);
  }

  /**
   * The divideInPlace method.
   * @param {any} vec3 - The vec3 param.
   */
  divideInPlace(vec3) {
    this.x /= vec3.x;
    this.y /= vec3.y;
    this.z /= vec3.z;
  }

  /**
   * The scale method.
   * @param {any} scalar - The scalar param.
   * @return {vec3} - The return value.
   */
  scale(scalar) {
    return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * The scaleInPlace method.
   * @param {any} scalar - The scalar param.
   */
  scaleInPlace(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  /**
   * The negate method.
   * @return {vec3} - The return value.
   */
  negate() {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  /**
   * The inverse method.
   * @param {any} vec3 - The vec3 param.
   * @return {vec3} - The return value.
   */
  inverse(vec3) {
    return new Vec3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z);
  }

  /**
   * Calculates the length of a vec3.
   * @return {number} - The length of a.
   */
  lengthSquared() {
    const x = this.__data[0];
    const y = this.__data[1];
    const z = this.__data[2];
    return x * x + y * y + z * z;
  }

  /**
   * Calculates the length of a vec3.
   * @return {number} - The length of a.
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Calculates the distance to another vector.
   * @param {any} other - The other param.
   * @return {number} - the return value.
   */
  distanceTo(other) {
    const x = this.__data[0] - other.x;
    const y = this.__data[1] - other.y;
    const z = this.__data[2] - other.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  /**
   * Returns the vector normalized.
   * @return {vec3} - the return value.
   */
  normalize() {
    let len =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2];
    if (len < Number.EPSILON) {
      return new Vec3();
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1.0 / Math.sqrt(len);
    return new Vec3(
      this.__data[0] * len,
      this.__data[1] * len,
      this.__data[2] * len
    );
  }

  /**
   * The normalizeInPlace method.
   * @return {any} - The return value.
   */
  normalizeInPlace() {
    let len =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2];
    if (len < Number.EPSILON) {
      return;
    }
    len = Math.sqrt(len);
    const tmp = 1.0 / len;
    this.__data[0] *= tmp;
    this.__data[1] *= tmp;
    this.__data[2] *= tmp;
    return len;
  }

  /**
   * The resize method.
   * @param {any} length - The length param.
   * @return {any} - The return value.
   */
  resize(length) {
    const currlen =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2];
    if (currlen < Number.EPSILON) {
      return;
    }
    const scl = length / Math.sqrt(currlen);
    return new Vec3(
      this.__data[0] * scl,
      this.__data[1] * scl,
      this.__data[2] * scl
    );
  }

  /**
   * The resizeInPlace method.
   * @param {any} length - The length param.
   */
  resizeInPlace(length) {
    const currlen =
      this.__data[0] * this.__data[0] +
      this.__data[1] * this.__data[1] +
      this.__data[2] * this.__data[2];
    if (currlen < Number.EPSILON) {
      return;
    }
    const scl = length / Math.sqrt(currlen);
    this.__data[0] *= scl;
    this.__data[1] *= scl;
    this.__data[2] *= scl;
  }

  /**
   * Calculates the dot product of two vec3s.
   * @param {vec3} b - The second operand.
   * @return {number} - The dot product of a and b.
   */
  dot(b) {
    return this.x * b.x + this.y * b.y + this.z * b.z;
  }

  /**
   * Computes the cross product of two vec3s.
   * @param {vec3} b - The second operand.
   * @return {vec3} - The return value.
   */
  cross(b) {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;

    return new Vec3(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
  }

  /**
   * Gets the angle between two 3D vectors.
   * @param {vec3} b - The second operand.
   * @return {number} - The angle in radians.
   */
  angleTo(b) {
    const cosine = this.dot(b);
    if (cosine > 1.0) {
      return 0;
    } else {
      return Math.acos(cosine);
    }
  }

  /**
   * Performs a linear interpolation between two vec3s.
   * @param {vec3} b - The second operand.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {vec3} - The return value.
   */
  lerp(b, t) {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    return new Vec3(
      ax + t * (b.x - ax),
      ay + t * (b.y - ay),
      az + t * (b.z - az)
    );
  }

  /**
   * The abs method.
   * @return {vec3} - The return value.
   */
  abs() {
    return new Vec3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }

  /**
   * Sets the vector a random direction with the given scale.
   * @param {number} scale - The scale param.
   * @return {any} - The return value.
   */
  setRandomDir(scale = 1.0) {
    const r = Math.random() * 2.0 * Math.PI;
    const z = Math.random() * 2.0 - 1.0;
    const zScale = Math.sqrt(1.0 - z * z) * scale;

    this.__data[0] = Math.cos(r) * zScale;
    this.__data[1] = Math.sin(r) * zScale;
    this.__data[2] = z * scale;
    return this;
  }

  /**
   * The setRandom method.
   * @param {number} scale - The scale param.
   * @return {any} - The return value.
   */
  setRandom(scale = 1.0) {
    this.__data[0] = (Math.random() - 0.5) * scale;
    this.__data[1] = (Math.random() - 0.5) * scale;
    this.__data[2] = (Math.random() - 0.5) * scale;
    return this;
  }

  /**
   * The clone method.
   * @return {vec3} - The return value.
   */
  clone() {
    return new Vec3(this.__data[0], this.__data[1], this.__data[2]);
  }

  /**
   * The asArray method.
   * @return {any} - The return value.
   */
  asArray() {
    return this.__data;
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {vec3} - The return value.
   */
  static create(...args) {
    return new Vec3(...args);
  }

  /**
   * The createFromJSON method.
   * @param {any} json - The json param.
   * @return {vec3} - The return value.
   */
  static createFromJSON(json) {
    const result = new Vec3();
    result.fromJSON(json);
    return result;
  }

  /**
   * The createFromFloat32Buffer method.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {vec3} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec3(buffer, offset * 4); // 4 bytes per 32bit float
  }

  /**
   * The createFromFloat32Array method.
   * @param {any} array - The array param.
   * @return {vec3} - The return value.
   */
  static createFromFloat32Array(array) {
    return new Vec3(array);
  }

  /**
   * The numFloat32Elements method.
   * @return {number} - The return value.
   */
  static numFloat32Elements() {
    return 3;
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   */
  fromJSON(j) {
    this.x = j.x;
    this.y = j.y;
    this.z = j.z;
  }
}

typeRegistry.registerType('Vec3', Vec3);

export { Vec3 };
// export default Vec3;
