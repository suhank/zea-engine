/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringFunctions } from '@Utilities/StringFunctions'
import { AttrValue } from './AttrValue'
import { Registry } from '../Registry'
import { Vec3 } from './Vec3'

/**
 * Class representing a sphere.
 *
 * @extends AttrValue
 */
class SphereType extends AttrValue {
  pos: Vec3
  radius: number

  /**
   * Create a sphere.
   * @param {Vec3} pos - The position of the sphere.
   * @param {number} radius - The radius of the sphere.
   */
  constructor(pos = new Vec3(), radius = 0) {
    super()

    if (pos instanceof Vec3) {
      this.pos = pos
    } else {
      this.pos = new Vec3()
    }

    this.radius = radius
  }

  /**
   * Setter from scalar components.
   *
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The z value.
   * @param {number} radius - The w value.
   */
  set(x: number, y: number, z: number, radius: number): void {
    this.pos.set(x, y, z)
    this.radius = radius
  }

  /**
   * Clones this sphere and returns a new sphere.
   *
   * @return {Sphere} - Returns a new sphere.
   */
  clone(): SphereType {
    return new SphereType(this.pos.clone(), this.radius)
  }

  // /**
  //  * Checks if this sphere intersects a box.
  //  *
  //  * @param {Box3} box - The box value.
  //  * @return {boolean} - The return value.
  //  */
  // intersectsBox(box: Box3): any {
  //   return box.intersectsSphere(this)
  // }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return {object} - The json object.
   */
  toJSON(): Record<string, number | Record<string, number>> {
    return {
      pos: this.pos.toJSON(),
      radius: this.radius,
    }
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new sphere.
   *
   * @param {...args: any[]} ...args - The ...args param.
   * @return {Sphere} - Returns a new sphere.
   * @private
   */

  static create(...args: any[]): SphereType {
    return new SphereType(...args)
  }
}

Registry.register('SphereType', SphereType)

export { SphereType }
