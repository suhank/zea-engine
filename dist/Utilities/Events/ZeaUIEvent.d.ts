import { Vec2 } from '../../Math';
import { ZeaPointerEvent } from './ZeaPointerEvent';
/**
 * ZeaUIEvent are emitted from a 2D UI, such as from a HTMLCanvas element generated from
 * a mouse or touch interaction.
 */
declare class ZeaUIEvent extends ZeaPointerEvent {
    detail: number;
    pointerPos: Vec2;
    constructor(pointerType: string);
}
export { ZeaUIEvent };
