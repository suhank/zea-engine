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
        this.__isHDR = false;
        this.__hasAlpha = false;
        this.__loaded = false;
    }
    getName() {
        return this.__name;
    }
    isHDR() {
        return this.__isHDR;
    }

    hasAlpha() {
        return this.__hasAlpha;
    }
    isStream() {
        return false;
    }

    setData(data){
        this.__data = data;
        this.updated.emit();
    }
    getParams() {
        let params = super.getParams();
        if (this.__loaded)
            params['data'] = this.__data;
        return params;
    }
};

sgFactory.registerClass('DataImage2D', DataImage2D);


export {
    DataImage2D
};