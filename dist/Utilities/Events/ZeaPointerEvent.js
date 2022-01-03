import { BaseEvent } from '../BaseEvent';
const POINTER_TYPES = {
    mouse: 'mouse',
    touch: 'touch',
    xr: 'xr',
};
let capturedItem = null;
/**
 * ZeaPointerEvent are emitted from mouse or touch interactions or from WebXR controllers.
 */
class ZeaPointerEvent extends BaseEvent {
    constructor(pointerType) {
        super();
        this.propagating = true;
        this.pointerType = pointerType;
    }
    stopPropagation() {
        this.propagating = false;
    }
    setCapture(item) {
        capturedItem = item;
    }
    getCapture() {
        return capturedItem;
    }
    releaseCapture() {
        capturedItem = null;
    }
}
export { ZeaPointerEvent, POINTER_TYPES };
//# sourceMappingURL=ZeaPointerEvent.js.map