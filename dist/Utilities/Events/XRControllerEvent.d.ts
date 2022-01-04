import { XRViewport } from '../../Renderer/VR/XRViewport';
import { XRController } from '../../Renderer/VR/XRController';
import { ZeaPointerEvent } from './ZeaPointerEvent';
import { BaseTool, TreeItem } from '../../SceneTree';
declare class XRControllerEvent extends ZeaPointerEvent {
    controller: XRController;
    button: number;
    buttonPressed: number;
    constructor(viewport: XRViewport, controller: XRController, button: number, buttonPressed: number);
    stopPropagation(): void;
    setCapture(item: TreeItem | BaseTool): void;
    getCapture(): TreeItem | BaseTool;
    releaseCapture(): void;
}
export { XRControllerEvent };
