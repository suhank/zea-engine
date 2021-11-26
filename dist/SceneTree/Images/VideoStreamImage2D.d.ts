import { BaseImage } from '../BaseImage';
/** Class representing a 2D video stream image.
 * @private
 * @extends BaseImage
 */
declare class VideoStreamImage2D extends BaseImage {
    __data: any;
    __intervalId: any;
    /**
     * Create a 2D video stream image.
     */
    constructor();
    /**
     * The connectWebcam method.
     * @param width - The width of the video.
     * @param height - The height of the video.
     * @param rearCamera - Boolean determining if it is a rear camera or not.
     */
    connectWebcam(width: number, height: number, rearCamera?: boolean): void;
    /**
     * The setVideoStream method.
     * @param video - The video value.
     */
    setVideoStream(video: HTMLVideoElement): void;
    /**
     * The stop method.
     */
    stop(): void;
    /**
     * The start method.
     */
    start(): void;
    /**
     * The isLoaded method.
     * @return - The return value.
     */
    isLoaded(): boolean;
    /**
     * The getParams method.
     * @return - The return value.
     */
    getParams(): Record<string, any>;
}
export { VideoStreamImage2D };
