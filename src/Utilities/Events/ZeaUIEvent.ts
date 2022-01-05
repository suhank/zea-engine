import { GLViewport } from '../../Renderer'
import { Ray, Vec2 } from '../../Math'

import { ZeaPointerEvent } from './ZeaPointerEvent'

/**
 * ZeaUIEvent are emitted from a 2D UI, such as from a HTMLCanvas element generated from
 * a mouse or touch interaction.
 */
class ZeaUIEvent extends ZeaPointerEvent {
  detail: number
  pointerPos: Vec2

  constructor(pointerType: string) {
    super(pointerType)
  }
}
export { ZeaUIEvent }
