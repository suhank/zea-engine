import { BaseItem } from './BaseItem';
interface ImageParams {
    type: string;
    format: string;
    width: number;
    height: number;
    wrapS?: string;
    wrapT?: string;
    minFilter?: string;
    magFilter?: string;
    mipMapped?: boolean;
    data?: HTMLImageElement | HTMLVideoElement | Uint8Array | Float32Array | HTMLCanvasElement | ImageData | Record<string, any>;
    exposure?: number;
    flipY?: boolean;
}
/**
 * Represents a 2D image item, containing width and height.
 *
 * **Events**
 * * **updated:** Triggered when the value of any of the parameters listed above changes.
 *
 * @extends BaseItem
 */
declare class BaseImage extends BaseItem {
    width: number;
    height: number;
    format: string;
    type: string;
    loaded: boolean;
    mipMapped: boolean;
    wrapS: string;
    wrapT: string;
    minFilter: string;
    magFilter: string;
    /**
     * Creates an instance of BaseImage.
     * @param name - name of the item
     */
    constructor(name?: string);
    /**
     * Returns true if loaded.
     * @private
     * @return - Returns a boolean.
     */
    isLoaded(): boolean;
    /**
     * Returns all parameters and class state values.
     *
     * @return - The return value.
     */
    getParams(): ImageParams;
}
export { BaseImage, ImageParams };
