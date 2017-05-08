import Signal from '../Math/Signal';
import RefCounted from './RefCounted.js';

class Image2D extends RefCounted {
    constructor(params={}) {
        super();
        this.width = 'width' in params ? params['width'] : 0;
        this.height = 'height' in params ? params['height'] : 0;
        this.channels = 'channels' in params ? params['channels'] : "RGBA";
        this.format = 'format' in params ? params['format'] : "UNSIGNED_BYTE";
        this.filter = 'filter' in params ? params['filter'] : "LINEAR";
        this.wrap = 'wrap' in params ? params['wrap'] : "CLAMP_TO_EDGE";
        this.flipY = 'flipY' in params ? params['flipY'] : true;
        this.mipMapped = false;
        
        this.updated = new Signal();
    }

    isLoaded() {
        return true;
    }

    getParams(){
        return {
            format: this.format,
            channels: this.channels,
            width:this.width,
            height:this.height,
            wrap:this.wrap,
            mipMapped:this.mipMapped
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