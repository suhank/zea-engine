import { Mat4 } from '../../Math/Mat4';
import { Parameter } from './Parameter';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { BinReader } from '../../SceneTree/BinReader';
/**
 * Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const mat4Param = new Ma3Parameter('MyMat4', new Mat4(...args))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(mat4Param)
 * ```
 *
 * @extends Parameter
 */
declare class Mat4Parameter extends Parameter<Mat4> implements IBinaryReader {
    /**
     * Create a Mat4 parameter.
     *
     * @param name - The name of the Mat4 parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Mat4);
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
     * The clone method constructs a new Mat4 parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned Mat4 parameter.
     */
    clone(): Mat4Parameter;
}
export { Mat4Parameter };
