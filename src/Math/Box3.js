import { JSON_stringify_fixedPrecision } from './Common.js';
import { Vec3 } from './Vec3.js';
import { Mat4 } from './Mat4.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a Box3. */
class Box3 {
  /**
   * Create a Box3
   * @param {any} p0 - the p0 value.
   * @param {any} p1 - the p1 value.
   */
  constructor(p0 = undefined, p1 = undefined) {
    if (p0 instanceof Float32Array) {
      this.setFromFloat32Array(p0);
      return;
    }
    if (p0 instanceof Vec3) {
      this.p0 = p0;
    } else {
      this.p0 = new Vec3(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      );
    }
    if (p1 instanceof Vec3) {
      this.p1 = p1;
    } else {
      this.p1 = new Vec3(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
      );
    }
  }

  /**
   * The set method.
   * @param {*} p0 - the p0 param.
   * @param {*} p1 - the p1 param.
   */
  set(p0, p1) {
    this.p0 = p0;
    this.p1 = p1;
  }

  /**
   * The reset method.
   */
  reset() {
    this.p0.x = Number.POSITIVE_INFINITY;
    this.p1.x = Number.NEGATIVE_INFINITY;
    this.p0.y = Number.POSITIVE_INFINITY;
    this.p1.y = Number.NEGATIVE_INFINITY;
    this.p0.z = Number.POSITIVE_INFINITY;
    this.p1.z = Number.NEGATIVE_INFINITY;
  }

  /**
   * The isValid method.
   * @return {any} - The return value.
   */
  isValid() {
    return (
      this.p0.x != Number.POSITIVE_INFINITY &&
      this.p1.x != Number.NEGATIVE_INFINITY &&
      this.p0.y != Number.POSITIVE_INFINITY &&
      this.p1.y != Number.NEGATIVE_INFINITY &&
      this.p0.z != Number.POSITIVE_INFINITY &&
      this.p1.z != Number.NEGATIVE_INFINITY
    );
  }

  /**
   * The addPoint method.
   * @param {any} point - The point param.
   */
  addPoint(point) {
    if (
      point.x != Number.POSITIVE_INFINITY &&
      point.x != Number.NEGATIVE_INFINITY
    ) {
      if (point.x < this.p0.x) this.p0.x = point.x;
      if (point.x > this.p1.x) this.p1.x = point.x;
    }
    if (
      point.y != Number.POSITIVE_INFINITY &&
      point.y != Number.NEGATIVE_INFINITY
    ) {
      if (point.y < this.p0.y) this.p0.y = point.y;
      if (point.y > this.p1.y) this.p1.y = point.y;
    }
    if (
      point.z != Number.POSITIVE_INFINITY &&
      point.z != Number.NEGATIVE_INFINITY
    ) {
      if (point.z < this.p0.z) this.p0.z = point.z;
      if (point.z > this.p1.z) this.p1.z = point.z;
    }
  }

  /**
   * The addBox3 method.
   * @param {any} box3 - The box3 param.
   * @param {any} xfo - The xfo param.
   */
  addBox3(box3, xfo = undefined) {
    if (xfo) {
      // transform each corner of the box33 into the new coord sys
      this.addPoint(xfo.transformVec3(box3.p0));
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z))
      );
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z))
      );
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z))
      );
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z))
      );
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z))
      );
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z))
      );
      this.addPoint(xfo.transformVec3(box3.p1));
    } else {
      this.addPoint(box3.p0);
      this.addPoint(box3.p1);
    }
  }

  /**
   * The size method.
   * @return {any} - The return value.
   */
  size() {
    return this.p1.subtract(this.p0);
  }

  /**
   * The diagonal method.
   * @return {any} - The return value.
   */
  diagonal() {
    return this.p1.subtract(this.p0);
  }

  /**
   * The center method.
   * @return {any} - The return value.
   */
  center() {
    const result = this.p1.subtract(this.p0);
    result.scaleInPlace(0.5);
    result.addInPlace(this.p0);
    return result;
  }

  /**
   * The toMat4 method.
   * @return {any} - The return value.
   */
  toMat4() {
    const sc_x = this.p1.x - this.p0.x;
    const sc_y = this.p1.y - this.p0.y;
    const sc_z = this.p1.z - this.p0.z;
    return new Mat4(
      sc_x,
      0,
      0,
      0,
      0,
      sc_y,
      0,
      0,
      0,
      0,
      sc_z,
      0,
      this.p0.x,
      this.p0.y,
      this.p0.z,
      1.0
    );
  }

  /**
   * Clones this type returning a new instance.
   * @return {any} - The return value.
   */
  clone() {
    return new Box3(this.p0.clone(), this.p1.clone());
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {any} - The return value.
   */
  static create(...args) {
    return new Box2(...args);
  }

  /**
   * The sizeInBytes method.
   * @return {any} - The return value.
   */
  static sizeInBytes() {
    return 24;
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      p0: this.p0.toJSON(),
      p1: this.p1.toJSON(),
    };
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.p0.fromJSON(j.p0);
    this.p1.fromJSON(j.p1);
  }

  /**
   * The loadBin method.
   * @param {any} data - The data param.
   * @param {any} byteOffset - The byteOffset param.
   */
  loadBin(data, byteOffset) {
    this.p0.loadBin(data, byteOffset);
    this.p0.loadBin(data, byteOffset + 12);
  }

  /**
   * The setFromFloat32Array method.
   * @param {any} float32array - The float32array param.
   */
  setFromFloat32Array(float32array) {
    this.p0 = new Vec3(float32array.buffer, float32array.byteOffset);
    this.p1 = new Vec3(float32array.buffer, float32array.byteOffset + 12);
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON());
  }
}

typeRegistry.registerType('Box3', Box3);

export { Box3 };
// export default Box3;
