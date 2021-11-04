import { GLViewport } from '../../Renderer'
import { Ray, Vec2 } from '../../Math'

import { PointerEvent } from './PointerEvent'

class UIEvent extends PointerEvent {
  viewport: GLViewport
  detail: number
  pointerPos: Vec2
  pointerRay: Ray

  constructor(pointerType: string) {
    super(pointerType)
  }
}
export { UIEvent }
