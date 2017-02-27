import {
    Vec2,
    Signal
} from '../Math/Math.js';

import {
    Image2D
} from './Image2D.js';

import {
    loadBinfile
} from './Utils.js';

import {
    parseHdr
} from '../external/parse-hdr.js';

#ifdef BUILD_RELEASE
import {
    Unpack
} from '../external/Unpack.js';
#endif

class HDRImage2D extends Image2D {
    constructor(name, url) {
        super();

        this.__name = name;
        this.__url = url;

        this.channels = 'RGB';
        this.format = 'FLOAT';

        this.loaded = new Signal();

        this.__loaded = false;
        if(url){
            this.loadURL(url);
        }
    }

    loadURL(fileUrl) {

        loadBinfile(
            fileUrl,
            (path, data) => {
                let start = performance.now();

                /////////////////////////////////
                // Un-pack the data.
                let unpack = new Unpack(data);
                let entries = unpack.getEntries();
                let ldrEntry = (entries[0].name.endsWith('.jpg') ? entries[0] : (entries[1].name.endsWith('.jpg') ? entries[1] : undefined));
                let cdmEntry = (entries[0].name.endsWith('.packed') ? entries[0] : (entries[1].name.endsWith('.packed') ? entries[1] : undefined));
                if (!ldrEntry || !cdmEntry)
                    throw ("Invalid HDR resource");
                let ldr = unpack.decompress(ldrEntry.name);
                let cdmPacked = unpack.decompress(cdmEntry.name);
                if (!ldr || !cdmPacked)
                    throw ("Invalid HDR resource");
                unpack.close();


                let unpackCDM = new Unpack(cdmPacked);
                let cdm = unpackCDM.decompress(unpack.getEntries()[0]);

                let unpacked = performance.now();

                /////////////////////////////////
                // Parse the data.

                this.__cdm = cdm;
                let blob = new Blob([ldr.buffer]);
                let _this = this;
                this.__ldrPic = new Image();
                this.__ldrPic.onload = function () {
                    _this.width =  _this.__ldrPic.width;
                    _this.height =  _this.__ldrPic.height;
                    _this.__loaded = true;
                    _this.loaded.emit();
                    console.log(path+ " width:"+_this.width + " height:" +_this.height + " Unpack:" + (unpacked - start).toFixed(2) + " Parse:" + (performance.now() - unpacked).toFixed(2));
                }
                this.__ldrPic.src= URL.createObjectURL(blob);

            },
            () => {

            },
            this);
    }

    isLoaded() {
        return this.__loaded;
    }

    getData(){
        return this.__hdrInfo.data;
    }

    getParams(){
        let params = super.getParams();
        if(this.__loaded){
            params.ldr = this.__ldrPic;
            params.cdm = this.__cdm;
        }
        return params;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }
};

export {
    HDRImage2D
};

