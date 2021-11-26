/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores `BaseImage` values.
 *
 * i.e.:
 * ```javascript
 * // Since `Label` is a `BaseImage` implementation, it helps us with the example.
 * const label = new Label('My awesome label', 'LabelPack')
 * const imageParam = new ImageParameter('MyImage', label)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(imageParam)
 * ```
 *
 * @extends Parameter
 */
class ImageParameter extends Parameter {
    /**
     * Create an image parameter.
     *
     * @param name - The name of the image parameter.
     * @param value - The value of the parameter.
     */
    constructor(name = '', value) {
        super(name, value, 'BaseImage');
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
        const j = {
            name: this.name,
        };
        if (this.__value) {
            j.imageType = this.__value.getClassName();
            j.value = this.__value.toJSON();
        }
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    fromJSON(j, context) {
        var _a;
        if (j.imageType) {
            this.__value = Registry.constructClass(j.imageType);
            if (j.value)
                (_a = this.__value) === null || _a === void 0 ? void 0 : _a.fromJSON(j.value, context);
        }
    }
    // ////////////////////////////////////////
    // Clone
    /**
     * The clone method constructs a new image parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned image parameter.
     */
    clone() {
        const clonedParam = new ImageParameter(this.name, this.__value);
        return clonedParam;
    }
}
Registry.register('ImageParameter', ImageParameter);
export { ImageParameter };
//# sourceMappingURL=ImageParameter.js.map