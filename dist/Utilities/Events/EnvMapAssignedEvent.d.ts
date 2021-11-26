import { BaseEvent } from '../BaseEvent';
declare class EnvMapAssignedEvent extends BaseEvent {
    envMap: any;
    constructor(envMap: any);
}
export { EnvMapAssignedEvent };
