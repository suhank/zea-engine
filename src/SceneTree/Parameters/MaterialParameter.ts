/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'
import { Material } from '../Material'

/**
 * Represents a specific type of parameter, that only stores `Material` values.
 *
 * i.e.:
 * ```javascript
 * const material = new Material('itemMaterial', 'SimpleSurfaceShader')
 * material.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))
 *
 * const materialParam = new MaterialParameter('MyMaterial', material)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(materialParam)
 * ```
 * **Events**
 * * **valueParameterValueChanged:** Triggered when parameter's value changes.
 * * **valueChanged:** Triggered when parameter's value changes, except on cleaning processes.
 *
 * @extends Parameter
 */
class MaterialParameter extends Parameter<Material | undefined> {
  protected listenerIDs: Record<string, number> = {}
  /**
   * Create a material parameter.
   * @param name - The name of the material parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Material) {
    super(name, value, 'Material')
    if (value) this.setValue(value)
  }

  private valueParameterValueChanged(event: Record<string, unknown>): void {
    this.emit('valueParameterValueChanged', event)
  }

  /**
   * Sets `Material` value of the parameter.
   *
   * @param material - The material param.
   */
  setValue(material: Material): void {
    // 0 == normal set. 1 = changed via cleaner fn, 2 = change by loading/cloning code.
    if (this.__value !== material) {
      if (this.__value) {
        this.__value.removeListenerById('parameterValueChanged', this.listenerIDs['parameterValueChanged'])
      }
      this.__value = material
      if (this.__value) {
        this.listenerIDs['parameterValueChanged'] = this.__value.on('parameterValueChanged', (event) => {
          this.valueParameterValueChanged(event)
        })
      }

      // During the cleaning process, we don't want notifications.
      this.emit('valueChanged')
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The loadValue is used to change the value of a parameter, without triggering a
   * valueChanges, or setting the USER_EDITED state.
   *
   * @param value - The context value.
   */

  //TODO: remove?
  loadValue(value: Material): void {
    if (this.__value) {
      this.__value.removeListenerById('parameterValueChanged', this.listenerIDs['parameterValueChanged'])
    }
    this.__value = value
    if (this.__value) {
      this.listenerIDs['parameterValueChanged'] = this.__value.on('parameterValueChanged', (event) => {
        this.valueParameterValueChanged(event)
      })
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    let j: Record<string, unknown> = {}
    j.name = this.name

    if (this.__value) {
      j = {
        value: !context || !context.onlyPath ? this.__value.toJSON(context) : this.__value.getPath(),
      }
    }

    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any>): void {
    if (j.value == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }

    if (j.value instanceof Array || j.value instanceof String) {
      if (context && context.assetItem) {
        const materialLibrary = context.assetItem.getMaterialLibrary()
        const material = materialLibrary.getMaterial(j.value instanceof Array ? j.value[1] : j.value)
        if (material) {
          this.loadValue(material)
        }
      }
    } else {
      const material = new Material()
      if (j.value) material.fromJSON(j.value, context)
      this.loadValue(material)
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new material parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new material parameter.
   */
  clone(): MaterialParameter {
    const clonedParam = new MaterialParameter(this.name, this.__value)
    return clonedParam
  }
}

Registry.register('MaterialParameter', MaterialParameter)

export { MaterialParameter }
