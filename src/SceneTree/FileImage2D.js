import {
    Signal,
    Async,
    Vec4,
    Color
} from '../Math';
import {
    loadBinfile
} from './Utils.js';
import {
    sgFactory
} from './SGFactory.js';
import {
    Image2D
} from './Image2D.js';
import {
    Image2D
} from './Image2D.js';

import {
    GIF
} from '../external/gifuct-js.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    ParameterSet
} from './Parameters';

// let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class FileImage2D extends Image2D {
    constructor(resourcePath, resourceLoader, params = {}) {
        super(params);

        this.__resourceLoader = resourceLoader;
        this.__loaded = false;
        this.__hdrexposure = 1.0;
        this.__hdrtint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;

        if (resourcePath && resourcePath != '')
            this.loadResource(resourcePath);
    }

    getName() {
        if (!this.__resourcePath || this.__resourcePath == '')
            return "FileImageNoResource";
        let getName = (str) => {
            let p = str.split('/');
            let last = p[p.length - 1];
            let suffixSt = last.lastIndexOf('.');
            if (suffixSt != -1) {
                let decorator = last.substring(suffixSt - 1, suffixSt);
                if (!isNaN(decorator)) {
                    // Note: ALL image names have an LOD specifier at the end.
                    // remove that off when retrieving the name.
                    return last.substring(0, suffixSt - 1);
                } else {
                    return last.substring(0, suffixSt);
                }
            }
        }
        return getName(this.__resourcePath);
    }

    get resourcePath() {
        return this.__resourcePath;
    }

    loadResource(resourcePath) {
        if (!this.__resourceLoader.resourceAvailable(resourcePath)) {
            throw ("Resource unavailable:" + resourcePath);
            return;
        }

        let getExt = (str) => {
            let p = str.split('/');
            let last = p[p.length - 1];
            let suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(suffixSt).toLowerCase()
        }
        let ext = getExt(resourcePath);
        if (ext == '.jpg' || ext == '.png') {
            this.__loadLDRImage(resourcePath, ext);
        } else if (ext == '.mp4' || ext == '.ogg') {
            this.__loadLDRVideo(resourcePath);
        } else if (ext == '.ldralpha') {
            this.__loadLDRAlpha(resourcePath);
        } else if (ext == '.vlh') {
            this.__loadVLH(resourcePath);
        } else if (ext == '.gif') {
            this.__loadGIF(resourcePath);
        } else {
            throw ("Unsupported file type. Check the ext:" + resourcePath);
        }
        this.__resourcePath = resourcePath;
    }

    __loadLDRImage(resourcePath, ext) {
        if (ext == '.jpg') {
            this.channels = 'RGB';
        } else if (ext == '.png') {
            this.channels = 'RGBA';
        }
        this.format = 'UNSIGNED_BYTE';
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
        this.channels = 'RGB';
        this.format = 'UNSIGNED_BYTE';
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
        this.format = 'FLOAT';

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


    __loadGIF(resourcePath) {

        this.channels = 'RGBA';
        this.format = 'UNSIGNED_BYTE';
        this.__streamAtlas = true;

        // this.__streamAtlasDesc = new Vec4();
        this.addParameter(new Vec4Parameter('StreamAtlasDesc', new Vec4()));
        this.addParameter(new NumberParameter('StreamAtlasIndex', 0));
        this.getParameter('StreamAtlasIndex').setRange([0, 1]);
        

        let url = this.__resourceLoader.resolveURL(resourcePath);
        this.__resourceLoader.addWork(resourcePath, 1);

        loadBinfile(url, (data) => {

            // Decompressing using: https://github.com/matt-way/gifuct-js
            let gif = new GIF(data);
            let frames = gif.decompressFrames(true);
            // do something with the frame data


            let sideLength = Math.sqrt(frames.length);
            let atlasSize = new Visualive.Vec2(sideLength, sideLength);
            if(Math.fract(sideLength) > 0.0) {
                atlasSize.x = Math.floor(atlasSize.x + 1);
                if(Math.fract(sideLength) > 0.5) {
                    atlasSize.y = Math.floor(atlasSize.y + 1);
                }
                else{
                    atlasSize.y = Math.floor(atlasSize.y);
                }
            }


            let width = frames[0].dims.width;
            let height = frames[0].dims.height;

            // gif patch canvas
            let tempCanvas = document.createElement('canvas');
            let tempCtx = tempCanvas.getContext('2d');
            // full gif canvas
            let gifCanvas = document.createElement('canvas');
            let gifCtx = gifCanvas.getContext('2d');

            gifCanvas.width = width;
            gifCanvas.height = height;

            // The atlas for all the frames.
            let atlasCanvas = document.createElement('canvas');
            let atlasCtx = atlasCanvas.getContext('2d');
            atlasCanvas.width = atlasSize.x * width;
            atlasCanvas.height = atlasSize.y * height;

            let frameImageData;
            let renderFrame = (frame, index)=>{
                var dims = frame.dims;
                
                if(!frameImageData || dims.width != frameImageData.width || dims.height != frameImageData.height){
                    tempCanvas.width = dims.width;
                    tempCanvas.height = dims.height;
                    frameImageData = tempCtx.createImageData(dims.width, dims.height);  
                }
                
                // set the patch data as an override
                frameImageData.data.set(frame.patch);

                // draw the patch back over the canvas
                tempCtx.putImageData(frameImageData, 0, 0);
                gifCtx.drawImage(tempCanvas, dims.left, dims.top);
                atlasCtx.drawImage(gifCanvas, (index%atlasSize.x) * width, Math.floor(index/atlasSize.x) * height);
            }

            for(let i =0; i<frames.length; i++) {
                // console.log(frame);
                renderFrame(frames[i], i);
            }

            this.width = atlasCanvas.width;
            this.height = atlasCanvas.height;

            // this.__streamAtlasDesc.x = atlasSize.x;
            // this.__streamAtlasDesc.y = atlasSize.y;
            // this.__streamAtlasDesc.z = frames.length;
            this.getParameter('StreamAtlasDesc').setValue(new Vec4(atlasSize.x, atlasSize.y, 0, 0));
            this.getParameter('StreamAtlasIndex').setRange([0, frames.length]);

            this.__data = atlasCtx.getImageData(0, 0, atlasCanvas.width, atlasCanvas.height);;
            this.__loaded = true;
            this.__resourceLoader.addWorkDone(resourcePath, 1);
            this.loaded.emit();

        }, (statusText) => {
            console.warn("Unable to Load URL:"+ req.url);
        });

    }

    getResourcePath() {
        return this.__resourcePath;
    }

    isStream() {
        return false;
    }

    isLoaded() {
        return this.__loaded;
    }

    getParams() {
        let params = super.getParams();
        if (this.__loaded) {
            params['data'] = this.__data;
        }
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
                if (suffixSt != -1) {
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