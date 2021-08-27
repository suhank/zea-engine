import { BaseEvent } from '../BaseEvent'

//{ isTextured, param }

class TexturedChangedEvent extends BaseEvent {
  isTextured: boolean
  param: Record<string, any>
  constructor(isTextured: boolean, param: Record<string, any>) {
    super()
    this.isTextured = isTextured
    this.param = param
  }
}
export { TexturedChangedEvent }
