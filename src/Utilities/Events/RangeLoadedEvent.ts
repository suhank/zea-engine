import { BaseEvent } from '../BaseEvent'

class RangeLoadedEvent extends BaseEvent {
  range: any[]
  constructor(range: any[]) {
    super()
    this.range = range
  }
}
export { RangeLoadedEvent }
