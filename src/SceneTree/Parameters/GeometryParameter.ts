/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { BaseGeom } from '../../SceneTree/Geometry/BaseGeom'

/** Class representing a geometry parameter.
 * @extends Parameter
 * @private
 */
class GeometryParameter extends Parameter<BaseGeom | undefined> {
  protected listenerIDs: Record<string, number> = {}
  /**
   * Create a geometry parameter.
   * @param {string} name - The name of the color parameter.
   * @param {BaseGeom} value - The value of the parameter.
   */
  constructor(name: string = '', value?: BaseGeom) {
    super(name, value, 'Geometry')

    if (value) this.setValue(value)
  }

  private emitBoundingBoxDirtied(event: Record<string, unknown>): void {
    this.emit('boundingBoxChanged', event)
  }

  /**
   * The setValue method.
   * @param {BaseGeom} value - The geom value.
   */
  setValue(value: BaseGeom): void {
    // 0 == normal set. 1 = changed via cleaner fn, 2 = change by loading/cloning code.
    if (this.__value !== value) {
      if (this.__value) {
        this.__value.removeListenerById('boundingBoxChanged', this.listenerIDs['boundingBoxChanged'])
      }
      this.__value = value
      if (this.__value) {
        this.listenerIDs['boundingBoxChanged'] = this.__value.on('boundingBoxChanged', (event) => {
          this.emitBoundingBoxDirtied(event)
        })
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
    if (this.__value) {
      this.__value.removeListenerById('boundingBoxChanged', this.listenerIDs['boundingBoxChanged'])
    }

    this.__value = value
    if (this.__value) {
      this.listenerIDs['boundingBoxChanged'] = this.__value.on('boundingBoxChanged', (event) => {
        this.emitBoundingBoxDirtied(event)
      })
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
      value: this.__value?.toJSON(context),
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
    this.__value = geometry
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new geometry parameter, copies its values
   * from this parameter and returns it.
   * @return {GeometryParameter} - Returns a new geometry parameter.
   */
  clone() {
    const clonedParam = new GeometryParameter(this.name, this.__value)
    return clonedParam
  }
}

Registry.register('GeometryParameter', GeometryParameter)

export { GeometryParameter }
