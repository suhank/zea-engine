import { Color } from '../Math/Color'
import { Vec3 } from '../Math/Vec3'
import { TreeItem } from './TreeItem'
import { Material } from './Material'
import { BinReader } from './BinReader'
import { MaterialParameter } from '../SceneTree/Parameters/MaterialParameter'
import { AssetLoadContext } from './AssetLoadContext'
import { GeomItem } from './GeomItem'

/**
 * Base class that represents geometry items with layering, overlaying and cut away features.
 *
 * **Events**
 * * **cutAwayChanged:** Triggered when the cutaway variables change(if enabled or not, the vector and the distance).
 * @extends TreeItem
 */
class BaseGeomItem extends TreeItem {
  protected overlay: boolean
  protected __cutAway: boolean
  protected __cutAwayVector: Vec3
  protected __cutAwayDist: number
  protected __layers: string[]

  /**
   * @member materialParam - The Material to use when rendering this GeomItem
   */
  materialParam: MaterialParameter = new MaterialParameter('Material')

  /**
   * Create a base geometry item.
   * @param name - The name of the base geom item.
   */
  constructor(name?: string) {
    super(name)
    this.overlay = false
    this.__cutAway = false
    this.__cutAwayVector = new Vec3(1, 0, 0)
    this.__cutAwayDist = 0
    this.__layers = []
  }

  /**
   * Sets overlay value.
   *
   * @todo Need to find the layer and add this item to it.
   * @param val - `true` to enable it.
   */
  setOverlay(val: boolean): void  {
    // TODO: need to find the layer and add this item to it.
    this.overlay = val
  }

  /**
   * Returns `true` if overlay is enabled for current item.
   *
   * @return - The return value.
   */
  isOverlay(): boolean {
    return this.overlay
  }

  /**
   * Adds a layer to current item.
   *
   * @todo Need to find the layer and add this item to it.
   * @param name - The name of the layer.
   */
  addLayer(name: string): void  {
    // TODO: need to find the layer and add this item to it.
    this.__layers.push(name)
  }

  /**
   * Returns all layers in current item.
   *
   * @return - The return value.
   */
  getLayers(): string[] {
    return this.__layers
  }

  // ////////////////////////////////////////
  // Cutaways

  /**
   * Checks if cutaway is enabled.
   *
   * @return - Returns `true` if enabled.
   */
  isCutawayEnabled(): boolean {
    return this.__cutAway
  }

  /**
   * Sets cutaway state.
   *
   * @param state - `true` to enable it, otherwise `false`.
   */
  setCutawayEnabled(state: boolean) {
    this.__cutAway = state
    this.emit('cutAwayChanged')
  }

  /**
   * Returns cutaway vector value.
   *
   * @return - `Vec3` when it is set, `false` on default.
   */
  getCutVector(): Vec3 {
    return this.__cutAwayVector
  }

  /**
   * Sets cutaway vector value.
   *
   * @param cutAwayVector - The cutAwayVector value.
   */
  setCutVector(cutAwayVector: Vec3): void {
    this.__cutAwayVector = cutAwayVector
    this.emit('cutAwayChanged')
  }

  /**
   * Getter for the cutaway distance.
   *
   * @return - The return value.
   */
  getCutDist(): number {
    return this.__cutAwayDist
  }

  /**
   * Sets cutaway distance value.
   *
   * @param cutAwayDist - The cutAwayDist value.
   */
  setCutDist(cutAwayDist: number): void {
    this.__cutAwayDist = cutAwayDist
    this.emit('cutAwayChanged')
  }

  // ///////////////////////////
  // Persistence

  /**
   * Sets state of current Item(Including layers & material) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    super.readBinary(reader, context)

    if (context.versions['zea-engine'].compare([0, 0, 4]) >= 0) {
      const materialName = reader.loadStr()
      // const materialName = 'Material' + this.__bodyDescId;

      const materialLibrary = context.assetItem.getMaterialLibrary()
      let material = materialLibrary.getMaterial(materialName, false)
      if (!material) {
        // console.warn("BaseGeomItem :'" + this.name + "' Material not found:" + materialName);
        // material = materialLibrary.getMaterial('DefaultMaterial');

        material = new Material(materialName, 'SimpleSurfaceShader')
        material.getParameter('BaseColor').loadValue(Color.random(0.25))
        context.assetItem.getMaterialLibrary().addMaterial(material)
      }
      this.materialParam.loadValue(material)

      this.__layers = reader.loadStrArray()
      if (this.__layers.length > 0) {
        // console.log("Layers:", this.__layers)
        for (const layer of this.__layers) context.addGeomToLayer(this, layer)
      }
    }
  }
}

export { BaseGeomItem }
