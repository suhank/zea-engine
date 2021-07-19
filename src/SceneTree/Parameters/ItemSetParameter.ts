/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parameter } from './Parameter'
import { BaseItem } from '../../SceneTree/BaseItem'

/** Class representing an item set parameter.
 * @extends Parameter
 * @private
 */
class ItemSetParameter extends Parameter<Set<BaseItem>> {
  protected filterFn: (...args: any) => boolean
  protected items: Set<BaseItem>
  /**
   * Create an item set parameter.
   * @param {string} name - The name of the item set parameter.
   * @param {(...args: any[]) => boolean} filterFn - The filterFn value.
   */
  constructor(name: string = '', filterFn: (...args: any[]) => boolean) {
    super(name, new Set(), 'BaseItem')
    // this.items = new Set() TODO:(refactor) necessary?
    this.filterFn = filterFn // Note: the filter Fn indicates that users will edit the set.
  }

  /**
   * The setFilterFn method.
   * @param {(...args: any) => boolean} filterFn - The filterFn value.
   */
  setFilterFn(filterFn: (...args: any) => boolean): void {
    this.filterFn = filterFn
  }

  /**
   * The getFilterFn method.
   * @return {(...args: any) => boolean} - The return value.
   */
  getFilterFn(): (...args: any) => boolean {
    return this.filterFn
  }

  /**
   * The getItem method.
   * @param {number} index - The index param.
   * @return {BaseItem} - The return value.
   */
  getItem(index: number): BaseItem | undefined {
    if (!this.value) return undefined
    return Array.from(this.value)[index]
  }

  /**
   * The addItem method.
   * @param {BaseItem} item - The item value.
   * @param {boolean} emitValueChanged - The emit value.
   * @return {boolean} - The return value.
   */
  addItem(item: BaseItem, emitValueChanged = true): number | void {
    if (this.filterFn && !this.filterFn(item)) {
      console.warn('ItemSet __filterFn rejecting item:', item.getPath())
      return
    }
    if (!this.value) this.value = new Set()

    this.value.add(item)
    const index = Array.from(this.value).indexOf(item)
    this.emit('itemAdded', { item, index })
    if (emitValueChanged) this.emit('valueChanged', {})
    return index
  }

  /**
   * Adds items to the parameter value
   *
   * @param {Set<BaseItem>} items - list of items to add to the parameter
   * @param {boolean} [emitValueChanged=true]
   * @memberof ItemSetParameter
   */
  addItems(items: Set<BaseItem>, emitValueChanged = true): void {
    items.forEach((item: BaseItem) => this.addItem(item, false))
    if (emitValueChanged) this.emit('valueChanged', {})
  }

  /**
   * The removeItem method.
   * @param {number} index - The index value.
   * @param {boolean} emitValueChanged - The emit param.
   * @return {BaseItem} - The return value.
   */
  removeItem(index: number, emitValueChanged = true): BaseItem | void {
    if (!this.value) return

    const item = Array.from(this.value)[index]
    this.value.delete(item)
    this.emit('itemRemoved', { item, index })
    if (emitValueChanged) this.emit('valueChanged', {})
    return item
  }

  /**
   * The setItems method.
   * @param {Set<BaseItem>} items - The item param.
   * @param {boolean} emit - The emit param.
   */
  setItems(items: Set<BaseItem>, emit = true): void {
    if (!this.value) this.value = items
    else {
      for (let i = this.value.size - 1; i >= 0; i--) {
        const item = Array.from(this.value)[i]
        if (!items.has(item)) {
          this.removeItem(i, false)
        }
      }

      for (const item of items) {
        if (!this.value.has(item)) {
          this.addItem(item, false)
        }
      }
      if (emit) this.emit('valueChanged', {})
    }
  }

  /**
   * The clearItems method.
   * @param {boolean} emit - The emit value.
   */
  clearItems(emitValueChanged = true): void {
    if (!this.value) this.value = new Set()
    this.value.clear()
    if (emitValueChanged) this.emit('valueChanged', {})
  }

  /**
   * The getNumItems method.
   * @return {number} - The return value.
   */
  getNumItems(): number {
    if (!this.value) this.value = new Set()
    return Array.from(this.value).length
  }
  /**
   * The getValue method.
   * @return {any} - The return value.
   */
  getValue() {
    return this.items
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - The return value.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    if (!this.value) this.value = new Set()

    const items = []
    for (const item of this.value) {
      items.push(item.toJSON())
    }

    return {
      value: items,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (!this.value) this.value = new Set()
    for (const item of j.values) {
      const baseItem = new BaseItem()
      baseItem.fromJSON(item)
      this.value.add(baseItem)
    }
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a item set new parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {ItemSetParameter} - Returns a new item set parameter.
   */
  clone(): ItemSetParameter {
    const clonedParam = new ItemSetParameter(this.name, this.filterFn)
    if (this.value) clonedParam.setItems(this.value)
    return clonedParam
  }
}

export { ItemSetParameter }
