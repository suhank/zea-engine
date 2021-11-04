import { BaseItem, GLBaseViewport, GLViewport, Ray, TreeItem, Vec2, Vec3 } from '../..'
import { BaseEvent } from '../BaseEvent'
import { IntersectionData } from '../IntersectionData'

const POINTER_TYPES = {
  mouse: 'mouse',
  touch: 'touch',
  xr: 'xr',
}

class PointerEvent extends BaseEvent {
  pointerType: string
  capturedItem: BaseItem
  viewport: GLBaseViewport
  propagating = true

  intersectionData?: IntersectionData
  leftGeometry: BaseItem

  constructor(pointerType: string) {
    super()
    this.pointerType = pointerType
  }

  stopPropagation() {
    this.propagating = false
  }

  setCapture(item: BaseItem) {
    this.capturedItem = item
  }

  getCapture() {
    return this.capturedItem
  }

  releaseCapture() {
    this.capturedItem = null
  }
}
export { PointerEvent, IntersectionData, POINTER_TYPES }
