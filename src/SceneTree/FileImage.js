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
    BaseImage
} from './BaseImage.js';

import {
    GIF
} from '../external/gifuct-js.js';
import {
    resourceLoader
} from './ResourceLoader.js';
import {
    SystemDesc
} from '../BrowserDetection.js';

import {
    Parameter,
    NumberParameter,
    Vec4Parameter,
    FilePathParameter,
    ParameterSet
} from './Parameters';

const imageDataLibrary = {

};

const supportWebp = navigator.userAgent.indexOf("Chrome") !== -1; // || navigator.userAgent.indexOf("Samsung");

class FileImage extends BaseImage {
    constructor(resourcePath, params = {}) {
        super(params);

        this.__loaded = false;

        const fileParam = this.addParameter(new FilePathParameter('FilePath'));
        fileParam.valueChanged.connect(() => {
            this.loaded.untoggle();
            const filePath = fileParam.getValue();
            if (this.getName() == this.constructor.name) {
                // Generate a name from the file path.
                const p = filePath.split('/');
                const last = p[p.length - 1];
                const suffixSt = last.lastIndexOf('.');
                if (suffixSt != -1) {
                    const decorator = last.substring(suffixSt - 1, suffixSt);
                    if (!isNaN(decorator)) {
                        // Note: ALL image names have an LOD specifier at the end.
                        // remove that off when retrieving the name.
                        this.setName(last.substring(0, suffixSt - 1));
                    } else {
                        this.setName(last.substring(0, suffixSt));
                    }
                }
            }

            const fileDesc = fileParam.getFileDesc();
            this.__loadData(filePath, fileDesc);
        });
        if (resourcePath && resourcePath != '')
            fileParam.setValue(resourcePath);
    }



    getDOMElement() {
        return this.__domElement;
    }

    __loadData(resourcePath, fileDesc) {

        const getExt = (str) => {
            const p = str.split('/');
            const last = p[p.length - 1];
            const suffixSt = last.lastIndexOf('.')
            if (suffixSt != -1)
                return last.substring(suffixSt + 1).toLowerCase()
        }
        const ext = getExt(resourcePath);

        if (ext == 'jpg' || ext == 'png' || ext == 'webp') {
            this.__loadLDRImage(resourcePath, fileDesc, ext);
        } else if (ext == 'mp4' || ext == 'ogg') {
            this.__loadLDRVideo(resourcePath, fileDesc, ext);
            // } else if (ext == 'ldralpha') {
            //     this.__loadLDRAlpha(resourcePath, fileDesc, ext);
        } else if (ext == 'vlh') {
            this.__loadVLH(resourcePath, fileDesc, ext);
        } else if (ext == 'gif') {
            this.__loadGIF(resourcePath, fileDesc, ext);
        } else {
            throw ("Unsupported file type. Check the ext:" + resourcePath);
        }
    }

    __loadLDRImage(resourcePath, fileDesc, ext) {
        if (ext == 'jpg') {
            this.format = 'RGB';
        } else if (ext == 'png') {
            this.format = 'RGBA';
        }
        this.type = 'UNSIGNED_BYTE';
        const loaded = () => {
            this.width = this.__domElement.width;
            this.height = this.__domElement.height;
            this.__data = this.__domElement;
            this.__loaded = true;
            this.loaded.emit();
        };
        if (resourcePath in imageDataLibrary) {
            this.__domElement = imageDataLibrary[resourcePath];
            if (this.__domElement.complete) {
                loaded()
            } else {
                this.__domElement.addEventListener("load", loaded);
            }
        } else {
            resourceLoader.addWork(resourcePath, 1);

        const prefSizeParam = this.addParameter(new NumberParameter('PreferredSize', -1));

        let url = fileDesc.url;
        if (fileDesc.assets && Object.keys(fileDesc.assets).length > 0) {
                function chooseImage(params, filterAssets) {

                    if (supportWebp) {
                        const resultFilter = filterAssets.filter(
                            asset => asset.format === "webp"
                        );

                        if (resultFilter.length > 1) {
                            filterAssets = resultFilter;
                        }
                    } else {
                        filterAssets = filterAssets.filter(
                            asset => asset.format !== "webp"
                        );
                    }

                    if (params.maxSize) {
                        filterAssets = filterAssets.filter(
                            asset => asset.w <= params.maxSize
                        );
                    }
                    if (params.filter) {
                        const resultFilter = filterAssets.filter(
                            asset => asset.url.indexOf(params.filter) !== -1
                        );
                        if (resultFilter.length > 1) {
                            filterAssets = resultFilter;
                        }
                    }
                    if (params.prefSize) {
                        filterAssets = filterAssets.map(asset => Object.assign({
                            score: Math.abs(params.prefSize - asset.w)
                        }, asset));

                        // return low score, close to desire
                        // return _.sortBy(score, "score")[0].option.url;
                        filterAssets.sort((a, b) => (a.score > b.score) ? 1 : ((a.score < b.score) ? -1 : 0));
                    }
                    if (filterAssets.length > 0)
                        return filterAssets[0];
                }
                const params = {
                    maxSize: SystemDesc.gpuDesc.maxTextureSize
                };
                let prefSize = prefSizeParam.getValue();
                if (prefSize == -1) {
                    if (fileDesc.assets.reduce)
                        params.prefSize = fileDesc.assets.reduce.w;
                } else {
                    params.prefSize = prefSize;
                }
                const asset = chooseImage(params, Object.values(fileDesc.assets));
                if (asset) {
                    console.log("Selected image:" + resourcePath + " format:" + asset.format + " :" + asset.w + "x" + asset.h  + " url:" + asset.url);
                    url = asset.url;
                }
            }
            else {
                console.warn("Images not processed for this file:" + resourcePath);
            }

            this.__domElement = new Image();
            this.__domElement.crossOrigin = 'anonymous';
            this.__domElement.src = url;

            this.__domElement.addEventListener("load", loaded);
            this.__domElement.addEventListener("load", () => {
                resourceLoader.addWorkDone(resourcePath, 1);
            });
            imageDataLibrary[resourcePath] = this.__domElement;
        }
    }

    __addSpatializationParams() {
        this.addParameter(new Parameter('spatializeAudio', true));
        this.addParameter(new NumberParameter('Gain', 2.0)).setRange([0, 5]);
        this.addParameter(new NumberParameter('refDistance', 2));
        this.addParameter(new NumberParameter('maxDistance', 10000));
        this.addParameter(new NumberParameter('rolloffFactor', 1));
        this.addParameter(new NumberParameter('coneInnerAngle', 120));
        this.addParameter(new NumberParameter('coneOuterAngle', 180));
        this.addParameter(new NumberParameter('coneOuterGain', 0.2))
    }
    __removeSpatializationParams() {
        if (this.getParameterIndex('spatializeAudio')) {
            this.removeParameter(this.getParameterIndex('spatializeAudio'));
            this.removeParameter(this.getParameterIndex('Gain'));
            this.removeParameter(this.getParameterIndex('refDistance'));
            this.removeParameter(this.getParameterIndex('maxDistance'));
            this.removeParameter(this.getParameterIndex('rolloffFactor'));
            this.removeParameter(this.getParameterIndex('coneInnerAngle'));
            this.removeParameter(this.getParameterIndex('coneOuterAngle'));
            this.removeParameter(this.getParameterIndex('coneOuterGain'));
        }
    }

    __loadLDRVideo(resourcePath, fileDesc, ext) {
        this.format = 'RGB';
        this.type = 'UNSIGNED_BYTE';
        resourceLoader.addWork(resourcePath, 1);

        this.__addSpatializationParams();

        this.__domElement = document.createElement('video');
        // TODO - confirm its necessary to add to DOM
        this.__domElement.style.display = 'none';
        this.__domElement.preload = 'auto';
        this.__domElement.crossOrigin = 'anonymous';
        // this.__domElement.crossorigin = true;
        document.body.appendChild(this.__domElement);
        this.__domElement.addEventListener('loadedmetadata', () => {
            // this.__domElement.play();
            this.width = this.__domElement.videoHeight;
            this.height = this.__domElement.videoWidth;
            this.__data = this.__domElement;
            this.__loaded = true;
            resourceLoader.addWorkDone(resourcePath, 1);
            this.loaded.emit(this.__domElement);

            let prevFrame = 0;
            const frameRate = 29.97;
            const timerCallback = () => {
                if (this.__domElement.paused || this.__domElement.ended) {
                    return;
                }
                // Check to see if the video has progressed to the next frame. 
                // If so, then we emit and update, which will cause a redraw.
                const currentFrame = Math.floor(this.__domElement.currentTime * frameRate);
                if (prevFrame != currentFrame) {
                    this.updated.emit();
                    prevFrame = currentFrame;
                }
                setTimeout(timerCallback, 20); // Sample at 50fps.
            };
            timerCallback();

        }, false);
        this.__domElement.src = fileDesc.url;
        //this.__domElement.load();
        const promise = this.__domElement.play();
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

    __loadVLH(resourcePath, fileDesc, ext) {
        this.type = 'FLOAT';

        let hdrexposure = 1.0;
        let hdrtint = new Color(1, 1, 1, 1);
        // let stream = 'stream' in params ? params['stream'] : false;

        this.setHDRExposure = (value) => {
            hdrexposure = value;
        }
        this.getHDRExposure = () => {
            return hdrexposure;
        }
        this.setHDRTint = (value) => {
            hdrtint = value;
        }
        this.getHDRTint = () => {
            return hdrtint;
        }

        resourceLoader.loadURL(resourcePath, fileDesc.url, (entries) => {
            let ldr, cdm;
            for (let name in entries) {
                if (name.endsWith('.jpg'))
                    ldr = entries[name];
                else if (name.endsWith('.bin'))
                    cdm = entries[name];
            }

            /////////////////////////////////
            // Parse the data.
            const blob = new Blob([ldr.buffer]);
            const ldrPic = new Image();
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


    __loadGIF(resourcePath, fileDesc, ext) {

        this.format = 'RGBA';
        this.type = 'UNSIGNED_BYTE';
        this.__streamAtlas = true;

        // this.__streamAtlasDesc = new Vec4();
        this.addParameter(new Vec4Parameter('StreamAtlasDesc', new Vec4()));
        this.addParameter(new NumberParameter('StreamAtlasIndex', 0));
        this.getParameter('StreamAtlasIndex').setRange([0, 1]);

        this.getFrameDelay = (index) => {
            return 20;
        }
        let playing;
        let incrementFrame;
        this.play = () => {
            playing = true;
            if (incrementFrame)
                incrementFrame();
        }
        this.stop = () => {
            playing = false;
        }
        let resourcePromise;
        if (resourcePath in imageDataLibrary) {
            resourcePromise = imageDataLibrary[resourcePath];
        } else {
            resourcePromise = new Promise((resolve, reject) => {
                resourceLoader.addWork(resourcePath, 1);

                loadBinfile(fileDesc.url, (data) => {

                    const imageDataBase64 = localStorage.getItem(fileDesc.url);
                    if (imageDataBase64) {
                        const image = new Image();
                        image.crossOrigin = 'anonymous';
                        image.src = imageDataBase64;

                        const metadata = JSON.parse(localStorage.getItem(fileDesc.url + '_metadata'));

                        resolve({
                            width: metadata.width,
                            height: metadata.height,
                            atlasSize: new Visualive.Vec2(metadata.atlasSize[0], metadata.atlasSize[1]),
                            frameRange: [0, metadata.numframes],
                            frameDelays: metadata.frameDelays,
                            imageData: image
                        });
                        return;
                    }

                    const start = performance.now();

                    // Decompressing using: https://github.com/matt-way/gifuct-js
                    const gif = new GIF(data);
                    const frames = gif.decompressFrames(true);

                    // do something with the frame data
                    const sideLength = Math.sqrt(frames.length);
                    const atlasSize = new Visualive.Vec2(sideLength, sideLength);
                    if (Math.fract(sideLength) > 0.0) {
                        atlasSize.x = Math.floor(atlasSize.x + 1);
                        if (Math.fract(sideLength) > 0.5) {
                            atlasSize.y = Math.floor(atlasSize.y + 1);
                        } else {
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
                    const frameDelays = [];
                    const renderFrame = (frame, index) => {
                        const dims = frame.dims;
                        frameDelays.push(frame.delay);

                        if (!frameImageData || dims.width != frameImageData.width || dims.height != frameImageData.height) {
                            tempCanvas.width = dims.width;
                            tempCanvas.height = dims.height;
                            frameImageData = tempCtx.createImageData(dims.width, dims.height);
                        }

                        // set the patch data as an override
                        frameImageData.data.set(frame.patch);
                        tempCtx.putImageData(frameImageData, 0, 0);

                        // Note: undocumented disposal method.
                        // See Ids here: https://github.com/theturtle32/Flash-Animated-GIF-Library/blob/master/AS3GifPlayer/src/com/worlize/gif/constants/DisposalType.as
                        // From what I can gather, 2 means we should clear the background first. 
                        // this seems towork with Gifs featuring moving transparency.
                        // For fully opaque gifs, we should avoid this.
                        if (frame.disposalType == 2)
                            gifCtx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);

                        gifCtx.drawImage(tempCanvas, dims.left, dims.top);

                        atlasCtx.drawImage(gifCanvas, (index % atlasSize.x) * width, Math.floor(index / atlasSize.x) * height);
                    }

                    for (let i = 0; i < frames.length; i++) {
                        // console.log(frame);
                        renderFrame(frames[i], i);
                    }
                    resourceLoader.addWorkDone(resourcePath, 1);

                    const imageData = atlasCtx.getImageData(0, 0, atlasCanvas.width, atlasCanvas.height);

                    const ms = performance.now() - start;
                    console.log(`Decode GIF '${resourcePath}' time:` + ms);

                    try {
                        localStorage.setItem(fileDesc.url, atlasCanvas.toDataURL("image/png"));
                        localStorage.setItem(fileDesc.url + '_metadata', JSON.stringify({
                            width: atlasCanvas.width,
                            height: atlasCanvas.height,
                            atlasSize: [atlasSize.x, atlasSize.y],
                            numframes: frames.length,
                            frameDelays
                        }));
                    } catch (e) {
                        if (e.code == DOMException.QUOTA_EXCEEDED_ERR) {
                            console.log("Storage full");
                            localStorage.clear();
                        }
                    }

                    resolve({
                        width: atlasCanvas.width,
                        height: atlasCanvas.height,
                        atlasSize,
                        frameRange: [0, frames.length],
                        frameDelays,
                        imageData
                    });

                }, (statusText) => {
                    console.warn("Unable to Load URL:" + statusText + ":" + fileDesc.url);
                    reject();
                });
            });

            imageDataLibrary[resourcePath] = resourcePromise;
        }

        // Make the resolve asynchronous so that the function returns.
        // (Chroe started generating errors because the 'onload' callback took to long to return.)
        setTimeout(() => {
            resourcePromise.then((unpackedData) => {

                this.width = unpackedData.width;
                this.height = unpackedData.height;

                // this.__streamAtlasDesc.x = atlasSize.x;
                // this.__streamAtlasDesc.y = atlasSize.y;
                // this.__streamAtlasDesc.z = frames.length;
                this.getParameter('StreamAtlasDesc').setValue(new Vec4(unpackedData.atlasSize.x, unpackedData.atlasSize.y, 0, 0));
                this.getParameter('StreamAtlasIndex').setRange(unpackedData.frameRange);

                this.__data = unpackedData.imageData;

                this.getFrameDelay = (index) => {
                    return unpackedData.frameDelays[index];
                }

                //////////////////////////
                // Playback
                const frameParam = this.getParameter('StreamAtlasIndex');
                const numFrames = frameParam.getRange()[1];
                let frame = 0;
                incrementFrame = () => {
                    frameParam.setValue(frame);
                    if (playing)
                        setTimeout(incrementFrame, this.getFrameDelay(frame));
                    frame = (frame + 1) % numFrames;
                }
                if (playing)
                    incrementFrame();
                this.__loaded = true;

                this.loaded.emit();
            });
        }, 1)
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


    //////////////////////////////////////////
    // Persistence

    fromJSON(json) {

    }

    toJSON(json) {

    }

    readBinary(reader, context) {
        // super.readBinary(reader, context);
        this.setName(reader.loadStr());
        let resourcePath = reader.loadStr();
        if (typeof resourcePath === 'string' && resourcePath != "") {
            if (context.lod >= 0) {
                const suffixSt = resourcePath.lastIndexOf('.')
                if (suffixSt != -1) {
                    const lodPath = resourcePath.substring(0, suffixSt) + context.lod + resourcePath.substring(suffixSt);
                    if (resourceLoader.resourceAvailable(lodPath)) {
                        resourcePath = lodPath;
                    }
                }
            }
            this.getParameter('FilePath').setValue(resourcePath);

        }
    }
};


class FileImage2D extends FileImage {
    constructor(resourcePath, params = {}) {
        console.warn("FileImage2D is becoming deprecated in favor of simple FileImage")
        super(resourcePath, params);

    }
}

sgFactory.registerClass('FileImage2D', FileImage);
sgFactory.registerClass('FileImage', FileImage);


export {
    FileImage,
    FileImage2D
};