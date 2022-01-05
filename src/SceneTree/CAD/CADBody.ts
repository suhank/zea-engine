import { Color } from '../../Math/Color'
import { Registry } from '../../Registry'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseGeomItem } from '../BaseGeomItem'
import { BinReader } from '../BinReader'
import { CloneContext } from '../CloneContext'
import { Material } from '../Material'
import { CADAsset } from './CADAsset'

/**
 * Represents a Body within a CAD Part. A Body is made up of either a single mesh or a collection of meshes, one for each surface.
 * When a zcad file is produced, the tool can  optimize bodies to contain only one mesh to speed up loading of large models, and support bigger models being loaded.
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** Specifies the material of the geometry item.
 * * **Color(`ColorParameter`):** Specifies the color of the geometry item.
 *
 * @extends BaseGeomItem
 */
class CADBody extends BaseGeomItem {
  __cadAsset: CADAsset
  /**
   * Creates an instance of CADBody setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   * @param {CADAsset} cadAsset - The cadAsset value.
   */
  constructor(name?: string, cadAsset?: CADAsset) {
    super(name)
    this.__cadAsset = cadAsset // Note: used in testing scenes.
  }

  /**
   * Returns the `CADAsset` object in current `CADBody`
   *
   * @return {CADAsset} - The return value.
   */
  getCADAsset() {
    return this.__cadAsset
  }

  /**
   * The clone method constructs a new CADBody, copies its values
   * from this item and returns it.
   *
   * @param {object} context - The context value.
   * @return {CADBody} - The return value.
   */
  clone(context: CloneContext) {
    const cloned = new CADBody()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * The copyFrom method.
   * @param {CADBody} src - The src param.
   * @param {object} context - The context value.
   * @private
   */
  copyFrom(src: CADBody, context: CloneContext) {
    super.copyFrom(src, context)
    this.__cadAsset = src.getCADAsset()
  }

  // ///////////////////////////
  // Persistence

  /**
   * Initializes CADBody's asset, material, version and layers; adding current `CADBody` Geometry Item toall the layers in reader
   *
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    super.readBinary(reader, context)

    // Cache only in debug mode.
    this.__cadAsset = <CADAsset>context.assetItem

    // Note: the bodyDescId is now deprecated as it is part of the parametric surface evaluation code.
    // The BinReader must read the value to continue loading others.
    /* const bodyDescId = */ reader.loadSInt32()

    if (context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
      const materialName = reader.loadStr()
      // const materialName = 'Mat' + this.__bodyDescId;

      const materialLibrary = context.assetItem.getMaterialLibrary()
      let material = materialLibrary.getMaterial(materialName, false)
      if (!material) {
        // console.warn("Body :'" + this.name + "' Material not found:" + materialName);
        // material = materialLibrary.getMaterial('DefaultMaterial');

        material = new Material(materialName, 'SimpleSurfaceShader')
        material.getParameter('BaseColor').setValue(Color.random(0.25))
        context.assetItem.getMaterialLibrary().addMaterial(material)
      }
      this.materialParam.setValue(material)
    }

    if (context.versions['zea-cad'].compare([0, 0, 2]) >= 0 && context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
      this.__layers = reader.loadStrArray()
      // console.log("Layers:", this.__layers)
      // Note: addGeomToLayer should take a 'BaseGeomItem'
      // @ts-ignore
      for (const layer of this.__layers) context.addGeomToLayer(this, layer)
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistences.
   *
   * @param {number} flags - The flags param.
   * @return {object} - The return value.
   */
  toJSON(context: Record<string, any>) {
    const j = super.toJSON()
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The j param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j: Record<string, any>) {
    super.fromJSON(j)
  }
}

Registry.register('CADBody', CADBody)

export { CADBody }
