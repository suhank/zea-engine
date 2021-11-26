import { Ray, Vec2 } from '../../Math';
import { ZeaUIEvent } from './ZeaUIEvent';
declare class Touch {
    identifier: number;
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    pageX: number;
    pageY: number;
    radiusX: number;
    radiusY: number;
    rotationAngle: number;
    force: number;
    altitudeAngle: number;
    azimuthAngle: number;
    touchType: string;
    rendererX: number;
    rendererY: number;
    touchPos: Vec2;
    touchRay: Ray;
    constructor(touch: globalThis.Touch, rect: DOMRect);
}
declare class ZeaTouchEvent extends ZeaUIEvent {
    touches: Touch[];
    changedTouches: Touch[];
    targetTouches: Touch[];
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    private sourceEvent;
    constructor(sourceEvent: globalThis.TouchEvent, rect: DOMRect);
    stopPropagation(): void;
    preventDefault(): void;
}
export { ZeaTouchEvent, Touch };
