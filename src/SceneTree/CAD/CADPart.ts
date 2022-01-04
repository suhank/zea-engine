// import { TreeItem, Registry, BinReader, AssetLoadContext } from '@zeainc/zea-engine'

import { TreeItem, BinReader, AssetLoadContext } from ".."
import { Registry } from "../.."
import { CloneContext } from "../CloneContext"

/**
 * Represents a Part within a CAD assembly.
 *
 * @extends TreeItem
 */
class CADPart extends TreeItem {
  /**
   * Creates an instance of CADPart setting up the initial configuration for Material and Color parameters.
   *
   * @param {string} name - The name value.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * The clone method constructs a new CADPart, copies its values
   * from this item and returns it.
   *
   * @param {number} flags - The flags param.
   * @return {CADPart} - The return value.
   */
  clone(context?: CloneContext) {
    const cloned = new CADPart()
    cloned.copyFrom(this, context)
    return cloned
  }

  /**
   * The copyFrom method.
   * @param {CADPart} src - The src param.
   * @param {number} flags - The flags param.
   * @private
   */
  copyFrom(src: CADPart, context?: CloneContext) {
    super.copyFrom(src, context)
  }

  // ///////////////////////////
  // Persistence

  /**
   * Initializes CADPart's asset, material, version and layers; adding current `CADPart` Geometry Item toall the layers in reader
   *
   * @param {BinReader} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader: BinReader, context: AssetLoadContext) {
    super.readBinary(reader, context)
  }

  /**
   * The toJSON method encodes this type as a json object for persistences.
   *
   * @param {number} flags - The flags param.
   * @return {object} - The return value.
   */
  toJSON(context?: Record<string, any>) {
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The j param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j?: Record<string, any>) {
    super.fromJSON(j)
  }
}

Registry.register('CADPart', CADPart)

export { CADPart }
