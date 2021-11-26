import { Parameter } from './Parameter';
import { BaseImage } from '../../SceneTree/BaseImage';
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
declare class ImageParameter extends Parameter<BaseImage | undefined> {
    /**
     * Create an image parameter.
     *
     * @param name - The name of the image parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: BaseImage);
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     * @return - Returns the json object.
     */
    fromJSON(j: Record<string, unknown>, context: Record<string, any>): void;
    /**
     * The clone method constructs a new image parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned image parameter.
     */
    clone(): ImageParameter;
}
export { ImageParameter };
