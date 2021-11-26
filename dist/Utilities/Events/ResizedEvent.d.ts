import { BaseEvent } from '../BaseEvent';
declare class ResizedEvent extends BaseEvent {
    width: number;
    height: number;
    constructor(newWidth: number, newHeight: number);
}
export { ResizedEvent };
