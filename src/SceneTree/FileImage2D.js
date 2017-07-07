import {
    Signal,
    Async,
    Color
} from '../Math';
import {
    sgFactory
} from './SGFactory.js';
import {
    Image2D
} from './Image2D.js';

// let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class FileImage2D extends Image2D {
    constructor(resourcePath, resourceLoader, params = {}) {
        super(params);

        this.__resourceLoader = resourceLoader;
        this.__isHDR = false;
        this.__hasAlpha = false;
        this.__loaded = false;
        this.__hdrexposure = 1.0;
        this.__hdrtint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;

        this.loaded = new Signal();

        if (resourcePath && resourcePath != '')
            this.loadResource(resourcePath);
    }

    getName(){
        let getName = (str) => {
            let p = str.split('/');
            let last = p[p.length - 1];
            let suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(0, suffixSt)
        }
        return getName(this.__resourcePath);
    }

    get resourcePath() {
        return this.__resourcePath;
    }

    loadResource(resourcePath) {
        if (!this.__resourceLoader.resourceAvailable(resourcePath)) {
            console.error("Resource unavailable:" + resourcePath);
            return;
        }

        let getExt = (str) => {
            let p = str.split('/');
            let last = p[p.length - 1];
            let suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(suffixSt)
        }
        let ext = getExt(resourcePath);
        if (ext == '.jpg' || ext == '.png') {
            this.__loadLDRImage(resourcePath);
        } else if (ext == '.mp4' || ext == '.ogg') {
            this.__loadLDRVideo(resourcePath);
        } else if (ext == '.ldralpha') {
            this.__hasAlpha = true;
            this.__loadLDRAlpha(resourcePath);
        } else if (ext == '.vlh') {
            this.__isHDR = true;
            this.__loadVLH(resourcePath);
        } else {
            throw ("Unsupported file type. Check the ext:" + resourcePath);
        }
        this.__resourcePath = resourcePath;
    }

    __loadLDRImage(resourcePath) {
        this.__resourceLoader.addWork(resourcePath, 1);

        let domElement = new Image();
        domElement.crossOrigin = 'anonymous';
        domElement.onload = () => {
            this.width = domElement.width;
            this.height = domElement.height;
            this.__data = domElement;
            this.__loaded = true;
            this.__resourceLoader.addWorkDone(resourcePath, 1);
            this.loaded.emit();
        };
        domElement.src = this.__resourceLoader.resolveURL(resourcePath);
    }

    __loadLDRVideo(resourcePath) {
        this.__resourceLoader.addWork(resourcePath, 1);

        let domElement = document.createElement('video');
        // TODO - confirm its necessary to add to DOM
        domElement.style.display = 'none';
        domElement.preload = 'auto';
        domElement.crossOrigin = 'anonymous';
        // domElement.crossorigin = true;
        document.body.appendChild(domElement);
        domElement.addEventListener('loadedmetadata', () => {
            // domElement.play();
            this.width = domElement.videoHeight;
            this.height = domElement.videoWidth;
            this.__data = domElement;
            this.__loaded = true;
            this.__resourceLoader.addWorkDone(resourcePath, 1);
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
        domElement.src = this.__resourceLoader.resolveURL(resourcePath);
        //domElement.load();
        domElement.play();
    }

    // __loadLDRAlpha(resourcePath) {
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
    //         name: resourcePath,
    //         url
    //     });
    // }

    __loadVLH(resourcePath) {
        this.__resourceLoader.loadResource(resourcePath, (entries) => {
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
                console.log(resourcePath + ": [" + this.width + ", " + this.height + "]");
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

    getResourcePath() {
        return this.__resourcePath;
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

    setHDRExposure(hdrexposure) {
        this.__hdrexposure = hdrexposure;
    }
    getHDRExposure() {
        return this.__hdrexposure;
    }
    setHDRTint(hdrtint) {
        this.__hdrtint = hdrtint;
    }
    getHDRTint() {
        return this.__hdrtint;
    }

    fromJSON(json) {

    }

    toJSON(json) {

    }

    readBinary(reader, flags, lod) {
        // super.readBinary(reader, flags);
        this.name = reader.loadStr();
        let resourcePath = reader.loadStr();
        if (typeof resourcePath === 'string' && resourcePath != "") {
            if (lod >= 0) {
                let suffixSt = resourcePath.lastIndexOf('.')
                if (suffixSt != -1){
                    let lodPath = resourcePath.substring(0, suffixSt) + lod + resourcePath.substring(suffixSt);
                    if (this.__resourceLoader.resourceAvailable(lodPath)) {
                        resourcePath = lodPath;
                    }
                }
            }
            this.loadResource(resourcePath);
            
        }
    }
};

sgFactory.registerClass('FileImage2D', FileImage2D);
sgFactory.registerClass('FileImage', FileImage2D);


export {
    FileImage2D
};
//export default FileImage2D;