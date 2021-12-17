import { VRController } from '../../Renderer/VR/XRController'
import { BaseEvent } from '../BaseEvent'

class ControllerAddedEvent extends BaseEvent {
  controller: VRController

  constructor(controller: VRController) {
    super()
    this.controller = controller
  }
}
export { ControllerAddedEvent }
