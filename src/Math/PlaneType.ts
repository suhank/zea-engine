/* eslint-disable new-cap */
import { StringFunctions } from '../Utilities/StringFunctions'
import { Vec3 } from './Vec3'

/**
 * Class representing a plane.
 */
class PlaneType {
  normal: Vec3
  w: number

  /**
   * Create a plane.
   *
   * @param normal - The normal of the plane.
   * @param w - The w value.
   */
  constructor(normal?: Vec3, w = 0) {
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
   * @param x - The x value.
   * @param y - The y value.
   * @param z - The z value.
   * @param w - The w value.
   */
  set(x: number, y: number, z: number, w: number): void {
    this.normal.set(x, y, z)
    this.w = w
  }

  /**
   * The divideScalar method
   *
   * @param value - The value value.
   */
  divideScalar(value: number): void {
    this.normal.scaleInPlace(1 / value)
    this.w /= value
  }

  /**
   * Calculates the distance from a point to this plane.
   *
   * @param point - The point value.
   * @return - The return value.
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
   * @return - Returns a new plane.
   */
  clone(): PlaneType {
    return new PlaneType(this.normal.clone(), this.w)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return - The json object.
   */
  toJSON(): Record<string, unknown> {
    return {
      normal: this.normal.toJSON(),
      w: this.w,
    }
  }

  fromJSON(json: Record<string, any>): void {
    this.normal.fromJSON(json.normal)
    this.w = json.w
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return - The return value.
   */
  toString(): string {
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }
}

export { PlaneType }
