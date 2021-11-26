import { Vec3 } from '../../Math/index';
import { Parameter } from './Parameter';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { BinReader } from '../../SceneTree/BinReader';
/**
 * Represents a specific type of parameter, that only stores Vec3(three-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec3Param = new Vec3Parameter('MyVec3', new Vec3(1.2, 3.4, 1))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec3Param)
 * ```
 * @extends Parameter
 */
declare class Vec3Parameter extends Parameter<Vec3> implements IBinaryReader {
    protected range?: Vec3[];
    /**
     * Create a Vec3 parameter.
     *
     * @param name - The name of the Vec3 parameter.
     * @param value - The value of the parameter.
     * @param range - The range value is an array of two `Vec3` objects.
     */
    constructor(name?: string, value?: Vec3, range?: Vec3[]);
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    toJSON(context?: Record<string, unknown>): Record<string, unknown>;
    fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new Vec3 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec3 parameter.
     */
    clone(): Vec3Parameter;
}
export { Vec3Parameter };
