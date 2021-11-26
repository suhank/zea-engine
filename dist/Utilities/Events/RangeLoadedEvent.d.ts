import { BaseEvent } from '../BaseEvent';
declare class RangeLoadedEvent extends BaseEvent {
    range: any[];
    constructor(range: any[]);
}
export { RangeLoadedEvent };
