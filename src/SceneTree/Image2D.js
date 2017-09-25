import {
    Vec4,
    Signal
} from '../Math';
import {
    BaseItem
} from './BaseItem.js';

import {
    Parameter,
    NumberParameter,
    ParameterSet
} from './Parameters';

class Image2D extends BaseItem {
    constructor(params = {}) {
        super();
        this.width = 0;
        this.height = 0;
        this.channels = 'RGB';
        this.format = 'UNSIGNED_BYTE';
        this.filter = 'filter' in params ? params['filter'] : "LINEAR";
        this.wrap = 'wrap' in params ? params['wrap'] : "CLAMP_TO_EDGE";
        this.flipY = 'flipY' in params ? params['flipY'] : true;
        this.__mapping = 'mapping' in params ? params['mapping'] : 'uv';

        this.mipMapped = false;

        this.updated = new Signal();
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
            format: this.format,
            channels: this.channels,
            width: this.width,
            height: this.height,
            wrap: this.wrap,
            flipY: this.flipY,
            mipMapped: this.mipMapped
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
    Image2D
};
//export default Image2D;