import { Registry } from "../../Registry"
import { AssetLoadContext } from "../AssetLoadContext"
import { BinReader } from "../BinReader"
import { CloneContext } from "../CloneContext"
import { TreeItem } from "../TreeItem"

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
  clone(context?: CloneContext): CADPart {
    const cloned = new CADPart()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('CADPart', CADPart)

export { CADPart }
