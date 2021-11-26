/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Parameter } from './Parameter';
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
class StringParameter extends Parameter {
    /**
     * Create a string parameter.
     * @param name - The name of the material color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value = '') {
        super(name, value, 'String');
        this.multiLine = false;
    }
    /**
     * Sets flag that indicates if the string contains new line feeds.
     *
     * @param multiLine - The multiLine value.
     */
    setMultiLine(multiLine) {
        this.multiLine = multiLine;
    }
    /**
     * Returns multi-line flag value.
     *
     * @return - The return value.
     */
    getMultiLine() {
        return this.multiLine;
    }
    /**
     * Extracts the string value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        this.__value = reader.loadStr();
    }
    /**
     * The toJSON method serializes this instance as a JSON.
     * It can be used for persistence, data transfer, etc.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        return { value: this.__value };
    }
    /**
     * The fromJSON method takes a JSON and deserializes into an instance of this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        this.__value = j.value ? j.value : '';
        this.emit('valueChanged', { mode: 0 });
    }
    /**
     * The clone method constructs a new string parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new string parameter.
     */
    clone() {
        return new StringParameter(this.name, this.__value);
    }
}
Registry.register('StringParameter', StringParameter);
Registry.register('Property_String', StringParameter);
export { StringParameter };
//# sourceMappingURL=StringParameter.js.map