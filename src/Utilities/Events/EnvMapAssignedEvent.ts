import { BaseEvent } from "../BaseEvent"

class EnvMapAssignedEvent extends BaseEvent {
  envMap: any
  constructor(envMap: any) {
    super()
    this.envMap = envMap
  }
}

export {EnvMapAssignedEvent}
