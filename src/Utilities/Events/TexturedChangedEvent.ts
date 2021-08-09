import { BaseEvent } from '../BaseEvent'

//{ isTextured, param }

class TexturedChangedEvent extends BaseEvent {
  isTextured: boolean
  param: Record<any, any>
  constructor(isTextured: boolean, param: Record<any, any>) {
    super()
    this.isTextured = isTextured
    this.param = param
  }
}
export { TexturedChangedEvent }
