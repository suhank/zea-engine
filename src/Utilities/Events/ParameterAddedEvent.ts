import { BaseEvent } from '../BaseEvent'

class ParameterAddedEvent extends BaseEvent {
  name: string
  constructor(name: string) {
    super()
    this.name = name
  }
}
export { ParameterAddedEvent }
