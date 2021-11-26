import { Parameter } from './Parameter';
import { Material } from '../Material';
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
declare class MaterialParameter extends Parameter<Material | undefined> {
    protected listenerIDs: Record<string, number>;
    /**
     * Create a material parameter.
     * @param name - The name of the material parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Material);
    private valueParameterValueChanged;
    /**
     * Sets `Material` value of the parameter.
     *
     * @param material - The material param.
     */
    setValue(material: Material): void;
    /**
     * The loadValue is used to change the value of a parameter, without triggering a
     * valueChanges, or setting the USER_EDITED state.
     *
     * @param value - The context value.
     */
    loadValue(value: Material): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context: Record<string, any>): void;
    /**
     * The clone method constructs a new material parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new material parameter.
     */
    clone(): MaterialParameter;
}
export { MaterialParameter };
