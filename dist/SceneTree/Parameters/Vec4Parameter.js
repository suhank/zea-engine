/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Vec4 } from '../../Math/index';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores Vec4(four-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec4Param = new Vec4Parameter('MyVec4', new Vec4(1.2, 3.4, 1, 4.2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec4Param)
 * ```
 *
 * @extends Parameter
 */
class Vec4Parameter extends Parameter {
    /**
     * Create a Vec4 parameter.
     * @param name - The name of the Vec4 parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value ? value : new Vec4(), 'Vec4');
    }
    // ////////////////////////////////////////
    // Persistence
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
        const vec4 = new Vec4();
        vec4.fromJSON(j.value);
        this.__value = vec4;
        if (j.name)
            this.name = j.name;
    }
    // ////////////////////////////////////////
    // Clone
    /**
     * The clone method constructs a new Vec4 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec4 parameter.
     */
    clone() {
        var _a;
        const clonedParam = new Vec4Parameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('Vec4Parameter', Vec4Parameter);
Registry.register('Property_Vec4_32f', Vec4Parameter);
export { Vec4Parameter };
//# sourceMappingURL=Vec4Parameter.js.map