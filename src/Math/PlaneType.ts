/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringFunctions } from '@Utilities/StringFunctions'
import { AttrValue } from './AttrValue'
import { Registry } from '../Registry'
import { Vec3 } from './Vec3'
import { Plane } from '@SceneTree/Geometry/Shapes/Plane'

/**
 * Class representing a plane.
 *
 * @extends AttrValue
 */
class PlaneType extends AttrValue {
  normal: Vec3
  w: number

  /**
   * Create a plane.
   *
   * @param {Vec3} normal - The normal of the plane.
   * @param {number} w - The w value.
   */
  constructor(normal?: Vec3, w = 0) {
    super()
    if (normal instanceof Vec3) {
      this.normal = normal
    } else {
      this.normal = new Vec3()
    }
    this.w = w
  }

  /**
   * Setter from scalar components.
   *
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The z value.
   * @param {number} w - The w value.
   */
  set(x: number, y: number, z: number, w: number): void {
    this.normal.set(x, y, z)
    this.w = w
  }

  /**
   * The divideScalar method
   *
   * @param {number} value - The value value.
   */
  divideScalar(value: number): void {
    this.normal.scaleInPlace(1 / value)
    this.w /= value
  }

  /**
   * Calculates the distance from a point to this place.
   *
   * @param {Vec3} point - The point value.
   * @return {number} - The return value.
   */
  distanceToPoint(point: Vec3): number {
    return point.dot(this.normal) + this.w
  }

  /**
   * Normalize this plane in place modifying its values.
   */
  normalizeInPlace(): void {
    const inverseNormalLength = 1.0 / this.normal.length()
    this.normal.scaleInPlace(inverseNormalLength)
    this.w *= inverseNormalLength
  }

  /**
   * Clones this plane and returns a new plane.
   *
   * @return {PlaneType} - Returns a new plane.
   */
  clone(): PlaneType {
    return new PlaneType(this.normal.clone(), this.w)
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new plane.
   * @param {...object} ...args - The ...args param.
   * @return {Plane} - Returns a new plane.
   * @private
   */

  static create(...args: any[]): Plane {
    return new Plane(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {object} - The json object.
   */
  toJSON(): Record<string, unknown> {
    return {
      normal: this.normal.toJSON(),
      w: this.w,
    }
  }

  fromJSON(json: Record<string, any>): void {
    this.normal = Vec3.createFromJSON(json.normal)
    this.w = json.w
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }
}

Registry.register('PlaneType', PlaneType)

export { PlaneType }
