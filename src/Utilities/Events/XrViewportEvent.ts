import { XRViewport } from '../..'
import { BaseEvent } from '../BaseEvent'

class XrViewportEvent extends BaseEvent {
  xrViewport?: XRViewport
  constructor(xrViewport: XRViewport) {
    super()
    this.xrViewport = xrViewport
  }
}

export { XrViewportEvent }
