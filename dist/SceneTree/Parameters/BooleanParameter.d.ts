import { Parameter } from './Parameter';
import { BinReader } from '../BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
/**
 * Represents a specific type of parameter, that only stores `boolean` values.
 *
 * i.e.:
 * ```javascript
 * const booleanParam = new BooleanParameter('MyBoolean', true)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(booleanParam)
 * ```
 * @extends Parameter
 */
declare class BooleanParameter extends Parameter<boolean> implements IBinaryReader {
    /**
     * Creates a new parameter with `Boolean` data type.
     *
     * @param name - The name of the boolean parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: boolean);
    /**
     * Loads the boolean values from the binary buffer.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    /**
     * The toJSON method serializes this instance as a JSON.
     * It can be used for persistence, data transfer, etc.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, unknown>): Record<string, any>;
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new cloned parameter.
     */
    clone(): BooleanParameter;
}
export { BooleanParameter };
