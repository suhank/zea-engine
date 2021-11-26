import { BaseEvent } from '../BaseEvent';
declare class ParameterAddedEvent extends BaseEvent {
    name: string;
    constructor(name: string);
}
export { ParameterAddedEvent };
