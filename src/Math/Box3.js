import { JSON_stringify_fixedPrecision } from './Common.js'
import { Vec3 } from './Vec3.js'
import { Mat4 } from './Mat4.js'
import { SphereType } from './SphereType.js'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing a box in 3D space. */
class Box3 {
  /**
   * Create a Box3
   * @param {Vec3} p0 - A point representing the corners of a 3D box.
   * @param {Vec3} p1 - A point representing the corners of a 3D box.
   */
  constructor(p0 = undefined, p1 = undefined) {
    if (p0 instanceof Float32Array) {
      this.setFromFloat32Array(p0)
      return
    }
    if (p0 instanceof Vec3) {
      this.p0 = p0
    } else {
      this.p0 = new Vec3(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      )
    }
    if (p1 instanceof Vec3) {
      this.p1 = p1
    } else {
      this.p1 = new Vec3(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
      )
    }
  }

  /**
   * Getter for the lower (x, y, z) boundary of the box.
   * @return {Vec3} - Returns the minumum Vec3.
   */
  get min() {
    return this.p0
  }

  /**
   * Getter for the upper (x, y, z) boundary of the box.
   * @return {Vec3} - Returns the minumum Vec3.
   */
  get max() {
    return this.p1
  }

  /**
   * The set method.
   * @param {Vec3} p0 - A point representing the corners of a 3D box.
   * @param {Vec3} p1 - A point representing the corners of a 3D box.
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
    this.p0.z = Number.POSITIVE_INFINITY
    this.p1.z = Number.NEGATIVE_INFINITY
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
    )
  }

  /**
   * Expands the Box3 to contain the new point.
   * @param {Vec3} point - A point represents the corners of a 3D box.
   */
  addPoint(point) {
    if (
      point.x != Number.POSITIVE_INFINITY &&
      point.x != Number.NEGATIVE_INFINITY
    ) {
      if (point.x < this.p0.x) this.p0.x = point.x
      if (point.x > this.p1.x) this.p1.x = point.x
    }
    if (
      point.y != Number.POSITIVE_INFINITY &&
      point.y != Number.NEGATIVE_INFINITY
    ) {
      if (point.y < this.p0.y) this.p0.y = point.y
      if (point.y > this.p1.y) this.p1.y = point.y
    }
    if (
      point.z != Number.POSITIVE_INFINITY &&
      point.z != Number.NEGATIVE_INFINITY
    ) {
      if (point.z < this.p0.z) this.p0.z = point.z
      if (point.z > this.p1.z) this.p1.z = point.z
    }
  }

  /**
   * The addBox3 method.
   * @param {Box3} box3 - A 3D box.
   * @param {Vec3} xfo - A 3D transform.
   */
  addBox3(box3, xfo = undefined) {
    if (xfo) {
      // Transform each corner of the Box3 into the new coordinate system.
      this.addPoint(xfo.transformVec3(box3.p0))
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p0.y, box3.p1.z))
      )
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p0.z))
      )
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p0.z))
      )
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p0.x, box3.p1.y, box3.p1.z))
      )
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p0.y, box3.p1.z))
      )
      this.addPoint(
        xfo.transformVec3(new Vec3(box3.p1.x, box3.p1.y, box3.p0.z))
      )
      this.addPoint(xfo.transformVec3(box3.p1))
    } else {
      this.addPoint(box3.p0)
      this.addPoint(box3.p1)
    }
  }

  /**
   * Returns the size of a Box3.
   * @return {Box3} - Returns a Box3.
   */
  size() {
    return this.p1.subtract(this.p0)
  }

  /**
   * Returns the size of a Box3 - the same as size().
   * @return {Box3} - Returns a Box3.
   */
  diagonal() {
    return this.p1.subtract(this.p0)
  }

  /**
   * Returns the center point of a Box3.
   * @return {Vec3} - Returns a Vec3.
   */
  center() {
    const result = this.p1.subtract(this.p0)
    result.scaleInPlace(0.5)
    result.addInPlace(this.p0)
    return result
  }

  /**
   * Converts this Box3 to a Mat4 (a 4x4 matrix).
   * @return {Mat4} - Returns a new Mat4.
   */
  toMat4() {
    const scx = this.p1.x - this.p0.x
    const scy = this.p1.y - this.p0.y
    const scz = this.p1.z - this.p0.z
    return new Mat4(
      scx, 0, 0, 0,
      0, scy, 0, 0,
      0, 0, scz, 0,
      this.p0.x, this.p0.y, this.p0.z, 1.0
    )
  }

  /**
   * The getBoundingSphere method.
   * @return {any} - The return value.
   */
  getBoundingSphere() {
    return new SphereType(this.center(), this.diagonal().length() * 0.5)
  }

  /**
   * Determines if this Box3 intersects a plane.
   * @param {any} box - The box to check for intersection against.
   * @return {boolean} - The return value.
   */
  intersectsBox(box) {
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
   * @param {Sphere} sphere - The sphere to check for intersection against.
   * @return {any} - The return value.
   */
  intersectsSphere(sphere) {
    // var closestPoint = new Vector3();

    // Find the point on the AABB closest to the sphere center.
    // this.clampPoint( sphere.center, closestPoint );

    // If that point is inside the sphere, the AABB and sphere intersect.
    return (
      closestPoint.distanceToSquared(sphere.center) <=
      sphere.radius * sphere.radius
    )
  }

  /**
   * Determines if this Box3 intersects a plane.
   * @param {Plane} plane - The plane to check for intersection against.
   * @return {any} - The return value.
   */
  intersectsPlane(plane) {
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
  clone() {
    return new Box3(this.p0.clone(), this.p1.clone())
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new Box3.
   * @param {...object} ...args - The ...args param.
   * @return {Box3} - Returns a new Box3.
   * @private
   */
  static create(...args) {
    return new Box3(...args)
  }

  /**
   * The sizeInBytes method.
   * @return {any} - The return value.
   * @private
   */
  static sizeInBytes() {
    return 24
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
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.p0.fromJSON(j.p0)
    this.p1.fromJSON(j.p1)
  }

  /**
   * The loadBin method.
   * @param {any} data - The data value.
   * @param {any} byteOffset - The byteOffset value.
   * @private
   */
  loadBin(data, byteOffset) {
    this.p0.loadBin(data, byteOffset)
    this.p0.loadBin(data, byteOffset + 12)
  }

  /**
   * The setFromFloat32Array method.
   * @param {Float32Array} float32array - The float32array value.
   * @private
   */
  setFromFloat32Array(float32array) {
    this.p0 = new Vec3(float32array.buffer, float32array.byteOffset)
    this.p1 = new Vec3(float32array.buffer, float32array.byteOffset + 12)
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON())
  }
}

typeRegistry.registerType('Box3', Box3)

export { Box3 }
