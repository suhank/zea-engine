import { ColorParameter } from './ColorParameter';
import { BaseImage } from '../BaseImage';
import { Color } from '../../Math/Color';
import { BinReader } from '../../SceneTree/BinReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Represents a specific type of parameter, that stores `Color` and `BaseImage` texture values.
 *
 * i.e.:
 * ```javascript
 * const image = new LDRImage();
 * image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
 *
 * const matColorParam = new MaterialColorParam('MyMaterialColor', new Color(0, 254, 2))
 * matColorParam.setImage(image)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(matColorParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered every time the Image value changes
 * * **textureDisconnected:** Triggered when Image value is cleaned/removed.
 * * **textureConnected:** Triggered when the Image value is set.
 *
 * @extends ColorParameter
 */
declare class MaterialColorParam extends ColorParameter {
    protected listenerIDs: Record<string, number>;
    protected image?: BaseImage;
    /**
     * Create a material color parameter.
     * @param name - The name of the material color parameter.
     * @param value - The value of the parameter.
     */
    constructor(name?: string, value?: Color);
    /**
     * Returns `BaseImage` texture of the Material.
     *
     * @return - The return value.
     */
    getImage(): BaseImage | undefined;
    /**
     * The imageUpdated method.
     * @private
     */
    private imageUpdated;
    /**
     * Sets `BaseImage` texture value in parameter.
     *
     * @param value - The value param.
     */
    setImage(value: BaseImage | null): void;
    /**
     * Sets `Color` or the `BaseImage` texture value in parameter.
     *
     * @param value - The value param.
     */
    setValue(value: BaseImage | Color): void;
    /**
     * Extracts `Color` and `Image` values from a buffer, updating current parameter state.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * The clone method constructs a new material color parameter,
     * copies its values from this parameter and returns it.
     *
     * @return - Returns a new cloned material color parameter.
     */
    clone(): MaterialColorParam;
}
export { MaterialColorParam };
