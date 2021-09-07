import { Xfo } from '../../Math/Xfo'
import { GLBaseViewport } from '../../Renderer/GLBaseViewport'
import { BaseEvent } from '../BaseEvent'

class ViewChangedEvent extends BaseEvent {
  interfaceType: string
  viewXfo: Xfo
  viewport?: GLBaseViewport

  constructor(interfaceType: string, viewXfo: Xfo) {
    super()
    this.interfaceType = interfaceType
    this.viewXfo = viewXfo
  }
}

export { ViewChangedEvent }
