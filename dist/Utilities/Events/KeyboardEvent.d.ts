import { BaseEvent } from '../BaseEvent';
declare class KeyboardEvent extends BaseEvent {
    private sourceEvent;
    propagating: boolean;
    altKey: boolean;
    code: string;
    ctrlKey: boolean;
    isComposing: boolean;
    key: string;
    location: number;
    metaKey: boolean;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
    constructor(sourceEvent: globalThis.KeyboardEvent);
    stopPropagation(): void;
    preventDefault(): void;
}
export { KeyboardEvent };
