import { StringFunctions } from '../Utilities/StringFunctions'
import { MathFunctions } from '../Utilities/MathFunctions'
import { Vec3 } from './Vec3'
import { Mat4 } from './Mat4'
import { SphereType } from './SphereType'
import { Xfo } from '../Math/index'

/**
 * Class representing a box in 3D space.
 * Represents a box in 3D space defined by two Vec3 values which define opposing corners of the box.
 */
class Box3 {
  p0: Vec3
  p1: Vec3

  /**
   * Creates a Box3 object using Vec3s.
   * In case the parameters are not passed by, their values are pre-defined:
   * <br>
   * p0 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
   * <br>
   * p1 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
   *
   * @param {Vec3} p0 - A point representing the corners of a 3D box.
   * @param {Vec3} p1 - A point representing the corners of a 3D box.
   */
  constructor(p0?: Vec3 | Float32Array, p1?: Vec3) {
    if (p0 instanceof Float32Array) {
      this.p0 = new Vec3(p0.buffer, p0.byteOffset)
      this.p1 = new Vec3(p0.buffer, p0.byteOffset + 12)
    } else {
      if (p0 instanceof Vec3) {
        this.p0 = p0
      } else {
        this.p0 = new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
      }
      if (p1 instanceof Vec3) {
        this.p1 = p1
      } else {
        this.p1 = new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY)
      }
    }
  }

  /**
   * Getter for the lower (x, y, z) boundary of the box.
   *
   * @return {Vec3} - Returns the minimum Vec3.
   */
  get min(): Vec3 {
    return this.p0
  }

  /**
   * Getter for the upper (x, y, z) boundary of the box.
   *
   * @return {Vec3} - Returns the maximum Vec3.
   */
  get max(): Vec3 {
    return this.p1
  }

  /**
   * Sets both Vec3 points
   *
   * @param {Vec3} p0 - A point representing the corners of a 3D box.
   * @param {Vec3} p1 - A point representing the corners of a 3D box.
   */
  set(p0: Vec3, p1: Vec3): void {
    this.p0 = p0
    this.p1 = p1
  }

  /**
   * Resets the box3 back to an uninitialized state.
   */
  reset(): void {
    this.p0.x = Number.POSITIVE_INFINITY
    this.p0.y = Number.POSITIVE_INFINITY
    this.p0.z = Number.POSITIVE_INFINITY
    this.p1.x = Number.NEGATIVE_INFINITY
    this.p1.y = Number.NEGATIVE_INFINITY
    this.p1.z = Number.NEGATIVE_INFINITY
  }

  /**
   * Returns `true` if the box has been expanded to contain a point.
   *
   * @return {boolean} - The return value.
   */
  isValid(): boolean {
    return (
      this.p0.x != Number.POSITIVE_INFINITY &&
      this.p1.x != Number.NEGATIVE_INFINITY &&
      this.p0.y != Number.POSITIVE_INFINITY &&
      this.p1.y != Number.NEGATIVE_INFINITY &&
      this.p0.z != Number.POSITIVE_INFINITY &&
      this.p1.z != Number.NEGATIVE_INFINITY
    )
  }

  /**
   * Expands the Box3 to contain the new point.
   *
   * @param {Vec3} point - A point represents the corners of a 3D box.
   */
  addPoint(point: Vec3): void {
    if (point.x != Number.POSITIVE_INFINITY && point.x != Number.NEGATIVE_INFINITY) {
      if (point.x < this.p0.x) this.p0.x = point.x
      if (point.x > this.p1.x) this.p1.x = point.x
    }
    if (point.y != Number.POSITIVE_INFINITY && point.y != Number.NEGATIVE_INFINITY) {
      if (point.y < this.p0.y) this.p0.y = point.y
      if (point.y > this.p1.y) this.p1.y = point.y
    }
    if (point.z != Number.POSITIVE_INFINITY && point.z != Number.NEGATIVE_INFINITY) {
      if (point.z < this.p0.z) this.p0.z = point.z
      if (point.z > this.p1.z) this.p1.z = point.z
    }
  }

  /**
   * Adds `Box3` to this `Box3`, of the Xfo instance is passed in the parameters
   * it proceeds to apply the transform for the Vec3.
   *
   * @param {Box3} box3 - A 3D box.
   * @param {Xfo | Mat4} xfo - A 3D transform.
   */
  addBox3(box3: Box3, transform?: Xfo | Mat4): void {
    if (transform) {
      // Transform each corner of the Box3 into the new coordinate system.
      this.addPoint(transform.transformVec3(box3.p0))
      this.addPoint(transform.transformVec3(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z)))
      this.addPoint(transform.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z)))
      this.addPoint(transform.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z)))
      this.addPoint(transform.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z)))
      this.addPoint(transform.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z)))
      this.addPoint(transform.transformVec3(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z)))
      this.addPoint(transform.transformVec3(box3.p1))
    } else {
      this.addPoint(box3.p0)
      this.addPoint(box3.p1)
    }
  }

  /**
   * Returns the length of the diagonal of the box.
   *
   * @return {number} - Returns the distance.
   */
  size(): number {
    return this.p1.distanceTo(this.p0)
  }

  /**
   * Returns the diagonal vector of the B=box from p0 to p1.
   *
   * @return {Vec3} - Returns a Box3.
   */
  diagonal(): Vec3 {
    return this.p1.subtract(this.p0)
  }

  /**
   * Returns the center point of a Box3.
   *
   * @return {Vec3} - Returns a Vec3.
   */
  center(): Vec3 {
    const result = this.p1.subtract(this.p0)
    result.scaleInPlace(0.5)
    result.addInPlace(this.p0)
    return result
  }

  /**
   * Converts this Box3 to a Mat4 (a 4x4 matrix). The returned mat4 would transform a unit cube into the shape of the Bounding box.
   *
   * @return {Mat4} - Returns a new Mat4.
   */
  toMat4(): Mat4 {
    const scx = this.p1.x - this.p0.x
    const scy = this.p1.y - this.p0.y
    const scz = this.p1.z - this.p0.z
    return new Mat4(scx, 0, 0, 0, 0, scy, 0, 0, 0, 0, scz, 0, this.p0.x, this.p0.y, this.p0.z, 1.0)
  }

  /**
   * Calculates and returns the bounding Sphere of the Box3
   *
   * @return {SphereType} - The return value.
   */
  getBoundingSphere(): SphereType {
    return new SphereType(this.center(), this.diagonal().length() * 0.5)
  }

  /**
   * Determines if this Box3 intersects a given box value.
   *
   * @param {Box3} box - The box to check for intersection against.
   * @return {boolean} - Returns true if the shapes intersect.
   */
  intersectsBox(box: Box3): boolean {
    // Using 6 splitting planes to rule out intersections.
    return box.max.x < this.min.x ||
      box.min.x > this.max.x ||
      box.max.y < this.min.y ||
      box.min.y > this.max.y ||
      box.max.z < this.min.z ||
      box.min.z > this.max.z
      ? false
      : true
  }

  /**
   * Determines if this Box3 intersects a sphere.
   *
   * @param {Sphere} sphere - The sphere to check for intersection against.
   * @return {boolean} - Returns true if the shapes intersect.
   */
  intersectsSphere(sphere: SphereType): boolean {
    let closestPoint = new Vec3()

    // Find the point on the AABB closest to the sphere center.
    // this.clampPoint( sphere.center, closestPoint );

    // If that point is inside the sphere, the AABB and sphere intersect.
    return closestPoint.distanceTo(sphere.pos) <= sphere.radius * sphere.radius
  }

  /**
   * Determines if this Box3 intersects a plane.
   *
   * @param {Plane} plane - The plane to check for intersection against.
   * @return {boolean} - The return value.
   */
  intersectsPlane(plane: any): boolean {
    // We compute the minimum and maximum dot product values. If those values
    // are on the same side (back or front) of the plane, then there is no intersection.

    let min
    let max

    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x
      max = plane.normal.x * this.max.x
    } else {
      min = plane.normal.x * this.max.x
      max = plane.normal.x * this.min.x
    }

    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y
      max += plane.normal.y * this.max.y
    } else {
      min += plane.normal.y * this.max.y
      max += plane.normal.y * this.min.y
    }

    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z
      max += plane.normal.z * this.max.z
    } else {
      min += plane.normal.z * this.max.z
      max += plane.normal.z * this.min.z
    }

    return min <= -plane.constant && max >= -plane.constant
  }

  /**
   * Clones this Box3 and returns a new Box3.
   * @return {Box3} - Returns a new Box3.
   */
  clone(): Box3 {
    return new Box3(this.p0.clone(), this.p1.clone())
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Encodes `Box3` Class as a JSON object for persistence.
   *
   * @return {Record<string, Record<string, number>>} - The json object.
   */
  toJSON(): Record<string, Record<string, number>> {
    return {
      p0: this.p0.toJSON(),
      p1: this.p1.toJSON()
    }
  }

  /**
   * Decodes a JSON object to set the state of this class.
   *
   * @param {Record<string, Record<string, number>>} j - The json object.
   */
  fromJSON(j: Record<string, Record<string, number>>): void {
    // We need to verify that p0 and p1 axes are numeric, so in case they are not, we restore them to their default values.
    // This, because 'Infinity' and '-Infinity' are stringified as 'null'.
    const p0 = {
      x: MathFunctions.isNumeric(j.p0.x) ? j.p0.x : Number.POSITIVE_INFINITY,
      y: MathFunctions.isNumeric(j.p0.y) ? j.p0.y : Number.POSITIVE_INFINITY,
      z: MathFunctions.isNumeric(j.p0.z) ? j.p0.z : Number.POSITIVE_INFINITY
    }
    const p1 = {
      x: MathFunctions.isNumeric(j.p1.x) ? j.p1.x : Number.NEGATIVE_INFINITY,
      y: MathFunctions.isNumeric(j.p1.y) ? j.p1.y : Number.NEGATIVE_INFINITY,
      z: MathFunctions.isNumeric(j.p1.z) ? j.p1.z : Number.NEGATIVE_INFINITY
    }
    this.p0.fromJSON(p0)
    this.p1.fromJSON(p1)
  }

  /**
   * The setFromFloat32Array method.
   * @param {Float32Array} float32array - The float32array value.
   * @private
   */
  setFromFloat32Array(float32array: Float32Array): void {
    this.p0 = new Vec3(float32array.buffer, float32array.byteOffset)
    this.p1 = new Vec3(float32array.buffer, float32array.byteOffset + 12)
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return {string} - The return value.
   */
  toString(): string {
    // eslint-disable-next-line new-cap
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }
}

export { Box3 }
