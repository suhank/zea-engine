import {
  Vec2,
  Xfo
} from '../../Math';
import {
  Signal
} from '../../Utilities';
import {
  ItemFlags
} from '../BaseItem';
import {
  sgFactory
} from '../SGFactory.js';
import {
  Parameter,
  ValueSetMode
} from './Parameter.js';
import {
  StringParameter
} from './StringParameter.js';
import {
  ItemSetParameter
} from './ItemSetParameter.js';

const QUERY_TYPES = {
  NAME: 0,
  PATH: 1,
  PROPERTY: 2,
  MATERIAL: 3,
  LEVEL: 4,
  LAYER: 5,
  VOLUME: 6
}

const QUERY_MATCH_TYPE = {
  EXACT: 0,
  REGEX: 1
}

const QUERY_LOGIC = {
  AND: 0,
  OR: 1,
  NOT: 3,
  NEWSET: 4
}

class QueryParameter extends StringParameter {
  constructor(name, queryType = QUERY_TYPES.PATH, matchType = QUERY_MATCH_TYPE.EXACT, locicalOperator = QUERY_LOGIC.AND) {
    super(name, '', 'String');
    this.__queryType = queryType;
    this.__matchType = matchType;
    this.__locicalOperator = locicalOperator;
    this.__propName = "";
  }

  clone(flags) {
    const clonedParam = new QueryParameter(this.__name, this.__value);
    return clonedParam;
  }

  getQueryType() {
    return this.__queryType
  }

  setQueryType(queryType) {
    this.__queryType = queryType;
    this.valueChanged.emit();
  }

  getMatchType() {
    return this.__matchType
  }

  setMatchType(matchType) {
    this.__matchType = matchType;
    this.valueChanged.emit();
  }

  getLocicalOperator() {
    return this.__locicalOperator
  }

  setLocicalOperator(locicalOperator) {
    this.__locicalOperator = locicalOperator;
    this.valueChanged.emit();
  }

  getPropertyName() {
    return this.__propName;
  }
  setPropertyName(val) {
    this.__propName = val;
    this.valueChanged.emit();
  }

  getRegex() {
    // https://regex101.com/
    const value = this.getValue();
    switch (this.__matchType) {
      case QUERY_MATCH_TYPE.EXACT:
        return new RegExp(`^${value}$`);
        break;
      case QUERY_MATCH_TYPE.CONTAINS:
        return new RegExp(value);
        break;
      case QUERY_MATCH_TYPE.REGEX:
        return new RegExp(value);
        break;
      case QUERY_MATCH_TYPE.IGNORECASE:
        return new RegExp(`^${value}$`, 'i');
        break;
      case QUERY_MATCH_TYPE.CONTAINS_IGNORECASE:
        return new RegExp(`${value}`, 'i');
        break;
      default:
        throw ("Unknown Match type")
    }
  }

  readBinary(reader, context) {
    const value = reader.loadStr();
    this.setValue(value, ValueSetMode.DATA_LOAD)
  }

  static get QUERY_TYPES() {
    return QUERY_TYPES;
  }
  static get QUERY_MATCH_TYPE() {
    return QUERY_MATCH_TYPE;
  }
  static get QUERY_LOGIC() {
    return QUERY_LOGIC;
  }
};


sgFactory.registerClass('QueryParameter', QueryParameter);


class QuerySet extends Parameter {

  constructor(name) {
    super(name, undefined, 'QueryParameter');
    this.__items = new Set(); 
  }

  clone(flags) {
    const clonedParam = new QuerySet(this.__name, this.__filterFn);
    return clonedParam;
  }

  getItem(index) {
    return Array.from(this.__items)[index];
  }

  addItem(item, emit = true) {
    if (this.__filterFn && !this.__filterFn(item))
      return false;
    item.valueChanged.connect(this.valueChanged.emit)
    this.__items.add(item);
    if(emit)
      this.valueChanged.emit()
    return Array.from(this.__items).indexOf(item)
  }

  removeItem(item, emit = true) {
    const items = Array.from(this.__items)
    const index = items.indexOf(item)
    items[index].valueChanged.disconnect(this.valueChanged.emit)
    this.__items.delete(item);
    if(emit)
      this.valueChanged.emit()
    return index;
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

}

export {
  QueryParameter,
  QUERY_TYPES,
  QUERY_MATCH_TYPE,
  QUERY_LOGIC,
  QuerySet
};