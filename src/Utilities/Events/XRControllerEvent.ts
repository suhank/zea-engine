import { VRViewport } from '../../Renderer/VR/VRViewport'
import { VRController } from '../../Renderer/VR/VRController'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'
import { BaseTool, TreeItem } from '../../SceneTree'

// Ensure that XRControllers have a separate capture
// to the mouse and touch events. This is simply to
// avoid a capture being left on in either part breaking
// the other.
let capturedItem: TreeItem | BaseTool = null

class XRControllerEvent extends ZeaPointerEvent {
  controller: VRController
  button: number
  buttonPressed: boolean
  constructor(viewport: VRViewport, controller: VRController, button: number) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.controller = controller
    this.button = button
  }

  stopPropagation() {
    this.propagating = false
  }

  setCapture(item: TreeItem | BaseTool) {
    capturedItem = item
  }

  getCapture() {
    return capturedItem
  }

  releaseCapture() {
    capturedItem = null
  }
}
export { XRControllerEvent }
