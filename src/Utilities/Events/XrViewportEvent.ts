import { BaseEvent } from '../BaseEvent'

class XrViewportEvent extends BaseEvent {
  xrViewport: any
  constructor(xrViewport: any) {
    super()
    this.xrViewport = xrViewport
  }
}

export { XrViewportEvent }
