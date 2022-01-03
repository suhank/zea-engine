import { ViewChangedEvent } from './ViewChangedEvent';
class XRViewChangedEvent extends ViewChangedEvent {
    constructor(viewXfo) {
        super('VR', viewXfo);
        this.hmd = '';
        this.controllers = [];
    }
}
export { XRViewChangedEvent };
//# sourceMappingURL=XRViewChangedEvent.js.map