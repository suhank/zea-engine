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

class WebcamImage2D extends Image2D {
    constructor(width = 1280, height = 720, rearCamera = false) {
        super();
        this.__loaded = false;
        this.loaded = new Signal();
        this.__initWebcam(width, height, rearCamera);
    }

    __initWebcam(width = 1280, height = 720, rearCamera = false){

        let facingMode;
        if (rearCamera) {
            facingMode = {
                exact: "environment"
            };
        } else {
            facingMode = {
                facingMode: "user"
            };
        }

        let domElement = document.createElement('video');
        // TODO - confirm its necessary to add to DOM
        domElement.style.display = 'none';
        domElement.preload = 'auto';
        domElement.crossOrigin='anonymous';
        // domElement.crossorigin = true;
        document.body.appendChild(domElement);
        
        navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width,
                    height,
                    facingMode,
                    frameRate: { ideal: 60, max: 60 }
                }
            })
            .then((mediaStream)=>{
                domElement.srcObject = mediaStream;
                domElement.onloadedmetadata = (e)=>{
                    domElement.play();

                    this.width = domElement.videoHeight;
                    this.height = domElement.videoWidth;
                    this.__data = domElement;
                    this.__loaded = true;

                    let prevFrame = 0;
                    let frameRate = 60;
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

                };
            })
            .catch(function(err) {
                /* handle the error */
            });

    }

    isLoaded() {
        return this.__loaded;
    }

    getParams() {
        return {
            format: this.format,
            channels: this.channels,
            width: this.width,
            height: this.height,
            wrap: this.wrap,
            flipY: this.flipY,
            mipMapped: this.mipMapped
        }
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }

};

sgFactory.registerClass('WebcamImage2D', WebcamImage2D);


export {
    WebcamImage2D
};