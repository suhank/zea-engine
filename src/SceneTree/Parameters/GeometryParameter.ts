/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { BaseGeom } from '../../SceneTree/Geometry/BaseGeom'

/** Class representing a geometry parameter.
 * @extends Parameter
 * @private
 */
class GeometryParameter extends Parameter<BaseGeom> {
  /**
   * Create a geometry parameter.
   * @param {string} name - The name of the color parameter.
   * @param {BaseGeom} value - The value of the parameter.
   */
  constructor(name: string = '', value?: BaseGeom) {
    super(name, value, 'Geometry')

    this.emitBoundingBoxDirtied = this.emitBoundingBoxDirtied.bind(this)
    if(value){
      this.setValue(value)
    }else {
      console.warn("no value set in the constructor")
    }
    
  }

  protected emitBoundingBoxDirtied(event: Record<string, unknown>): void {
    this.emit('boundingBoxChanged', event)
  }

  /**
   * The setValue method.
   * @param {BaseGeom} value - The geom value.
   */
  setValue(value: BaseGeom): void {
    // 0 == normal set. 1 = changed via cleaner fn, 2 = change by loading/cloning code.
    if (this.value !== value) {
      if (this.value) {
        this.value.off('boundingBoxChanged', this.emitBoundingBoxDirtied)
      }
      this.value = value
      if (this.value) {
        this.value.on('boundingBoxChanged', this.emitBoundingBoxDirtied)
      }

      this.emit('valueChanged', {})
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The loadValue is used to change the value of a parameter, without triggering a
   * valueChanges, or setting the USER_EDITED state.
   *
   * @param {BaseGeom} value - The context value.
   */
  loadValue(value: BaseGeom): void {
    if (this.value) {
      this.value.off('boundingBoxChanged', this.emitBoundingBoxDirtied)
    }

    this.value = value
    if (this.value) {
      this.value.on('boundingBoxChanged', this.emitBoundingBoxDirtied)
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, unknown>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    return {
      name: this.name,
      value: this.value?.toJSON(context),
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<string, unknown>} j - The json object this item must decode.
   * @param {Record<string, unknown>} context - The context value.
   */
  fromJSON(j: any, context?: Record<string, unknown>): void {
    if (j.name) this.name = j.name as string
    const geometry = Registry.constructClass(j.value.type) as any
    geometry.fromJSON(j.value, context)
    this.value = geometry
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new geometry parameter, copies its values
   * from this parameter and returns it.
   * @return {GeometryParameter} - Returns a new geometry parameter.
   */
  clone() {
    const clonedParam = new GeometryParameter(this.name, this.value)
    return clonedParam
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    // Note: some parameters hold refs to geoms/materials,
    // which need to be explicitly cleaned up.
    // e.g. freeing GPU Memory.

    if (this.value) {
      this.value.off('boundingBoxChanged', this.emitBoundingBoxDirtied)
    }
  }
}

Registry.register('GeometryParameter', GeometryParameter)

export { GeometryParameter }
