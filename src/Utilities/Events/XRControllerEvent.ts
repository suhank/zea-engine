import { VRViewport } from '../../Renderer/VR/VRViewport'
import { VRController } from '../../Renderer/VR/VRController'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

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
}
export { XRControllerEvent }
