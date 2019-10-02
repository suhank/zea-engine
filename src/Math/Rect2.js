import { JSON_stringify_fixedPrecision } from './Common.js';
import { Vec2 } from './Vec2.js';
import { typeRegistry } from './TypeRegistry.js';

/** Class representing a Rect2. */
class Rect2 {
  /**
   * Create a Rect2.
   * @param {any} pos - The pos value.
   * @param {any} size - The size value.
   */
  constructor(pos = undefined, size = undefined) {
    if (pos instanceof Vec2) {
      this.pos = pos;
    } else {
      this.pos = new Vec2();
    }
    if (size instanceof Vec2) {
      this.size = size;
    } else {
      this.size = new Vec2();
    }
  }

  /**
   * Getter for left.
   */
  get left() {
    return this.pos.x;
  }

  /**
   * Getter for right.
   */
  get right() {
    return this.pos.x + this.size.x;
  }

  /**
   * Getter for bottom.
   */
  get bottom() {
    return this.pos.y;
  }

  /**
   * Getter for top.
   */
  get top() {
    return this.pos.y + this.size.y;
  }

  /**
   * Getter for area.
   */
  get area() {
    return this.size.x * this.size.y;
  }

  /**
   * The expandByPoint method.
   * @param {any} point - The point param.
   */
  expandByPoint(point) {
    if (point.x < this.pos.x) {
      this.size.x += this.pos.x - point.x;
      this.pos.x = point.x;
    }
    if (point.y < this.pos.y) {
      this.size.y += this.pos.y - point.y;
      this.pos.y = point.y;
    }
    if (point.x > this.pos.x + this.size.x)
      this.size.x += point.x - (this.pos.x + this.size.x);
    if (point.y > this.pos.y + this.size.y)
      this.size.y += point.y - (this.pos.y + this.size.y);
  }

  /**
   * Scales the rect modifying it size value..
   * @param {any} scalar - The scalar param.
   */
  scaleInPlace(scalar) {
    this.pos.scaleInPlace(scalar);
    this.size.scaleInPlace(scalar);
  }

  /**
   * The corners method.
   * @return {any} - The return value.
   */
  corners() {
    return {
      p0: this.pos.toJSON(),
      p1: this.pos.add(this.size).toJSON(),
    };
  }

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {any} - The return value.
   */
  static create(...args) {
    return new Rect2(...args);
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
    };
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON());
  }
}

typeRegistry.registerType('Rect2', Rect2);

export { Rect2 };
// export default Rect2;
