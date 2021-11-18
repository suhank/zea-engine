import { BaseEvent } from '../BaseEvent'

class SelectabilityChangedEvent extends BaseEvent {
  value: boolean
  constructor(value: boolean) {
    super()
    this.value = value
  }
}
export { SelectabilityChangedEvent }
