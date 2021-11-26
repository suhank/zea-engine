import { BaseEvent } from '../BaseEvent'

class IndexEvent extends BaseEvent {
  index: number
  constructor(index: number) {
    super()
    this.index = index
  }
}
export { IndexEvent }
