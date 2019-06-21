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
    this.__filterFn = filterFn;
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

  addItem(item) {
    if (this.__filterFn && this.__filterFn(item))
      return false;
    this.__items.add(item);
  }

  removeItem(item) {
    this.__items.add(item);
  }

  setItems(items) {
    for (let item of items){
      if(!this.__items.has(item)) {
        this.__items.add(item);
      }
    }
    for (let item of this.__items){
      if(!items.has(item)) {
        this.__items.delete(item);
      }
    }
  }

  clearItems(){
    this.__items.clear();
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