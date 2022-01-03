import { Xfo } from '../../Math/Xfo';
import { XRController } from '../../Renderer/VR/XRController';
import { XRViewport } from '../../Renderer/VR/XRViewport';
import { ViewChangedEvent } from './ViewChangedEvent';
declare class XRViewChangedEvent extends ViewChangedEvent {
    hmd: string;
    controllers: Array<XRController>;
    vrviewport?: XRViewport;
    constructor(viewXfo: Xfo);
}
export { XRViewChangedEvent };
