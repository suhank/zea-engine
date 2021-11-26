import { BaseItem } from './BaseItem';
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
    mipMapped: boolean;
    protected wrapS: string;
    protected wrapT: string;
    protected minFilter: string;
    protected magFilter: string;
    loaded: boolean;
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
    getParams(): Record<string, any>;
}
export { BaseImage };
