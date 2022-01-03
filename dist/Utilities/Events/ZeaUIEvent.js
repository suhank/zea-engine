import { ZeaPointerEvent } from './ZeaPointerEvent';
/**
 * ZeaUIEvent are emitted from a 2D UI, such as from a HTMLCanvas element generated from
 * a mouse or touch interaction.
 */
class ZeaUIEvent extends ZeaPointerEvent {
    constructor(pointerType) {
        super(pointerType);
    }
}
export { ZeaUIEvent };
//# sourceMappingURL=ZeaUIEvent.js.map