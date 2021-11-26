import { VRViewport, Xfo } from '../..';
import { VRController } from '../../Renderer/VR/VRController';
import { IntersectionData } from '../IntersectionData';
import { ZeaPointerEvent } from './ZeaPointerEvent';
declare class XRPoseEvent extends ZeaPointerEvent {
    viewXfo: Xfo;
    controllers: VRController[];
    intersectionData: IntersectionData;
    constructor(viewport: VRViewport, viewXfo: Xfo, controllers: VRController[]);
}
export { XRPoseEvent };
