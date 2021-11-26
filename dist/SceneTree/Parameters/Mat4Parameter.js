/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Mat4 } from '../../Math/Mat4';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const mat4Param = new Ma3Parameter('MyMat4', new Mat4(...args))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(mat4Param)
 * ```
 *
 * @extends Parameter
 */
class Mat4Parameter extends Parameter {
    /**
     * Create a Mat4 parameter.
     *
     * @param name - The name of the Mat4 parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value ? value : new Mat4(), 'Mat4');
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
            value: (_a = this.__value) === null || _a === void 0 ? void 0 : _a.toJSON(),
        };
    }
    fromJSON(j, context) {
        const mat4 = new Mat4();
        mat4.fromJSON(j.value);
        this.__value = mat4;
    }
    /**
     * The clone method constructs a new Mat4 parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned Mat4 parameter.
     */
    clone() {
        var _a;
        const clonedParam = new Mat4Parameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('Mat4Parameter', Mat4Parameter);
Registry.register('Property_Mat4_32f', Mat4Parameter);
export { Mat4Parameter };
//# sourceMappingURL=Mat4Parameter.js.map