import { VRController } from '../../Renderer/VR/VRController'
import { PointerEvent, POINTER_TYPES } from './PointerEvent'

class XRControllerEvent extends PointerEvent {
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
