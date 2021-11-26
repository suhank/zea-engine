import { Registry } from '../../Registry';
import { resourceLoader } from '../resourceLoader';
import { BooleanParameter, NumberParameter } from '../Parameters/index';
import { FileImage } from './FileImage';
/**
 * Class representing a LDR (low dynamic range) video.
 *
 * ```
 * const video = new LDRVideo()
 * video.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/video.mp4")
 * ```
 *
 * **Parameters**
 * * **Mute(`BooleanParameter`):** Mutes video volume.
 * * **Loop(`BooleanParameter`):** Repeats video over and over again.
 * * **Gain(`NumberParameter`):** Sets loudness of the video before going through any processing.
 * * **SpatializeAudio(`BooleanParameter`):** Enables/Disables spatial(Surrounding) audio.
 * * **refDistance(`NumberParameter`):** _todo_
 * * **maxDistance(`NumberParameter`):** _todo_
 * * **rolloffFactor(`NumberParameter`):** _todo_
 * * **coneInnerAngle(`NumberParameter`):** _todo_
 * * **coneOuterAngle(`NumberParameter`):** _todo_
 * * **coneOuterGain(`NumberParameter`):** _todo_
 *
 * **File Types:** mp4, ogg
 *
 * @extends FileImage
 */
class LDRVideo extends FileImage {
    /**
     * Create a LDR video.
     * @param name - The name value.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(name, filePath, params) {
        super(name, filePath, params);
        this.videoElem = new HTMLVideoElement();
        this.muteParam = new BooleanParameter('Mute', false);
        this.loopParam = new BooleanParameter('Loop', true);
        this.spatializeAudioParam = new BooleanParameter('SpatializeAudio', true);
        this.refDistanceParam = new NumberParameter('refDistance', 2);
        this.maxDistanceParam = new NumberParameter('maxDistance', 10000);
        this.rolloffFactorParam = new NumberParameter('rolloffFactor', 1);
        this.coneInnerAngleParam = new NumberParameter('coneInnerAngle', 360);
        this.coneOuterAngleParam = new NumberParameter('coneOuterAngle', 0);
        this.coneOuterGainParam = new NumberParameter('coneOuterGain', 1);
        this.gainParam = new NumberParameter('Gain', 2.0);
        this.format = 'RGB';
        this.type = 'UNSIGNED_BYTE';
        this.addParameter(this.muteParam);
        this.addParameter(this.loopParam);
        this.addParameter(this.spatializeAudioParam);
        this.addParameter(this.refDistanceParam);
        this.addParameter(this.maxDistanceParam);
        this.addParameter(this.rolloffFactorParam);
        this.addParameter(this.coneInnerAngleParam);
        this.addParameter(this.coneOuterAngleParam);
        this.addParameter(this.coneOuterGainParam);
        this.addParameter(this.gainParam).setRange([0, 5]);
    }
    getAudioSource() {
        return this.videoElem;
    }
    /**
     * Uses the specify url to load an Image element and adds it to the data library.
     * Sets the state of the current object.
     *
     * @param url - The url value.
     * @param format - The format value.
     * @return Returns a promise that resolves once the image is loaded.
     */
    load(url, format = 'RGB') {
        return new Promise((resolve, reject) => {
            resourceLoader.incrementWorkload(1);
            // TODO - confirm its necessary to add to DOM
            this.videoElem.style.display = 'none';
            this.videoElem.preload = 'auto';
            this.videoElem.crossOrigin = 'anonymous';
            // videoElem.crossorigin = true;
            document.body.appendChild(this.videoElem);
            this.videoElem.addEventListener('loadedmetadata', () => {
                // videoElem.play();
                this.videoElem.muted = this.muteParam.value;
                this.muteParam.on('valueChanged', () => {
                    this.videoElem.muted = this.muteParam.value;
                });
                this.videoElem.loop = this.loopParam.value;
                this.loopParam.on('valueChanged', () => {
                    this.videoElem.loop = this.loopParam.value;
                });
                this.width = this.videoElem.videoHeight;
                this.height = this.videoElem.videoWidth;
                this.loaded = true;
                resourceLoader.incrementWorkDone(1);
                this.emit('loaded');
                resolve(promise);
                let prevFrame = 0;
                const frameRate = 29.97;
                const timerCallback = () => {
                    if (this.videoElem.paused || this.videoElem.ended) {
                        return;
                    }
                    // Check to see if the video has progressed to the next frame.
                    // If so, then we emit and update, which will cause a redraw.
                    const currentFrame = Math.floor(this.videoElem.currentTime * frameRate);
                    if (prevFrame != currentFrame) {
                        this.emit('updated');
                        prevFrame = currentFrame;
                    }
                    setTimeout(timerCallback, 20); // Sample at 50fps.
                };
                timerCallback();
            }, false);
            this.videoElem.src = url;
            // this.videoElem.load();
            const promise = this.videoElem.play();
            if (promise !== undefined) {
                promise
                    .then((_) => {
                    console.log('Autoplay started!');
                    // Autoplay started!
                })
                    .catch(() => {
                    console.log('Autoplay was prevented.');
                    // Autoplay was prevented.
                    // Show a "Play" button so that user can start playback.
                });
            }
        });
    }
    /**
     * The getParams method.
     * @return - The return value.
     */
    getParams() {
        const params = super.getParams();
        if (this.loaded) {
            params['data'] = this.videoElem;
        }
        return params;
    }
}
Registry.register('LDRVideo', LDRVideo);
export { LDRVideo };
//# sourceMappingURL=LDRVideo.js.map