import { BaseItem, BaseTool, GLBaseViewport, TreeItem } from '../..';
import { BaseEvent } from '../BaseEvent';
import { IntersectionData } from '../IntersectionData';
declare const POINTER_TYPES: {
    mouse: string;
    touch: string;
    xr: string;
};
declare class ZeaPointerEvent extends BaseEvent {
    pointerType: string;
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
