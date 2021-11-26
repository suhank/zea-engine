import { BaseEvent } from '../BaseEvent';
class ViewChangedEvent extends BaseEvent {
    constructor(interfaceType, viewXfo) {
        super();
        this.interfaceType = interfaceType;
        this.viewXfo = viewXfo;
    }
}
export { ViewChangedEvent };
//# sourceMappingURL=ViewChangedEvent.js.map