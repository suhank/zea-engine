import { BaseImage, ImageParams } from '../BaseImage';
/**
 * Represents a BaseImage with the ability to load data.
 *
 * **Events**
 * * **loaded:** Triggered when the data is loaded.
 * * **updated:** Triggered when the data is updated.
 * @extends BaseImage
 */
declare class DataImage extends BaseImage {
    protected __data: Uint8Array | ImageData;
    /**
     * Create a data image.
     * @param name - The name value.
     */
    constructor(name?: string);
    /**
     * Returns an indicator of current item's loaded state.
     * @return - `true` if bytes data is fully loaded, `false` otherwise.
     */
    isLoaded(): boolean;
    /**
     * Images are static content, so the value for this method is always going to be `false`
     *
     * @return - The return value.
     */
    isStream(): boolean;
    /**
     * Sets Image's data by recieving an bytes array.
     *
     * @param width - The width value.
     * @param height - The height value.
     * @param data - The data value.
     */
    setData(width: number, height: number, data: Uint8Array): void;
    /**
     * Returns all parameters and class state values(Including data).
     *
     * @return - The return value.
     */
    getParams(): ImageParams;
}
export { DataImage };
