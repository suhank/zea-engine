import { Xfo, Ray } from '../../Math/index';
import { BaseTool, TreeItem } from '../../SceneTree/index';
import { IntersectionData } from '../../Utilities/IntersectionData';
/** Class representing a VR controller. */
declare class XRController {
    id: number;
    buttonPressed: boolean;
    private xrvp;
    private inputSource;
    private mat4;
    private xfo;
    private treeItem;
    private tipItem;
    raycastTick: number;
    raycastArea: number;
    raycastDist: number;
    pointerRay: Ray;
    private raycastAreaCache;
    private raycastDistCache;
    private rayCastRenderTargetProjMatrix;
    private tick;
    private touchpadValue;
    private hitTested;
    private pointerOverItem;
    private intersectionData;
    capturedItem: TreeItem | BaseTool;
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
     */
    updatePose(refSpace: any, xrFrame: any, inputSource: any): void;
    /**
     * The getGeomItemAtTip method.
     * @return - The return value.
     */
    getGeomItemAtTip(): IntersectionData;
}
export { XRController };
