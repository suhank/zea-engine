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
class MaterialParameter extends Parameter<Material> {
  /**
   * Create a material parameter.
   * @param {string} name - The name of the material parameter.
   * @param {Material} value - The value of the parameter.
   */
  constructor(name: string = '', value?: Material) {
    super(name, value, 'Material')

    this.valueParameterValueChanged = this.valueParameterValueChanged.bind(this)
    this.setValue(value)
  }

  protected valueParameterValueChanged = (event: Record<string, unknown>): void => {
    this.emit('valueParameterValueChanged', event)
  }

  /**
   * Sets `Material` value of the parameter.
   *
   * @param {Material} material - The material param.
   */
  setValue(material?: Material): void {
    // 0 == normal set. 1 = changed via cleaner fn, 2 = change by loading/cloning code.
    if (this.value !== material) {
      if (this.value) {
        this.value.off('parameterValueChanged', this.valueParameterValueChanged)
      }
      this.value = material
      if (this.value) {
        this.value.on('parameterValueChanged', this.valueParameterValueChanged)
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
   * @param {Material} value - The context value.
   */
  loadValue(value: Material): void {
    if (this.value) {
      this.value.off('parameterValueChanged', this.valueParameterValueChanged)
    }
    this.value = value
    if (this.value) {
      this.value.on('parameterValueChanged', this.valueParameterValueChanged)
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, unknown>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, unknown> {
    let j: Record<string, unknown> = {}
    j.name = this.name

    if (this.value) {
      j = {
        value: !context || !context.onlyPath ? this.value.toJSON(context) : this.value.getPath(),
      }
    }

    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, unknown>, context: Record<string, any>): void {
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
      console.warn('Commented out code. JavaScript code did not have the required args')
      // @ts-ignore
      const material = new Material() // TODO: what are the correct arguments in this case?
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
   * @return {MaterialParameter} - Returns a new material parameter.
   */
  clone(): MaterialParameter {
    const clonedParam = new MaterialParameter(this.name, this.value)
    return clonedParam
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    // Note: Some parameters hold refs to geoms/materials,
    // which need to be explicitly cleaned up.
    // E.g. freeing GPU Memory.

    if (this.value) {
      this.value.off('parameterValueChanged', this.valueParameterValueChanged)
    }
  }
}

Registry.register('MaterialParameter', MaterialParameter)

export { MaterialParameter }
