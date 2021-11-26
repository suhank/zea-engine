import { VRController } from '../../Renderer/VR/VRController';
import { ZeaPointerEvent } from './ZeaPointerEvent';
declare class XRControllerEvent extends ZeaPointerEvent {
    controller: VRController;
    button: number;
    buttonPressed: boolean;
    constructor(button: number, controller: VRController);
}
export { XRControllerEvent };
