import { Color } from '../../Math/index';
import { Registry } from '../../Registry';
import { BaseImage } from '../BaseImage';
import { resourceLoader } from '../resourceLoader';
/**
 * Class representing a VLH image.
 *
 * **Events**
 * * **loaded:** Triggered when image data is loaded.
 * * **updated:** Triggered when image data is updated.
 *
 * @extends BaseImage
 */
class VLHImage extends BaseImage {
    /**
     * Create a VLH image.
     * @param name - The name value.
     * @param params - The params value.
     */
    constructor(name, params = {}) {
        super(name); // TODO: used to be: super(name, params)
        this.__data = {};
        let filepath;
        if (name != undefined && name.includes('.')) {
            filepath = name;
            this.setName(name.substring(name.lastIndexOf('/') + 1, name.lastIndexOf('.')));
        }
        this.__exposure = 1.0;
        this.__ambientLightFactor = 0.0;
        this.__hdrTint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;
        this.type = 'FLOAT';
        if (filepath) {
            this.load(filepath);
        }
    }
    /**
     * The __decodeData method.
     * @param entries - The entries value.
     * @private
     */
    __decodeData(entries) {
        return new Promise((resolve, reject) => {
            const ldr = entries.ldr;
            const cdm = entries.cdm;
            // ///////////////////////////////
            // Parse the data.
            const blob = new Blob([ldr.buffer]);
            const ldrPic = new Image();
            ldrPic.onload = () => {
                this.width = ldrPic.width;
                this.height = ldrPic.height;
                // console.log(resourcePath + ": [" + this.width + ", " + this.height + "]");
                this.__data = {
                    ldr: ldrPic,
                    cdm: cdm,
                };
                if (!this.loaded) {
                    this.loaded = true;
                    this.emit('loaded');
                }
                else {
                    this.emit('updated');
                }
                resolve();
            };
            ldrPic.src = URL.createObjectURL(blob);
        });
    }
    /**
     * Loads a vlh file given a URL.
     * @param url - The URL of the vlh file to load
     * @return - Returns a promise that resolves once the initial load is complete
     */
    load(url) {
        this.loaded = false;
        return new Promise((resolve, reject) => {
            const filename = url.lastIndexOf('/') > -1 ? url.substring(url.lastIndexOf('/') + 1) : '';
            const stem = filename.substring(0, filename.lastIndexOf('.'));
            if (this.getName() == '') {
                this.setName(stem);
            }
            this.type = 'FLOAT';
            resourceLoader.loadFile('archive', url).then((entries) => {
                if (!entries.ldr || !entries.cdm) {
                    for (const name in entries) {
                        if (name.endsWith('.jpg')) {
                            entries.ldr = entries[name];
                            delete entries[name];
                        }
                        else if (name.endsWith('.bin')) {
                            entries.cdm = entries[name];
                            delete entries[name];
                        }
                    }
                }
                this.__decodeData(entries).then(() => {
                    resolve();
                });
            }, (error) => {
                this.emit('error', error);
                reject(error);
            });
        });
    }
    /**
     * Returns if the data is a stream or not.
     *
     * @return - The return value.
     */
    isStream() {
        return false;
    }
    /**
     * Returns all parameters and class state values.
     *
     * @return - The return value.
     */
    getParams() {
        const params = super.getParams();
        if (this.loaded) {
            params['data'] = this.__data;
            params['exposure'] = this.__exposure;
        }
        return params;
    }
    /**
     * The setHDRTint method.
     * @private
     * @param hdrTint - The hdrTint value.
     */
    setHDRTint(hdrTint) {
        this.__hdrTint = hdrTint;
    }
    /**
     * The getHDRTint method.
     * @private
     * @return - The return value.
     */
    getHDRTint() {
        return this.__hdrTint;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     */
    toJSON(context) {
        return {};
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json, context) {
        return {};
    }
    /**
     * Sets state of current Image using a binary reader object, and adds it to the resource loader.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        // super.readBinary(reader, context);
        this.setName(reader.loadStr());
        let url = reader.loadStr();
        if (typeof url === 'string' && url != '') {
            this.load(url);
        }
    }
}
Registry.register('VLHImage', VLHImage);
export { VLHImage };
//# sourceMappingURL=VLHImage.js.map