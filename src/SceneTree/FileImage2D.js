
import {
    Signal
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    Image2D
} from './Image2D.js';

let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class FileImage2D extends Image2D {
    constructor(name, url) {
        super();

        this.__name = name;
        this.__url = url ? url : name;
        this.__isHDR = false;
        this.__loaded = false;

        this.loaded = new Signal();
        if(url.endsWith('.jpg') || url.endsWith('.png')) {
            domElement = new Image();
            domElement.onload = () => {
                this.width = domElement.width;
                this.height = domElement.height;
                this.__data = domElement;
                this.__loaded = true;
                this.loaded.emit();
            };
            domElement.src = this.__url;
        }
        else if(url.endsWith('.mp4') || url.endsWith('.ogg')) {

            let domElement = document.createElement('video');
            // TODO - confirm its necessary to add to DOM
            domElement.style.display = 'none';
            domElement.preload = 'auto';
            // domElement.crossorigin = true;
            document.body.appendChild(domElement);
            domElement.addEventListener('loadedmetadata', () => {
                // domElement.play();
                this.width = domElement.videoHeight;
                this.height = domElement.videoWidth;
                this.__data = domElement;
                this.__loaded = true;
                this.loaded.emit(domElement);

                let timerCallback = () => {
                    if (domElement.paused || domElement.ended) {
                        return;
                    }
                    this.updated.emit(domElement);
                    setTimeout(timerCallback, 0);
                };
                timerCallback();

            }, false);
            domElement.src = url;
            //domElement.load();
            domElement.play();
        }
        else if(url.endsWith('.vlh')){
            this.__isHDR = true;
            this.__loadVLH(url);
        }
        else if(url.endsWith('.hdr')) {

        }
        else{
            throw("Unsupported file type:" + url);
        }
    }

    __loadVLH(url) {
        let worker = new ResourceLoaderWorker();
        worker.onmessage = (event) => {
            let data = event.data;
            let ldr, cdm;
            for(let name in data.entries){
                if(name.endsWith('.jpg'))
                    ldr = data.entries[name];
                else if(name.endsWith('.bin'))
                    cdm = data.entries[name];
            }

            /////////////////////////////////
            // Parse the data.
            let blob = new Blob([ldr.buffer]);
            let ldrPic = new Image();
            ldrPic.onload = () => {
                this.width = ldrPic.width;
                this.height = ldrPic.height;
                this.__data = {
                    'ldr': ldrPic,
                    'cdm': cdm
                }
                if(!this.__loaded){
                    this.__loaded = true;
                    this.loaded.emit();
                }
                else{
                    this.updated.emit();
                }
            }
            ldrPic.src = URL.createObjectURL(blob);
            worker.terminate();
        };
        worker.postMessage({
            name: this.__name,
            url
        });

    }

    getName(){
        return this.__name;
    }

    getUrl(){
        return this.__url;
    }

    isHDR(){
        return this.__isHDR;
    }
    
    isStream(){
        return false;
    }

    isLoaded() {
        return this.__loaded;
    }

    getParams(){
        let params = super.getParams();
        if(this.__loaded)
            params['data'] = this.__data;
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