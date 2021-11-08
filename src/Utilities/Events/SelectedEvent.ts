import { BaseEvent } from '../BaseEvent'

class SelectedEvent extends BaseEvent {
  selected: boolean
  constructor(selected: boolean) {
    super()
    this.selected = selected
  }
}
export { SelectedEvent }
