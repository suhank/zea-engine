import { BaseEvent } from '../BaseEvent'

class CountChangedEvent extends BaseEvent {
  change: number
  count: number
  constructor(change: number, count: number) {
    super()
    this.change = change
    this.count = count
  }
}

export { CountChangedEvent }
