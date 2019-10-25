import { JSON_stringify_fixedPrecision } from './Common.js'
import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'
import { Vec3 } from './Vec3.js'

/** Class representing a Plane.
 * @extends AttrValue
 */
class PlaneType extends AttrValue {
  /**
   * Create a Vec3.
   * @param {Vec3} normal - The normal value.
   * @param {number} w - The w value.
   */
  constructor(normal, w = 0) {
    super()
    if (normal instanceof Vec3) {
      this.normal = normal
    } else {
      this.normal = new Vec3()
    }
    this.w = w
  }

  set(x, y, z, w) {
    this.normal.set(x, y, z)
    this.w = w;
  }

  divideScalar(value) {
    this.normal.scaleInPlace(1/value)
    this.w /= value;
  }

  distanceToPoint(point){
    return point.dot(this.normal) + this.w
  }

  /**
   * normalizeInPlace this plane modifying its values.
   */
  normalizeInPlace() {
    const inverseNormalLength = 1.0 / this.normal.length()
    this.normal.scaleInPlace(inverseNormalLength)
    this.w *= inverseNormalLength
  }

  /**
   * Clones this type returning a new instance.
   * @return {any} - The return value.
   */
  clone() {
    return new Plane(this.normal.clone(), this.w)
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {vec3} - The return value.
   */
  static create(...args) {
    return new Plane(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      normal: this.normal.toJSON(),
      w: this.w
    }
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON())
  }
}

typeRegistry.registerType('PlaneType', PlaneType)

export { PlaneType }
