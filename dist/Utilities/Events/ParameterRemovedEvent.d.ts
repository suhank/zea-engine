import { BaseEvent } from '../BaseEvent';
declare class ParameterRemovedEvent extends BaseEvent {
    name: string;
    constructor(name: string);
}
export { ParameterRemovedEvent };
