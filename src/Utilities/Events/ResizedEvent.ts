import { BaseEvent } from '../BaseEvent'

class ResizedEvent extends BaseEvent {
  width: number
  height: number
  constructor(newWidth: number, newHeight: number) {
    super()
    this.width = newWidth
    this.height = newHeight
  }
}

export { ResizedEvent }
