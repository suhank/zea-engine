import { BaseEvent } from '../BaseEvent';
declare class AudioSourceCreatedEvent extends BaseEvent {
    audioSource: any;
    constructor(audioSource: any);
}
export { AudioSourceCreatedEvent };
