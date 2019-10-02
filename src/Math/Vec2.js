import { AttrValue } from './AttrValue.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a Vec2.
 * @extends AttrValue
 */
class Vec2 extends AttrValue {
  /**
   * Create a Vec2.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   */
  constructor(x = 0, y = 0) {
    super();

    if (
      x instanceof Float32Array ||
      x instanceof Uint32Array ||
      x instanceof Int32Array
    ) {
      this.__data = x;
    } else if (x instanceof ArrayBuffer) {
      const buffer = x;
      const byteOffset = y;
      this.__data = new Float32Array(buffer, byteOffset, 2);
    } else if (x != null && typeof x == 'object') {
      this.__data = new Float32Array(2);
      this.fromJSON(x);
    } else {
      this.__data = new Float32Array(2);
      this.__data[0] = x;
      this.__data[1] = y;
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
   * Setter from scalar components.
   * @param {number} x - The x param.
   * @param {number} y  - The y param.
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Setter from another vector.
   * @param {any} other - The other param.
   */
  setFromOther(other) {
    this.x = other.x;
    this.y = other.y;
  }

  /**
   * Returns true if this vector is the same as another one.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  equal(other) {
    return this.x == other.x && this.y == other.y;
  }

  /**
   * Returns true if this vector is not the same as another one.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  notequals(other) {
    return this.x != other.x && this.y != other.y;
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
      Math.abs(this.y - other.y) < Number.EPSILON
    );
  }

  /**
   * Returns a new vector which is this vector added to other.
   * @param {any} other - The other param.
   * @return {vec2} - The return value.
   */
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  /**
   * The addInPlace method.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  addInPlace(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  /**
   * Returns a new vector which is this vector subtracted from other.
   * @param {any} other - The other param.
   * @return {vec2} - The return value.
   */
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  /**
   * The subtractInPlace method.
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  subtractInPlace(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  /**
   * Returns a new vector which is this vector scaled by scalar.
   * @param {any} scalar - The scalar param.
   * @return {vec2} - The return value.
   */
  scale(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  /**
   * Scales the vector modifying its values.
   * @param {any} scalar - The scalar param.
   * @return {any} - The return value.
   */
  scaleInPlace(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * The invert method.
   * @return {vec2} - The return value.
   */
  invert() {
    return new Vec2(1.0 / this.x, 1.0 / this.y);
  }

  /**
   * The invertInPlace method.
   * @return {any} - The return value.
   */
  invertInPlace() {
    this.x = 1.0 / this.x;
    this.y = 1.0 / this.y;
    return this;
  }

  /**
   * The multiply method.
   * @param {any} vec2 - The vec2 param.
   * @return {vec2} - The return value.
   */
  multiply(vec2) {
    return new Vec2(this.x * vec2.x, this.y * vec2.y);
  }

  /**
   * The multiplyInPlace method.
   * @param {any} vec2 - The vec2 param.
   */
  multiplyInPlace(vec2) {
    this.x *= vec2.x;
    this.y *= vec2.y;
  }

  /**
   * Calculates the length of a vec2.
   * @return {number} - The length of a.
   */
  lengthSquared() {
    const x = this.__data[0];
    const y = this.__data[1];
    return x * x + y * y;
  }

  /**
   * Calculates the length of a vec2
   * @return {Number} length of a
   */
  length() {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Calculates the distance to another vector
   * @param {any} other - The other param.
   * @return {any} - The return value.
   */
  distanceTo(other) {
    const x = this.__data[0] - other.x;
    const y = this.__data[1] - other.y;
    return Math.sqrt(x * x + y * y);
  }

  /**
   * Returns the vector normalized.
   * @return {vec2} - The return value.
   */
  normalize() {
    const x = this.__data[0];
    const y = this.__data[1];
    let len = x * x + y * y;
    if (len < Number.EPSILON) {
      return new Vec2();
    }

    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    return new Vec2(x * len, y * len);
  }

  /**
   * The normalizeInPlace method.
   */
  normalizeInPlace() {
    const x = this.__data[0];
    const y = this.__data[1];
    let len = x * x + y * y;
    if (len < Number.EPSILON) {
      return;
    }
    len = 1 / Math.sqrt(len);
    this.set(x * len, y * len);
  }

  /**
   * Calculates the dot product of two vec2s.
   * @param {vec2} b - The second operand.
   * @return {number} - The dot product of a and b.
   */
  dot(b) {
    return this.x * b.x + this.y * b.y;
  }

  /**
   * Gets the angle between two 3D vectors
   * @param {vec3} b - The second operand.
   * @return {number} - The angle in radians.
   */
  angle(b) {
    return Math.Atan2(b.x - this.x, b.y - this.y);
  }

  /**
   * The rotate method.
   * @param {any} angle - The angle operand
   * @return {vec2} - The return value.
   */
  rotate(angle) {
    const cosa = Math.cos(angle);
    const sina = Math.sin(angle);
    return new Vec2(
      this.x * cosa - this.y * sina,
      this.x * sina + this.y * cosa
    );
  }

  /**
   * Performs a linear interpolation between two vec2s.
   * @param {vec2} b - The second operand.
   * @param {number} t - Interpolation amount between the two inputs.
   * @return {vec2} - The return value.
   */
  lerp(b, t) {
    const ax = this.x;
    const ay = this.y;
    return new Vec2(ax + t * (b.x - ax), ay + t * (b.y - ay));
  }

  /**
   * Creates a new Mat4 to wrap existing memory in a buffer.
   * @param {any} buffer - The buffer param.
   * @param {number} offset - The offset param.
   * @return {vec2} - The return value.
   */
  static createFromFloat32Buffer(buffer, offset = 0) {
    return new Vec2(buffer, offset * 4); // 4 bytes per 32bit float
  }

  /**
   * The createFromFloat32Array method.
   * @param {any} array - The array param.
   * @return {vec2} - The return value.
   */
  static createFromFloat32Array(array) {
    return new Vec2(array);
  }

  /**
   * The numFloat32Elements method.
   * @return {number} - The return value.
   */
  static numFloat32Elements() {
    return 2;
  }

  /**
   * Generates a random vector with the given scale.
   * @param {number} scale - Length of the resulting vector. If ommitted, a unit vector will be returned.
   * @return {vec3} - The return value.
   */
  setRandomDir(scale = 1.0) {
    const r = Math.random() * 2.0 * Math.PI;
    this.__data[0] = Math.cos(r) * zScale;
    this.__data[1] = Math.sin(r) * zScale;
    return this;
  }

  /**
   * The setRandom method.
   * @param {number} scale - The scale param.
   * @return {any} - The return value.
   */
  setRandom(scale = 1.0) {
    this.__data[0] = Math.random() * scale;
    this.__data[1] = Math.random() * scale;
    return this;
  }

  /**
   * Clones this type returning a new instance.
   * @return {vec2} - The return value.
   */
  clone() {
    return new Vec2(this.__data[0], this.__data[1]);
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
   * @return {vec2} - The return value.
   */
  static create(...args) {
    return new Vec2(...args);
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
    };
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   */
  fromJSON(j) {
    this.x = j['x'];
    this.y = j['y'];
  }
}

typeRegistry.registerType('Vec2', Vec2);

export { Vec2 };
// export default Vec2;
