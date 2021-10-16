import { BaseEvent } from '../BaseEvent'

class TransparencyChangedEvent extends BaseEvent {
  isTransparent: boolean
  constructor(isTransparent: boolean) {
    super()
    this.isTransparent = isTransparent
  }
}

export { TransparencyChangedEvent }
