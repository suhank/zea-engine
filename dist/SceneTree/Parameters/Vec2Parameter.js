/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Vec2 } from '../../Math/index';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores Vec2(two-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec2Param = new Vec2Parameter('MyVec2', new Vec2(1.2, 3.4))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec2Param)
 * ```
 *
 * **Events**
 * * **rangeChanged:** Triggered when rage array changes.
 *
 * @extends Parameter
 */
class Vec2Parameter extends Parameter {
    /**
     * Create a Vec2 parameter.
     *
     * @param name - The name of the Vec2 parameter.
     * @param value - The value of the parameter.
     * @param range - The range value is an array of two `Vec2` objects.
     */
    constructor(name = '', value, range) {
        super(name, value ? value : new Vec2(), 'Vec2');
        this.range = range;
    }
    /**
     * Returns the range of values in which current parameter can be.
     *
     * @return - The return value.
     */
    getRange() {
        // Range should be an array of 2 vec2s. [min(x,y), max(x,y)]
        return this.range;
    }
    /**
     * The __setRange method.
     * @param range - The range value.
     * @private
     */
    setRange(range) {
        // Should be an array [0, 20]
        this.range = range;
        this.emit('rangeChanged', { range });
    }
    /**
     * Extracts a number value from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        var _a;
        (_a = this.__value) === null || _a === void 0 ? void 0 : _a.readBinary(reader);
    }
    toJSON(context) {
        var _a;
        return {
            name: this.name,
            value: (_a = this.__value) === null || _a === void 0 ? void 0 : _a.toJSON(),
        };
    }
    fromJSON(j, context) {
        const vec2 = new Vec2();
        vec2.fromJSON(j.value);
        this.__value = vec2;
        if (j.name)
            this.name = j.name;
    }
    /**
     * The clone method constructs a new Vec2 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec2 parameter.
     */
    clone() {
        var _a;
        const clonedParam = new Vec2Parameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        if (this.range)
            clonedParam.setRange(this.range);
        return clonedParam;
    }
}
Registry.register('Vec2Parameter', Vec2Parameter);
Registry.register('Property_Vec2_32f', Vec2Parameter);
export { Vec2Parameter };
//# sourceMappingURL=Vec2Parameter.js.map