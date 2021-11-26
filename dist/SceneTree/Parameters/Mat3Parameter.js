/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry';
import { Mat3 } from '../../Math/index';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores Mat3(3x3 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const mat3Param = new Ma3Parameter('MyMat3', new Mat3(...args))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(mat3Param)
 * ```
 *
 * @extends Parameter
 */
class Mat3Parameter extends Parameter {
    /**
     * Create a Mat3 parameter.
     * @param name - The name of the Mat3 parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value ? value : new Mat3(), 'Mat3');
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
        const mat3 = new Mat3();
        mat3.fromJSON(j.value);
        this.__value = mat3;
    }
    /**
     * The clone method constructs a new Mat3 parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned Mat3 parameter.
     */
    clone() {
        var _a;
        const clonedParam = new Mat3Parameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('Mat3Parameter', Mat3Parameter);
Registry.register('Property_Mat3_32f', Mat3Parameter);
export { Mat3Parameter };
//# sourceMappingURL=Mat3Parameter.js.map