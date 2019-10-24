import { JSON_stringify_fixedPrecision } from './Common.js'
import { AttrValue } from './AttrValue.js'
import { typeRegistry } from './TypeRegistry.js'
import { Vec3 } from './Vec3.js'

/** Class representing a Sphere.
 * @extends AttrValue
 */
class SphereType extends AttrValue {
  /**
   * Create a Vec3.
   * @param {Vec3} pos - The pos value.
   * @param {number} radius - The radius value.
   */
  constructor(pos, radius = 0) {
    super()
    if (pos instanceof Vec3) {
      this.pos = pos
    } else {
      this.pos = new Vec3()
    }
    this.radius = radius
  }


  /**
   * Clones this type returning a new instance.
   * @return {any} - The return value.
   */
  clone() {
    return new Sphere(this.pos.clone(), this.radius)
  }

  
	intersectsBox ( box ) {
		return box.intersectsSphere( this );
	}

  // ////////////////////////////////////////
  // Static Methods

  /**
   * The create method.
   * @param {...object} ...args - The ...args param.
   * @return {vec3} - The return value.
   */
  static create(...args) {
    return new Sphere(...args)
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
      radius: this.radius
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

typeRegistry.registerType('SphereType', SphereType)

export { SphereType }
