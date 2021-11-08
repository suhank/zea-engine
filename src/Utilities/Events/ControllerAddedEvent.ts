import { VRController } from '../../Renderer/VR/VRController'
import { BaseEvent } from '../BaseEvent'

class ControllerAddedEvent extends BaseEvent {
  controller: VRController

  constructor(controller: VRController) {
    super()
    this.controller = controller
  }
}
export { ControllerAddedEvent }
