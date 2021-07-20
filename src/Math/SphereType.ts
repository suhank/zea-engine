/* eslint-disable new-cap */
import { StringFunctions } from '../Utilities/StringFunctions'
import { Registry } from '../Registry'
import { Vec3 } from './Vec3'
import { Box3 } from './Box3'

/**
 * Class representing a mathematical sphere, as opposed to the Sphere class derived from ProceduralMesh.
 *
 */
class SphereType {
  pos: Vec3
  radius: number

  /**
   * Create a sphere.
   * @param {Vec3} pos - The position of the sphere.
   * @param {number} radius - The radius of the sphere.
   */
  constructor(pos = new Vec3(), radius = 0) {
    if (pos instanceof Vec3) {
      this.pos = pos
    } else {
      this.pos = new Vec3()
    }
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

  /**
   * Checks if this sphere intersects a box.
   *
   * @param {Box3} box - The box value.
   * @return {boolean} - The return value.
   */
  intersectsBox(box: Box3) {
    return box.intersectsSphere(this)
  }

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

// Registry.register('SphereType', SphereType)

export { SphereType }
