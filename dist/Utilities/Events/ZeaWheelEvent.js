import { ZeaMouseEvent } from './ZeaMouseEvent';
class ZeaWheelEvent extends ZeaMouseEvent {
    constructor(sourceEvent, rect) {
        super(sourceEvent, rect);
        // @ts-ignore
        this.wheelDelta = sourceEvent.wheelDelta;
        this.deltaMode = sourceEvent.deltaMode;
        this.deltaX = sourceEvent.deltaX;
        this.deltaY = sourceEvent.deltaY;
        this.deltaZ = sourceEvent.deltaZ;
    }
}
export { ZeaWheelEvent };
//# sourceMappingURL=ZeaWheelEvent.js.map