import { ImageParams } from '..';
import { AssetLoadContext } from '../AssetLoadContext';
import { BaseImage } from '../BaseImage';
import { BinReader } from '../BinReader';
/** Class representing a file image.
 * @extends BaseImage
 */
declare class FileImage extends BaseImage {
    crossOrigin: string;
    url: string;
    protected __data: HTMLImageElement | null;
    /**
     * Create a file image.
     * @param name - The name value.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(name?: string, filePath?: string, params?: Record<string, any>);
    /**
     * Defines how to handle cross origin request.
     *
     * **Possible values:**
     * * **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
     * * **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
     * * **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.
     *
     * @default anonymous
     * @param crossOrigin - The crossOrigin value.
     */
    setCrossOrigin(crossOrigin: string): void;
    /**
     * Returns the HTML DOM element used to load the image file.
     * Be
     * @returns { HTMLImageElement | null }
     */
    getDOMElement(): HTMLImageElement | null;
    /**
     * Uses the specify url to load an Image element and adds it to the data library.
     * Sets the state of the current object.
     *
     * @param url - The url value.
     * @param format - The format value.
     * @return Returns a promise that resolves once the image is loaded.
     */
    load(url: string, format?: string): Promise<void>;
    /**
     * Loads in Image file using the given URL
     *
     * @param url - The url value.
     * @param format - The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass.
     */
    setImageURL(url: string, format?: string): void;
    /**
     * The getParams method.
     * @return - The return value.
     */
    getParams(): ImageParams;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     */
    toJSON(context?: Record<string, any>): {};
    /**
     * The fromJSON method decodes a json object for this type.
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The readBinary method.
     * @param reader - The reader param.
     * @param context - The context param.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
}
/** Class representing a 2D file image.
 * @extends FileImage
 */
declare class FileImage2D extends FileImage {
    /**
     * Create a file image 2D.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(filePath: string, params?: any);
}
export { FileImage, FileImage2D };
