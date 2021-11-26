import { BaseEvent } from '../BaseEvent';
class TransparencyChangedEvent extends BaseEvent {
    constructor(isTransparent) {
        super();
        this.isTransparent = isTransparent;
    }
}
export { TransparencyChangedEvent };
//# sourceMappingURL=TransparencyChangedEvent.js.map