import { BaseEvent } from '../BaseEvent';
class AudioSourceCreatedEvent extends BaseEvent {
    constructor(audioSource) {
        super();
        this.audioSource = audioSource;
    }
}
export { AudioSourceCreatedEvent };
//# sourceMappingURL=AudioSourceCreatedEvent.js.map