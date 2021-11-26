import { BaseEvent } from '../BaseEvent';
declare class SelectedEvent extends BaseEvent {
    selected: boolean;
    constructor(selected: boolean);
}
export { SelectedEvent };
