import { GeomItem, XRViewport, Xfo } from '../..'
import { XRController } from '../../Renderer/VR/XRController'
import { IntersectionData } from '../IntersectionData'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

// TODO: Once we start the migration to AssemblyScript
// we will need to extract the cotroller data and package
// into this struct. Untill then, we will just put the whole
// controller.
// class XRControllerPose {
//   controller: XRController
//   constructor(controller: XRController) {
//     this.controller = controller
//   }
// }

class XRPoseEvent extends ZeaPointerEvent {
  viewXfo: Xfo
  controllers: XRController[] = []
  constructor(viewport: XRViewport, viewXfo: Xfo, controllers: XRController[]) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.viewXfo = viewXfo
    controllers.forEach((controller) => {
      this.controllers.push(controller)
    })
  }
}
export { XRPoseEvent }
