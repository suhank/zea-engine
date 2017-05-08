import { Signal } from '../Math/Signal';
import { Image2D } from './Image2D.js';

import {
    loadBinfile
} from './Utils.js';

class HDRImage2D extends Image2D {
    constructor(name, url, isStream) {
        super({
            format: 'FLOAT',
            channels: 'RGB'
        });

        this.__name = name;
        this.__url = url;
        this.__stream = isStream;
        this.__loaded = false;
        this.__data = {};

        this.loaded = new Signal();
        this.updated = new Signal();

        if(url){
            this.loadURL(url);
        }
    }

    isLoaded() {
        return this.__loaded;
    }

    isStream() {
        return this.__stream;
    }
    
    loadURL(fileUrl) {
        if(fileUrl in this.__data){
            this.__currKey = fileUrl;
            this.updated.emit();
            return;
        }

        loadBinfile(
            fileUrl,
            (path, data) => {
                let start = performance.now();

                /////////////////////////////////
                // Un-pack the data.
                let unpack = new Unpack(data);
                let entries = unpack.getEntries();
                let ldrEntry = (entries[0].name.endsWith('.jpg') ? entries[0] : (entries[1].name.endsWith('.jpg') ? entries[1] : undefined));
                let cdmEntry = entries[0].name.endsWith('.jpg') ? entries[1] : entries[0];
                let cdm;
                if(cdmEntry && cdmEntry.name.endsWith('.packed')){
                    let cdmPacked = unpack.decompress(cdmEntry.name);
                    let unpackCDM = new Unpack(cdmPacked.buffer);
                    cdm = unpackCDM.decompress(unpackCDM.getEntries()[0].name);
                    unpackCDM.close();
                }
                else{
                    cdmEntry = (entries[0].name.endsWith('.bin') ? entries[0] : (entries[1].name.endsWith('.bin') ? entries[1] : undefined));
                    cdm = unpack.decompress(cdmEntry.name);
                }
                if (!ldrEntry || !cdm)
                    throw ("Invalid VLH file");
                let ldr = unpack.decompress(ldrEntry.name);
                unpack.close();

                let unpacked = performance.now();

                /////////////////////////////////
                // Parse the data.
                let blob = new Blob([ldr.buffer]);
                let _this = this;
                let ldrPic = new Image();
                ldrPic.onload = function () {
                    _this.__setLoadedData(fileUrl, ldrPic, cdm);
                    console.log(path+ " width:"+_this.width + " height:" +_this.height + " Unpack:" + (unpacked - start).toFixed(2) + " Parse:" + (performance.now() - unpacked).toFixed(2));
                }
                ldrPic.src = URL.createObjectURL(blob);

            },
            () => {

            },
            this);
    }

    __setLoadedData(fileUrl, ldr, cdm) {
        this.width =  ldr.width;
        this.height =  ldr.height;
        this.__data[fileUrl] = {
            'ldr': ldr,
            'cdm': cdm
        }
        this.__currKey = fileUrl;
        if(!this.__loaded){
            this.__loaded = true;
            this.loaded.emit();
        }
        else{
            this.updated.emit();
        }

        return this.__loaded;
    }


    getData(){
        return this.__hdrInfo.data;
    }

    getParams(){
        let params = super.getParams();
        if(this.__loaded){
            params.key = this.__currKey;
            params.ldr = this.__data[this.__currKey].ldr;
            params.cdm = this.__data[this.__currKey].cdm;
        }
        return params;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }
};

// export default HDRImage2D;
export {
    HDRImage2D
};
