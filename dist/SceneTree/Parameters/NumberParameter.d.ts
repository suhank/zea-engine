import { BinReader } from '../../SceneTree/BinReader';
import { Parameter } from './Parameter';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
/**
 * Represents a specific type of parameter, that only stores numeric values.
 *
 * ```javascript
 * const numberParam = new NumberParameter('MyNumber', 15)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(numberParam)
 * ```
 *
 * @extends Parameter
 */
declare class NumberParameter extends Parameter<number> implements IBinaryReader {
    protected range?: Array<number>;
    protected step?: number;
    /**
     * Create a number parameter.
     * @param name - The name of the number parameter.
     * @param value - The value of the parameter.
     * @param range - An array with two numbers. If defined, the parameter value will be clamped.
     * @param step - The step value. If defined, the parameter value will be rounded to the nearest integer.
     */
    constructor(name?: string, value?: number, range?: number[], step?: number);
    /**
     * Returns the range to which the parameter is restrained.
     *
     * @return - The return value.
     */
    getRange(): number[] | undefined;
    /**
     * Sets the range to which the parameter is restrained.
     *
     * @param range - The range value.
     */
    setRange(range: number[]): void;
    /**
     * Returns the step number, which is the one used for rounding.
     *
     * @return - The return value.
     */
    getStep(): number | undefined;
    /**
     * Returns step value.
     *
     * @param step - The step value.
     */
    setStep(step: number): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, unknown>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void;
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    /**
     * The clone method constructs a new number parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new number parameter.
     */
    clone(): NumberParameter;
}
export { NumberParameter };
