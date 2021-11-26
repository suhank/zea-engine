import { BaseEvent } from '../BaseEvent';
declare class SelectabilityChangedEvent extends BaseEvent {
    value: boolean;
    constructor(value: boolean);
}
export { SelectabilityChangedEvent };
