import { VRViewport } from '../..'
import { BaseEvent } from '../BaseEvent'

class XrViewportEvent extends BaseEvent {
  xrViewport?: VRViewport
  constructor(xrViewport: VRViewport) {
    super()
    this.xrViewport = xrViewport
  }
}

export { XrViewportEvent }
