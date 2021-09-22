import { BaseEvent } from '../BaseEvent'

class ParameterRemovedEvent extends BaseEvent {
  name: string
  constructor(name: string) {
    super()
    this.name = name
  }
}
export { ParameterRemovedEvent }
