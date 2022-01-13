import { Xfo, Box3, Vec3, Mat4, Color } from '../../Math/index'
import { Registry } from '../../Registry'
import { AssetLoadContext } from '../AssetLoadContext'
import { BaseGeomItem } from '../BaseGeomItem'
import { GeomItem } from '../GeomItem'
import { BinReader } from '../BinReader'
import { CloneContext } from '../CloneContext'
import { Material } from '../Material'
import { CADAsset } from './CADAsset'
import { StateChangedEvent } from '../..'

/**
 * Represents a Body within a CAD Part. A Body is made up of either a single mesh or a collection of meshes, one for each surface.
 * When a zcad file is produced, the tool can  optimize bodies to contain only one mesh to speed up loading of large models, and support bigger models being loaded.
 *
 * @extends GeomItem
 */
class CADBody extends GeomItem {
  shattered: boolean = false
  /**
   * Creates an instance of CADBody setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   * @param {CADAsset} cadAsset - The cadAsset value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * Sets the state of this CADBody whether the geometry isdisplayed as
   * 'shattered', meaning that each face, edge and vertex can be selected
   * individually.
   *
   * @param state - The state value.
   */
  setShatterState(state: boolean) {
    if (this.shattered != state) {
      this.shattered = state
      this.emit('shatterStateChanged', new StateChangedEvent(state))
    }
  }

  /**
   * The clone method constructs a new CADBody, copies its values
   * from this item and returns it.
   *
   * @param {object} context - The context value.
   * @return {CADBody} - The return value.
   */
  clone(context: CloneContext): CADBody {
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
  copyFrom(src: CADBody, context: CloneContext): void {
    super.copyFrom(src, context)
  }

  // ///////////////////////////
  // Persistence

  /**
   * Initializes CADBody's asset, material, version and layers; adding current `CADBody` Geometry Item toall the layers in reader
   *
   * @param reader - The reader param.
   * @param context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    if (context.versions['zea-cad'].compare([3, 8, 2]) < 0) {
      BaseGeomItem.prototype.readBinary.call(this, reader, context)
      // Note: the bodyDescId is now deprecated as it is part of the parametric surface evaluation code.
      // The BinReader must read the value to continue loading others.
      /* const bodyDescId = */ reader.loadSInt32()

      if (context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
        const materialName = reader.loadStr()

        const materialLibrary = context.assetItem.getMaterialLibrary()
        let material = materialLibrary.getMaterial(materialName, false)
        if (!material) {
          material = new Material(materialName, 'SimpleSurfaceShader')
          material.getParameter('BaseColor').setValue(Color.random(0.25))
          context.assetItem.getMaterialLibrary().addMaterial(material)
        }
        this.materialParam.setValue(material)
      }

      if (context.versions['zea-cad'].compare([0, 0, 2]) >= 0 && context.versions['zea-cad'].compare([0, 0, 4]) < 0) {
        this.__layers = reader.loadStrArray()
        // console.log("Layers:", this.__layers)
        // Note: addGeomToLayer should take a 'GeomItem'
        // @ts-ignore
        for (const layer of this.__layers) context.addGeomToLayer(this, layer)
      }
    } else {
      super.readBinary(reader, context)
    }
  }
}

Registry.register('CADBody', CADBody)

export { CADBody }
