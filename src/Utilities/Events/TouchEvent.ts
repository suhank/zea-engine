import { Ray, Vec2 } from '../../Math'
import { POINTER_TYPES } from './PointerEvent'
import { UIEvent } from './UIEvent'

class Touch {
  identifier: number
  clientX: number = 0
  clientY: number = 0
  screenX: number = 0
  screenY: number = 0
  pageX: number = 0
  pageY: number = 0
  radiusX: number = 0
  radiusY: number = 0
  rotationAngle: number = 0
  force: number = 0
  altitudeAngle: number = 0
  azimuthAngle: number = 0
  touchType: string = 'direct'

  rendererX: number
  rendererY: number
  touchPos: Vec2
  touchRay: Ray

  constructor(touch: globalThis.Touch, rect: DOMRect) {
    this.identifier = touch.identifier
    this.clientX = touch.clientX
    this.clientY = touch.clientY
    this.screenX = touch.screenX
    this.screenY = touch.screenY
    this.pageX = touch.pageX
    this.pageY = touch.pageY
    this.radiusX = touch.radiusX
    this.radiusY = touch.radiusY
    this.rotationAngle = touch.rotationAngle
    this.force = touch.force
    // this.altitudeAngle = touch.altitudeAngle
    // this.azimuthAngle = touch.azimuthAngle
    // this.touchType = touch.touchType

    // Disabling devicePixelRatio for now. See: __onResize
    const DPR = 1.0 // window.devicePixelRatio
    // Note: the rendererX/Y values are relative to the viewport,
    // but are available outside the viewport. So when a mouse
    // drag occurs, and drags outside the viewport, these values
    // provide consistent coords.
    // offsetX/Y are only valid inside the viewport and so cause
    // jumps when the mouse leaves the viewport.
    this.rendererX = (this.clientX - rect.left) * DPR
    this.rendererY = (this.clientY - rect.top) * DPR

    this.touchPos = new Vec2()
    this.touchRay = new Ray()
  }
}

class TouchEvent extends UIEvent {
  touches: Touch[]
  changedTouches: Touch[]
  targetTouches: Touch[]
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
  shiftKey: boolean

  private sourceEvent: globalThis.TouchEvent

  constructor(sourceEvent: globalThis.TouchEvent, rect: DOMRect) {
    super(POINTER_TYPES.touch)
    this.sourceEvent = sourceEvent
    this.sourceEvent.stopPropagation()
    this.altKey = sourceEvent.altKey
    this.metaKey = sourceEvent.metaKey
    this.ctrlKey = sourceEvent.ctrlKey
    this.shiftKey = sourceEvent.shiftKey

    for (let i = 0; i < sourceEvent.touches.length; i++) {
      this.touches.push(new Touch(sourceEvent.touches[i], rect))
    }
    for (let i = 0; i < sourceEvent.changedTouches.length; i++) {
      this.changedTouches.push(new Touch(sourceEvent.changedTouches[i], rect))
    }
    for (let i = 0; i < sourceEvent.targetTouches.length; i++) {
      this.targetTouches.push(new Touch(sourceEvent.targetTouches[i], rect))
    }
  }

  stopPropagation() {
    super.stopPropagation()
    if (this.sourceEvent) this.sourceEvent.stopPropagation()
  }

  // Touch events are passive and so cannot call prevent default
  // replace with a stub here...
  preventDefault() {}
}
export { TouchEvent, Touch }
