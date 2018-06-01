import {
    Vec4,
    Color
} from '../Math';
import {
    Async,
    Signal
} from '../Utilities';
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
    resourceLoader
} from './ResourceLoader.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    FilePathParameter,
    ParameterSet
} from './Parameters';

const imageDataLibrary = {

};


class FileImage2D extends Image2D {
    constructor(resourcePath, params = {}) {
        super(params);
        
        this.__loaded = false;
        this.__hdrexposure = 1.0;
        this.__hdrtint = new Color(1, 1, 1, 1);
        this.__stream = 'stream' in params ? params['stream'] : false;

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(()=>{
            this.loaded.untoggle();
            const filePath = fileParam.getValue()
            const url = fileParam.getURL();
            this.__loadURL(url, filePath);
        });
        if (resourcePath && resourcePath != '')
            fileParam.setValue(resourcePath);
    }

    getName() {
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
        return getName(this.getParameter('FilePath').getValue());
    }

    __loadURL(url, resourcePath) {

        let getExt = (str) => {
            let p = str.split('/');
            let last = p[p.length - 1];
            let suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(suffixSt).toLowerCase()
        }
        let ext = getExt(resourcePath);
        if (ext == '.jpg' || ext == '.png' || ext == '.webp') {
            this.__loadLDRImage(url, resourcePath, ext);
        } else if (ext == '.mp4' || ext == '.ogg') {
            this.__loadLDRVideo(url, resourcePath);
        // } else if (ext == '.ldralpha') {
        //     this.__loadLDRAlpha(url, resourcePath);
        } else if (ext == '.vlh') {
            this.__loadVLH(url, resourcePath);
        } else if (ext == '.gif') {
            this.__loadGIF(url, resourcePath);
        } else {
            throw ("Unsupported file type. Check the ext:" + resourcePath);
        }
    }

    __loadLDRImage(url, resourcePath, ext) {
        if (ext == '.jpg') {
            this.channels = 'RGB';
        } else if (ext == '.png') {
            this.channels = 'RGBA';
        }
        this.format = 'UNSIGNED_BYTE';

        let domElement;
        const loaded = () => {
            this.width = domElement.width;
            this.height = domElement.height;
            this.__data = domElement;
            this.__loaded = true;
            this.loaded.emit();
        };
        if(resourcePath in imageDataLibrary) {
            domElement = imageDataLibrary[resourcePath];
            if(domElement.complete) {
                loaded()
            }
            else {
                domElement.addEventListener("load", loaded);
            }
        }
        else {
            resourceLoader.addWork(resourcePath, 1);
            domElement = new Image();
            domElement.crossOrigin = 'anonymous';
            domElement.src = resourceLoader.resolveURL(resourcePath);

            domElement.addEventListener("load", loaded);
            domElement.addEventListener("load", () => {
                resourceLoader.addWorkDone(resourcePath, 1);
            });
            imageDataLibrary[resourcePath] = domElement;
        }
    }

    __loadLDRVideo(url, resourcePath) {
        this.channels = 'RGB';
        this.format = 'UNSIGNED_BYTE';
        resourceLoader.addWork(resourcePath, 1);

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
            resourceLoader.addWorkDone(resourcePath, 1);
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
        domElement.src = resourceLoader.resolveURL(resourcePath);
        //domElement.load();
        const promise = domElement.play();
        if (promise !== undefined) {
          promise.then(_ => {
            console.log("Autoplay started!")
            // Autoplay started!
          }).catch(error => {
            console.log("Autoplay was prevented.")
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
        }
    }

    // __loadLDRAlpha(url, resourcePath) {
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

    __loadVLH(url, resourcePath) {
        this.format = 'FLOAT';

        resourceLoader.loadResource(resourcePath, (entries) => {
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
                // console.log(resourcePath + ": [" + this.width + ", " + this.height + "]");
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


    __loadGIF(url, resourcePath) {

        this.channels = 'RGBA';
        this.format = 'UNSIGNED_BYTE';
        this.__streamAtlas = true;

        // this.__streamAtlasDesc = new Vec4();
        this.addParameter(new Vec4Parameter('StreamAtlasDesc', new Vec4()));
        this.addParameter(new NumberParameter('StreamAtlasIndex', 0));
        this.getParameter('StreamAtlasIndex').setRange([0, 1]);

        let resourcePromise;
        if(resourcePath in imageDataLibrary) {
            resourcePromise = imageDataLibrary[resourcePath];
        }
        else {
            const resourceLoader = resourceLoader;
            resourcePromise = new Promise((resolve, reject) => {

                const url = resourceLoader.resolveURL(resourcePath);
                resourceLoader.addWork(resourcePath, 1);

                loadBinfile(url, (data) => {

                    // Decompressing using: https://github.com/matt-way/gifuct-js
                    const gif = new GIF(data);
                    const frames = gif.decompressFrames(true);
                    // do something with the frame data


                    const sideLength = Math.sqrt(frames.length);
                    const atlasSize = new Visualive.Vec2(sideLength, sideLength);
                    if(Math.fract(sideLength) > 0.0) {
                        atlasSize.x = Math.floor(atlasSize.x + 1);
                        if(Math.fract(sideLength) > 0.5) {
                            atlasSize.y = Math.floor(atlasSize.y + 1);
                        }
                        else{
                            atlasSize.y = Math.floor(atlasSize.y);
                        }
                    }


                    const width = frames[0].dims.width;
                    const height = frames[0].dims.height;

                    // gif patch canvas
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    // full gif canvas
                    const gifCanvas = document.createElement('canvas');
                    const gifCtx = gifCanvas.getContext('2d');

                    gifCanvas.width = width;
                    gifCanvas.height = height;

                    // The atlas for all the frames.
                    const atlasCanvas = document.createElement('canvas');
                    const atlasCtx = atlasCanvas.getContext('2d');
                    atlasCanvas.width = atlasSize.x * width;
                    atlasCanvas.height = atlasSize.y * height;

                    let frameImageData;
                    const renderFrame = (frame, index)=>{
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
                    resourceLoader.addWorkDone(resourcePath, 1);

                    const imageData = atlasCtx.getImageData(0, 0, atlasCanvas.width, atlasCanvas.height);
                    resolve({width:atlasCanvas.width, height:atlasCanvas.height, atlasSize, frameRange:[0, frames.length], imageData });

                }, (statusText) => {
                    console.warn("Unable to Load URL:"+ req.url);
                    reject();
                });
            });

            imageDataLibrary[resourcePath] = resourcePromise;
        }

        resourcePromise.then((unpackedData)=>{

            this.width = unpackedData.width;
            this.height = unpackedData.height;

            // this.__streamAtlasDesc.x = atlasSize.x;
            // this.__streamAtlasDesc.y = atlasSize.y;
            // this.__streamAtlasDesc.z = frames.length;
            this.getParameter('StreamAtlasDesc').setValue(new Vec4(unpackedData.atlasSize.x, unpackedData.atlasSize.y, 0, 0));
            this.getParameter('StreamAtlasIndex').setRange(unpackedData.frameRange);

            this.__data = unpackedData.imageData;
            this.__loaded = true;

            this.loaded.emit();
        });
    }

    getResourcePath() {
        return this.getParameter('FilePath').getValue();
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
        this.setName(reader.loadStr());
        let resourcePath = reader.loadStr();
        if (typeof resourcePath === 'string' && resourcePath != "") {
            if (lod >= 0) {
                const suffixSt = resourcePath.lastIndexOf('.')
                if (suffixSt != -1) {
                    const lodPath = resourcePath.substring(0, suffixSt) + lod + resourcePath.substring(suffixSt);
                    if (resourceLoader.resourceAvailable(lodPath)) {
                        resourcePath = lodPath;
                    }
                }
            }
            this.getParameter('FilePath').setValue(resourcePath);

        }
    }
};

sgFactory.registerClass('FileImage2D', FileImage2D);
sgFactory.registerClass('FileImage', FileImage2D);


export {
    FileImage2D
};
//export default FileImage2D;