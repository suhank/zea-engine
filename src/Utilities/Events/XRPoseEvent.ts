import { GeomItem, VRViewport, Xfo } from '../..'
import { VRController } from '../../Renderer/VR/VRController'
import { IntersectionData } from '../IntersectionData'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

// TODO: Once we start the migration to AssemblyScript
// we will need to extract the cotroller data and package
// into this struct. Untill then, we will just put the whole
// controller.
// class XRControllerPose {
//   controller: VRController
//   constructor(controller: VRController) {
//     this.controller = controller
//   }
// }

class XRPoseEvent extends ZeaPointerEvent {
  viewXfo: Xfo
  controllers: VRController[] = []
  constructor(viewport: VRViewport, viewXfo: Xfo, controllers: VRController[]) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.viewXfo = viewXfo
    controllers.forEach((controller) => {
      this.controllers.push(controller)
    })
  }
}
export { XRPoseEvent }
