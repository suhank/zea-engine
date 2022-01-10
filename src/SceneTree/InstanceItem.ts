/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
import { Xfo } from '../Math/index'
import { TreeItem } from './TreeItem'
import { Registry } from '../Registry'
import { BinReader } from './BinReader'
import { CloneContext } from './CloneContext'
import { AssetLoadContext } from './AssetLoadContext'
import { BaseItem } from './BaseItem'
import { Parameter } from './Parameters/Parameter'
import { ChildAddedEvent } from '..'
import { BaseEvent } from '../Utilities/BaseEvent'

/**
 * TreeItem type of class designed for making duplications of parts of the tree.
 *
 * @extends {TreeItem}
 */
class InstanceItem extends TreeItem {
  protected srcTreePath: Array<string> = []
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
  setSrcTree(treeItem: TreeItem): void {
    this.srcTree = treeItem
    const clonedContext = new CloneContext()
    const clonedTree = this.srcTree.clone(clonedContext)
    clonedTree.localXfoParam.value = new Xfo()
    this.addChild(clonedTree, false)
  }

  /**
   * Returns the last `TreeItem` cloned.
   *
   * @return - The return value.
   */
  getSrcTree(): TreeItem {
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
  readBinary(reader: BinReader, context: AssetLoadContext): void {
    super.readBinary(reader, context)

    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    this.srcTreePath = reader.loadStrArray()
    if (this.srcTreePath.length > 0) {
      try {
        context.resolvePath(
          this.srcTreePath,
          (treeItem: BaseItem | Parameter<any>) => {
            this.setSrcTree(<TreeItem>treeItem)
          },
          (error: Error) => {
            console.warn(
              `Error loading InstanceItem: ${this.getPath()}, unable to resolve: ${this.srcTreePath}. ` + error.message
            )
          }
        )
      } catch (error: any) {
        console.warn(`Error loading InstanceItem: ${this.getPath()}: ` + error)
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
  fromJSON(j: Record<string, any>, context: Record<string, any> = {}): void {}

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new instance item, copies its values
   * from this item and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned geom item.
   */
  clone(context?: CloneContext): InstanceItem {
    const cloned = new InstanceItem()
    cloned.copyFrom(this, context)

    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param src - The tree item to copy from.
   * @param context - The context value.
   */
  copyFrom(src: TreeItem, context?: CloneContext): void {
    super.copyFrom(src, context)

    this.srcTreePath = (<InstanceItem>src).srcTreePath
    if (this.srcTreePath.length > 0 && this.getNumChildren() == 0) {
      src.once('childAdded', (event: BaseEvent) => {
        const childAddedEvent = event as ChildAddedEvent
        const childItem = childAddedEvent.childItem
        this.setSrcTree(childItem)
      })
    }
  }
}

Registry.register('InstanceItem', InstanceItem)

export { InstanceItem }
