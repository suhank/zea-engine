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
  protected __srcTree: TreeItem
  /**
   * Create an instance item.
   * @param {string} name - The name of the instance item.
   */
  constructor(name?: string) {
    super(name)
  }

  /**
   * Clones passed in `TreeItem` all the way down and adds it as a child of current item.
   *
   * @param {TreeItem} treeItem - The treeItem value.
   */
  setSrcTree(treeItem: TreeItem, context: Record<string, any>) {
    this.__srcTree = treeItem

    const numChildren = this.__srcTree.getNumChildren()
    if (numChildren == 0) {
      const clonedTree = this.__srcTree.clone(context)
      clonedTree.getParameter('LocalXfo').loadValue(new Xfo())
      this.addChild(clonedTree, false)
    } else {
      const children = this.__srcTree.getChildren()
      children.forEach((child: any) => {
        const clonedChild = child.clone(context)
        this.addChild(clonedChild, false)
      })
    }
  }

  /**
   * Returns the last `TreeItem` cloned.
   *
   * @return {TreeItem} - The return value.
   */
  getSrcTree() {
    return this.__srcTree
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Sets state of current Item(Including cloned item) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<any,any>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any> = {}) {
    super.readBinary(reader, context)

    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    const path = reader.loadStrArray()
    // console.log("InstanceItem of:", path)
    try {
      context.resolvePath(path, (treeItem: TreeItem) => {
        this.setSrcTree(treeItem, context)
      })
    } catch (e) {
      console.warn(`Error loading InstanceItem: ${this.getPath()}: ` + e.message)
    }
  }

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context = {}): Record<string, any> {
    const j = super.toJSON(context)
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @todo Needs to be implemented.
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   * @param {function} onDone - The onDone value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any> = {}) {}
}

Registry.register('InstanceItem', InstanceItem)

export { InstanceItem }
