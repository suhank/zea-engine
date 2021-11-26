import { BooleanParameter, NumberParameter } from './Parameters/index';
import { TreeItem } from './TreeItem';
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
declare class AudioItem extends TreeItem {
    protected loaded: boolean;
    private audioSource;
    private audioBuffer;
    autoplayParam: BooleanParameter;
    playStateParam: NumberParameter;
    muteParam: BooleanParameter;
    gainParam: NumberParameter;
    loopParam: BooleanParameter;
    spatializeAudioParam: BooleanParameter;
    refDistanceParam: NumberParameter;
    maxDistanceParam: NumberParameter;
    rolloffFactorParam: NumberParameter;
    coneInnerAngleParam: NumberParameter;
    coneOuterAngleParam: NumberParameter;
    coneOuterGainParam: NumberParameter;
    /**
     * Create an audio item.
     * @param name - The name of the audio item.
     */
    constructor(name: string);
    isPlaying(): boolean;
    play(): void;
    stop(): void;
    pause(): void;
    mute(value: boolean): void;
    getAudioSource(): any;
    startAudioPlayback(): void;
    load(url: string): Promise<void>;
    /**
     * Returns loaded status of the audio item
     *
     * @return - `The return value`.
     */
    isLoaded(): boolean;
    /**
     * The setAudioStream method.
     * @param audioSource - The audio value.
     */
    setAudioStream(audioSource: any): void;
}
/** Class representing a audio file item in a scene tree.
 * @ignore
 * @extends AudioItem
 */
declare class FileAudioItem extends AudioItem {
    /**
     * Create a audio file item.
     * @param name - The name of the audio file.
     */
    constructor(name: string);
}
export { AudioItem, FileAudioItem };
