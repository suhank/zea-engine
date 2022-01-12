import { BaseItem, BaseTool, GLBaseViewport, GLViewport, Ray, TreeItem, Vec2, Vec3 } from '../..'
import { BaseEvent } from '../BaseEvent'
import { IntersectionData } from '../IntersectionData'

const POINTER_TYPES = {
  mouse: 'mouse',
  touch: 'touch',
  xr: 'xr',
}

let capturedItem: TreeItem | BaseTool = null

/**
 * ZeaPointerEvent are emitted from mouse or touch interactions or from WebXR controllers.
 */
class ZeaPointerEvent extends BaseEvent {
  pointerType: string
  pointerRay: Ray
  viewport: GLBaseViewport
  propagating = true

  intersectionData?: IntersectionData
  leftGeometry: BaseItem

  constructor(pointerType: string) {
    super()
    this.pointerType = pointerType
  }

  stopPropagation(): void {
    this.propagating = false
  }

  setCapture(item: TreeItem | BaseTool): void {
    capturedItem = item
  }

  getCapture(): TreeItem | BaseTool {
    return capturedItem
  }

  releaseCapture(): void {
    capturedItem = null
  }
}

export { ZeaPointerEvent, POINTER_TYPES }
