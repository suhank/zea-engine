import {
    Signal,
    Async
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    Image2D
} from './Image2D.js';

// let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class DataImage2D extends Image2D {
    constructor(name) {
        super();

        this.__name = name;
        this.channels = 'RGBA';
        this.format = 'UNSIGNED_BYTE';
        this.__loaded = false;

        this.__data = new Uint8Array(4);
        this.width = 1;
        this.height = 1;
    }
    
    getName() {
        return this.__name;
    }

    isStream() {
        return false;
    }

    setData(width, height, data){
        this.width = width;
        this.height = height;
        this.__data = data;
        this.updated.emit();
    }

    getParams() {
        let params = super.getParams();
        params['data'] = this.__data;
        return params;
    }
};

sgFactory.registerClass('DataImage2D', DataImage2D);


export {
    DataImage2D
};