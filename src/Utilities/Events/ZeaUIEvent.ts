import { GLViewport } from '../../Renderer'
import { Ray, Vec2 } from '../../Math'

import { ZeaPointerEvent } from './ZeaPointerEvent'

class ZeaUIEvent extends ZeaPointerEvent {
  viewport: GLViewport
  detail: number
  pointerPos: Vec2
  pointerRay: Ray

  constructor(pointerType: string) {
    super(pointerType)
  }
}
export { ZeaUIEvent }
