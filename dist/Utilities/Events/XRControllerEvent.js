import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent';
class XRControllerEvent extends ZeaPointerEvent {
    constructor(button, controller) {
        super(POINTER_TYPES.xr);
        this.button = button;
        this.controller = controller;
    }
}
export { XRControllerEvent };
//# sourceMappingURL=XRControllerEvent.js.map