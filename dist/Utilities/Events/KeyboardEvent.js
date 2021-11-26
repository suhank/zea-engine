import { BaseEvent } from '../BaseEvent';
class KeyboardEvent extends BaseEvent {
    constructor(sourceEvent) {
        super();
        this.propagating = true;
        this.sourceEvent = sourceEvent;
        this.altKey = sourceEvent.altKey;
        this.code = sourceEvent.code;
        this.ctrlKey = sourceEvent.ctrlKey;
        this.isComposing = sourceEvent.isComposing;
        this.key = sourceEvent.key;
        this.location = sourceEvent.location;
        this.metaKey = sourceEvent.metaKey;
        this.repeat = sourceEvent.repeat;
        this.shiftKey = sourceEvent.shiftKey;
        this.which = sourceEvent.which;
    }
    stopPropagation() {
        this.propagating = false;
        if (this.sourceEvent)
            this.sourceEvent.stopPropagation();
    }
    preventDefault() {
        if (this.sourceEvent)
            this.sourceEvent.preventDefault();
    }
}
export { KeyboardEvent };
//# sourceMappingURL=KeyboardEvent.js.map