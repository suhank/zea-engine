import { Color } from '../../Math/index';
import { BaseImage } from '../BaseImage';
import { BinReader } from '../BinReader';
/**
 * Class representing a VLH image.
 *
 * **Events**
 * * **loaded:** Triggered when image data is loaded.
 * * **updated:** Triggered when image data is updated.
 *
 * @extends BaseImage
 */
declare class VLHImage extends BaseImage {
    protected __exposure: number;
    protected __ambientLightFactor: number;
    protected __hdrTint: Color;
    protected __stream: boolean;
    protected __data: Record<string, any>;
    /**
     * Create a VLH image.
     * @param name - The name value.
     * @param params - The params value.
     */
    constructor(name?: string, params?: Record<string, any>);
    /**
     * The __decodeData method.
     * @param entries - The entries value.
     * @private
     */
    __decodeData(entries: Record<string, any>): Promise<void>;
    /**
     * Loads a vlh file given a URL.
     * @param url - The URL of the vlh file to load
     * @return - Returns a promise that resolves once the initial load is complete
     */
    load(url: string): Promise<void>;
    /**
     * Returns if the data is a stream or not.
     *
     * @return - The return value.
     */
    isStream(): boolean;
    /**
     * Returns all parameters and class state values.
     *
     * @return - The return value.
     */
    getParams(): Record<string, any>;
    /**
     * The setHDRTint method.
     * @private
     * @param hdrTint - The hdrTint value.
     */
    setHDRTint(hdrTint: Color): void;
    /**
     * The getHDRTint method.
     * @private
     * @return - The return value.
     */
    getHDRTint(): Color;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context: Record<string, any>): Record<string, any>;
    /**
     * Sets state of current Image using a binary reader object, and adds it to the resource loader.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, any>): void;
}
export { VLHImage };
