// import { BinReader, Registry, TreeItem, AssetLoadContext } from '@zeainc/zea-engine'
import { TreeItem, BinReader, AssetLoadContext } from '..'
import { Registry } from '../..'
import { CloneContext } from '../CloneContext'
import { PMIItem } from './PMIItem'

/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends PMIItem
 */
class PMIView extends PMIItem {
  camera: any
  /**
   * Creates an instance of PMIView setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
    this.camera = null
  }

  /**
   * The clone method constructs a new PMIView, copies its values
   * from this item and returns it.
   *
   * @param context - The clone context.
   * @return - The return value.
   */
  clone(context?: CloneContext): PMIView {
    const cloned = new PMIView()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * Changes the current state of the selection of this item.
   * Note: the PMIView also ajusts the camera when activated.
   * The camera should have been provided in the AssetLoadContext when the CADAsset was loaded.
   * ```
   * const asset = new CADAsset()
   * const context = new AssetLoadContext()
   * context.camera = renderer.getViewport().getCamera()
   * asset.load(zcad, context).then(() => {
   *   console.log("Done")
   * })
   * ```
   *
   * @emits `selectedChanged` with selected state
   * @param sel - Boolean indicating the new selection state.
   */
  setSelected(sel: boolean) {
    super.setSelected(sel)
    if (sel) this.activate()
    else this.deactivate()
  }

  /**
   * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
   */
  activate() {
    super.activate()

    if (this.hasParameter('GraphicalElements')) {
      const pmiContainer = (this.getOwner() as TreeItem).getOwner() as TreeItem
      const pmiOwner = (pmiContainer as TreeItem).getOwner()
      if (pmiOwner) {
        const pmiItems: TreeItem[] = []
        pmiContainer.traverse((item: TreeItem) => {
          if (item instanceof PMIView) return
          if (item instanceof PMIItem) pmiItems.push(item)
        })
        const graphicalItems = this.getParameter('GraphicalElements').getValue()
        pmiItems.forEach((pmiItem) => {
          const visible = graphicalItems.includes(pmiItem.getName())
          pmiItem.setVisible(visible)
        })
      }
    }

    if (this.camera) {
      const cameraXfo = this.getParameter('GlobalXfo').getValue().clone()
      const TargetPoint = this.getParameter('TargetPoint').getValue()
      const CameraType = this.getParameter('CameraType').getValue()
      if (CameraType == 'Camera_Orthographic') {
        this.camera.setIsOrthographic(1)
      }

      // const UpDirection = this.getParameter('UpDirection').getValue()
      TargetPoint.scaleInPlace(cameraXfo.sc.z)
      const dist = cameraXfo.tr.distanceTo(TargetPoint) // * cameraXfo.sc.z
      cameraXfo.sc.set(1.0, 1.0, 1.0)

      this.camera.getParameter('GlobalXfo').setValue(cameraXfo)
      this.camera.setFocalDistance(dist)
    }
  }

  /**
   * Deactivates the PMIItem
   */
  deactivate() {
    super.deactivate()

    if (this.hasParameter('GraphicalElements')) {
      const pmiContainer = (this.getOwner() as TreeItem).getOwner() as TreeItem
      const pmiOwner = pmiContainer.getOwner()
      if (pmiOwner) {
        const pmiItems: TreeItem[] = []
        pmiContainer.traverse((item: TreeItem) => {
          if (item instanceof PMIView) return
          if (item instanceof PMIItem) pmiItems.push(item)
        })
        pmiItems.forEach((pmiItem) => {
          pmiItem.setVisible(true)
        })
      }
    }
    if (this.camera) {
      this.camera.setIsOrthographic(0)
    }
  }

  // ///////////////////////////
  // Persistence

  /**
   * Load the binary data for this class
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    super.readBinary(reader, context)

    // @ts-ignore
    if (context.camera) {
      // @ts-ignore
      this.camera = context.camera
    }
  }
}

Registry.register('PMIView', PMIView)

export { PMIView }
