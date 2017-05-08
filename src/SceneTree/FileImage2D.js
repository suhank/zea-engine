import { Signal } from '../Math/Signal';
import { sgFactory } from './SGFactory.js';
import { Image2D } from './Image2D.js';

class FileImage2D extends Image2D {
    constructor(name, url) {
        super();

        this.__name = name;
        this.__url = url ? url : name;

        let _this = this;
        this._image = new Image();
        this._image.onload = function() {
            _this.__onImageLoad();
        };
        this.__loaded = false;
        this._image.src = this.__url;
        this.loaded = new Signal();
    }

    getName(){
        return this.__name;
    }

    getUrl(){
        return this.__url;
    }

    isLoaded() {
        return this.__loaded;
    }

    getImage() {
        return this._image;
    }

    __onImageLoad(data) {
        this.width = this._image.width;
        this.height = this._image.height;
        this.__loaded = true;
        this.loaded.emit(this._image);
    };

    getParams(){
        let params = super.getParams();
        if(this.__loaded)
            params['data'] = this._image;
        return params;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }
};

sgFactory.registerClass('FileImage2D', FileImage2D);


export {
    FileImage2D
};
//export default FileImage2D;