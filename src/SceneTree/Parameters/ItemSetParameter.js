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

  clone(flags) {
    const clonedParam = new ItemSetParameter(this.__name, this.__filterFn);
    return clonedParam;
  }

  setFilterFn(flterFn) {
    this.__filterFn = filterFn;
  }

  getFilterFn() {
    return this.__filterFn;
  }

  addItem(item, emit = true) {
    if (this.__filterFn && !this.__filterFn(item))
      return false;
    this.__items.add(item);
    if(emit)
      this.itemAdded.emit()
  }

  removeItem(item, emit = true) {
    this.__items.add(item);
    if(emit)
      this.itemRemoved.emit()
  }

  setItems(items, emit = true) {
    for (let item of this.__items){
      if(!items.has(item)) {
        this.__items.delete(item);
        if(emit)
          this.itemRemoved.emit()
      }
    }
    for (let item of items){
      if(!this.__items.has(item)) {
        this.__items.add(item);
        if(emit)
          this.itemAdded.emit();
      }
    }
  }

  clearItems(emit = true){
    this.__items.clear();
    if(emit)
      this.itemRemoved.emit()
  }

  getNumItems() {
    return this.__items.length;
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