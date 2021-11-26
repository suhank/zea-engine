import { BaseEvent } from '../BaseEvent'

class StateChangedEvent extends BaseEvent {
  state: boolean
  constructor(state: boolean) {
    super()
    this.state = state
  }
}
export { StateChangedEvent }
