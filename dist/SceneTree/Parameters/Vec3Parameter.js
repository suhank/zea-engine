/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Vec3 } from '../../Math/index';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores Vec3(three-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec3Param = new Vec3Parameter('MyVec3', new Vec3(1.2, 3.4, 1))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec3Param)
 * ```
 * @extends Parameter
 */
class Vec3Parameter extends Parameter {
    /**
     * Create a Vec3 parameter.
     *
     * @param name - The name of the Vec3 parameter.
     * @param value - The value of the parameter.
     * @param range - The range value is an array of two `Vec3` objects.
     */
    constructor(name = '', value, range) {
        super(name, value ? value : new Vec3(), 'Vec3');
        this.range = range;
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
        const vec4 = new Vec3();
        vec4.fromJSON(j.value);
        this.__value = vec4;
        if (j.name)
            this.name = j.name;
    }
    /**
     * The clone method constructs a new Vec3 parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new Vec3 parameter.
     */
    clone() {
        var _a;
        const clonedParam = new Vec3Parameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('Vec3Parameter', Vec3Parameter);
Registry.register('Property_Vec3_32f', Vec3Parameter);
export { Vec3Parameter };
//# sourceMappingURL=Vec3Parameter.js.map