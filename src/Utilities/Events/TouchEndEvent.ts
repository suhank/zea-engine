import { TouchEvent, Touch } from './TouchEvent'

class TouchEndEvent extends TouchEvent {
  changedTouches: Touch[]
  constructor(sourceEvent: globalThis.TouchEvent, rect: DOMRect) {
    super(sourceEvent, rect)
    for (let i = 0; i < sourceEvent.changedTouches.length; i++) {
      this.changedTouches.push(new Touch(sourceEvent.changedTouches[i], rect))
    }
  }
}
export { TouchEndEvent }
