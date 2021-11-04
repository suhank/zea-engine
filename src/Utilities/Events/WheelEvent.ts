import { MouseEvent } from './MouseEvent'

class WheelEvent extends MouseEvent {
  wheelDelta: number
  deltaMode: number
  deltaX: number
  deltaY: number
  deltaZ: number
  constructor(sourceEvent: globalThis.WheelEvent, rect: DOMRect) {
    super(sourceEvent, rect)
    // @ts-ignore
    this.wheelDelta = sourceEvent.wheelDelta
    this.deltaMode = sourceEvent.deltaMode
    this.deltaX = sourceEvent.deltaX
    this.deltaY = sourceEvent.deltaY
    this.deltaZ = sourceEvent.deltaZ
  }
}
export { WheelEvent }
