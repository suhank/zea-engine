import { FileImage } from './FileImage';
import { NumberParameter, Vec4Parameter } from '../Parameters/index';
/**
 * Class representing a GIF image.
 *
 * ```
 * const image = new GIFImage()
 * image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.gif")
 * ```
 *
 * **Parameters**
 * * **StreamAtlasDesc:**
 * * **StreamAtlasIndex:**
 *
 * **Events**
 * * **loaded:** Triggered when the gif data is loaded.
 *
 * **File Types:** gif
 *
 * @extends FileImage
 */
declare class GIFImage extends FileImage {
    protected __streamAtlas: any;
    protected play: any;
    protected stop: any;
    protected __resourcePromise: any;
    protected __unpackedData: any;
    streamAtlasDescParam: Vec4Parameter;
    streamAtlasIndexParam: NumberParameter;
    /**
     * Create a GIF image.
     * @param name - The name value.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(name?: string, filePath?: string, params?: {});
    /**
     * The getFrameDelay method.
     * @param index - The index value.
     * @return - The return value.
     */
    getFrameDelay(index: number): number;
    /**
     * Uses the specify url to load an Image element and adds it to the data library.
     * Sets the state of the current object.
     *
     * @param url - The url value.
     * @param format - The format value.
     * @return Returns a promise that resolves once the image is loaded.
     */
    load(url: string, format?: string): Promise<void>;
}
export { GIFImage };
