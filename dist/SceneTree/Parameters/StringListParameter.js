import { Parameter } from './Parameter';
import { Registry } from '../../Registry';
/**
 * A parameter for storing an array of string values.
 *
 * @extends Parameter
 */
class StringListParameter extends Parameter {
    /**
     * Create a string parameter.
     * @param {string} name - The name of the material color parameter.
     * @param {string} value - The value of the parameter.
     */
    constructor(name = '', value = []) {
        super(name, value, 'String[]');
    }
    /**
     * Extracts the string value from a buffer, updating current parameter state.
     *
     * @param {BinReader} reader - The reader value.
     * @param {object} context - The context value.
     */
    readBinary(reader, context) {
        this.__value = reader.loadStrArray();
    }
    /**
     * The toJSON method serializes this instance as a JSON.
     * It can be used for persistence, data transfer, etc.
     *
     * @param {Record<string, unknown>} context - The context value.
     * @return {Record<string, boolean | undefined>} - Returns the json object.
     */
    toJSON(context) {
        return { value: this.__value };
    }
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param {Record<string, boolean | undefined>} j - The json object this item must decode.
     * @param {Record<string, unknown>} context - The context value.
     */
    fromJSON(j, context) {
        this.__value = j.value;
        this.emit('valueChanged', { mode: 0 });
    }
    /**
     * The clone method constructs a new string parameter, copies its values
     * from this parameter and returns it.
     *
     * @return {StringListParameter} - Returns a new string parameter.
     */
    clone() {
        const clonedParam = new StringListParameter(this.name, this.__value);
        return clonedParam;
    }
}
Registry.register('StringListParameter', StringListParameter);
Registry.register('Property_StringList', StringListParameter);
export { StringListParameter };
//# sourceMappingURL=StringListParameter.js.map