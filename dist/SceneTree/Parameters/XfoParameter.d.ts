import { Xfo } from '../../Math/index';
import { Parameter } from './Parameter';
import { BinReader } from '../BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Represents a specific type of parameter, that only stores `Xfo` transform values.
 *
 * ```javascript
 * const xfoParam = new XfoParameter('MyXfo', new Xfo(new Vec3(1.2, 3.4, 1)))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(xfoParam)
 * ```
 *
 * @extends Parameter
 */
declare class XfoParameter extends Parameter<Xfo> implements IBinaryReader {
    /**
     * Create a Xfo parameter.
     * @param name - The name of the Xfo parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Xfo);
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
     * The clone method constructs a new Xfo parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Xfo parameter.
     */
    clone(): XfoParameter;
}
export { XfoParameter };
