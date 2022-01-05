import { XRViewport } from '../../Renderer/VR/XRViewport'
import { XRController } from '../../Renderer/VR/XRController'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'
import { BaseTool, TreeItem } from '../../SceneTree'

class XRControllerEvent extends ZeaPointerEvent {
  controller: XRController
  button: number
  buttonPressed: number = 0
  constructor(viewport: XRViewport, controller: XRController, button: number, buttonPressed: number) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.controller = controller
    this.button = button
    this.buttonPressed = buttonPressed
  }

  stopPropagation() {
    this.propagating = false
  }

  setCapture(item: TreeItem | BaseTool) {
    this.controller.capturedItem = item
  }

  getCapture() {
    return this.controller.capturedItem
  }

  releaseCapture() {
    this.controller.capturedItem = null
  }
}
export { XRControllerEvent }
