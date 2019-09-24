import {
  Signal
} from '../../Utilities';
import {
  Parameter
} from './Parameter.js';
import {
  NumberParameter
} from './NumberParameter.js';

class ItemSetParameter extends Parameter {
  constructor(name, filterFn) {
    super(name, undefined, 'BaseItem');
    this.__items = new Set();
    this.__filterFn = filterFn; // Note: the filter Fn indicates that users will edit the set. 
    this.itemAdded = new Signal();
    this.itemRemoved = new Signal();
  }

  clone() {
    const clonedParam = new ItemSetParameter(this.__name, this.__filterFn);
    return clonedParam;
  }

  setFilterFn(filterFn) {
    this.__filterFn = filterFn;
  }

  getFilterFn() {
    return this.__filterFn;
  }

  getItem(index) {
    return Array.from(this.__items)[index];
  }

  addItem(item, emit = true) {
    if (this.__filterFn && !this.__filterFn(item)) {
      console.warn("ItemSet __filterFn rejecting item:", item.getPath())
      return false;
    }
    this.__items.add(item);
    const index = Array.from(this.__items).indexOf(item)
    this.itemAdded.emit(item, index)
    if(emit)
      this.valueChanged.emit()
    return index;
  }

  addItems(items, emit = true) {
    items.forEach( item => this.addItem(item, false));
    if(emit)
      this.valueChanged.emit()
  }

  removeItem(index, emit = true) {
    const item = Array.from(this.__items)[index];
    this.__items.delete(item);
    this.itemRemoved.emit(item, index)
    if(emit)
      this.valueChanged.emit();
    return item;
  }

  setItems(items, emit = true) {
    for (let item of this.__items){
      if(!items.has(item)) {
        this.removeItem(item, false);
      }
    }
    for (let item of items){
      if(!this.__items.has(item)) {
        this.addItem(item, false);
      }
    }
    if(emit)
      this.valueChanged.emit();
  }

  clearItems(emit = true){
    this.__items.clear();
    if(emit)
      this.valueChanged.emit()
  }

  getNumItems() {
    return Array.from(this.__items).length;
  }

  getValue(){
    return this.__items;
  }


  //////////////////////////////////////////
  // Persistence

  toJSON(context, flags) {
    return {}
  }

  fromJSON(j, context, flags) {
  }

};

export {
  ItemSetParameter
};