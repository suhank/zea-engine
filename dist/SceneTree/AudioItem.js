/* eslint-disable constructor-super */
import { BooleanParameter, NumberParameter } from './Parameters/index';
import { TreeItem } from './TreeItem';
import { AudioSourceCreatedEvent } from '../Utilities/Events/AudioSourceCreatedEvent';
/**
 * A special type of `TreeItem` that let you handle audio files.
 * **Parameters**
 * * **Autoplay(`BooleanParameter`):**
 * * **PlayState(`NumberParameter`):**
 * * **Mute(`BooleanParameter`):**
 * * **Gain(`NumberParameter`):**
 * * **Loop(`BooleanParameter):**
 * * **SpatializeAudio(`BooleanParameter`):**
 * * **refDistance(`NumberParameter`):**
 * * **maxDistance(`NumberParameter`):**
 * * **rolloffFactor(`NumberParameter`):**
 * * **coneInnerAngle(`NumberParameter`):**
 * * **coneOuterGain(`NumberParameter`):**
 *
 * **Events**
 * * **loaded**
 * * **audioSourceCreated**
 * @private
 * @extends TreeItem
 */
class AudioItem extends TreeItem {
    /**
     * Create an audio item.
     * @param name - The name of the audio item.
     */
    constructor(name) {
        super(name);
        this.autoplayParam = new BooleanParameter('Autoplay', false);
        this.playStateParam = new NumberParameter('PlayState', 0);
        this.muteParam = new BooleanParameter('Mute', false);
        this.gainParam = new NumberParameter('Gain', 1.0, [0, 5]);
        this.loopParam = new BooleanParameter('Loop', false);
        this.spatializeAudioParam = new BooleanParameter('SpatializeAudio', true);
        this.refDistanceParam = new NumberParameter('refDistance', 2);
        this.maxDistanceParam = new NumberParameter('maxDistance', 10000);
        // Defaults taken from here.: https://github.com/mdn/webaudio-examples/blob/master/panner-node/main.js
        this.rolloffFactorParam = new NumberParameter('rolloffFactor', 1);
        this.coneInnerAngleParam = new NumberParameter('coneInnerAngle', 360);
        this.coneOuterAngleParam = new NumberParameter('coneOuterAngle', 0);
        this.coneOuterGainParam = new NumberParameter('coneOuterGain', 1);
        this.loaded = false;
        this.addParameter(this.autoplayParam);
        this.addParameter(this.playStateParam);
        this.addParameter(this.muteParam);
        this.addParameter(this.gainParam);
        this.addParameter(this.loopParam);
        this.addParameter(this.spatializeAudioParam);
        this.addParameter(this.refDistanceParam);
        this.addParameter(this.maxDistanceParam);
        this.addParameter(this.rolloffFactorParam);
        this.addParameter(this.coneInnerAngleParam);
        this.addParameter(this.coneOuterAngleParam);
        this.addParameter(this.coneOuterGainParam);
        this.playStateParam.on('valueChanged', (event) => {
            switch (this.playStateParam.value) {
                case 0:
                    if (this.loaded) {
                        if (this.audioSource) {
                            this.audioSource.stop(0);
                            this.audioSource = undefined;
                        }
                    }
                    break;
                case 1:
                    if (this.loaded) {
                        this.startAudioPlayback();
                    }
                    break;
            }
        });
        this.muteParam.on('valueChanged', () => {
            if (this.audioSource)
                this.audioSource.muted = this.muteParam.value;
        });
        this.loopParam.on('valueChanged', () => {
            if (this.audioSource)
                this.audioSource.loop = this.loopParam.value;
        });
        // Note: Many parts of the code assume a 'loaded' signal.
        // We should probably deprecate and use only 'updated'.
        this.loaded = false;
    }
    isPlaying() {
        return this.playStateParam.value != 0;
    }
    play() {
        this.playStateParam.value = 1;
    }
    stop() {
        this.playStateParam.value = 0;
    }
    pause() {
        this.playStateParam.value = 0;
    }
    mute(value) {
        this.muteParam.value = value;
    }
    getAudioSource() {
        return this.audioSource;
    }
    startAudioPlayback() {
        this.audioSource = window.ZeaAudioaudioCtx.createBufferSource();
        this.audioSource.buffer = this.audioBuffer;
        this.audioSource.loop = this.loopParam.value;
        this.audioSource.muted = this.muteParam.value;
        this.audioSource.start(0);
        const event = new AudioSourceCreatedEvent(this.audioSource);
        this.emit('audioSourceCreated', event);
    }
    load(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                const audioData = request.response;
                // Note: this code is not pretty and should not access the global object
                // However, its difficult to handle this case.
                // TODO: clean this up.
                window.ZeaAudioaudioCtx.decodeAudioData(audioData, (buffer) => {
                    this.audioBuffer = buffer;
                    this.loaded = true;
                    this.emit('loaded');
                    if (this.autoplayParam.getValue())
                        this.startAudioPlayback();
                    resolve();
                }, (e) => {
                    console.log('Error with decoding audio data' + e.err);
                    reject();
                });
            };
            request.send();
        });
    }
    /**
     * Returns loaded status of the audio item
     *
     * @return - `The return value`.
     */
    isLoaded() {
        return this.loaded;
    }
    /**
     * The setAudioStream method.
     * @param audioSource - The audio value.
     */
    setAudioStream(audioSource) {
        this.loaded = true;
        this.emit('loaded');
        const event = new AudioSourceCreatedEvent(audioSource);
        this.emit('audioSourceCreated', event);
    }
}
/** Class representing a audio file item in a scene tree.
 * @ignore
 * @extends AudioItem
 */
class FileAudioItem extends AudioItem {
    /**
     * Create a audio file item.
     * @param name - The name of the audio file.
     */
    constructor(name) {
        super(name);
    }
}
export { AudioItem, FileAudioItem };
//# sourceMappingURL=AudioItem.js.map