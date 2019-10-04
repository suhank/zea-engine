import { Xfo } from '../Math'
import { Signal } from '../Utilities'
import { FilePathParameter } from './Parameters'
import { TreeItem, CloneFlags } from './TreeItem.js'
import { loadTextfile } from './Utils.js'
import { sgFactory } from './SGFactory.js'

/** Class representing an instance item.
 * @extends TreeItem
 */
class InstanceItem extends TreeItem {
  /**
   * Create an instance item.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name)
  }

  /**
   * The setSrcTree method.
   * @param {any} treeItem - The treeItem param.
   */
  setSrcTree(treeItem) {
    this.__srcTree = treeItem

    const numChildren = this.__srcTree.getNumChildren()
    if (numChildren == 0) {
      const child = this.__srcTree.clone(CloneFlags.CLONE_FLAG_INSTANCED_TREE)
      child.setLocalXfo(new Xfo())
      this.addChild(child)
    } else {
      for (let i = 0; i < this.__srcTree.getNumChildren(); i++) {
        this.addChild(
          this.__srcTree.getChild(i).clone(CloneFlags.CLONE_FLAG_INSTANCED_TREE)
        )
      }
    }

    // this.__srcTree.childAdded.connect((child)=>{
    //     this.addChild(child.clone(CloneFlags.CLONE_FLAG_INSTANCED_TREE))
    // })
  }

  /**
   * The getSrcTree method.
   * @return {any} - The return value.
   */
  getSrcTree() {
    return this.__srcTree
  }

  // ////////////////////////////////////////
  // Children

  // getChildren() {
  //     return this.__srcTree.getChildren();
  // }

  // numChildren() {
  //     return this.__childItems.length;
  // }

  // getNumChildren() {
  //     return this.__srcTree.getNumChildren();
  // }

  // getChild(index) {
  //     return this.__srcTree.getChild(index);
  // }

  // getChildByName(name) {
  //     return this.__srcTree.getChildByName(name);
  // }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The readBinary method.
   * @param {object} reader - The reader param.
   * @param {object} context - The context param.
   */
  readBinary(reader, context = {}) {
    super.readBinary(reader, context)

    // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
    const path = reader.loadStrArray()
    // console.log("InstanceItem of:", path)
    context.resolvePath(path, treeItem => {
      this.setSrcTree(treeItem)
    })
  }

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context = {}, flags = 0) {
    const j = super.toJSON(context, flags)
    return j
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @param {any} onDone - The onDone param.
   */
  fromJSON(j, context = {}, flags = 0, onDone) {}
}

sgFactory.registerClass('InstanceItem', InstanceItem)

export { InstanceItem }
