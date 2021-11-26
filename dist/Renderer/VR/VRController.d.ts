import { Xfo, Mat4 } from '../../Math/index';
import { TreeItem } from '../../SceneTree/index';
import { IntersectionData } from '../../Utilities/IntersectionData';
import { VRViewport } from '.';
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent';
/** Class representing a VR controller. */
declare class VRController {
    id: number;
    buttonPressed: boolean;
    protected xrvp: VRViewport;
    protected inputSource: any;
    protected mat4: Mat4;
    protected xfo: Xfo;
    protected treeItem: TreeItem;
    protected tipItem: TreeItem;
    protected activeVolumeSize: number;
    protected tick: number;
    protected touchpadValue: any;
    protected hitTested: boolean;
    protected pointerOverItem: any;
    protected intersectionData: IntersectionData;
    /**
     * Create a VR controller.
     * @param xrvp - The Vr viewport.
     * @param inputSource - The input source.
     * @param id - The id value.
     */
    constructor(xrvp: any, inputSource: any, id: number);
    /**
     * The getHandedness method.
     * @return - The return value.
     */
    getHandedness(): any;
    /**
     * The getId method.
     * @return - The return value.
     */
    getId(): number;
    /**
     * The getTreeItem method.
     * @return - The return value.
     */
    getTreeItem(): TreeItem;
    /**
     * The getTipItem method.
     * @return - The return value.
     */
    getTipItem(): TreeItem;
    /**
     * The getTipXfo method.
     * @return - The return value.
     */
    getTipXfo(): Xfo;
    /**
     * The getTouchPadValue method.
     * @return - The return value.
     */
    getTouchPadValue(): any;
    /**
     * The isButtonPressed method.
     * @return - The return value.
     */
    isButtonPressed(): boolean;
    /**
     * The getControllerStageLocalXfo method.
     * @return - The return value.
     */
    getControllerStageLocalXfo(): Xfo;
    /**
     * The getControllerTipStageLocalXfo method.
     * @return - The return value.
     */
    getControllerTipStageLocalXfo(): Xfo;
    /**
     * The updatePose method.
     * @param refSpace - The refSpace value.
     * @param xrFrame - The xrFrame value.
     * @param inputSource - The inputSource value.
     * @param event - The event object.
     */
    updatePose(refSpace: any, xrFrame: any, inputSource: any, event: XRPoseEvent): void;
    /**
     * The getGeomItemAtTip method.
     * @return - The return value.
     */
    getGeomItemAtTip(): IntersectionData;
}
export { VRController };
