import { JSON_stringify_fixedPrecision } from './Common.js'

/**
 * A base class for values that can be stored in vertex attributes.
 * Note: these values use Float32Array values to store their data,
 * and we can create references to values in attributes using
 */
class AttrValue {
  /**
   * The isValid method.
   * @return {any} The return value.
   */
  isValid() {
    for (const v of this.__data) {
      if (v == Infinity || isNaN(v)) return false
    }
    return true
  }

  /**
   * Creates a new value to wrap memory in an existing buffer.
   * @param {any} buffer - the buffer param.
   * @param {any} offset - the offset param.
   */
  static createFromFloat32Buffer(buffer, offset) {
    throw new Error(
      'Not yet implemented for this type:' + this.constructor.name
    )
  }

  /**
   * Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.
   */
  static numElements() {
    throw new Error(
      'Not yet implemented for this type:' + this.constructor.name
    )
  }

  /**
   * Returns the tpye as an array. Often used to pass types to the GPU.
   * @return {any} The return value.
   */
  asArray() {
    return this.__data
  }

  /**
   * The toString method.
   * @return {any} The return value.
   */
  toString() {
    return JSON_stringify_fixedPrecision(this.toJSON())
  }
}

export { AttrValue }
// export default AttrValue;
