import { BaseEvent } from '../BaseEvent';
class StateChangedEvent extends BaseEvent {
    constructor(state) {
        super();
        this.state = state;
    }
}
export { StateChangedEvent };
//# sourceMappingURL=StateChangedEvent.js.map