import { XRViewport, Xfo } from '../..';
import { XRController } from '../../Renderer/VR/XRController';
import { ZeaPointerEvent } from './ZeaPointerEvent';
declare class XRPoseEvent extends ZeaPointerEvent {
    viewXfo: Xfo;
    controllers: XRController[];
    constructor(viewport: XRViewport, viewXfo: Xfo, controllers: XRController[]);
}
export { XRPoseEvent };
