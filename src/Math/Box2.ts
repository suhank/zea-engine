import { StringFunctions } from '../Utilities/StringFunctions'
import { Vec2 } from './Vec2'

/**
 * Represents a box in 2D space. Needing two Vec2 vectors describing the corners
 */
class Box2 {
  p0: Vec2
  p1: Vec2

  /**
   * Creates a Box2 object using Vec2s.
   * In case the parameters are not passed by, their values are pre-defined:
   * <br>
   * p0 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
   * <br>
   * p1 is a Vec2 with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
   *
   * @param {Vec2} p0 - A point representing the corners of a 2D box.
   * @param {Vec2} p1 - A point representing the corners of a 2D box.
   */
  constructor(p0?: Vec2, p1?: Vec2) {
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
   * Sets both Vec2 points
   *
   * @param {Vec2} p0 - A point representing the corners of a 2D box.
   * @param {Vec2} p1 - A point representing the corners of a 2D box.
   */
  set(p0: Vec2, p1: Vec2): void {
    this.p0 = p0
    this.p1 = p1
  }

  /**
   * Resets the box2 back to an uninitialized state.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY|`Number.POSITIVE_INFINITY`}
   * and {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY|`Number.NEGATIVE_INFINITY`}
   */
  reset(): void {
    this.p0.x = Number.POSITIVE_INFINITY
    this.p1.x = Number.NEGATIVE_INFINITY
    this.p0.y = Number.POSITIVE_INFINITY
    this.p1.y = Number.NEGATIVE_INFINITY
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
      this.p1.y != Number.NEGATIVE_INFINITY
    )
  }

  /**
   * Expands the Box2 to contain the new point.
   *
   * @param {Vec2} point - A point represents the corners of a 2D box.
   */
  addPoint(point: Vec2): void {
    if (this.p0.x == Number.POSITIVE_INFINITY || point.x < this.p0.x) this.p0.x = point.x
    if (this.p0.y == Number.POSITIVE_INFINITY || point.y < this.p0.y) this.p0.y = point.y

    if (this.p1.y == Number.NEGATIVE_INFINITY || point.x > this.p1.x) this.p1.x = point.x
    if (this.p1.y == Number.NEGATIVE_INFINITY || point.y > this.p1.y) this.p1.y = point.y
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
   * Returns the size of a Box2 - the same as size().
   *
   * @return {Vec2} - Returns a Vec2.
   */
  diagonal(): Vec2 {
    return this.p1.subtract(this.p0)
  }

  /**
   * Returns the center point of a Box2.
   *
   * @return {Vec2} - Returns a Vec2.
   */
  center(): Vec2 {
    const result = this.p1.subtract(this.p0)
    result.scaleInPlace(0.5)
    result.addInPlace(this.p0)
    return result
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Encodes `Box2` Class as a JSON object for persistence.
   *
   * @return {Record<string, Record<string, number>>} - The json object.
   */
  toJSON(): Record<string, Record<string, number>> {
    return {
      p0: this.p0.toJSON(),
      p1: this.p1.toJSON(),
    }
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

export { Box2 }
