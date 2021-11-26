import { Parameter } from './Parameter';
import { BaseGeom } from '../../SceneTree/Geometry/BaseGeom';
/** Class representing a geometry parameter.
 * @extends Parameter
 * @private
 */
declare class GeometryParameter extends Parameter<BaseGeom | undefined> {
    protected listenerIDs: Record<string, number>;
    /**
     * Create a geometry parameter.
     * @param name - The name of the color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: BaseGeom);
    private emitBoundingBoxDirtied;
    /**
     * The setValue method.
     * @param value - The geom value.
     */
    setValue(value: BaseGeom): void;
    /**
     * The loadValue is used to change the value of a parameter, without triggering a
     * valueChanges, or setting the USER_EDITED state.
     *
     * @param value - The context value.
     */
    loadValue(value: BaseGeom): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: any, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new geometry parameter, copies its values
     * from this parameter and returns it.
     * @return - Returns a new geometry parameter.
     */
    clone(): GeometryParameter;
}
export { GeometryParameter };
