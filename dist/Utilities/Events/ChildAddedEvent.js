import { BaseEvent } from '../BaseEvent';
class ChildAddedEvent extends BaseEvent {
    constructor(index, childItem) {
        super();
        this.index = index;
        this.childItem = childItem;
    }
}
export { ChildAddedEvent };
//# sourceMappingURL=ChildAddedEvent.js.map