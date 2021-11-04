/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ItemSetParameter, ItemEvent } from '../Parameters/index'
import { TreeItem } from '../TreeItem'
import { PointerEvent } from '../../Utilities/Events/PointerEvent'

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
  /**
   * @member itemsParam - TODO
   */
  itemsParam: ItemSetParameter = new ItemSetParameter('Items', (item: TreeItem) => item instanceof TreeItem)

  protected __itemsEventHandlers: Array<Record<string, number>> = []
  searchRoot?: TreeItem

  /**
   * Creates an instance of a group.
   *
   * @param name - The name of the group.
   */
  constructor(name?: string) {
    super(name)

    this.addParameter(this.itemsParam)

    this.itemsParam.on('itemAdded', (event: ItemEvent) => {
      this.bindItem(event.item, event.index)
    })
    this.itemsParam.on('itemRemoved', (event: ItemEvent) => {
      this.unbindItem(event.item, event.index)
    })
  }

  // ////////////////////////////////////////
  // Items

  /**
   *  sets the root item to be used as the search root.
   * @param treeItem
   */
  setSearchRoot(treeItem: TreeItem): void {
    this.searchRoot = treeItem
  }

  /**
   * The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.
   *
   * @param ownerItem - The new owner item.
   */
  setOwner(ownerItem: TreeItem): void {
    if (!this.searchRoot || this.searchRoot == this.getOwner()) this.searchRoot = ownerItem
    super.setOwner(ownerItem)
  }

  /**
   * The __bindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  protected bindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return

    const listenerIDs: Record<string, number> = {}
    listenerIDs['pointerDown'] = item.on('pointerDown', (event: PointerEvent) => {
      this.onPointerDown(event)
    })
    listenerIDs['pointerUp'] = item.on('pointerUp', (event: PointerEvent) => {
      this.onPointerUp(event)
    })
    listenerIDs['pointerMove'] = item.on('pointerMove', (event: PointerEvent) => {
      this.onPointerMove(event)
    })
    listenerIDs['pointerEnter'] = item.on('pointerEnter', (event: PointerEvent) => {
      this.onPointerEnter(event)
    })
    listenerIDs['pointerLeave'] = item.on('pointerLeave', (event: PointerEvent) => {
      this.onPointerLeave(event)
    })

    this.__itemsEventHandlers.splice(index, 0, listenerIDs)
  }

  /**
   * The unbindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  protected unbindItem(item: TreeItem, index: number): void {
    if (!(item instanceof TreeItem)) return

    const listenerIDs = this.__itemsEventHandlers[index]
    // eslint-disable-next-line guard-for-in
    for (let key in listenerIDs) {
      const parts = key.split('.')
      if (parts.length > 1) {
        const param = item.getParameter(parts[0])
        if (param) param.removeListenerById(parts[1], listenerIDs[key])
      } else {
        item.removeListenerById(key, listenerIDs[key])
      }
    }
    this.__itemsEventHandlers.splice(index, 1)
  }

  /**
   * Adds an item to the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  addItem(item: TreeItem, emit = true): void {
    if (!item) {
      console.warn('Error adding item to group. Item is null')
      return
    }
    this.itemsParam.addItem(item, emit)
  }

  /**
   * Removes an item from the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  removeItem(item: TreeItem, emit = true): void {
    const paramItems = this.itemsParam.value
    if (!paramItems) return

    const itemIndex = Array.from(paramItems).indexOf(item)
    if (itemIndex) this.itemsParam.removeItem(itemIndex, emit)
  }

  /**
   * Removes all items from the group.
   *
   * @param emit - `true` triggers `valueChanged` event.
   */
  clearItems(emit = true): void {
    // Note: Unbind reversed so that indices
    // do not get changed during the unbind.
    const paramItems = this.itemsParam.value
    if (!paramItems) return
    const items = Array.from(paramItems)
    for (let i = items.length - 1; i >= 0; i--) {
      this.unbindItem(<TreeItem>items[i], i)
    }
    this.itemsParam.clearItems(emit)
  }

  /**
   * Returns the list of `TreeItem` objects owned by the group.
   *
   * @return - The return value.
   */
  getItems(): Set<TreeItem> | undefined {
    return this.itemsParam.value
  }

  /**
   * Sets an entire new array of items to the BaseGroup replacing any previous items.
   *
   * @param items - List of `TreeItem` you want to add to the group
   */
  setItems(items: Set<TreeItem>): void {
    this.clearItems(false)
    this.itemsParam.setItems(items)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    const j = super.toJSON(context)
    const paramItems = this.itemsParam.value
    if (paramItems) {
      const items = Array.from(paramItems)
      const treeItems: TreeItem[] = []
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
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    super.fromJSON(j, context)
    if (!j.treeItems) {
      console.warn('Invalid Parameter JSON')
      return
    }
    if (!context) {
      throw new Error('Unable to load JSON on a BaseGroup without a load context')
    }
    let count = j.treeItems.length
    const addItem = (path: string[]) => {
      context.resolvePath(
        path,
        (treeItem: TreeItem) => {
          this.addItem(treeItem)
          count--
          if (count == 0) {
            this.loadDone()
          }
        },
        () => {
          console.warn("BaseGroup: '" + this.getName() + "'. Unable to load item:" + path)
        }
      )
    }
    for (const path of j.treeItems) {
      addItem(path)
    }
  }

  /**
   * called once loading is done. Some derived classes override this method.
   * @private
   */
  protected loadDone(): void {}
  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * Copies current BaseGroup with all owned items.
   *
   * @param src - The group to copy from.
   * @param context - The group to copy from.
   */
  copyFrom(src: BaseGroup, context?: Record<string, any>): void {
    super.copyFrom(src, context)
  }
}

export { BaseGroup }
