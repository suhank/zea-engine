/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
import { Xfo } from '../Math/index'
import { TreeItem } from './TreeItem'
import { Registry } from '../Registry'
import { BinReader } from './BinReader'

/**
 * TreeItem type of class designed for making duplications of parts of the tree.
 *
 * @extends {TreeItem}
 */
class InstanceItem extends TreeItem {
  protected srcTree: TreeItem | null = null
  /**
   * Create an instance item.
   * @param name - The name of the instance item.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * Clones passed in `TreeItem` all the way down and adds it as a child of current item.
   *
   * @param treeItem - The treeItem value.
   */
  setSrcTree(treeItem: TreeItem, context: Record<string, any>) {
    this.srcTree = treeItem
    const clonedTree = this.srcTree.clone(context)
    clonedTree.localXfoParam.value = new Xfo()
    this.addChild(clonedTree, false)
  }

  /**
   * Returns the last `TreeItem` cloned.
   *
   * @return - The return value.
   */
  getSrcTree() {
    return this.srcTree
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current Item(Including cloned item) using a binary reader object.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any> = {}) {
    super.readBinary(reader, context)

    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    const path = reader.loadStrArray()
    if (path.length > 0) {
      // console.log("InstanceItem of:", path)
      try {
        context.resolvePath(
          path,
          (treeItem) => {
            this.setSrcTree(treeItem, context)
          },
          (error) => {
            console.warn(`Error loading InstanceItem: ${this.getPath()}, unable to resolve: ${path}. ` + error.message)
          }
        )
      } catch (error) {
        console.warn(`Error loading InstanceItem: ${this.getPath()}: ` + error.message)
      }
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context = {}): Record<string, any> {
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @todo Needs to be implemented.
   * @param j - The json object this item must decode.
   * @param context - The context value.
   * @param onDone - The onDone value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any> = {}) {}

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new instance item, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned geom item.
   */
  clone(context?: Record<string, any>) {
    const cloned = new InstanceItem()
    cloned.copyFrom(this, context)
    return cloned
  }

}

Registry.register('InstanceItem', InstanceItem)

export { InstanceItem }
