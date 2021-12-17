import { XRController } from '../../Renderer/VR/XRController'
import { BaseEvent } from '../BaseEvent'

class ControllerAddedEvent extends BaseEvent {
  controller: XRController

  constructor(controller: XRController) {
    super()
    this.controller = controller
  }
}
export { ControllerAddedEvent }
