import { sgFactory } from '../SGFactory.js';
import { Parameter } from './Parameter.js';
import { QueryParameter } from './QueryParameter.js';

/** Class representing a query set.
 * @extends Parameter
 */
class QuerySet extends Parameter {
  /**
   * Create a query set.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name, undefined, 'QueryParameter');
    this.__items = new Set();
  }

  /**
   * The clone method.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new QuerySet(this.__name, this.__filterFn);
    return clonedParam;
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
    item.valueChanged.connect(this.valueChanged.emit);
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
    const items = Array.from(this.__items);
    const index = items.indexOf(item);
    items[index].valueChanged.disconnect(this.valueChanged.emit);
    this.__items.delete(item);
    if (emit) this.valueChanged.emit();
    return index;
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

sgFactory.registerClass('QuerySet', QuerySet);

export { QuerySet };
