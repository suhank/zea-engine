import { Parameter } from './Parameter';
import { BinReader } from '../BinReader';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
/**
 * A parameter for storing an array of string values.
 *
 * @extends Parameter
 */
declare class StringListParameter extends Parameter<Array<string>> implements IBinaryReader {
    /**
     * Create a string parameter.
     * @param {string} name - The name of the material color parameter.
     * @param {string} value - The value of the parameter.
     */
    constructor(name?: string, value?: Array<string>);
    /**
     * Extracts the string value from a buffer, updating current parameter state.
     *
     * @param {BinReader} reader - The reader value.
     * @param {object} context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    /**
     * The toJSON method serializes this instance as a JSON.
     * It can be used for persistence, data transfer, etc.
     *
     * @param {Record<string, unknown>} context - The context value.
     * @return {Record<string, boolean | undefined>} - Returns the json object.
     */
    toJSON(context?: Record<string, unknown>): Record<string, Array<string>>;
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param {Record<string, boolean | undefined>} j - The json object this item must decode.
     * @param {Record<string, unknown>} context - The context value.
     */
    fromJSON(j: Record<string, string | string[]>, context?: Record<string, string>): void;
    /**
     * The clone method constructs a new string parameter, copies its values
     * from this parameter and returns it.
     *
     * @return {StringListParameter} - Returns a new string parameter.
     */
    clone(): StringListParameter;
}
export { StringListParameter };
