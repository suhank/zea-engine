import { ZeaMouseEvent } from './ZeaMouseEvent';
declare class ZeaWheelEvent extends ZeaMouseEvent {
    wheelDelta: number;
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    constructor(sourceEvent: globalThis.WheelEvent, rect: DOMRect);
}
export { ZeaWheelEvent };
