import { GeomItem, VRViewport, Xfo } from '../..'
import { VRController } from '../../Renderer/VR/VRController'
import { IntersectionData } from '../IntersectionData'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

class XRControllerPose {
  controller: VRController
  constructor(controller: VRController) {
    this.controller = controller
  }
}

class XRPoseEvent extends ZeaPointerEvent {
  viewXfo: Xfo
  controllers: XRControllerPose[]
  intersectionData: IntersectionData
  constructor(viewport: VRViewport, viewXfo: Xfo, controllers: VRController[]) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.viewXfo = viewXfo
    controllers.forEach((controller) => {
      this.controllers.push(new XRControllerPose(controller))
    })
  }
}
export { XRPoseEvent, XRControllerPose }
