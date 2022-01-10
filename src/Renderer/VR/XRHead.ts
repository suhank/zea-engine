import { Vec3, Quat, Xfo, Mat4 } from '../../Math/index'
import { TreeItem } from '../../SceneTree/index'

/** Class representing a VR head.
 * @private
 */
class XRHead {
  protected __xrvp: any
  protected __treeItem: TreeItem
  protected __mat4: Mat4
  protected __localXfo: Xfo
  protected hmdGeomItem: any
  /**
   * Create a VR head.
   * @param xrvp - The VR viewport.
   * @param stageTreeItem - The stageTreeItem value.
   */
  constructor(xrvp: any, stageTreeItem: any) {
    this.__xrvp = xrvp
    this.__treeItem = new TreeItem('XRHead')
    stageTreeItem.addChild(this.__treeItem)

    this.__mat4 = new Mat4()
    this.__localXfo = new Xfo()
  }

  /**
   * The Set wether the HMB is visible in rendering or not. Used in spectator rendering.
   * @param state - The visibility value.
   */
  setVisible(state: boolean): void {
    if (state && !this.hmdGeomItem) {
      const assetItem = this.__xrvp.getAsset()
      if (!assetItem) return
      const hmdGeomItem = assetItem.getChildByName('HMD')
      if (!hmdGeomItem) return
      this.hmdGeomItem = hmdGeomItem.clone({ assetItem })
      if (this.hmdGeomItem) {
        this.hmdGeomItem.localXfoParam.value = new Xfo(
          new Vec3(0, -0.035, -0.03),
          new Quat(0, 1, 0, Math.PI), // used to be: new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] }),
          new Vec3(0.001, 0.001, 0.001) // VRAsset units are in mm.
        )

        this.__treeItem.addChild(this.hmdGeomItem, false)
      }
    }
    if (this.hmdGeomItem) {
      this.hmdGeomItem.visibleParam.value = state
    }
  }

  /**
   * The update method.
   * @param pose - The pose value.
   */
  update(pose: any): void {
    // Old
    // this.__mat4.setDataArray(pose.poseModelMatrix);

    // New
    this.__mat4.setDataArray(pose.transform.matrix)

    this.__localXfo.setFromMat4(this.__mat4)

    // const pos = pose.transform.position;
    // this.__localXfo.tr.set(pos.x, pos.y,pos.z);
    // const ori = pose.transform.orientation;
    // this.__localXfo.ori.set(ori.x, ori.y, ori.z, ori.x);

    this.__treeItem.localXfoParam.value = this.__localXfo
  }

  /**
   * The getTreeItem method.
   * @return - The return value.
   */
  getTreeItem(): TreeItem {
    return this.__treeItem
  }

  /**
   * The getXfo method.
   * @return - The return value.
   */
  getXfo(): Xfo {
    return this.__localXfo
  }
}

export { XRHead }
