import { BaseEvent } from '../BaseEvent';
declare class VisibilityChangedEvent extends BaseEvent {
    visible: boolean;
    constructor(visible: boolean);
}
export { VisibilityChangedEvent };
