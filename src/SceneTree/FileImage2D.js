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

class FileImage2D extends Image2D {
    constructor(name, resourceLoader) {
        super();

        this.__name = name;
        this.__resourceLoader = resourceLoader;
        this.__isHDR = false;
        this.__hasAlpha = false;
        this.__loaded = false;

        this.loaded = new Signal();

        if (this.__resourceLoader.resourceAvailable(name)){
            this.loadResource(name);
        }
    }

    loadResource(resourceName) {
        this.loadURL(this.__resourceLoader.resolveURL(resourceName));
    }
    
    loadURL(url) {
        let getExt = (str)=>{
            let p = str.split('/');
            let last = p[p.length-1];
            let suffixSt = last.indexOf('.')
            if(suffixSt != -1)
                return last.substring(suffixSt)
        }
        let ext = getExt(this.__name);
        if (ext == '.jpg' || ext == '.png') {
            this.__loadLDRImage(url);
        } else if (ext == '.mp4' || ext == '.ogg') {
            this.__loadLDRVideo(url);
        } else if (ext == '.ldralpha') {
            this.__hasAlpha = true;
            this.__loadLDRAlpha(url);
        } else if (ext == '.vlh') {
            this.__isHDR = true;
            this.__loadVLH(url);
        } else {
            throw ("Unsupported file type:" + url);
        }
    }

    __loadLDRImage(url) {

        let domElement = new Image();
        domElement.crossOrigin='anonymous';
        domElement.onload = () => {
            this.width = domElement.width;
            this.height = domElement.height;
            this.__data = domElement;
            this.__loaded = true;
            this.loaded.emit();
        };
        domElement.src = this.__url;
    }

    __loadLDRVideo(url) {

        let domElement = document.createElement('video');
        // TODO - confirm its necessary to add to DOM
        domElement.style.display = 'none';
        domElement.preload = 'auto';
        domElement.crossOrigin='anonymous';
        // domElement.crossorigin = true;
        document.body.appendChild(domElement);
        domElement.addEventListener('loadedmetadata', () => {
            // domElement.play();
            this.width = domElement.videoHeight;
            this.height = domElement.videoWidth;
            this.__data = domElement;
            this.__loaded = true;
            this.loaded.emit(domElement);

            let prevFrame = 0;
            let frameRate = 29.97;
            let timerCallback = () => {
                if (domElement.paused || domElement.ended) {
                    return;
                }
                // Check to see if the video has progressed to the next frame. 
                // If so, then we emit and update, which will cause a redraw.
                let currentFrame = Math.floor(domElement.currentTime * frameRate);
                if (prevFrame != currentFrame) {
                    this.updated.emit();
                    prevFrame = currentFrame;
                }
                setTimeout(timerCallback, 20); // Sample at 50fps.
            };
            timerCallback();

        }, false);
        domElement.src = url;
        //domElement.load();
        domElement.play();
    }

    // __loadLDRAlpha(url) {
    //     let worker = new ResourceLoaderWorker();
    //     worker.onmessage = (event) => {
    //         worker.terminate();

    //         let data = event.data;
    //         let ldr, alpha;
    //         for (let name in data.entries) {
    //             if (name.endsWith('.jpg'))
    //                 ldr = data.entries[name];
    //             else if (name.endsWith('.png'))
    //                 alpha = data.entries[name];
    //         }

    //         /////////////////////////////////
    //         // Parse the data.
    //         let async = new Async();
    //         async.ready.connect(() => {
    //             this.width = ldrPic.width;
    //             this.height = ldrPic.height;
    //             this.__data = {
    //                 ldr: ldrPic,
    //                 alpha: alphaPic
    //             }
    //             if (!this.__loaded) {
    //                 this.__loaded = true;
    //                 this.loaded.emit();
    //             } else {
    //                 this.updated.emit();
    //             }
    //         });
    //         async.incAsyncCount(2);

    //         let ldrPic = new Image();
    //         ldrPic.onload = async.decAsyncCount;
    //         ldrPic.src = URL.createObjectURL(new Blob([ldr.buffer]));

    //         let alphaPic = new Image();
    //         alphaPic.onload = async.decAsyncCount;
    //         alphaPic.src = URL.createObjectURL(new Blob([alpha.buffer]));

    //     };
    //     worker.postMessage({
    //         name: this.__name,
    //         url
    //     });
    // }

    __loadVLH(url) {
        this.__resourceLoader.loadResource(this.__name, (entries)=>{
            let ldr, cdm;
            for (let name in entries) {
                if (name.endsWith('.jpg'))
                    ldr = entries[name];
                else if (name.endsWith('.bin'))
                    cdm = entries[name];
            }

            /////////////////////////////////
            // Parse the data.
            let blob = new Blob([ldr.buffer]);
            let ldrPic = new Image();
            ldrPic.onload = () => {
                this.width = ldrPic.width;
                this.height = ldrPic.height;
                this.__data = {
                    ldr: ldrPic,
                    cdm: cdm
                }
                if (!this.__loaded) {
                    this.__loaded = true;
                    this.loaded.emit();
                } else {
                    this.updated.emit();
                }
            }
            ldrPic.src = URL.createObjectURL(blob);
        });
    }

    getName() {
        return this.__name;
    }

    getUrl() {
        return this.__url;
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

    isLoaded() {
        return this.__loaded;
    }

    getParams() {
        let params = super.getParams();
        if (this.__loaded)
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
//export default FileImage2D;