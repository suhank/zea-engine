import { BaseEvent } from '../BaseEvent';
declare class TransparencyChangedEvent extends BaseEvent {
    isTransparent: boolean;
    constructor(isTransparent: boolean);
}
export { TransparencyChangedEvent };
