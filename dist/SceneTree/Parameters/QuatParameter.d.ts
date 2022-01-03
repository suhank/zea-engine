import { Quat } from '../../Math/index';
import { Parameter } from './Parameter';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { BinReader } from '../../SceneTree/BinReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Represents a specific type of parameter, that only stores Vec3(four-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const quatParam = new QuatParameter('MyQuat', new Quat(1.2, 3.4, 1, 4.2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(quatParam)
 * ```
 *
 * @extends Parameter
 */
declare class QuatParameter extends Parameter<Quat> implements IBinaryReader {
    /**
     * Create a Quat parameter.
     * @param name - The name of the Quat parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Quat);
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
     * The clone method constructs a new Quat parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Quat parameter.
     */
    clone(): QuatParameter;
}
export { QuatParameter };
