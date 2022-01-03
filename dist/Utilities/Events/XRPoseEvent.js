import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent';
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
    constructor(viewport, viewXfo, controllers) {
        super(POINTER_TYPES.xr);
        this.controllers = [];
        this.viewport = viewport;
        this.viewXfo = viewXfo;
        controllers.forEach((controller) => {
            this.controllers.push(controller);
        });
    }
}
export { XRPoseEvent };
//# sourceMappingURL=XRPoseEvent.js.map