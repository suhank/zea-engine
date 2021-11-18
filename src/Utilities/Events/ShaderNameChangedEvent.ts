import { BaseEvent } from '../BaseEvent'

class ShaderNameChangedEvent extends BaseEvent {
  shaderName: string
  constructor(shaderName: string) {
    super()
    this.shaderName = shaderName
  }
}
export { ShaderNameChangedEvent }
