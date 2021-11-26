import { Registry } from '../../Registry';
import { Parameter } from './Parameter';
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
class NumberParameter extends Parameter {
    /**
     * Create a number parameter.
     * @param name - The name of the number parameter.
     * @param value - The value of the parameter.
     * @param range - An array with two numbers. If defined, the parameter value will be clamped.
     * @param step - The step value. If defined, the parameter value will be rounded to the nearest integer.
     */
    constructor(name = '', value = 0, range, step) {
        super(name, value, 'Number');
        this.range = range;
        this.step = step;
    }
    /**
     * Returns the range to which the parameter is restrained.
     *
     * @return - The return value.
     */
    getRange() {
        return this.range;
    }
    /**
     * Sets the range to which the parameter is restrained.
     *
     * @param range - The range value.
     */
    setRange(range) {
        this.range = range;
    }
    /**
     * Returns the step number, which is the one used for rounding.
     *
     * @return - The return value.
     */
    getStep() {
        return this.step;
    }
    /**
     * Returns step value.
     *
     * @param step - The step value.
     */
    setStep(step) {
        this.step = step;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        const j = { value: this.__value };
        if (this.range)
            j.range = this.range;
        if (this.step)
            j.step = this.step;
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j, context) {
        this.__value = j.value;
        if (j.range)
            this.range = j.range;
        if (j.step)
            this.step = j.step;
    }
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        this.__value = reader.loadFloat32();
    }
    // ////////////////////////////////////////
    // Clone
    /**
     * The clone method constructs a new number parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new number parameter.
     */
    clone() {
        return new NumberParameter(this.name, this.__value, this.range, this.step);
    }
}
// eslint-disable-next-line require-jsdoc
class Float32Parameter extends NumberParameter {
    // eslint-disable-next-line require-jsdoc
    readBinary(reader, context) {
        this.__value = reader.loadFloat32();
    }
}
// eslint-disable-next-line require-jsdoc
class SInt32Parameter extends NumberParameter {
    // eslint-disable-next-line require-jsdoc
    readBinary(reader, context) {
        this.__value = reader.loadSInt32();
    }
}
// eslint-disable-next-line require-jsdoc
class UInt32Parameter extends NumberParameter {
    // eslint-disable-next-line require-jsdoc
    readBinary(reader, context) {
        this.__value = reader.loadUInt32();
    }
}
Registry.register('NumberParameter', NumberParameter);
Registry.register('Property_SInt32', SInt32Parameter);
Registry.register('Property_UInt32', UInt32Parameter);
Registry.register('Property_Float32', Float32Parameter);
export { NumberParameter };
//# sourceMappingURL=NumberParameter.js.map