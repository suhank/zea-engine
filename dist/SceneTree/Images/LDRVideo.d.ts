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
declare class LDRVideo extends FileImage {
    protected videoElem: HTMLVideoElement;
    muteParam: BooleanParameter;
    loopParam: BooleanParameter;
    spatializeAudioParam: BooleanParameter;
    refDistanceParam: NumberParameter;
    maxDistanceParam: NumberParameter;
    rolloffFactorParam: NumberParameter;
    coneInnerAngleParam: NumberParameter;
    coneOuterAngleParam: NumberParameter;
    coneOuterGainParam: NumberParameter;
    gainParam: NumberParameter;
    /**
     * Create a LDR video.
     * @param name - The name value.
     * @param filePath - The filePath value.
     * @param params - The params value.
     */
    constructor(name?: string, filePath?: string, params?: Record<string, any>);
    getAudioSource(): HTMLVideoElement;
    /**
     * Uses the specify url to load an Image element and adds it to the data library.
     * Sets the state of the current object.
     *
     * @param url - The url value.
     * @param format - The format value.
     * @return Returns a promise that resolves once the image is loaded.
     */
    load(url: string, format?: string): Promise<void>;
    /**
     * The getParams method.
     * @return - The return value.
     */
    getParams(): Record<string, any>;
}
export { LDRVideo };
