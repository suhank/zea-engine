import { BaseItem } from './BaseItem';
/**
 * Represents a 2D image item, containing width and height.
 *
 * **Events**
 * * **updated:** Triggered when the value of any of the parameters listed above changes.
 *
 * @extends BaseItem
 */
class BaseImage extends BaseItem {
    /**
     * Creates an instance of BaseImage.
     * @param name - name of the item
     */
    constructor(name) {
        super(name);
        this.width = 0;
        this.height = 0;
        this.format = 'RGB';
        this.type = 'UNSIGNED_BYTE';
        this.mipMapped = true;
        this.wrapS = 'REPEAT';
        this.wrapT = 'REPEAT';
        this.minFilter = 'LINEAR';
        this.magFilter = 'LINEAR';
        this.loaded = false;
        this.width = 0;
        this.height = 0;
        this.format = 'RGB';
        this.type = 'UNSIGNED_BYTE';
        this.wrapS = 'CLAMP_TO_EDGE';
        this.wrapT = 'CLAMP_TO_EDGE';
        this.minFilter = 'LINEAR';
        this.magFilter = 'LINEAR';
        this.on('parameterValueChanged', () => {
            this.emit('updated');
        });
    }
    /**
     * Returns true if loaded.
     * @private
     * @return - Returns a boolean.
     */
    isLoaded() {
        return this.loaded;
    }
    /**
     * Returns all parameters and class state values.
     *
     * @return - The return value.
     */
    getParams() {
        return {
            type: this.type,
            format: this.format,
            width: this.width,
            height: this.height,
            wrapS: this.wrapS,
            wrapT: this.wrapT,
            minFilter: this.minFilter,
            magFilter: this.magFilter,
            mipMapped: this.mipMapped,
        };
    }
}
export { BaseImage };
//# sourceMappingURL=BaseImage.js.map