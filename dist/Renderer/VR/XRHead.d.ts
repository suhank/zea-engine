import { Xfo, Mat4 } from '../../Math/index';
import { TreeItem } from '../../SceneTree/index';
/** Class representing a VR head.
 * @private
 */
declare class XRHead {
    protected __xrvp: any;
    protected __treeItem: TreeItem;
    protected __mat4: Mat4;
    protected __localXfo: Xfo;
    protected hmdGeomItem: any;
    /**
     * Create a VR head.
     * @param xrvp - The VR viewport.
     * @param stageTreeItem - The stageTreeItem value.
     */
    constructor(xrvp: any, stageTreeItem: any);
    /**
     * The Set wether the HMB is visible in rendering or not. Used in spectator rendering.
     * @param state - The visibility value.
     */
    setVisible(state: boolean): void;
    /**
     * The update method.
     * @param pose - The pose value.
     */
    update(pose: any): void;
    /**
     * The getTreeItem method.
     * @return - The return value.
     */
    getTreeItem(): TreeItem;
    /**
     * The getXfo method.
     * @return - The return value.
     */
    getXfo(): Xfo;
}
export { XRHead };
