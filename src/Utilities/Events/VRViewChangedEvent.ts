import { Xfo } from '../../Math/Xfo'
import { VRController } from '../../Renderer/VR/XRController'
import { VRViewport } from '../../Renderer/VR/XRViewport'
import { ViewChangedEvent } from './ViewChangedEvent'

class VRViewChangedEvent extends ViewChangedEvent {
  hmd: string = ''
  controllers: Array<VRController> = []
  vrviewport?: VRViewport

  constructor(viewXfo: Xfo) {
    super('VR', viewXfo)
  }
}

export { VRViewChangedEvent }
