import {
    Vec4
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    BaseItem
} from './BaseItem.js';

import {
    Parameter,
    NumberParameter,
    ParameterSet
} from './Parameters';

class BaseImage extends BaseItem {
    constructor(params = {}) {
        super();
        this.width = 0;
        this.height = 0;
        this.format = 'RGB';
        this.type = 'UNSIGNED_BYTE';
        this.filter = 'filter' in params ? params['filter'] : "LINEAR";
        this.wrap = 'wrap' in params ? params['wrap'] : "CLAMP_TO_EDGE";
        this.flipY = 'flipY' in params ? params['flipY'] : true;
        this.__mapping = 'mapping' in params ? params['mapping'] : 'uv';

        this.mipMapped = false;

        // Used to create alpha mapped images from black and white.
        this.flags = 0;

        this.updated = new Signal();

        // Note: many parts of the code assume a 'loaded' signal.
        // We should probably deprecate and use only 'updated'.
        this.loaded = new Signal(true);
    }

    isLoaded() {
        return true;
    }

    getMapping() {
        return this.__mapping;
    }

    setMapping(mapping) {
        this.__mapping = mapping;
    }

    isStream() {
        return false;
    }

    isStreamAtlas() {
        return this.__streamAtlas;
    }

    // getStreamAtlasImageDesc() {
    //     return this.__streamAtlasDesc;
    // }

    // getStreamAtlasImageIndex() {
    //     return this.__streamAtlasImageIndex;
    // }

    // setStreamAtlasImageIndex(index) {
    //     this.__streamAtlasImageIndex = index;
    //     this.streamAtlasImageIndexChanged.emit(this.__streamAtlasImageIndex);
    // }

    getParams() {
        return {
            type: this.type,
            format: this.format,
            width: this.width,
            height: this.height,
            wrap: this.wrap,
            flipY: this.flipY,
            mipMapped: this.mipMapped,
            flags: this.flags
        }
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }

};

export {
    BaseImage
};