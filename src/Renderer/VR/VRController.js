import { SystemDesc } from '../../SystemDesc.js'
import { Vec3, Quat, Xfo, Mat4 } from '../../Math/index'
import { TreeItem } from '../../SceneTree/index'

/** Class representing a VR controller. */
class VRController {
  /**
   * Create a VR controller.
   * @param {any} xrvp - The Vr viewport.
   * @param {any} inputSource - The input source.
   * @param {any} id - The id value.
   */
  constructor(xrvp, inputSource, id) {
    this.xrvp = xrvp
    this.__inputSource = inputSource
    this.id = id
    this.__isDaydramController = SystemDesc.isMobileDevice

    this.__pressedButtons = []

    // /////////////////////////////////
    // Xfo

    this.__mat4 = new Mat4()
    this.__xfo = new Xfo()

    // this.setVisible(true);

    this.__treeItem = new TreeItem('VRController:' + inputSource.handedness + id)
    // Controller coordinate system
    // X = Horizontal.
    // Y = Up.
    // Z = Towards handle base.

    if (!this.__isDaydramController) {
      // A Vive or Occulus Touch Controller
      this.__tip = new TreeItem('Tip')
      // Note: the tip of the controller need to be off
      // the end of the controller. getGeomItemAtTip
      // now searches a grid in that area and so we need to
      // ensure that the grid does not touch the controller,
      // else it will return the controller geom from
      // the getGeomItemAtTip function
      const tipXfo = new Xfo()
      tipXfo.tr.set(0.0, -0.05, -0.13)
      // Flip the tip around so +z is forwards.
      // tipXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI)
      this.__tip.getParameter('LocalXfo').setValue(tipXfo)
      this.__treeItem.addChild(this.__tip, false)
      xrvp.getTreeItem().addChild(this.__treeItem)

      this.__activeVolumeSize = 0.04

      xrvp.loadHMDResources().then((asset) => {
        asset.on('loaded', () => {
          let srcControllerTree
          if (id == 0) srcControllerTree = asset.getChildByName('LeftController')
          else if (id == 1) srcControllerTree = asset.getChildByName('RightController')
          if (!srcControllerTree) srcControllerTree = asset.getChildByName('Controller')
          const controllerTree = srcControllerTree.clone()

          controllerTree.getParameter('LocalXfo').setValue(
            new Xfo(
              new Vec3(0, -0.035, -0.085),
              new Quat({ setFromAxisAndAngle: [new Vec3(0, 1, 0), Math.PI] }),
              new Vec3(0.001, 0.001, 0.001) // VRAsset units are in mm.
            )
          )
          this.__treeItem.addChild(controllerTree, false)
        })
      })
    }

    this.tick = 0
  }

  /**
   * The getHandedness method.
   * @return {any} - The return value.
   */
  getHandedness() {
    return this.__inputSource.handedness
  }

  /**
   * The getId method.
   * @return {any} - The return value.
   */
  getId() {
    return this.id
  }

  /**
   * The getTreeItem method.
   * @return {any} - The return value.
   */
  getTreeItem() {
    return this.__treeItem
  }

  /**
   * The getTipItem method.
   * @return {any} - The return value.
   */
  getTipItem() {
    return this.__tip
  }

  /**
   * The getTipXfo method.
   * @return {any} - The return value.
   */
  getTipXfo() {
    return this.__tip.getParameter('GlobalXfo').getValue()
  }

  /**
   * The getTouchPadValue method.
   * @return {any} - The return value.
   */
  getTouchPadValue() {
    return this.__touchpadValue
  }

  /**
   * The isButtonPressed method.
   * @return {boolean} - The return value.
   */
  isButtonPressed() {
    return this.__buttonPressed
  }

  /**
   * The getControllerStageLocalXfo method.
   * @return {any} - The return value.
   */
  getControllerStageLocalXfo() {
    return this.__xfo
  }

  /**
   * The getControllerTipStageLocalXfo method.
   * @return {any} - The return value.
   */
  getControllerTipStageLocalXfo() {
    return this.__xfo.multiply(this.__tip.getParameter('LocalXfo').getValue())
  }

  // ////////////////////////////////

  /**
   * The updatePose method.
   * @param {any} refSpace - The refSpace value.
   * @param {any} xrFrame - The xrFrame value.
   * @param {any} inputSource - The inputSource value.
   */
  updatePose(refSpace, xrFrame, inputSource, event) {
    const inputPose = xrFrame.getPose(inputSource.gripSpace, refSpace)

    // We may not get a inputPose back in cases where the input source has lost
    // tracking or does not know where it is relative to the given frame
    // of reference.
    if (!inputPose || !inputPose.transform) {
      return
    }

    this.__mat4.setDataArray(inputPose.transform.matrix)
    this.__xfo.fromMat4(this.__mat4)

    // const pos = inputPose.transform.position;
    // this.__xfo.tr.set(pos.x, pos.y,pos.z);
    // const ori = inputPose.transform.orientation;
    // this.__xfo.ori.set(ori.x, ori.y, ori.z, ori.x);
    // //////////////////////////////

    this.__treeItem.getParameter('LocalXfo').setValue(this.__xfo)

    // Reset the geom at tip so it will be recomuted if necessary
    this.__geomAtTip = undefined
    this.__hitTested = false

    // /////////////////////////////////
    // Simulate Pointer Enter/Leave Events.
    // Check for pointer over every 3rd frame (at 90fps this should be fine.)
    if (this.tick % 3 == 0 && !event.getCapture()) {
      event.intersectionData = this.getGeomItemAtTip()
      if (event.intersectionData != undefined) {
        if (intersectionData.geomItem != this.pointerOverItem) {
          if (this.pointerOverItem) {
            this.pointerOverItem.onPointerLeave(event)
          }
          this.pointerOverItem = intersectionData.geomItem
          event.geomItem = intersectionData.geomItem
          this.pointerOverItem.onPointerEnter(event)
        }

        if (event.propagating) intersectionData.geomItem.onPointerMove(event)
      } else if (this.pointerOverItem) {
        event.leftGeometry = this.pointerOverItem
        this.pointerOverItem.onPointerLeave(event)
        this.pointerOverItem = null
      }
    }
    this.tick++
  }

  // ////////////////////////////////

  /**
   * The getGeomItemAtTip method.
   * @return {any} - The return value.
   */
  getGeomItemAtTip() {
    if (this.__hitTested) return this.__intersectionData
    this.__hitTested = true

    const renderer = this.xrvp.getRenderer()
    const xfo = this.__tip.getParameter('GlobalXfo').getValue()
    const vol = this.__activeVolumeSize
    this.__intersectionData = renderer.raycastWithXfo(xfo, vol, vol)
    return this.__intersectionData
  }
}

export { VRController }
