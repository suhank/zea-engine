import { VRController } from '../../Renderer/VR/VRController';
import { BaseEvent } from '../BaseEvent';
declare class ControllerAddedEvent extends BaseEvent {
    controller: VRController;
    constructor(controller: VRController);
}
export { ControllerAddedEvent };
