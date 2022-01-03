import { XRController } from '../../Renderer/VR/XRController';
import { BaseEvent } from '../BaseEvent';
declare class ControllerAddedEvent extends BaseEvent {
    controller: XRController;
    constructor(controller: XRController);
}
export { ControllerAddedEvent };
