import { BaseEvent } from '../BaseEvent';
declare class StreamFileParsedEvent extends BaseEvent {
    geomFileID: any;
    geomCount: number;
    constructor(geomFileID: any, geomCount: number);
}
export { StreamFileParsedEvent };
