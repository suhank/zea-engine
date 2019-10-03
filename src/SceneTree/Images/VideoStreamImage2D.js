import { Async, Signal } from '../../Utilities';
import { sgFactory } from '../SGFactory.js';
import { BaseImage } from '../BaseImage.js';

/** Class representing a video stream image 2D.
 * @extends BaseImage
 */
class VideoStreamImage2D extends BaseImage {
  /**
   * Create a video stream image 2D.
   */
  constructor() {
    super();
    this.__loaded = false;
  }

  /**
   * The connectWebcam method.
   * @param {any} width - The width param.
   * @param {any} height - The height param.
   * @param {false} rearCamera - The rearCamera param.
   */
  connectWebcam(width, height, rearCamera = false) {
    const video = {
      width,
      height,
      frameRate: {
        ideal: 60,
        max: 60,
      },
    };
    if (rearCamera) {
      video.facingMode = {
        exact: 'environment',
      };
    } else {
      video.facingMode = {
        facingMode: 'user',
      };
    }

    const domElement = document.createElement('video');
    // TODO - confirm its necessary to add to DOM
    domElement.style.display = 'none';
    domElement.preload = 'auto';
    domElement.crossOrigin = 'anonymous';
    // domElement.crossorigin = true;
    document.body.appendChild(domElement);

    // List cameras and microphones.
    // navigator.mediaDevices.enumerateDevices()
    //     .then((devices)=>{
    //         // devices.forEach((device)=>{
    //         //     if (device.kind == "videoinput") {
    //         //         console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
    //         //         videoinputs.push(device);
    //         //     }
    //         // });

    //     })
    //     .catch(function(err) {
    //         console.log(err.name + ": " + err.message);
    //     });

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video,
      })
      .then(mediaStream => {
        domElement.srcObject = mediaStream;
        domElement.onloadedmetadata = e => {
          domElement.play();

          this.width = domElement.videoWidth;
          this.height = domElement.videoHeight;
          console.log('Webcam:[' + this.width + ', ' + this.height + ']');
          this.__data = domElement;
          this.__loaded = true;
          this.loaded.emit(domElement);

          let prevFrame = 0;
          const frameRate = 60;
          const timerCallback = () => {
            if (domElement.paused || domElement.ended) {
              return;
            }
            // Check to see if the video has progressed to the next frame.
            // If so, then we emit and update, which will cause a redraw.
            const currentFrame = Math.floor(domElement.currentTime * frameRate);
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

  /**
   * The setVideoStream method.
   * @param {any} video - The video param.
   */
  setVideoStream(video) {
    this.__loaded = false;
    this.width = video.videoWidth;
    this.height = video.videoHeight;
    this.start();
    this.__data = video;
    this.__loaded = true;
    this.loaded.emit(video);
  }

  // getAudioSource() {
  //     return this.__data;
  // }

  /**
   * The stop method.
   */
  stop() {
    clearInterval(this.__intervalId);
  }

  /**
   * The start method.
   */
  start() {
    this.__intervalId = setInterval(() => {
      this.updated.emit();
    }, 20); // Sample at 50fps.
  }

  /**
   * The isLoaded method.
   * @return {any} - The return value.
   */
  isLoaded() {
    return this.__loaded;
  }

  /**
   * The getParams method.
   * @return {any} - The return value.
   */
  getParams() {
    return {
      type: this.type,
      format: this.format,
      width: this.width,
      height: this.height,
      data: this.__data,
      flipY: this.getParameter('FlipY').getValue(),
    };
  }
}

sgFactory.registerClass('VideoStreamImage2D', VideoStreamImage2D);

export { VideoStreamImage2D };
