import { BaseEvent } from '../BaseEvent';
class ResizedEvent extends BaseEvent {
    constructor(newWidth, newHeight) {
        super();
        this.width = newWidth;
        this.height = newHeight;
    }
}
export { ResizedEvent };
//# sourceMappingURL=ResizedEvent.js.map