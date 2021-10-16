import { BaseEvent } from '../BaseEvent'

class VisibilityChangedEvent extends BaseEvent {
  visible: boolean
  constructor(visible: boolean) {
    super()
    this.visible = visible
  }
}

export { VisibilityChangedEvent }
