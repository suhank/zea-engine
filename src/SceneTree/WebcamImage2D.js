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

class WebcamImage2D extends Image2D {
    constructor(width = 640, height = 480, rearCamera = false) {
        super();
        this.__loaded = false;
        this.loaded = new Signal();
        this.__initWebcam(width, height, rearCamera);
    }

    __initWebcam(width, height, rearCamera = false) {

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
        domElement.crossOrigin = 'anonymous';
        // domElement.crossorigin = true;
        document.body.appendChild(domElement);

        // List cameras and microphones.
        navigator.mediaDevices.enumerateDevices()
            .then((devices)=>{
                let videoinputs = [];
                devices.forEach((device)=>{
                    if (device.kind == "videoinput") {
                        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
                        videoinputs.push(device);
                    }
                });

                navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            width,
                            height,
                            deviceId: videoinputs[0].deviceId,
                            frameRate: {
                                ideal: 60,
                                max: 60
                            }
                        }
                    })
                    .then((mediaStream) => {
                        domElement.srcObject = mediaStream;
                        domElement.onloadedmetadata = (e) => {
                            domElement.play();

                            this.width = domElement.videoWidth;
                            this.height = domElement.videoHeight;
                            console.log("Webcam:[" + this.width + ", " + this.height + "]");
                            this.__data = domElement;
                            this.__loaded = true;
                            this.loaded.emit(domElement);

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

            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
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
            data: this.__data,
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