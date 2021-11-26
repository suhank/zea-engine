/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry';
import { Color } from '../../Math/index';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores `Color` values.
 *
 * i.e.:
 * ```javascript
 * const colorParam = new ColorParameter('MyColor', new Color(0, 254, 2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(colorParam)
 * ```
 *
 * @extends Parameter
 */
class ColorParameter extends Parameter {
    /**
     * Create a color parameter.
     * @param name - The name of the color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value ? value : new Color(), 'Color');
    }
    /**
     * Extracts `Color` values from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        const value = reader.loadRGBAFloat32Color();
        // If the value is in linear space, then we should convert it to gamma space.
        // Note: !! this should always be done in preprocessing...
        value.applyGamma(2.2);
        this.__value = value;
    }
    toJSON(context) {
        var _a;
        return {
            value: (_a = this.__value) === null || _a === void 0 ? void 0 : _a.toJSON(),
        };
    }
    fromJSON(j, context) {
        var _a;
        // if (j.value.type) this.__value = Registry.constructClass('Color') as Color // TODO: commented out Registry.constructClass
        (_a = this.__value) === null || _a === void 0 ? void 0 : _a.fromJSON(j.value);
    }
    /**
     * The clone method constructs a new color parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned color parameter.
     */
    clone() {
        var _a;
        const clonedParam = new ColorParameter(this.name, (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone());
        return clonedParam;
    }
}
Registry.register('ColorParameter', ColorParameter);
Registry.register('Property_Color_32f', ColorParameter);
export { ColorParameter };
//# sourceMappingURL=ColorParameter.js.map