import { BaseItem, BaseTool, GLBaseViewport, Ray, TreeItem } from '../..';
import { BaseEvent } from '../BaseEvent';
import { IntersectionData } from '../IntersectionData';
declare const POINTER_TYPES: {
    mouse: string;
    touch: string;
    xr: string;
};
/**
 * ZeaPointerEvent are emitted from mouse or touch interactions or from WebXR controllers.
 */
declare class ZeaPointerEvent extends BaseEvent {
    pointerType: string;
    pointerRay: Ray;
    viewport: GLBaseViewport;
    propagating: boolean;
    intersectionData?: IntersectionData;
    leftGeometry: BaseItem;
    constructor(pointerType: string);
    stopPropagation(): void;
    setCapture(item: TreeItem | BaseTool): void;
    getCapture(): TreeItem | BaseTool;
    releaseCapture(): void;
}
export { ZeaPointerEvent, POINTER_TYPES };
