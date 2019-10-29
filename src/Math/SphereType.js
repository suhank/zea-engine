import { JSON_stringify_fixedPrecision } from './Common.js'
import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'
import { Vec3 } from './Vec3.js'

/** Class representing a sphere.
 * @extends AttrValue
 */
class SphereType extends AttrValue {
  /**
   * Create a sphere.
   * @param {Vec3} pos - The position of the sphere.
   * @param {number} radius - The radius of the sphere.
   */
  constructor(pos, radius = 0) {
    super()
    if (pos instanceof Vec3) {
      this.pos = pos
    } else {
      this.pos = new Vec3()
    }
    this.radius = radius
  }

  /**
   * Clones this sphere and returns a new sphere.
   * @return {Sphere} - Returns a new sphere.
   */
  clone() {
    return new Sphere(this.pos.clone(), this.radius)
  }

  /**
   * Checks if this spehere intersects a box.
   * @param {any} box - The box value.
   * @return {any} - The return value.
   */
  intersectsBox(box) {
    return box.intersectsSphere(this)
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new sphere.
   * @param {...object} ...args - The ...args param.
   * @return {Sphere} - Returns a new sphere.
   */
  static create(...args) {
    return new Sphere(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      pos: this.pos.toJSON(),
      radius: this.radius,
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

typeRegistry.registerType('SphereType', SphereType)

export { SphereType }
