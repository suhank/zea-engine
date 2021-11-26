import { BaseEvent } from '../BaseEvent';
//{ isTextured, param }
class TexturedChangedEvent extends BaseEvent {
    constructor(isTextured, param) {
        super();
        this.isTextured = isTextured;
        this.param = param;
    }
}
export { TexturedChangedEvent };
//# sourceMappingURL=TexturedChangedEvent.js.map