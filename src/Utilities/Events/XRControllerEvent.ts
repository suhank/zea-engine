import { VRController } from '../../Renderer/VR/VRController'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

class XRControllerEvent extends ZeaPointerEvent {
  controller: VRController
  button: number
  buttonPressed: boolean
  constructor(button: number, controller: VRController) {
    super(POINTER_TYPES.xr)
    this.button = button
    this.controller = controller
  }
}
export { XRControllerEvent }
