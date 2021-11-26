import { BaseEvent } from '../BaseEvent';
class StreamFileParsedEvent extends BaseEvent {
    constructor(geomFileID, geomCount) {
        super();
        this.geomFileID = geomFileID;
        this.geomCount = geomCount;
    }
}
export { StreamFileParsedEvent };
//# sourceMappingURL=StreamFileParsedEvent.js.map