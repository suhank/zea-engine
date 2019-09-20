import { Signal } from '../../Utilities';
import { Parameter } from './Parameter.js';
import { NumberParameter } from './NumberParameter.js';

/** Class representing an item set parameter.
 * @extends Parameter
 */
class ItemSetParameter extends Parameter {
  /**
   * Create an item set parameter.
   * @param {any} name - The name value.
   * @param {any} filterFn - The filterFn value.
   */
  constructor(name, filterFn) {
    super(name, undefined, 'BaseItem');
    this.__items = new Set();
    this.__filterFn = filterFn; // Note: the filter Fn indicates that users will edit the set.
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new ItemSetParameter(this.__name, this.__filterFn);
    return clonedParam;
  }

  /**
   * The setFilterFn method.
   * @param {any} flterFn - The flags param.
   */
  setFilterFn(flterFn) {
    this.__filterFn = filterFn;
  }

  /**
   * The getFilterFn method.
   * @return {any} - The return value.
   */
  getFilterFn() {
    return this.__filterFn;
  }

  /**
   * The getItem method.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  getItem(index) {
    return Array.from(this.__items)[index];
  }

  /**
   * The addItem method.
   * @param {any} item - The item param.
   * @param {boolean} emit - The emit param.
   * @return {any} - The return value.
   */
  addItem(item, emit = true) {
    if (this.__filterFn && !this.__filterFn(item)) return false;
    this.__items.add(item);
    if (emit) this.valueChanged.emit();
    return Array.from(this.__items).indexOf(item);
  }

  /**
   * The removeItem method.
   * @param {any} item - The item param.
   * @param {boolean} emit - The emit param.
   * @return {any} - The return value.
   */
  removeItem(item, emit = true) {
    const index = Array.from(this.__items).indexOf(item);
    this.__items.delete(item);
    if (emit) this.valueChanged.emit();
    return index;
  }

  /**
   * The setItems method.
   * @param {any} items - The item param.
   * @param {boolean} emit - The emit param.
   */
  setItems(items, emit = true) {
    for (const item of this.__items) {
      if (!items.has(item)) {
        this.__items.delete(item);
      }
    }
    for (const item of items) {
      if (!this.__items.has(item)) {
        this.__items.add(item);
      }
    }
    if (emit) this.valueChanged.emit();
  }

  /**
   * The clearItems method.
   * @param {boolean} emit - The emit param.
   */
  clearItems(emit = true) {
    this.__items.clear();
    if (emit) this.valueChanged.emit();
  }

  /**
   * The getNumItems method.
   * @return {any} - The return value.
   */
  getNumItems() {
    return Array.from(this.__items).length;
  }

  /**
   * The getValue method.
   * @return {any} - The return value.
   */
  getValue() {
    return this.__items;
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    return {};
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {}
}

export { ItemSetParameter };
