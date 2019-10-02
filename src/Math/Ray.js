import { JSON_stringify_fixedPrecision } from './Common.js';
import { Vec3 } from './Vec3.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a ray. */
class Ray {
  /**
   * Create a ray.
   * @param {any} start - The start value.
   * @param {any} dir - The dir value.
   */
  constructor(start = undefined, dir = undefined) {
    if (start instanceof Vec3) {
      this.start = start;
    } else {
      this.start = new Vec3();
    }
    if (dir instanceof Vec3) {
      this.dir = dir;
    } else {
      this.dir = new Vec3();
    }
  }

  /**
   * The closestPoint method.
   * @param {any} point - The point param.
   * @return {any} - The return value.
   */
  closestPoint(point) {
    const w = point.subtract(this.start);
    const c1 = w.dot(this.dir);
    const c2 = this.dir.dot(this.dir);
    if (c2 < Number.EPSILON) return 0.0;
    const fract = c1 / c2;
    return this.start.add(this.dir.scale(fract));
  }

  /**
   * The pointAtDist method.
   * @param {any} dist - The dist param.
   * @return {any} - The return value.
   */
  pointAtDist(dist) {
    return this.start.add(this.dir.scale(dist));
  }

  /**
   * Returns the 2 ray params that represent the closest point between the 2 rays.
   * @param {any} ray - The ray param.
   * @return {any} - The return value.
   */
  intersectRayVector(ray) {
    const u = this.dir;
    const v = ray.dir;
    const w = this.start.subtract(ray.start);
    const a = u.dot(u); // always >= 0
    const b = u.dot(v);
    const c = v.dot(v); // always >= 0
    const d = u.dot(w);
    const e = v.dot(w);
    if (a == 0.0 && c == 0.0) {
      return this.start.distanceTo(ray.start);
    }
    if (a == 0.0) {
      return ray.closestPoint(this.start);
    }
    if (c == 0.0) {
      return this.closestPoint(ray.start);
    }
    const D = a * c - b * b; // always >= 0

    // compute the ray parameters of the two closest points
    let this_t;
    let ray_t;
    if (D < 0.001) {
      // the lines are almost parallel
      this_t = 0.0;
      if (b > c) {
        // use the largest denominator
        ray_t = d / b;
      } else {
        ray_t = e / c;
      }
    } else {
      this_t = (b * e - c * d) / D;
      ray_t = (a * e - b * d) / D;
    }
    return [this_t, ray_t];
  }

  /**
   * Returns the 1 ray param representing the intersection
   * of this ray against the plane defined by the given ray.
   * @param {any} plane - The plane param.
   * @return {any} - The return value.
   */
  intersectRayPlane(plane) {
    const w = this.start.subtract(plane.start);
    const D = plane.dir.dot(this.dir);
    const N = -plane.dir.dot(w);

    if (Math.abs(D) < Number.PRECISION) {
      // segment is parallel to plane
      if (N == 0.0) return -1.0;
      // segment lies in plane
      else return -1.0; // no intersection
    }
    // they are not parallel
    // compute intersect param
    const sI = N / D;
    if (sI < -Number.PRECISION) {
      return -1; // no intersection
    }
    return sI;
  }

  /**
   * Clones this type returning a new instance.
   * @return {any} - The return value.
   */
  clone() {
    return new Ray(this.start.clone(), this.dir.clone());
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {vec3} - The return value.
   */
  static create(...args) {
    return new Ray(...args);
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @return {any} - The return value.
   */
  toJSON() {
    return {
      start: this.start,
      dir: this.dir,
    };
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   */
  fromJSON(j) {
    this.start.fromJSON(j.start);
    this.dir.fromJSON(j.dir);
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON());
  }
}

typeRegistry.registerType('Ray', Ray);

export { Ray };
// export default Ray
