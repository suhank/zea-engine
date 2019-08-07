import {
  Vec2,
  Color,
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
  QueryParameter,
  QUERY_TYPES,
  QUERY_MATCH_TYPE,
  QUERY_LOGIC,
  QuerySet
} from './Parameters/QueryParameter.js';

import {
  ItemFlags
} from './BaseItem';
import {
  TreeItem
} from './TreeItem';
import {
  sgFactory
} from './SGFactory.js';

const GROUP_INITIAL_XFO_MODES = {
  first: 0,
  average: 1
}

let itemHighlightColor = new Color(0.5, 0.5, 1);
class Group extends TreeItem {
  constructor(name) {
    super(name);

    // This setting makes selection propagate from items
    // to the group, which then propagates down to the items 
    this.propagateSelectionChangesFromItems = false;
    
    this.__calculatingInvInitialXfo = false;
    this.__invInitialXfo = undefined;
    this.__initialXfos = [];
    this.__signalIndices = [];

    this.__searchSetParam = this.insertParameter(new QuerySet('Queries'), 0);
    this.__searchSetParam.valueChanged.connect((changeType) => {
      this.resolveQueries()
    });

    this.__itemsParam = this.insertParameter(new ItemSetParameter('Items'), 1);

    this.__initialXfoModeParam = this.insertParameter(
      new MultiChoiceParameter('XfoMode', GROUP_INITIAL_XFO_MODES.average, ['first', 'average']), 
      2);
    this.__initialXfoModeParam.valueChanged.connect(() => {
      this.recalcInitialXfo();
    })

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
      // const items = Array.from(this.__itemsParam.getValue());
      const selected = this.__selectedParam.getValue();
      // const len = items.length;
      // for (let i = 0; i < len; i++) {
      //   items[i].setSelected(selected);
      // }
      Array.from(this.__itemsParam.getValue()).forEach(item => {
        if(selected)
          item.addHighlight('groupItemHighlight', itemHighlightColor)
        else
          item.removeHighlight('groupItemHighlight')
      })
    });
    // Groups can be used to control Cutaway toggles for their members.
    // this.__cutawayParam.valueChanged.connect((changeType) => {
    //   const items = Array.from(this.__itemsParam.getValue());
    //   const len = items.length;
    //   for (let i = 0; i < len; i++) {
    //     const itemParam = items[i].getParameter('CutawayEnabled');
    //     if (itemParam)
    //       itemParam.setDirty(this.__cutawayParam.getValue);
    //   }
    // });
    this.__globalXfoParam.valueChanged.connect((changeType) => {
      const items = Array.from(this.__itemsParam.getValue());
      // Only after all the items are resolved do we have an invXfo and we can tranform our items.
      if (!this.__calculatingInvInitialXfo && items.length > 0 && this.__invInitialXfo) {
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
    this.clearItems(false);
    paths.forEach( path => {
      const query = new QueryParameter('path', QUERY_TYPES.PATH, QUERY_MATCH_TYPE.EXACT, QUERY_LOGIC.NEWSET);
      let value ;
      if (Array.isArray(path))
        value = path.join('/');
      else
        value = path;
      query.setValue(value);
      this.__searchSetParam.addItem(query, false);
    })
    this.__searchSetParam.valueChanged.emit();
  }
  // For backwards compatiblity.
  resolveItems(paths) {
    this.setPaths(paths);
  }

  resolveQueries() {

    const queries = Array.from(this.__searchSetParam.getValue());
    if(queries.length == 0)
      return;

    const owner = this.getOwner();
    let result = [];
    let set = []; // Each time we hit an OR operator, we start a new set.
    let prevset = [];
    // Filter it down, and then merge into result.
    queries.forEach((query, index) => {
      // If we hit an 'OR' query, we want the prevset
      // to the set generated before the previous query. 
      // So: TestA && TestB || TestC
      if (query.getLocicalOperator() == QUERY_LOGIC.AND){
        prevset = set;
      }
      if (index == 0 || query.getLocicalOperator() == QUERY_LOGIC.NEWSET) {
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
                const ownerPath = owner.getPath();
                owner.traverse((item) => {
                  const itemPath = item.getPath().slice(ownerPath.length);
                  if (regex.test(String(itemPath))){
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
      } else {
        switch (query.getQueryType()) {
          case QUERY_TYPES.PATH:
            {
              const path = query.getValue();
              const f = (item) => regex.test(item.getPath())

              if (query.getLocicalOperator() == QUERY_LOGIC.AND)
                set = set.filter(f);
              else if (query.getLocicalOperator() == QUERY_LOGIC.OR)
                set = set.concat(prevset.filter(f));
              break;
            }
          case QUERY_TYPES.NAME:
            {
              const regex = query.getRegex();
              const f = (item) => regex.test(item.getName())
              if (query.getLocicalOperator() == QUERY_LOGIC.AND)
                set = set.filter(f);
              else if (query.getLocicalOperator() == QUERY_LOGIC.OR)
                set = set.concat(prevset.filter(f));
              break;
            }
          case QUERY_TYPES.PROPERTY:
            {
              const regex = query.getRegex();
              const f = (item) => {
                if (item.hasParameter(query.getPropertyName())) {
                  const prop = item.getParameter(query.getPropertyName());
                  // Note: the property must be a string property.
                  if (prop instanceof StringParameter && regex.test(prop.getValue()))
                    return true;
                }
                return false;
              }
              if (query.getLocicalOperator() == QUERY_LOGIC.AND)
                set = set.filter(f);
              else if (query.getLocicalOperator() == QUERY_LOGIC.OR)
                set = set.concat(prevset.filter(f));
              break;
            }
          case QUERY_TYPES.MATERIAL:
            {
              const regex = query.getRegex();
              const f = (item) => {
                if (item.hasParameter("material")) {
                  const material = item.getParameter("material").getValue();
                  if (regex.test(material.getName()))
                    return true;
                }
                return false;
              }
              if (query.getLocicalOperator() == QUERY_LOGIC.AND)
                set = set.filter(f);
              else if (query.getLocicalOperator() == QUERY_LOGIC.OR)
                set = set.concat(prevset.filter(f));
              break;
            }
        }
      }
    })
    result = result.concat(set);
    result.forEach((item) => {
      // console.log(item.getPath())
      this.addItem(item);
    });
    this.setItems(new Set(result));
  }

  __bindItem(item, index) {
    const mouseDownIndex = item.mouseDown.connect((event) => {
      this.mouseDown.emit(event);
      this.mouseDownOnItem.emit(event, item);
    });
    // Note: this should work. Just still trying to figure out how
    // 
    item.setSelected(this.getSelected());
    if(this.propagateSelectionChangesFromItems) {
      const selectedChangedIndex = item.selectedChanged.connect((event) => {
        this.setSelected(item.getSelected());
      });
    }

    const globalXfoChangedIndex = item.globalXfoChanged.connect((mode) => {
      if (mode != ValueSetMode.OPERATOR_SETVALUE && mode != ValueSetMode.OPERATOR_DIRTIED)
        this.__initialXfos[index] = item.getGlobalXfo();
    });
    this.__initialXfos[index] = item.getGlobalXfo();

    this.__signalIndices[index] = {
      mouseDownIndex,
      globalXfoChangedIndex
    }
  }

  __unbindItem(item, index) {
    item.mouseDown.disconnectId(this.__signalIndices[index].mouseDownIndex);
    item.globalXfoChanged.disconnectId(this.__signalIndices[index].globalXfoChangedIndex);
    this.__signalIndices.splice(index, 1);
    this.__initialXfos.splice(index, 1);
  }

  addItem(item, emit) {
    if (!item) {
      console.warn("Error adding item to group. Item is null");
      return;
    }
    const index = this.__itemsParam.addItem(item);
    this.__bindItem(item, index);

    // Note: do we re-calc the initial xfo if it is set to 'first'?
    this.recalcInitialXfo(ValueSetMode.DATA_LOAD);
  }

  removeItem(item) {
    const index = this.__itemsParam.removeItem(item);
    this.__unbindItem(item, index);
    
    this.recalcInitialXfo(ValueSetMode.DATA_LOAD);
  }

  clearItems(emit=true) {
    const items = this.__itemsParam.getValue();
    Array.from(items).forEach((item, index) => {
      item.mouseDown.disconnectId(this.__signalIndices[index].mouseDownIndex);
      item.globalXfoChanged.disconnectId(this.__signalIndices[index].globalXfoChangedIndex);
    });
    this.__signalIndices = [];
    this.__initialXfos = [];
    this.__itemsParam.clearItems(emit);
  }

  getItems() {
    return this.__itemsParam.getValue();
  }

  setItems(items) {
    this.clearItems(false)
    this.__itemsParam.setItems(items);

    Array.from(items).forEach((item, index)=>{
      this.__bindItem(item, index)
    })
    this.recalcInitialXfo(ValueSetMode.DATA_LOAD)
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


  _cleanBoundingBox(bbox) {
    const result = super._cleanBoundingBox(bbox);
    const items = Array.from(this.__itemsParam.getValue());
    items.forEach((item, index)=>{
      if (item.getVisible() && !item.testFlag(ItemFlags.IGNORE_BBOX))
        bbox.addBox3(item.getBoundingBox());
    })
    return bbox;
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