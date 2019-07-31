import {
  Vec2,
  Xfo
} from '../Math';
import {
  Signal
} from '../Utilities';
import {
  ValueSetMode,
  BooleanParameter,
  StringParameter,
  XfoParameter,
  ItemSetParameter,
  MultiChoiceParameter
} from './Parameters';
import {
  ItemFlags
} from './BaseItem';
import {
  TreeItem
} from './TreeItem';
import {
  sgFactory
} from './SGFactory.js';

const QUERY_TYPES = {
  NAME: 0,
  PATH: 1,
  PROPERTY: 4,
  MATERIAL: 6,
  VOLUME: 7
}

const QUERY_MATCH_TYPE = {
  EXACT: 0,
  IGNORECASE: 1,
  CONTAINS: 2,
  CONTAINS_IGNORECASE: 3,
  FUZZY: 4,
  REGEX: 5
}

const QUERY_LOGIC = {
  AND: 0,
  OR: 1,
  NEWSET: 3
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
    return this.__queryType = queryType;
  }

  getMatchType() {
    return this.__matchType
  }

  setMatchType(matchType) {
    return this.__matchType = matchType;
  }

  getLocicalOperator() {
    return this.__locicalOperator
  }

  setLocicalOperator(locicalOperator) {
    return this.__locicalOperator = locicalOperator;
  }

  getPropertyName() {
    return this.__propName;
  }
  setPropertyName(val) {
    this.__propName = val;
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

export {
  QueryParameter,
  QUERY_TYPES,
  QUERY_MATCH_TYPE,
  QUERY_LOGIC
};