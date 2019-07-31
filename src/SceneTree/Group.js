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
  QueryParameter,
  QUERY_TYPES,
  QUERY_MATCH_TYPE,
  QUERY_LOGIC
} from './QueryParameter';
import {
  sgFactory
} from './SGFactory.js';

const GROUP_INITIAL_XFO_MODES = {
  first: 0,
  average: 1
}

class Group extends TreeItem {
  constructor(name) {
    super(name);

    this.__searchSetParam = this.insertParameter(new ItemSetParameter('Queries'), 0);
    this.__searchSetParam.valueChanged.connect((changeType) => {
      this.resolveQueries()
    });

    this.__itemsParam = this.insertParameter(new ItemSetParameter('Items'), 1);
    this.__initialXfoModeParam = this.insertParameter(new MultiChoiceParameter('InitialXfoMode', 0, ['first', 'average']), 2);
    this.__initialXfoModeParam.valueChanged.connect(() => {
      this.recalcInitialXfo();
    })
    this.__calculatingInvInitialXfo = false;
    this.__invInitialXfo = undefined;
    this.__initialXfos = [];

    this.__visibleParam.valueChanged.connect((changeType) => {
      const items = Array.from(this.__itemsParam.getValue());
      const value = this.__visibleParam.getValue();
      const len = items.length;
      for (let i = 0; i < len; i++) {
        // items[i].getParameter('Visible').setDirty(this.__visibleParam.getValue);
        items[i].setInheritedVisiblity(value);
      }
    });
    this.__selectedParam.valueChanged.connect((changeType) => {
      const items = Array.from(this.__itemsParam.getValue());
      const selected = this.__selectedParam.getValue();
      const len = items.length;
      for (let i = 0; i < len; i++) {
        items[i].setSelected(selected);
      }
    });
    // Groups can be used to control Cutaway toggles for their members.
    this.__cutawayParam.valueChanged.connect((changeType) => {
      const items = Array.from(this.__itemsParam.getValue());
      const len = items.length;
      for (let i = 0; i < len; i++) {
        const itemParam = items[i].getParameter('CutawayEnabled');
        if (itemParam)
          itemParam.setDirty(this.__cutawayParam.getValue);
      }
    });
    this.__globalXfoParam.valueChanged.connect((changeType) => {
      const items = Array.from(this.__itemsParam.getValue());
      if (!this.__calculatingInvInitialXfo && items.length > 0) {
        let delta;
        const xfo = this.__globalXfoParam.getValue();
        const setDirty = (item, initialXfo) => {
          const clean = () => {
            if (!delta) {
              const xfo = this.__globalXfoParam.getValue();
              // Compute the skinning transform that we can
              // apply to all the items in the group.
              delta = xfo.multiply(this.__invInitialXfo);
            }
            return delta.multiply(initialXfo);
          }
          item.getParameter('GlobalXfo').setDirty(clean);
        }
        const len = items.length;
        for (let i = 0; i < len; i++) {
          setDirty(items[i], this.__initialXfos[i]);
        }
      }
    });

    this.mouseDownOnItem = new Signal();
    // this.mouseUpOnItem = new Signal();
    // this.mouseMoveOnItem = new Signal();
  }

  destroy() {
    super.destroy();
  }

  clone(flags) {
    let cloned = new Group();
    cloned.copyFrom(this, flags);
    return cloned;
  }

  copyFrom(src, flags) {
    super.copyFrom(src, flags);
  }
  setOwner(owner) {
    super.setOwner(owner);

    this.resolveQueries();
  }

  //////////////////////////////////////////
  // Items
  // This function is mostly used in our demos, and 
  // should be removed from the interface
  setPaths(paths) {
    this.__searchSetParam.clearItems(false);
    paths.forEach( path => {
      const query = new QueryParameter('path', QUERY_TYPES.PATH, QUERY_MATCH_TYPE.EXACT, QUERY_LOGIC.OR);
      let value ;
      if (typeof path == 'array')
        value = path.join('/');
      else
        value = path;
      query.setValue(value);
      this.__searchSetParam.addItem(query, false);
    })
    this.__searchSetParam.itemAdded.emit();
  }

  resolveQueries() {

    const queries = Array.from(this.__searchSetParam.getValue());
    const owner = this.getOwner();
    let result = [];
    let set = []; // Each time we hit an OR operator, we start a new set.
    // Filter it down, and then merge into result.
    queries.forEach((query, index) => {
      if (index == 0 || query.getLocicalOperator() == QUERY_LOGIC.OR) {
        result = result.concat(set);
        set = [];
        switch (query.getQueryType()) {
          case QUERY_TYPES.PATH:
            {
              if (query.getMatchType() == QUERY_MATCH_TYPE.EXACT) {
                const path = query.getValue();
                const treeItem = owner.resolvePath(path);
                if (treeItem) {
                  result.push(treeItem);
                } else {
                  console.warn("Group could not resolve item:" + path)
                }
              } else if (query.getMatchType() == QUERY_MATCH_TYPE.REGEX) {
                const regex = query.getRegex();
                owner.traverse((item) => {
                  if (regex.test(item.getPath())){
                    set.push(item);
                  }
                })
              }
              break;
            }
          case QUERY_TYPES.NAME:
            {
              const regex = query.getRegex();
              owner.traverse((item) => {
                if (regex.test(item.getName()))
                  set.push(item);
              });
              break;
            }
          case QUERY_TYPES.PROPERTY:
            {
              const regex = query.getRegex();
              owner.traverse((item) => {
                if (item.hasParameter(query.getPropertyName())) {
                  const prop = item.getParameter(query.getPropertyName());
                  if (prop instanceof StringParameter && regex.test(prop.getValue()))
                    set.push(item);
                }
              });
              break;
            }
          case QUERY_TYPES.MATERIAL:
            {
              const regex = query.getRegex();
              owner.traverse((item) => {
                if (item.hasParameter("material")) {
                  const material = item.getParameter("material").getValue();
                  if (regex.test(material.getName()))
                    set.push(item);
                }
              });
              break;
            }
        }
      } else if (query.getLocicalOperator() == QUERY_LOGIC.AND) {
        switch (query.getQueryType()) {
          case QUERY_TYPES.PATH:
            {
              const path = query.getValue();
              set = set.filter((item) => regex.test(item.getPath()));
              break;
            }
          case QUERY_TYPES.NAME:
            {
              const regex = query.getRegex();
              set = set.filter((item) => regex.test(item.getName()));
              break;
            }
          case QUERY_TYPES.PROPERTY:
            {
              const regex = query.getRegex();
              set = set.filter((item) => {
                if (item.hasParameter(query.getPropertyName())) {
                  const prop = item.getParameter(query.getPropertyName());
                  // Note: the property must be a string property.
                  if (prop instanceof StringParameter && regex.test(prop.getValue()))
                    return true;
                }
                return false;
              });
              break;
            }
          case QUERY_TYPES.MATERIAL:
            {
              const regex = query.getRegex();
              set = set.filter((item) => {
                if (item.hasParameter("material")) {
                  const material = item.getParameter("material").getValue();
                  if (regex.test(material.getName()))
                    return true;
                }
                return false;
              });
              break;
            }
        }
      }
    })
    result = result.concat(set);
    // result.forEach((item) => {
    //   console.log(item.getPath())
    // });
    this.__itemsParam.setItems(new Set(result));

    this.recalcInitialXfo(ValueSetMode.USER_SETVALUE);
  }

  addItem(item) {
    if (!item) {
      console.warn("Error adding item to group. Item is null");
      return;
    }
    const items = Array.from(this.__itemsParam.getValue());
    const index = items.length;
    item.mouseDown.connect((event) => {
      this.mouseDown.emit(event);
      this.mouseDownOnItem.emit(event, item);
    });
    // item.mouseUp.connect((event)=>{
    //     this.mouseUp.emit(event);
    //     this.mouseUpOnItem.emit(event, item);
    // });
    // item.mouseMove.connect((event)=>{
    //     this.mouseMove.emit(event);
    //     this.mouseMoveOnItem.emit(event, item);
    // });
    item.globalXfoChanged.connect((mode) => {
      if (mode != ValueSetMode.OPERATOR_SETVALUE && mode != ValueSetMode.OPERATOR_DIRTIED)
        this.__initialXfos[index] = item.getGlobalXfo();
    });
    this.__initialXfos[index] = item.getGlobalXfo();
    this.__itemsParam.addItem(item);
  }

  removeItem(item) {

  }

  clearItems() {
    this.__itemsParam.clearItems();
  }

  recalcInitialXfo(mode) {
    const items = Array.from(this.__itemsParam.getValue());
    if (items.length == 0)
      return;
    this.__calculatingInvInitialXfo = true;
    const initialXfoMode = this.__initialXfoModeParam.getValue();
    let xfo;
    if (initialXfoMode == GROUP_INITIAL_XFO_MODES.first) {
      xfo = items[0].getGlobalXfo();
    } else if (initialXfoMode == GROUP_INITIAL_XFO_MODES.average) {
      xfo = new Xfo();
      xfo.ori.set(0, 0, 0, 0);
      for (let p of items) {
        const itemXfo = p.getGlobalXfo();
        xfo.tr.addInPlace(itemXfo.tr)
        xfo.ori.addInPlace(itemXfo.ori)
        // xfo.sc.addInPlace(itemXfo.sc)
      }
      xfo.tr.scaleInPlace(1 / items.length);
      xfo.ori.normalizeInPlace();
      // xfo.sc.scaleInPlace(1/this.__items.length);
    } else {
      throw ("Invalid mode.")
    }
    // console.log("recalcInitialXfo", xfo.tr.toString(), this.getName())
    this.__globalXfoParam.setValue(xfo, mode);
    this.__invInitialXfo = xfo.inverse();
    this.__calculatingInvInitialXfo = false;
  }


  /////////////////////////
  // Events

  onMouseDown(event) {
    return false;
  }

  onMouseUp(event) {
    return false;
  }

  onMouseMove(event) {
    return false;
  }


  //////////////////////////////////////////
  // Persistence

  toJSON(context, flags) {
    const j = super.toJSON(context, flags);
    const items = Array.from(this.__itemsParam.getValue());
    const treeItems = [];
    for (let p of items)
      treeItems.push(context.makeRelative(p.getPath()));
    j.treeItems = treeItems
    return j;
  }

  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);

    // Note: JSON data is only used to store user edits, so 
    // parameters loaed from JSON are considered user edited.
    this.setFlag(ItemFlags.USER_EDITED);

    if (!j.treeItems) {
      console.warn("Invalid Parameter JSON");
      return;
    }
    let count = j.treeItems.length;

    const addItem = (path) => {
      context.resolvePath(path, (treeItem) => {
        this.addItem(treeItem);
        count--;
        if (count == 0)
          this.recalcInitialXfo(ValueSetMode.DATA_LOAD)
      }, (reason) => {
        console.warn("Group: '" + this.getName() + "'. Unable to load item:" + path);
      });
    }
    for (let path of j.treeItems) {
      addItem(path);
    }

  }

  static get INITIAL_XFO_MODES() {
    return GROUP_INITIAL_XFO_MODES
  }
};

sgFactory.registerClass('Group', Group);

export {
  Group
};