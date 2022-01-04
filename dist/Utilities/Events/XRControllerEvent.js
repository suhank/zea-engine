import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent';
class XRControllerEvent extends ZeaPointerEvent {
    constructor(viewport, controller, button, buttonPressed) {
        super(POINTER_TYPES.xr);
        this.buttonPressed = 0;
        this.viewport = viewport;
        this.controller = controller;
        this.button = button;
        this.buttonPressed = buttonPressed;
    }
    stopPropagation() {
        this.propagating = false;
    }
    setCapture(item) {
        this.controller.capturedItem = item;
    }
    getCapture() {
        return this.controller.capturedItem;
    }
    releaseCapture() {
        this.controller.capturedItem = null;
    }
}
export { XRControllerEvent };
//# sourceMappingURL=XRControllerEvent.js.map