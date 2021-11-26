import { BaseEvent } from '../BaseEvent';
declare class CountChangedEvent extends BaseEvent {
    change: number;
    count: number;
    constructor(change: number, count: number);
}
export { CountChangedEvent };
