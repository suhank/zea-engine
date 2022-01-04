import { SystemDesc } from '../../SystemDesc';
import { Vec3, Xfo, Mat4, Ray } from '../../Math/index';
import { TreeItem } from '../../SceneTree/index';
import { XRControllerEvent } from '../../Utilities/Events/XRControllerEvent';
import { EventEmitter } from '../..';
// const line = new Lines()
// line.setNumVertices(2)
// line.setNumSegments(1)
// line.setSegmentVertexIndices(0, 0, 1)
// const positions = <Vec3Attribute>line.getVertexAttribute('positions')
// positions.getValueRef(0).set(0.0, 0.0, 0.0)
// positions.getValueRef(1).set(0.0, 0.0, -1.0)
// line.setBoundingBoxDirty()
/** Class representing a VR controller.
 *
 * The XRController class wraps the XRInputSource provided by the WebXR API.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource
 *
 * The XRController provides a tree item that can be used to attach geometries to represenet
 * the controllers or tools that the user may have in thier hands.
 * ```javascript
 * renderer.getXRViewport().then((xrvp) => {
 *   xrvp.on('controllerAdded', (event) => {
 *     const controller = event.controller
 *
 *     // Configure the distance of the ray cast performed by the controller into the scene.
 *     // Note: setting to 0 disables ray casting.
 *     controller.raycastDist = 20.0
 *
 *     // Remove the green ball added by the VRViewManipulator.
 *     controller.tipItem.removeAllChildren()
 *
 *     // Add a visual indication of the ray.
 *     const pointerItem = new GeomItem('PointerRay', line, pointermat)
 *     pointerItem.setSelectable(false)
 *     const pointerXfo = new Xfo()
 *     pointerXfo.sc.set(1, 1, controller.raycastDist)
 *     pointerItem.localXfoParam.value = pointerXfo
 *     controller.tipItem.addChild(pointerItem, false)
 *
 *     // The tip items needs to be rotated down a little to make it
 *     // point in the right direction.
 *     const tipItemXfo = controller.tipItem.localXfoParam.value
 *     tipItemXfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), -0.8)
 *     controller.tipItem.localXfoParam.value = tipItemXfo
 *
 *     controller.on('buttonPressed', (event) => {
 *       console.log('buttonPressed', event)
 *     })
 *     controller.on('buttonReleased', (event) => {
 *       console.log('buttonReleased', event)
 *     })
 *   })
 * })
 * ```
 *
 * **Events**
 * * **buttonPressed:** Emitted when the user presses any of the buttons aside from the trigger button.
 * * **buttonReleased:** Emitted when the user release any of the buttons aside from the trigger button.
 *
 *
 * @extends EventEmitter
 */
class XRController extends EventEmitter {
    /**
     * Create a VR controller.
     * @param xrvp - The Vr viewport.
     * @param inputSource - The input source.
     * @param id - The id value.
     */
    constructor(xrvp, inputSource, id) {
        super();
        this.pressedButtons = [];
        // The frequency of raycasting into the scene for this controller
        this.raycastTick = 5;
        this.raycastArea = 0.005;
        this.raycastDist = 0.04;
        this.pointerRay = new Ray();
        this.raycastAreaCache = 0;
        this.raycastDistCache = 0;
        this.rayCastRenderTargetProjMatrix = new Mat4();
        // Each XRController has a separate capture item.
        this.capturedItem = null;
        this.xrvp = xrvp;
        this.inputSource = inputSource;
        this.id = id;
        this.buttonPressed = false;
        this.inputSource.gamepad.buttons.forEach((button, index) => {
            if (index == 0)
                return;
            this.pressedButtons[index] = button.pressed;
        });
        // /////////////////////////////////
        // Xfo
        this.mat4 = new Mat4();
        this.xfo = new Xfo();
        // this.setVisible(true);
        this.treeItem = new TreeItem('XRController:' + inputSource.handedness + id);
        // Controller coordinate system
        // X = Horizontal.
        // Y = Up.
        // Z = Towards handle base.
        if (!SystemDesc.isMobileDevice) {
            // A Vive or Oculus Controller
            this.tipItem = new TreeItem('Tip');
            // Note: the tip of the controller need to be off
            // the end of the controller. getGeomItemAtTip
            // now searches a grid in that area and so we need to
            // ensure that the grid does not touch the controller,
            // else it will return the controller geom from
            // the getGeomItemAtTip function
            const tipXfo = new Xfo();
            tipXfo.tr.set(0.0, -0.05, -0.13);
            // Flip the tip around so +z is forwards.
            // tipXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI)
            this.tipItem.localXfoParam.value = tipXfo;
            this.treeItem.addChild(this.tipItem, false);
            xrvp.getTreeItem().addChild(this.treeItem);
            // const pointermat = new Material('pointermat', 'LinesShader')
            // pointermat.setSelectable(false)
            // pointermat.getParameter('BaseColor').value = new Color(1.2, 0, 0)
            // const pointerItem = new GeomItem('PointerRay', line, pointermat)
            // pointerItem.setSelectable(false)
            // const pointerXfo = new Xfo()
            // pointerXfo.sc.set(1, 1, this.raycastDist)
            // pointerItem.localXfoParam.value = pointerXfo
            // this.tipItem.addChild(pointerItem, false)
            if (inputSource.targetRayMode == 'tracked-pointer') {
                // Once we have an input profile, we can determine the XR Device in use.
                switch (inputSource.profiles[0]) {
                    case 'htc-vive':
                        localStorage.setItem('ZeaEngine_XRDevice', 'Vive');
                        break;
                    case 'oculus-touch':
                    case 'oculus-touch-v2':
                    case 'oculus-touch-v3':
                        localStorage.setItem('ZeaEngine_XRDevice', 'Oculus');
                        break;
                    default:
                        break;
                }
                //   // Use the fetchProfile method from the motionControllers library
                //   // to find the appropriate glTF mesh path for this controller.
                //   fetchProfile(inputSource, DEFAULT_PROFILES_PATH).then(({ profile, assetPath }) => {
                //     // Typically if you wanted to animate the controllers in response
                //     // to device inputs you'd create a new MotionController() instance
                //     // here to handle the animation, but this sample will skip that
                //     // and only display a static mesh for simplicity.
                //     scene.inputRenderer.setControllerMesh(new Gltf2Node({ url: assetPath }), inputSource.handedness)
                //   })
                xrvp.loadHMDResources().then((assetItem) => {
                    if (!assetItem)
                        return;
                    const localXfo = new Xfo();
                    localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI);
                    localXfo.sc.set(0.001, 0.001, 0.001); // VRAsset units are in mm.
                    let srcControllerTree;
                    if (inputSource.profiles[0] == 'htc-vive') {
                        srcControllerTree = assetItem.getChildByName('Controller');
                        localXfo.tr.set(0, -0.035, -0.085);
                    }
                    else {
                        switch (inputSource.handedness) {
                            case 'left':
                                srcControllerTree = assetItem.getChildByName('LeftController');
                                localXfo.tr.set(0, -0.035, -0.085);
                                localXfo.sc.scaleInPlace(0.85);
                                break;
                            case 'right':
                                srcControllerTree = assetItem.getChildByName('RightController');
                                localXfo.tr.set(0, -0.035, -0.085);
                                localXfo.sc.scaleInPlace(0.85);
                                break;
                            case 'none':
                            case 'left-right':
                            case 'left-right-none':
                                srcControllerTree = assetItem.getChildByName('Controller');
                                break;
                            default:
                                break;
                        }
                    }
                    if (srcControllerTree) {
                        const controllerTree = srcControllerTree.clone({ assetItem });
                        controllerTree.localXfoParam.value = localXfo;
                        this.treeItem.addChild(controllerTree, false);
                    }
                });
            }
        }
        this.tick = 0;
    }
    /**
     * The getHandedness method.
     * @return - The return value.
     */
    getHandedness() {
        return this.inputSource.handedness;
    }
    /**
     * The getId method.
     * @return - The return value.
     */
    getId() {
        return this.id;
    }
    /**
     * The getTreeItem method.
     * @return - The return value.
     */
    getTreeItem() {
        return this.treeItem;
    }
    /**
     * The getTipItem method.
     * @return - The return value.
     */
    getTipItem() {
        return this.tipItem;
    }
    /**
     * The getTipXfo method.
     * @return - The return value.
     */
    getTipXfo() {
        return this.tipItem.globalXfoParam.value;
    }
    /**
     * The getTouchPadValue method.
     * @return - The return value.
     */
    getTouchPadValue() {
        return this.touchpadValue;
    }
    /**
     * The isButtonPressed method.
     * @return - The return value.
     */
    isButtonPressed() {
        return this.buttonPressed;
    }
    /**
     * The getControllerStageLocalXfo method.
     * @return - The return value.
     */
    getControllerStageLocalXfo() {
        return this.xfo;
    }
    /**
     * The getControllerTipStageLocalXfo method.
     * @return - The return value.
     */
    getControllerTipStageLocalXfo() {
        return this.xfo.multiply(this.tipItem.localXfoParam.value);
    }
    // ////////////////////////////////
    /**
     * The updatePose method.
     * @param refSpace - The refSpace value.
     * @param xrFrame - The xrFrame value.
     * @param inputSource - The inputSource value.
     */
    updatePose(refSpace, xrFrame, inputSource) {
        const inputPose = xrFrame.getPose(inputSource.gripSpace, refSpace);
        // We may not get a inputPose back in cases where the input source has lost
        // tracking or does not know where it is relative to the given frame
        // of reference.
        if (!inputPose || !inputPose.transform) {
            return;
        }
        this.mat4.setDataArray(inputPose.transform.matrix);
        this.xfo.setFromMat4(this.mat4);
        // const pos = inputPose.transform.position;
        // this.xfo.tr.set(pos.x, pos.y,pos.z);
        // const ori = inputPose.transform.orientation;
        // this.xfo.ori.set(ori.x, ori.y, ori.z, ori.x);
        // //////////////////////////////
        this.treeItem.localXfoParam.value = this.xfo;
        // Reset the geom at tip so it will be recomputed if necessary
        this.hitTested = false;
        // /////////////////////////////////
        // Simulate Pointer Enter/Leave Events.
        // Check for pointer over every Nth frame (at 90fps this should be fine.)
        if (this.raycastDist > 0.0 && this.raycastTick > 0 && this.tick % this.raycastTick == 0) {
            const intersectionData = this.getGeomItemAtTip();
            if (intersectionData != undefined) {
                const event = new XRControllerEvent(this.xrvp, this, 0, this.buttonPressed ? 1 : 0);
                event.intersectionData = intersectionData;
                event.pointerRay = this.pointerRay;
                if (intersectionData.geomItem != this.pointerOverItem) {
                    if (this.pointerOverItem) {
                        event.leftGeometry = this.pointerOverItem;
                        this.pointerOverItem.onPointerLeave(event);
                        if (event.propagating)
                            this.xrvp.emit('pointerLeaveGeom', event);
                    }
                    event.propagating = true;
                    this.pointerOverItem = intersectionData.geomItem;
                    this.pointerOverItem.onPointerEnter(event);
                    if (event.propagating)
                        this.xrvp.emit('pointerOverGeom', event);
                }
                // emit the pointer move event directly to the item.
                intersectionData.geomItem.onPointerMove(event);
            }
            else if (this.pointerOverItem) {
                const event = new XRControllerEvent(this.xrvp, this, 0, this.buttonPressed ? 1 : 0);
                event.pointerRay = this.pointerRay;
                event.leftGeometry = this.pointerOverItem;
                this.pointerOverItem.onPointerLeave(event);
                this.pointerOverItem = null;
            }
        }
        this.inputSource.gamepad.buttons.forEach((button, index) => {
            if (index == 0)
                return;
            if (button.pressed && !this.pressedButtons[index]) {
                this.pressedButtons[index] = true;
                const event = new XRControllerEvent(this.xrvp, this, index, 1);
                event.intersectionData = this.getGeomItemAtTip();
                event.pointerRay = this.pointerRay;
                this.emit('buttonPressed', event);
            }
            else if (!button.pressed && this.pressedButtons[index]) {
                this.pressedButtons[index] = false;
                const event = new XRControllerEvent(this.xrvp, this, index, 0);
                this.emit('buttonReleased', event);
            }
        });
        this.tick++;
    }
    // ////////////////////////////////
    /**
     * The getGeomItemAtTip method.
     * @return - The return value.
     */
    getGeomItemAtTip() {
        if (this.hitTested)
            return this.intersectionData;
        this.hitTested = true;
        if (this.raycastDist == 0)
            return null;
        const renderer = this.xrvp.getRenderer();
        const xfo = this.tipItem.globalXfoParam.value.clone();
        xfo.sc.set(1, 1, 1);
        this.pointerRay.start = xfo.tr;
        this.pointerRay.dir = xfo.ori.getZaxis().negate();
        const dist = this.raycastDist * this.xrvp.stageScale;
        const area = this.raycastArea * this.xrvp.stageScale;
        if (dist != this.raycastDistCache || area != this.raycastAreaCache) {
            this.rayCastRenderTargetProjMatrix.setOrthographicMatrix(area * -0.5, area * 0.5, area * -0.5, area * 0.5, 0.0, dist);
            this.raycastDistCache = dist;
            this.raycastAreaCache = area;
        }
        this.intersectionData = renderer.raycastWithProjection(xfo, this.rayCastRenderTargetProjMatrix, this.pointerRay);
        return this.intersectionData;
    }
}
export { XRController };
//# sourceMappingURL=XRController.js.map