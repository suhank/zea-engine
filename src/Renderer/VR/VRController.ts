import { SystemDesc } from '../../SystemDesc'
import { Vec3, Xfo, Mat4 } from '../../Math/index'
import { TreeItem } from '../../SceneTree/index'
import { IntersectionData } from '../../Utilities/IntersectionData'
import { VRViewport } from '.'
import { XRPoseEvent } from '../../Utilities/Events/XRPoseEvent'

/** Class representing a VR controller. */
class VRController {
  id: number
  buttonPressed: boolean
  protected xrvp: VRViewport
  protected inputSource: any
  protected mat4: Mat4
  protected xfo: Xfo
  protected treeItem: TreeItem
  protected tipItem: TreeItem
  protected activeVolumeSize: number = 0.04
  protected tick: number
  protected touchpadValue: any
  protected hitTested: boolean
  protected pointerOverItem: any
  protected intersectionData: IntersectionData
  /**
   * Create a VR controller.
   * @param xrvp - The Vr viewport.
   * @param inputSource - The input source.
   * @param id - The id value.
   */
  constructor(xrvp: any, inputSource: any, id: number) {
    this.xrvp = xrvp
    this.inputSource = inputSource
    this.id = id
    this.buttonPressed = false

    // /////////////////////////////////
    // Xfo

    this.mat4 = new Mat4()
    this.xfo = new Xfo()

    // this.setVisible(true);

    this.treeItem = new TreeItem('VRController:' + inputSource.handedness + id)
    // Controller coordinate system
    // X = Horizontal.
    // Y = Up.
    // Z = Towards handle base.

    if (!SystemDesc.isMobileDevice) {
      // A Vive or Oculus Controller
      this.tipItem = new TreeItem('Tip')
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
      this.tipItem.localXfoParam.value = tipXfo
      this.treeItem.addChild(this.tipItem, false)
      xrvp.getTreeItem().addChild(this.treeItem)

      if (inputSource.targetRayMode == 'tracked-pointer') {
        // Once we have an input profile, we can determine the XR Device in use.
        switch (inputSource.profiles[0]) {
          case 'htc-vive':
            localStorage.setItem('ZeaEngine_XRDevice', 'Vive')
            break
          case 'oculus-touch':
          case 'oculus-touch-v2':
          case 'oculus-touch-v3':
            localStorage.setItem('ZeaEngine_XRDevice', 'Oculus')
            break
          default:
            break
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
        xrvp.loadHMDResources().then((assetItem: any) => {
          if (!assetItem) return
          const localXfo = new Xfo()
          localXfo.ori.setFromAxisAndAngle(new Vec3(0, 1, 0), Math.PI)
          localXfo.sc.set(0.001, 0.001, 0.001) // VRAsset units are in mm.

          let srcControllerTree
          if (inputSource.profiles[0] == 'htc-vive') {
            srcControllerTree = assetItem.getChildByName('Controller')
            localXfo.tr.set(0, -0.035, -0.085)
          } else {
            switch (inputSource.handedness) {
              case 'left':
                srcControllerTree = assetItem.getChildByName('LeftController')
                localXfo.tr.set(0, -0.035, -0.085)
                localXfo.sc.scaleInPlace(0.85)
                break
              case 'right':
                srcControllerTree = assetItem.getChildByName('RightController')
                localXfo.tr.set(0, -0.035, -0.085)
                localXfo.sc.scaleInPlace(0.85)
                break
              case 'none':
              case 'left-right':
              case 'left-right-none':
                srcControllerTree = assetItem.getChildByName('Controller')
                break
              default:
                break
            }
          }
          if (srcControllerTree) {
            const controllerTree = srcControllerTree.clone({ assetItem })
            controllerTree.localXfoParam.value = localXfo
            this.treeItem.addChild(controllerTree, false)
          }
        })
      }
    }

    this.tick = 0
  }

  /**
   * The getHandedness method.
   * @return - The return value.
   */
  getHandedness() {
    return this.inputSource.handedness
  }

  /**
   * The getId method.
   * @return - The return value.
   */
  getId() {
    return this.id
  }

  /**
   * The getTreeItem method.
   * @return - The return value.
   */
  getTreeItem() {
    return this.treeItem
  }

  /**
   * The getTipItem method.
   * @return - The return value.
   */
  getTipItem() {
    return this.tipItem
  }

  /**
   * The getTipXfo method.
   * @return - The return value.
   */
  getTipXfo() {
    return this.tipItem.globalXfoParam.value
  }

  /**
   * The getTouchPadValue method.
   * @return - The return value.
   */
  getTouchPadValue() {
    return this.touchpadValue
  }

  /**
   * The isButtonPressed method.
   * @return - The return value.
   */
  isButtonPressed() {
    return this.buttonPressed
  }

  /**
   * The getControllerStageLocalXfo method.
   * @return - The return value.
   */
  getControllerStageLocalXfo() {
    return this.xfo
  }

  /**
   * The getControllerTipStageLocalXfo method.
   * @return - The return value.
   */
  getControllerTipStageLocalXfo() {
    return this.xfo.multiply(this.tipItem.localXfoParam.value)
  }

  // ////////////////////////////////

  /**
   * The updatePose method.
   * @param refSpace - The refSpace value.
   * @param xrFrame - The xrFrame value.
   * @param inputSource - The inputSource value.
   * @param event - The event object.
   */
  updatePose(refSpace: any, xrFrame: any, inputSource: any, event: XRPoseEvent) {
    const inputPose = xrFrame.getPose(inputSource.gripSpace, refSpace)

    // We may not get a inputPose back in cases where the input source has lost
    // tracking or does not know where it is relative to the given frame
    // of reference.
    if (!inputPose || !inputPose.transform) {
      return
    }

    this.mat4.setDataArray(inputPose.transform.matrix)
    this.xfo.setFromMat4(this.mat4)

    // const pos = inputPose.transform.position;
    // this.xfo.tr.set(pos.x, pos.y,pos.z);
    // const ori = inputPose.transform.orientation;
    // this.xfo.ori.set(ori.x, ori.y, ori.z, ori.x);
    // //////////////////////////////

    this.treeItem.localXfoParam.value = this.xfo

    // Reset the geom at tip so it will be recomputed if necessary
    this.hitTested = false

    // /////////////////////////////////
    // Simulate Pointer Enter/Leave Events.
    // Check for pointer over every Nth frame (at 90fps this should be fine.)
    if (this.tick % 5 == 0 && !event.getCapture()) {
      const intersectionData = this.getGeomItemAtTip()
      if (intersectionData != undefined) {
        event.intersectionData = intersectionData
        if (intersectionData.geomItem != this.pointerOverItem) {
          if (this.pointerOverItem) {
            this.pointerOverItem.onPointerLeave(event)
          }
          this.pointerOverItem = intersectionData.geomItem
          event.intersectionData = intersectionData
          this.pointerOverItem.onPointerEnter(event)
        }

        // emit the pointer move event directly to the item.
        intersectionData.geomItem.onPointerMove(event)
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
   * @return - The return value.
   */
  getGeomItemAtTip() {
    if (this.hitTested) return this.intersectionData
    this.hitTested = true

    const renderer = this.xrvp.getRenderer()
    const xfo = this.tipItem.globalXfoParam.value
    const vol = this.activeVolumeSize
    this.intersectionData = renderer.raycastWithXfo(xfo, vol, vol)
    return this.intersectionData
  }
}

export { VRController }
