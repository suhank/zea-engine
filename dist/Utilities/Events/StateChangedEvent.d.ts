import { BaseEvent } from '../BaseEvent';
declare class StateChangedEvent extends BaseEvent {
    state: boolean;
    constructor(state: boolean);
}
export { StateChangedEvent };
