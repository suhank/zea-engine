import { ZeaUIEvent } from './ZeaUIEvent';
declare class ZeaMouseEvent extends ZeaUIEvent {
    button: number;
    clientX: number;
    clientY: number;
    rendererX: number;
    rendererY: number;
    altKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    private sourceEvent;
    constructor(sourceEvent: globalThis.MouseEvent, rect: DOMRect);
    stopPropagation(): void;
    preventDefault(): void;
}
export { ZeaMouseEvent };
