/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ItemSetParameter } from '../Parameters/index'
import { TreeItem } from '../TreeItem'
import { BaseItem } from '../../SceneTree/BaseItem'

/**
 * BaseGroup are a special type of `TreeItem` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **Items(`ItemSetParameter`):** _todo_
 *
 * @extends TreeItem
 */
class BaseGroup extends TreeItem {
  protected __itemsParam: ItemSetParameter
  searchRoot: TreeItem

  /**
   * Creates an instance of a group.
   *
   * @param {string} name - The name of the group.
   */
  constructor(name: string) {
    super(name)

    this.__itemsParam = this.addParameter(
      new ItemSetParameter('Items', (item: any) => item instanceof TreeItem)
    ) as ItemSetParameter

    this.__itemsParam.on('itemAdded', (event: any) => {
      this.bindItem(event.item, event.index)
    })
    this.__itemsParam.on('itemRemoved', (event: any) => {
      this.unbindItem(event.item, event.index)
    })
  }

  // ////////////////////////////////////////
  // Items

  /**
   *  sets the root item to be used as the search root.
   * @param {TreeItem} treeItem
   */
  setSearchRoot(treeItem: TreeItem): void {
    this.searchRoot = treeItem
  }

  /**
   * The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.
   *
   * @param {TreeItem} ownerItem - The new owner item.
   */
  setOwner(ownerItem: TreeItem): void {
    if (!this.searchRoot || this.searchRoot == this.getOwner()) this.searchRoot = ownerItem
    super.setOwner(ownerItem)
  }

  /**
   * This method is mostly used in our demos,
   * and should be removed from the interface.
   *
   * @deprecated
   * @param {array} paths - The paths value.
   * @private
   */
  setPaths(paths: string[]): void {
    this.clearItems(false)

    const searchRoot = this.getOwner()
    if (this.searchRoot == undefined) {
      console.warn('BaseGroup does not have an owner and so cannot resolve paths:', this.getName())
      return
    }
    const items: any = []
    paths.forEach((path: any) => {
      const treeItem = this.searchRoot.resolvePath(path)
      if (treeItem) items.push(treeItem)
      else {
        console.warn('Path does not resolve to an Item:', path, ' group:', this.getName())
      }
    })
    this.setItems(items)
  }

  /**
   * Uses the specified list of paths to look and get each `BaseItem` object and add it to BaseGroup's `Items` parameter.
   *
   * @param {array} paths - The paths value.
   */
  resolveItems(paths: string[]): void {
    this.setPaths(paths)
  }

  /**
   * The __bindItem method.
   * @param {TreeItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  protected bindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return
    item.on('pointerDown', this.onPointerDown)
    item.on('pointerUp', this.onPointerUp)
    item.on('pointerMove', this.onPointerMove)
    item.on('pointerEnter', this.onPointerEnter)
    item.on('pointerLeave', this.onPointerLeave)
  }

  /**
   * The __unbindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  protected unbindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return
    item.off('pointerDown', this.onPointerDown)
    item.off('pointerUp', this.onPointerUp)
    item.off('pointerMove', this.onPointerMove)
    item.off('pointerEnter', this.onPointerEnter)
    item.off('pointerLeave', this.onPointerLeave)
  }

  /**
   * Adds an item to the group(See `Items` parameter).
   *
   * @param {TreeItem} item - The item value.
   * @param {boolean} emit - The emit value.
   */
  addItem(item: TreeItem, emit = true): void {
    if (!item) {
      console.warn('Error adding item to group. Item is null')
      return
    }
    this.__itemsParam.addItem(item, emit)
  }

  /**
   * Removes an item from the group(See `Items` parameter).
   *
   * @param {TreeItem} item - The item value.
   * @param {boolean} emit - The emit value.
   */
  removeItem(item: TreeItem, emit = true): void {
    const paramItems = this.__itemsParam.getValue()
    if (!paramItems) return

    const itemIndex = Array.from(paramItems).indexOf(item)
    if (itemIndex) this.__itemsParam.removeItem(itemIndex, emit)
  }

  /**
   * Removes all items from the group.
   *
   * @param {boolean} emit - `true` triggers `valueChanged` event.
   */
  clearItems(emit = true): void {
    // Note: Unbind reversed so that indices
    // do not get changed during the unbind.
    const paramItems = this.__itemsParam.getValue()
    if (!paramItems) return
    const items = Array.from(paramItems)
    for (let i = items.length - 1; i >= 0; i--) {
      this.unbindItem(<TreeItem>items[i], i)
    }
    this.__itemsParam.clearItems(emit)
  }

  /**
   * Returns the list of `BaseItem` objects owned by the group.
   *
   * @return {Set<BaseItem>|undefined} - The return value.
   */
  getItems(): Set<BaseItem> | undefined {
    return this.__itemsParam.getValue()
  }

  /**
   * Sets an entire new array of items to the BaseGroup replacing any previous items.
   *
   * @param {Set<BaseItem>} items - List of `BaseItem` you want to add to the group
   */
  setItems(items: Set<BaseItem>): void {
    this.clearItems(false)
    this.__itemsParam.setItems(items)
  }

  // ///////////////////////
  // Events

  /**
   * Occurs when a user presses a mouse button over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   *
   * @private
   * @param {MouseEvent|TouchEvent} event - The mouse event that occurs.
   */
  onPointerDown(event: MouseEvent | TouchEvent): void {
    super.onPointerDown(event)
  }

  /**
   * Occurs when a user releases a mouse button over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   *
   * @private
   * @param {MouseEvent|TouchEvent} event - The mouse event that occurs.
   */
  onPointerUp(event: MouseEvent | TouchEvent): void {
    super.onPointerUp(event)
  }

  /**
   * Occur when the mouse pointer is moving  while over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   * @private
   * @param {MouseEvent|TouchEvent} event - The mouse event that occurs.
   */
  onPointerMove(event: MouseEvent | TouchEvent): void {
    super.onPointerMove(event)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context: Record<string, any>): Record<string, any> {
    const j = super.toJSON(context)
    const paramItems = this.__itemsParam.getValue()
    if (paramItems) {
      const items = Array.from(paramItems)
      const treeItems: any = []
      items.forEach((p) => {
        const path = p.getPath()
        treeItems.push(context ? context.makeRelative(path) : path)
      })
      ;(j as any).treeItems = treeItems
    }

    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any>): void {
    super.fromJSON(j, context)
    if (!j.treeItems) {
      console.warn('Invalid Parameter JSON')
      return
    }
    if (!context) {
      throw new Error('Unable to load JSON on a BaseGroup without a load context')
    }
    let count = j.treeItems.length
    const addItem = (path: any) => {
      context.resolvePath(
        path,
        (treeItem: any) => {
          this.addItem(treeItem)
          count--
          if (count == 0) {
            this.loadDone()
          }
        },
        (reason: any) => {
          console.warn("BaseGroup: '" + this.getName() + "'. Unable to load item:" + path)
        }
      )
    }
    for (const path of j.treeItems) {
      addItem(path)
    }
  }

  /**
   * called once loading is done.
   * @private
   */
  protected loadDone(): void {}
  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * Copies current BaseGroup with all owned items.
   *
   * @param {BaseGroup} src - The group to copy from.
   * @param {Record<string, any>} context - The group to copy from.
   */
  copyFrom(src: BaseGroup, context?: Record<string, any>): void {
    super.copyFrom(src, context)
  }
}

export { BaseGroup }
