import { ViewChangedEvent } from './ViewChangedEvent';
class VRViewChangedEvent extends ViewChangedEvent {
    constructor(viewXfo) {
        super('VR', viewXfo);
        this.hmd = '';
        this.controllers = [];
    }
}
export { VRViewChangedEvent };
//# sourceMappingURL=VRViewChangedEvent.js.map