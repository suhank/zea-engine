import { Ray, Vec2 } from '../../Math';
import { POINTER_TYPES } from './ZeaPointerEvent';
import { ZeaUIEvent } from './ZeaUIEvent';
class Touch {
    constructor(touch, rect) {
        this.clientX = 0;
        this.clientY = 0;
        this.screenX = 0;
        this.screenY = 0;
        this.pageX = 0;
        this.pageY = 0;
        this.radiusX = 0;
        this.radiusY = 0;
        this.rotationAngle = 0;
        this.force = 0;
        this.altitudeAngle = 0;
        this.azimuthAngle = 0;
        this.touchType = 'direct';
        this.identifier = touch.identifier;
        this.clientX = touch.clientX;
        this.clientY = touch.clientY;
        this.screenX = touch.screenX;
        this.screenY = touch.screenY;
        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
        this.radiusX = touch.radiusX;
        this.radiusY = touch.radiusY;
        this.rotationAngle = touch.rotationAngle;
        this.force = touch.force;
        // this.altitudeAngle = touch.altitudeAngle
        // this.azimuthAngle = touch.azimuthAngle
        // this.touchType = touch.touchType
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
        this.touchPos = new Vec2();
        this.touchRay = new Ray();
    }
}
class ZeaTouchEvent extends ZeaUIEvent {
    constructor(sourceEvent, rect) {
        super(POINTER_TYPES.touch);
        this.touches = [];
        this.changedTouches = [];
        this.targetTouches = [];
        this.altKey = false;
        this.metaKey = false;
        this.ctrlKey = false;
        this.shiftKey = false;
        this.sourceEvent = sourceEvent;
        this.sourceEvent.stopPropagation();
        this.altKey = sourceEvent.altKey;
        this.metaKey = sourceEvent.metaKey;
        this.ctrlKey = sourceEvent.ctrlKey;
        this.shiftKey = sourceEvent.shiftKey;
        for (let i = 0; i < sourceEvent.touches.length; i++) {
            this.touches.push(new Touch(sourceEvent.touches[i], rect));
        }
        if (sourceEvent.changedTouches) {
            for (let i = 0; i < sourceEvent.changedTouches.length; i++) {
                this.changedTouches.push(new Touch(sourceEvent.changedTouches[i], rect));
            }
        }
        if (sourceEvent.targetTouches) {
            for (let i = 0; i < sourceEvent.targetTouches.length; i++) {
                this.targetTouches.push(new Touch(sourceEvent.targetTouches[i], rect));
            }
        }
    }
    stopPropagation() {
        super.stopPropagation();
        if (this.sourceEvent)
            this.sourceEvent.stopPropagation();
    }
    // Touch events are passive and so cannot call prevent default
    // replace with a stub here...
    preventDefault() { }
}
export { ZeaTouchEvent, Touch };
//# sourceMappingURL=ZeaTouchEvent.js.map