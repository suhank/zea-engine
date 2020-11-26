/* eslint-disable new-cap */
/* eslint-disable camelcase */
import { StringFunctions } from '../Utilities/StringFunctions'
import { Vec3 } from './Vec3.js'
import { Registry } from '../Registry'

/**
 * Class representing a ray that emits from an origin in a specified direction.
 */
class Ray {
  /**
   * Create a ray.
   *
   * @param {Vec3} start - The origin of the ray.
   * @param {Vec3} dir - The direction of the ray.
   */
  constructor(start = undefined, dir = undefined) {
    if (start instanceof Vec3) {
      this.start = start
    } else {
      this.start = new Vec3()
    }
    if (dir instanceof Vec3) {
      this.dir = dir
    } else {
      this.dir = new Vec3()
    }
  }

  /**
   * Get the closest point on the ray to the given point.
   *
   * @param {Vec3} point - The point in 3D space.
   * @return {Ray} - Returns a Ray.
   */
  closestPoint(point) {
    const w = point.subtract(this.start)
    const c1 = w.dot(this.dir)
    if (c1 < Number.EPSILON) return this.start
    const c2 = this.dir.dot(this.dir)
    // if (c2 < Number.EPSILON) return this.start
    const fract = c1 / c2
    return this.start.add(this.dir.scale(fract))
  }

  /**
   * Get the closest point on the ray to the given point.
   *
   * @param {Vec3} p0 - The point in 3D space.
   * @param {Vec3} p1 - The point in 3D space.
   * @return {number} - Returns a Ray.
   */
  closestPointOnLineSegment(p0, p1) {
    // https://www.codefull.net/2015/06/intersection-of-a-ray-and-a-line-segment-in-3d/
    const u = this.dir
    const v = p1.subtract(p0)
    v.normalizeInPlace()
    const w = this.start.subtract(p0)
    const a = u.dot(u) // always >= 0
    const b = u.dot(v)
    const c = v.dot(v) // always >= 0
    const d = u.dot(w)
    const e = v.dot(w)
    if (a == 0.0 && c == 0.0) {
      return this.start.distanceTo(p0)
    }
    if (a == 0.0) {
      return ray.closestPoint(this.start)
    }
    if (c == 0.0) {
      return this.closestPoint(p0)
    }
    const D = a * c - b * b // always >= 0

    // compute the ray parameters of the two closest points
    let this_t
    let ray_t
    if (D < 0.001) {
      // the lines are almost parallel
      this_t = 0.0
      if (b > c) {
        // use the largest denominator
        ray_t = d / b
      } else {
        ray_t = e / c
      }
    } else {
      this_t = (b * e - c * d) / D
      ray_t = (a * e - b * d) / D
    }
    return [this_t, ray_t]
  }

  /**
   * Get the closest point at a distance.
   *
   * @param {Vec3} dist - The distance value.
   * @return {Ray} - Returns a Ray.
   */
  pointAtDist(dist) {
    return this.start.add(this.dir.scale(dist))
  }

  /**
   * Returns the two ray params that represent the closest point between the two rays.
   *
   * @param {Ray} ray - The ray value.
   * @return {Ray} - Returns a Ray.
   */
  intersectRayVector(ray) {
    const u = this.dir
    const v = ray.dir
    const w = this.start.subtract(ray.start)
    const a = u.dot(u) // always >= 0
    const b = u.dot(v)
    const c = v.dot(v) // always >= 0
    const d = u.dot(w)
    const e = v.dot(w)
    if (a == 0.0 && c == 0.0) {
      return this.start.distanceTo(ray.start)
    }
    if (a == 0.0) {
      return ray.closestPoint(this.start)
    }
    if (c == 0.0) {
      return this.closestPoint(ray.start)
    }
    const D = a * c - b * b // always >= 0

    // compute the ray parameters of the two closest points
    let this_t
    let ray_t
    if (D < 0.001) {
      // the lines are almost parallel
      this_t = 0.0
      if (b > c) {
        // use the largest denominator
        ray_t = d / b
      } else {
        ray_t = e / c
      }
    } else {
      this_t = (b * e - c * d) / D
      ray_t = (a * e - b * d) / D
    }
    return [this_t, ray_t]
  }

  /**
   * Returns one ray param representing the intersection
   * of this ray against the plane defined by the given ray.
   *
   * @param {Vec3} plane - The plane to intersect with.
   * @return {number} - The return value.
   */
  intersectRayPlane(plane) {
    const w = this.start.subtract(plane.start)
    const D = plane.dir.dot(this.dir)
    const N = -plane.dir.dot(w)

    if (Math.abs(D) < Number.PRECISION) {
      // segment is parallel to plane
      if (N == 0.0) return -1.0
      // segment lies in plane
      else return -1.0 // no intersection
    }
    // they are not parallel
    // compute intersect param
    const sI = N / D
    if (sI < -Number.PRECISION) {
      return -1 // no intersection
    }
    return sI
  }

  /**
   * Determines if this Box3 intersects a ray.
   *
   * @param {Box3} box3 - The box to check for intersection against.
   * @param {number} tolerance - The tolerance of the test.
   * @return {boolean} - The return value.
   */
  intersectRayBox3(box3, tolerance = 0) {
    // https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-box-intersection

    const invdir = new Vec3(1 / this.dir.x, 1 / this.dir.y, 1 / this.dir.z)
    const sign = []
    sign[0] = invdir.x < 0
    sign[1] = invdir.y < 0
    sign[2] = invdir.z < 0

    const bounds = []
    if (tolerance > 0) {
      const diag = box3.diagonal()
      diag.normalizeInPlace()
      diag.scaleInPlace(tolerance)
      bounds[0] = box3.p0.subtract(diag)
      bounds[1] = box3.p1.add(diag)
    } else {
      bounds[0] = box3.p0
      bounds[1] = box3.p1
    }

    let tMin = (bounds[sign[0]].x - this.start.x) * invdir.x
    let tMax = (bounds[1 - sign[0]].x - this.start.x) * invdir.x
    const tyMin = (bounds[sign[1]].y - this.start.y) * invdir.y
    const tyMax = (bounds[1 - sign[1]].y - this.start.y) * invdir.y

    if (tMin > tyMax || tyMin > tMax) return false
    if (tyMin > tMin) tMin = tyMin
    if (tyMax < tMax) tMax = tyMax

    const tzMin = (bounds[sign[2]].z - this.start.z) * invdir.z
    const tzMax = (bounds[1 - sign[2]].z - this.start.z) * invdir.z

    if (tMin > tzMax || tzMin > tMax) return false
    if (tzMin > tMin) tMin = tzMin
    if (tzMax < tMax) tMax = tzMax

    return true
  }

  /**
   * Clones this Ray and returns a new Ray.
   *
   * @return {Ray} - Returns a new Ray.
   */
  clone() {
    return new Ray(this.start.clone(), this.dir.clone())
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new Ray.
   * @param {...object} ...args - The ...args param.
   * @return {Ray} - Returns a new Ray.
   * @private
   */
  static create(...args) {
    return new Ray(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   *
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      start: this.start,
      dir: this.dir,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object.
   */
  fromJSON(j) {
    this.start.fromJSON(j.start)
    this.dir.fromJSON(j.dir)
  }

  /**
   * Calls `toJSON` method and stringifies it.
   *
   * @return {string} - The return value.
   */
  toString() {
    return StringFunctions.stringifyJSONWithFixedPrecision(this.toJSON())
  }
}

Registry.register('Ray', Ray)

export { Ray }
