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

const GROUP_INITIAL_XFO_MODES = {
  first: 0,
  average: 1
}

class Group extends TreeItem {
  constructor(name) {
    super(name);

    this.__itemsParam = this.insertParameter(new ItemSetParameter('Items'), 0);
    this.__initialXfoModeParam = this.insertParameter(new MultiChoiceParameter('InitialXfoMode', 0, ['first', 'average']), 1);
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

  //////////////////////////////////////////
  // Items
  // Thsi function is mostly used in our demos, and 
  // should be removed from the interface
  resolveItems(paths) {
    const asset = this.getOwner();
    for (let path of paths) {
      let treeItem = asset.resolvePath(path);
      if (treeItem) {
        this.addItem(treeItem);
      } else {
        console.warn("Group could not resolve item:" + path)
      }
    }
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

    // Note: do we re-calc the initial xfo if it is set to 'first'?
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