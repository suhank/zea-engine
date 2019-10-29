import { JSON_stringify_fixedPrecision } from './Common.js'
import { Vec2 } from './Vec2.js'
import { typeRegistry } from './TypeRegistry.js'

/** Class representing a 2D rectangle. */
class Rect2 {
  /**
   * Create a Rect2.
   * @param {Vec2} pos - The position of the Rect2.
   * @param {Vec2} size - The size of the Rect2.
   */
  constructor(pos = undefined, size = undefined) {
    if (pos instanceof Vec2) {
      this.pos = pos
    } else {
      this.pos = new Vec2()
    }
    if (size instanceof Vec2) {
      this.size = size
    } else {
      this.size = new Vec2()
    }
  }

  /**
   * Getter for the left side of a rectangle.
   * @return {Vec2} - Returns the left side.
   */
  get left() {
    return this.pos.x
  }

  /**
   * Getter for the right side of a rectangle.
   * @return {Vec2} - Returns the right side.
   */
  get right() {
    return this.pos.x + this.size.x
  }

  /**
   * Getter for the bottom side of a rectangle.
   * @return {Vec2} - Returns the bottom side.
   */
  get bottom() {
    return this.pos.y
  }

  /**
   * Getter for the top side of a rectangle.
   * @return {Vec2} - Returns the top side.
   */
  get top() {
    return this.pos.y + this.size.y
  }

  /**
   * Getter for the area of a rectangle.
   * @return {Rect2} - Returns the area of a Rect2.
   */
  get area() {
    return this.size.x * this.size.y
  }

  /**
   * The expandByPoint method.
   * @param {Vec3} point - A point represents the corners of a  Rect2.
   */
  expandByPoint(point) {
    if (point.x < this.pos.x) {
      this.size.x += this.pos.x - point.x
      this.pos.x = point.x
    }
    if (point.y < this.pos.y) {
      this.size.y += this.pos.y - point.y
      this.pos.y = point.y
    }
    if (point.x > this.pos.x + this.size.x)
      this.size.x += point.x - (this.pos.x + this.size.x)
    if (point.y > this.pos.y + this.size.y)
      this.size.y += point.y - (this.pos.y + this.size.y)
  }

  /**
   * Scales the Rect2 modifying its size value.
   * @param {number} scalar - The scalar value.
   */
  scaleInPlace(scalar) {
    this.pos.scaleInPlace(scalar)
    this.size.scaleInPlace(scalar)
  }

  /**
   * The corners method.
   * @return {any} - The return value.
   */
  corners() {
    return {
      p0: this.pos.toJSON(),
      p1: this.pos.add(this.size).toJSON(),
    }
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * Creates a new Rect2.
   * @param {...object} ...args - The ...args param.
   * @return {Rect2} - Returns a new Rect2.
   */
  static create(...args) {
    return new Rect2(...args)
  }

  // ///////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - The json object.
   */
  toJSON() {
    return {
      pos: this.pos.toJSON(),
      size: this.size.toJSON(),
    }
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON())
  }
}

typeRegistry.registerType('Rect2', Rect2)

export { Rect2 }
