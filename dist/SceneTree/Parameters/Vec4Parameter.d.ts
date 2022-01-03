import { Vec4 } from '../../Math/index';
import { Parameter } from './Parameter';
import { BinReader } from '../../SceneTree/BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Represents a specific type of parameter, that only stores Vec4(four-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec4Param = new Vec4Parameter('MyVec4', new Vec4(1.2, 3.4, 1, 4.2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec4Param)
 * ```
 *
 * @extends Parameter
 */
declare class Vec4Parameter extends Parameter<Vec4> implements IBinaryReader {
    /**
     * Create a Vec4 parameter.
     * @param name - The name of the Vec4 parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Vec4);
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: AssetLoadContext): void;
    toJSON(context?: Record<string, unknown>): Record<string, unknown>;
    fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new Vec4 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec4 parameter.
     */
    clone(): Vec4Parameter;
}
export { Vec4Parameter };
