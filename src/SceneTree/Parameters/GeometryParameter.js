import { Signal } from '../../Utilities'
import { ParamFlags, ValueSetMode, Parameter } from './Parameter.js'

/** Class representing a geometry parameter.
 * @extends Parameter
 */
class GeometryParameter extends Parameter {
  /**
   * Create a geometry parameter.
   * @param {string} name - The name value.
   * @param {any} value - The value value.
   */
  constructor(name, value) {
    super(name, undefined, 'Geometry')
    this.boundingBoxDirtied = new Signal()
    this.setValue(value)
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new GeometryParameter(this.__name, this.__value)
    return clonedParam
  }

  /**
   * The setValue method.
   * @param {any} geom - The geom param.
   * @param {any} mode - The mode param.
   */
  setValue(geom, mode = ValueSetMode.USER_SETVALUE) {
    // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
    if (this.__value !== geom) {
      if (this.__value) {
        this.__value.boundingBoxDirtied.disconnect(this.boundingBoxDirtied.emit)
        this.__value.removeRef(this)
      }
      this.__value = geom
      if (this.__value) {
        this.__value.addRef(this)
        this.__value.boundingBoxDirtied.connect(this.boundingBoxDirtied.emit)
      }

      if (mode == ValueSetMode.USER_SETVALUE)
        this.__flags |= ParamFlags.USER_EDITED

      // During the cleaning process, we don't want notifications.
      if (mode != ValueSetMode.OPERATOR_SETVALUE) this.valueChanged.emit(mode)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    return super.toJSON(context, flags)
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  fromJSON(j, context, flags) {
    return super.fromJSON(j, context, flags)
  }

  /**
   * The destroy method.
   */
  destroy() {
    // Note: some parameters hold refs to geoms/materials,
    // which need to be explicitly cleaned up.
    // e.g. freeing GPU Memory.

    if (this.__value) {
      this.__value.boundingBoxDirtied.disconnect(this.boundingBoxDirtied.emit)
      this.__value.removeRef(this)
    }
  }
}

export { GeometryParameter }
