import { Xfo } from '../../Math/Xfo';
import { VRController } from '../../Renderer/VR/VRController';
import { VRViewport } from '../../Renderer/VR/VRViewport';
import { ViewChangedEvent } from './ViewChangedEvent';
declare class VRViewChangedEvent extends ViewChangedEvent {
    hmd: string;
    controllers: Array<VRController>;
    vrviewport?: VRViewport;
    constructor(viewXfo: Xfo);
}
export { VRViewChangedEvent };
