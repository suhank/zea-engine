import { POINTER_TYPES } from './ZeaPointerEvent';
import { ZeaUIEvent } from './ZeaUIEvent';
class ZeaMouseEvent extends ZeaUIEvent {
    constructor(sourceEvent, rect) {
        super(POINTER_TYPES.mouse);
        this.sourceEvent = sourceEvent;
        this.button = sourceEvent.button;
        this.clientX = sourceEvent.clientX;
        this.clientY = sourceEvent.clientY;
        // Disabling devicePixelRatio for now. See: __onResize
        const DPR = 1.0; // window.devicePixelRatio
        // Note: the rendererX/Y values are relative to the viewport,
        // but are available outside the viewport. So when a mouse
        // drag occurs, and drags outside the viewport, these values
        // provide consistent coords.
        // offsetX/Y are only valid inside the viewport and so cause
        // jumps when the mouse leaves the viewport.
        this.rendererX = (this.clientX - rect.left) * DPR;
        this.rendererY = (this.clientY - rect.top) * DPR;
        this.altKey = sourceEvent.altKey;
        this.metaKey = sourceEvent.metaKey;
        this.ctrlKey = sourceEvent.ctrlKey;
        this.shiftKey = sourceEvent.shiftKey;
    }
    stopPropagation() {
        super.stopPropagation();
        if (this.sourceEvent)
            this.sourceEvent.stopPropagation();
    }
    preventDefault() {
        if (this.sourceEvent)
            this.sourceEvent.preventDefault();
    }
}
export { ZeaMouseEvent };
//# sourceMappingURL=ZeaMouseEvent.js.map