import { Vec3, Quat, Xfo, Mat4 } from '../../Math/index'
import { TreeItem } from '../../SceneTree/index'

/** Class representing a VR head.
 * @private
 */
class VRHead {
  protected __xrvp: any
  protected __treeItem: TreeItem
  protected __mat4: Mat4
  protected __localXfo: Xfo
  protected hmdGeomItem: any
  /**
   * Create a VR head.
   * @param {any} xrvp - The VR viewport.
   * @param {any} stageTreeItem - The stageTreeItem value.
   */
  constructor(xrvp: any, stageTreeItem: any) {
    this.__xrvp = xrvp
    this.__treeItem = new TreeItem('VRHead')
    stageTreeItem.addChild(this.__treeItem)

    this.__mat4 = new Mat4()
    this.__localXfo = new Xfo()
  }

  /**
   * The Set wether the HMB is visible in rendering or not. Used in spectator rendering.
   * @param {boolean} state - The visibility value.
   */
  setVisible(state: boolean) {
    if (state && !this.hmdGeomItem) {
      const assetItem = this.__xrvp.getAsset()
      if (!assetItem) return
      const hmdGeomItem = assetItem.getChildByName('HMD')
      if (!hmdGeomItem) return
      this.hmdGeomItem = hmdGeomItem.clone({ assetItem })
      if (this.hmdGeomItem) {
        this.hmdGeomItem.getParameter('LocalXfo').setValue(
          new Xfo(
            new Vec3(0, -0.035, -0.03),
            new Quat(0, 1, 0, Math.PI), // used to be: new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] }),
            new Vec3(0.001, 0.001, 0.001) // VRAsset units are in mm.
          )
        )
        this.__treeItem.addChild(this.hmdGeomItem, false)
      }
    }
    if (this.hmdGeomItem) {
      this.hmdGeomItem.getParameter('Visible').setValue(state)
    }
  }

  /**
   * The update method.
   * @param {any} pose - The pose value.
   */
  update(pose: any) {
    // Old
    // this.__mat4.setDataArray(pose.poseModelMatrix);

    // New
    this.__mat4.setDataArray(pose.transform.matrix)

    this.__localXfo.fromMat4(this.__mat4)

    // const pos = pose.transform.position;
    // this.__localXfo.tr.set(pos.x, pos.y,pos.z);
    // const ori = pose.transform.orientation;
    // this.__localXfo.ori.set(ori.x, ori.y, ori.z, ori.x);

    this.__treeItem.getParameter('LocalXfo').setValue(this.__localXfo)
  }

  /**
   * The getTreeItem method.
   * @return {any} - The return value.
   */
  getTreeItem() {
    return this.__treeItem
  }

  /**
   * The getXfo method.
   * @return {Xfo} - The return value.
   */
  getXfo() {
    return this.__localXfo
  }
}

export { VRHead }
