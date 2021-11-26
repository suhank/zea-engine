import { Parameter } from './Parameter';
import { BinReader } from '../BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
/**
 * Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const stringParam = new StringParameter('MyString', 'A String value goes here')
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(stringParam)
 * ```
 *
 * @extends Parameter
 */
declare class StringParameter extends Parameter<string> implements IBinaryReader {
    multiLine: boolean;
    /**
     * Create a string parameter.
     * @param name - The name of the material color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: string);
    /**
     * Sets flag that indicates if the string contains new line feeds.
     *
     * @param multiLine - The multiLine value.
     */
    setMultiLine(multiLine: boolean): void;
    /**
     * Returns multi-line flag value.
     *
     * @return - The return value.
     */
    getMultiLine(): boolean;
    /**
     * Extracts the string value from a buffer, updating current parameter state.
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
    toJSON(context?: Record<string, unknown>): Record<string, string | undefined>;
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, string | undefined>, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new string parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new string parameter.
     */
    clone(): StringParameter;
}
export { StringParameter };
