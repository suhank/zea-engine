/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringFunctions } from '../Utilities/StringFunctions'
import { Vec3 } from './Vec3'
import { PlaneType } from './PlaneType'
import { Box3 } from './Box3'
import { Mat4 } from './Mat4'

/**
 * Class representing a Frustum. Frustums are used to determine what
 * is inside the camera's field of view.
 * @private
 * */
class Frustum {
  planes: PlaneType[]
  /**
   * Create a Frustum
   * @param p0 - the p0 value.
   * @param p1 - the p1 value.
   * @param p2 - the p2 value.
   * @param p3 - the p3 value.
   * @param p4 - the p4 value.
   * @param p5 - the p5 value.
   */
  constructor(p0: PlaneType, p1: PlaneType, p2: PlaneType, p3: PlaneType, p4: PlaneType, p5: PlaneType) {
    this.planes = [
      p0 || new PlaneType(),
      p1 || new PlaneType(),
      p2 || new PlaneType(),
      p3 || new PlaneType(),
      p4 || new PlaneType(),
      p5 || new PlaneType(),
    ]
  }

  /**
   * The setFromMatrix configures a Frustum object using a matrix.
   * Typically the matrix is a model view projection matrix.
   * @param mat4 - The matrix to use.
   */
  setFromMatrix(mat4: Mat4): void {
    const m = mat4
    const planes = this.planes
    planes[0].set(m.m03 - m.m00, m.m13 - m.m10, m.m23 - m.m20, m.m33 - m.m30)
    planes[1].set(m.m03 + m.m00, m.m13 + m.m10, m.m23 + m.m20, m.m33 + m.m30)
    planes[2].set(m.m03 + m.m01, m.m13 + m.m11, m.m23 + m.m21, m.m33 + m.m31)
    planes[3].set(m.m03 - m.m01, m.m13 - m.m11, m.m23 - m.m21, m.m33 - m.m31)
    planes[4].set(m.m03 - m.m02, m.m13 - m.m12, m.m23 - m.m22, m.m33 - m.m32)
    planes[5].set(m.m03 + m.m02, m.m13 + m.m12, m.m23 + m.m22, m.m33 + m.m32)

    planes.forEach((plane: PlaneType) => plane.normalizeInPlace())
  }

  /**
   * Tests a box to see if it is entirely within the frustum.
   * @param box3 - The box to test.
   * @return - True if the frustum intersects the box.
   */
  intersectsBox(box3: Box3): boolean {
    const p = new Vec3()
    const planes = this.planes
    const { min, max } = box3

    for (let i = 0; i < 6; i++) {
      const plane = planes[i]

      // corner at max distance
      p.x = plane.normal.x > 0 ? max.x : min.x
      p.y = plane.normal.y > 0 ? max.y : min.y
      p.z = plane.normal.z > 0 ? max.z : min.z

      if (plane.distanceToPoint(p) < 0) return false
    }
    return true
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @return - The json object.
   */
  toJSON(): Record<string, unknown> {
    return {
      p0: this.planes[0].toJSON(),
      p1: this.planes[1].toJSON(),
      p2: this.planes[2].toJSON(),
      p3: this.planes[3].toJSON(),
      p4: this.planes[4].toJSON(),
      p5: this.planes[5].toJSON(),
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object.
   */
  fromJSON(j: Record<string, any>): void {
    this.planes[0].fromJSON(j.p0)
    this.planes[1].fromJSON(j.p1)
    this.planes[2].fromJSON(j.p2)
    this.planes[3].fromJSON(j.p3)
    this.planes[4].fromJSON(j.p4)
    this.planes[5].fromJSON(j.p5)
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

export { Frustum }
