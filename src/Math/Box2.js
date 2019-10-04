import { JSON_stringify_fixedPrecision } from './Common.js'

import { Vec2 } from './Vec2'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing a Box2. */
class Box2 {
  /**
   * Create a Box2
   * @param {any} p0 - the p0 value.
   * @param {any} p1 - the p1 value.
   */
  constructor(p0 = undefined, p1 = undefined) {
    if (p0 instanceof Vec2) {
      this.p0 = p0
    } else {
      this.p0 = new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
    }
    if (p1 instanceof Vec2) {
      this.p1 = p1
    } else {
      this.p1 = new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
    }
  }

  /**
   * The set method.
   * @param {any} p0 - the p0 param.
   * @param {any} p1 - the p1 param.
   */
  set(p0, p1) {
    this.p0 = p0
    this.p1 = p1
  }

  /**
   * The reset method.
   */
  reset() {
    this.p0.x = Number.POSITIVE_INFINITY
    this.p1.x = Number.NEGATIVE_INFINITY
    this.p0.y = Number.POSITIVE_INFINITY
    this.p1.y = Number.NEGATIVE_INFINITY
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
      this.p1.y != Number.NEGATIVE_INFINITY
    )
  }

  /**
   * The addPoint method.
   * @param {any} point - The point param.
   */
  addPoint(point) {
    if (this.p0.x == Number.POSITIVE_INFINITY || point.x < this.p0.x)
      this.p0.x = point.x
    if (this.p0.y == Number.POSITIVE_INFINITY || point.y < this.p0.y)
      this.p0.y = point.y

    if (this.p1.y == Number.NEGATIVE_INFINITY || point.x > this.p1.x)
      this.p1.x = point.x
    if (this.p1.y == Number.NEGATIVE_INFINITY || point.y > this.p1.y)
      this.p1.y = point.y
  }

  /**
   * The size method.
   * @return {any} - The return value.
   */
  size() {
    return this.p1.subtract(this.p0)
  }

  /**
   * The diagonal method.
   * @return {any} - The return value.
   */
  diagonal() {
    return this.p1.subtract(this.p0)
  }

  /**
   * The center method.
   * @return {any} - The return value.
   */
  center() {
    const result = this.p1.subtract(this.p0)
    result.scaleInPlace(0.5)
    result.addInPlace(this.p0)
    return result
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {any} - The return value.
   */
  static create(...args) {
    return new Box2(...args)
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

typeRegistry.registerType('Box2', Box2)

export { Box2 }
// export default Box2;
