import { XRViewport } from '../..';
import { BaseEvent } from '../BaseEvent';
declare class XrViewportEvent extends BaseEvent {
    xrViewport?: XRViewport;
    constructor(xrViewport: XRViewport);
}
export { XrViewportEvent };
