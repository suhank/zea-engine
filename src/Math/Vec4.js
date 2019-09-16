import { AttrValue } from './AttrValue.js';
import { typeRegistry } from './TypeRegistry.js';
import { Vec3 } from './Vec3.js';

/** Class representing a Vec4.
 * @extends AttrValue
 */
class Vec4 extends AttrValue {
  /**
   * Create a Vec3.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The y value.
   * @param {number} t - The t value.
   */
  constructor(x = 0, y = 0, z = 0, t = 0) {
    super();

    if (x instanceof ArrayBuffer) {
      const buffer = x;
      const byteOffset = y;
      this.__data = new Float32Array(buffer, byteOffset, 4);
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(4);
      this.fromJSON(x);
    } else {
      this.__data = new Float32Array(4);
      this.__data[0] = x;
      this.__data[1] = y;
      this.__data[2] = z;
      this.__data[3] = t;
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
   * Getter for t.
   */
  get t() {
    return this.__data[3];
  }

  /**
   * Setter for t.
   * @param {number} val - The val param.
   */
  set t(val) {
    this.__data[3] = val;
  }

  /**
   * Setter from scalar components.
   * @param {number} x - The x param.
   * @param {number} y  - The y param.
   * @param {number} z  - The y param.
   * @param {number} t  - The t param.
   */
  set(x, y, z, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
  }

  /**
   * Setter from another vector.
   * @param {any} other - The other param.
   */
  setFromOther(other) {
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    this.t = other.t;
  }

  /**
   * Returns true if this vector is the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  equal(other, precision) {
    return (
      this.x == other.x &&
      this.y == other.y &&
      this.z == other.z &&
      this.t == other.t
    );
  }

  /**
   * Returns true if this vector is not the same as another one.
   * @param {any} other - The other param.
   * @param {any} precision - The precision param.
   * @return {any} - The return value.
   */
  notequals(other, precision) {
    return (
      this.x != other.x &&
      this.y != other.y &&
      this.z != other.z &&
      this.t != other.t
    );
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
      Math.abs(this.z - other.z) < Number.EPSILON &&
      Math.abs(this.t - other.t) < Number.EPSILON
    );
  }

  /**
   * Returns a new vector which is this vector added to other.
   * @param {any} other - The other param.
   * @return {vec4} - The return value.
   */
  add(other) {
    return new Vec4(
      this.x + other.x,
      this.y + other.y,
      this.z + other.z,
      this.t + other.t
    );
  }

  /**
   * The addInPlace method.
   * @param {any} other - The other param.
   */
  addInPlace(other) {
    this.x += other.x;
    this.y += other.y;
    this.z += other.z;
    this.t += other.t;
  }

  /**
   * Returns a new vector which is this vector subtracted from other.
   * @param {any} other - The other param.
   * @return {vec4} - The return value.
   */
  subtract(other) {
    return new Vec4(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z,
      this.t - other.t
    );
  }

  /**
   * The subtractInPlace method.
   * @param {any} other - The other param.
   */
  subtractInPlace(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.z -= other.z;
    this.t -= other.t;
  }

  /**
   * The multiply method.
   * @param {any} other - The other param.
   * @return {vec4} - The return value.
   */
  multiply(other) {
    return new Vec4(
      this.x * other.x,
      this.y * other.y,
      this.z * other.z,
      this.t * other.t
    );
  }

  /**
   * The multiplyInPlace method.
   * @param {any} other - The other param.
   */
  multiplyInPlace(other) {
    this.x *= other.x;
    this.y *= other.y;
    this.z *= other.z;
    this.t *= other.t;
  }

  /**
   * The divide method.
   * @param {any} other - The other param.
   * @return {vec4} - The return value.
   */
  divide(other) {
    return new Vec4(
      this.x / other.x,
      this.y / other.y,
      this.z / other.z,
      this.t / other.t
    );
  }

  /**
   * The divideInPlace method.
   * @param {any} other - The other param.
   */
  divideInPlace(other) {
    this.x /= other.x;
    this.y /= other.y;
    this.z /= other.z;
    this.t /= other.t;
  }

  /**
   * Returns a new vector which is this vector scaled by scalar.
   * @param {any} scalar - The scalar param.
   * @return {vec4} - The return value.
   */
  scale(scalar) {
    return new Vec4(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.t * scalar
    );
  }

  /**
   * The scaleInPlace method.
   * @param {any} scalar - The scalar param.
   */
  scaleInPlace(scalar) {
    this.set(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.t * scalar
    );
  }

  /**
   * Calculates the length of a vec4.
   * @param {vec4} a - Vector to calculate length of.
   * @return {number} - The length of a.
   */
  length(a) {
    const x = this.__data[0];
    const y = this.__data[1];
    const z = this.__data[2];
    const t = this.__data[2];
    return Math.sqrt(x * x + y * y + z * z + t * t);
  }

  /**
   * Calculates the squared length of a vec4.
   * @return {number} - Squared length of a.
   */
  lengthSquared() {
    const x = this.__data[0];
    const y = this.__data[1];
    const z = this.__data[2];
    const t = this.__data[3];
    return x * x + y * y + z * z + t * t;
  }

  /**
   * Returns the vector normalized
   * @return {vec4} - The return value.
   */
  normalize() {
    const x = this.__data[0];
    const y = this.__data[1];
    const z = this.__data[2];
    const t = this.__data[3];
    let len = x * x + y * y + z * z + t * t;
    if (len < Number.EPSILON) {
      return new Vec4();
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    return new Vec4(x * len, y * len, z * len);
  }

  /**
   * The normalizeInPlace method.
   */
  normalizeInPlace() {
    const x = this.__data[0];
    const y = this.__data[1];
    const z = this.__data[2];
    const t = this.__data[3];
    let len = x * x + y * y + z * z + t * t;
    if (len < Number.EPSILON) {
      return;
    }
    len = 1 / Math.sqrt(len);
    this.set(x * len, y * len, z * len, t * len);
  }

  /**
   * Calculates the dot product of two vec4s.
   * @param {vec4} b - The second operand.
   * @return {number} - Dot product of a and b.
   */
  dot(b) {
    return this.x * b.x + this.y * b.y + this.z * b.z + this.t * b.t;
  }

  /**
   * Computes the cross product of two vec4s.
   * @param {vec4} b - The second operand.
   * @return {vec4} - The return value.
   */
  cross(b) {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const at = this.t;
    const bx = b.x;
    const by = b.y;
    const bz = b.z;
    const bt = b.t;

    return new Vec4(
      ay * bz - az * by,
      az * bt - at * bz,
      at * bx - ax * bt,
      ax * by - ay * bx
    );
  }

  /**
   * Gets the angle between two 3D vectors.
   * @param {vec4} b - The second operand.
   * @return {number} - The angle in radians.
   */
  angle(b) {
    const tempA = this.normalize();
    const tempB = b.normalize();
    const cosine = tempA.dot(tempB);

    if (cosine > 1.0) {
      return 0;
    } else {
      return Math.acos(cosine);
    }
  }

  /**
   * Performs a linear interpolation between two vec4s.
   * @param {vec4} b - The second operand.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {vec4} - The return value.
   */
  lerp(b, t) {
    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    at = this.t;
    return new Vec4(
      ax + t * (b.x - ax),
      ay + t * (b.y - ay),
      az + t * (b.z - az),
      at + t * (b.t - at)
    );
  }

  /**
   * Generates a random vector with the given scale.
   * @param {number} scale - Length of the resulting vector. If ommitted, a unit vector will be returned.
   * @return {vec4} - The return value.
   */
  random(scale = 1.0) {
    const r = glMatrix.RANDOM() * 2.0 * Math.PI;
    const z = glMatrix.RANDOM() * 2.0 - 1.0;
    const zScale = Math.sqrt(1.0 - z * z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
  }

  /**
   * The clone method.
   * @return {vec4} - The return value.
   */
  clone() {
    return new Vec4(
      this.__data[0],
      this.__data[1],
      this.__data[2],
      this.__data[3]
    );
  }

  /**
   * The toVec3 method.
   * @return {vec3} - The return value.
   */
  toVec3() {
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
   * Creates a new Vec4 to wrap existing memory in a buffer.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {vec4} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec4(buffer, offset * 4); // 4 bytes per 32bit float
  }

  /**
   * The numFloat32Elements method.
   * @return {number} - The return value.
   */
  static numFloat32Elements() {
    return 4;
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
      t: this.t,
    };
  }
}

typeRegistry.registerType('Vec4', Vec4);

export { Vec4 };
