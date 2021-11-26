import { BaseEvent } from '../BaseEvent';
class CountChangedEvent extends BaseEvent {
    constructor(change, count) {
        super();
        this.change = change;
        this.count = count;
    }
}
export { CountChangedEvent };
//# sourceMappingURL=CountChangedEvent.js.map