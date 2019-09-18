import {
  Vec2,
  Vec3,
  Color,
  Xfo
} from '../Math';
import {
  Signal
} from '../Utilities';
import {
  ValueSetMode,
  BooleanParameter,
  NumberParameter,
  StringParameter,
  Vec3Parameter,
  ColorParameter,
  XfoParameter,
  TreeItemParameter,
  ItemSetParameter,
  MultiChoiceParameter
} from './Parameters';
import {
  MaterialParameter
} from './Parameters/MaterialParameter.js';

import {
  ItemFlags
} from './BaseItem';
import {
  TreeItem
} from './TreeItem';
import {
  BaseGeomItem
} from './BaseGeomItem';
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

    // This setting makes selection propagate from items
    // to the group, which then propagates down to the items 
    this.propagateSelectionToItems = false;
    this.propagateXfoToItems = true;
    this.propagateSelectionChangesFromItems = false;

    this.__calculatingInvInitialXfo = false;
    this.__invInitialXfo = undefined;
    this.__initialXfos = [];
    this.__signalIndices = [];

    let pid = 0;
    this.__itemsParam = this.insertParameter(new ItemSetParameter('Items', item => item instanceof TreeItem), pid++);
    this.__itemsParam.itemAdded.connect((item, index) => {
      this.__bindItem(item, index);
    })
    this.__itemsParam.itemRemoved.connect((item, index) => {
      this.__unbindItem(item, index);
    })
    this.__itemsParam.valueChanged.connect(() => {
      this.__updateHighlight();
      this.recalcInitialXfo(ValueSetMode.DATA_LOAD);
      this._setBoundingBoxDirty();
    })

    this.__initialXfoModeParam = this.insertParameter(
      new MultiChoiceParameter('InitialXfoMode', GROUP_INITIAL_XFO_MODES.average, ['first', 'average']),
      pid++);
    this.__initialXfoModeParam.valueChanged.connect(() => {
      this.recalcInitialXfo();
    })

    this.__highlightedParam = this.insertParameter(new BooleanParameter('Highlighted', false), pid++);
    this.__highlightedParam.valueChanged.connect(() => {
      this.__updateHighlight();
    })

    this.__updateHighlight = this.__updateHighlight.bind(this)
    const highlightColorParam = this.insertParameter(new ColorParameter('HighlightColor', new Color(0.5, 0.5, 1)), pid++);
    highlightColorParam.valueChanged.connect(this.__updateHighlight)
    const highlightFillParam = this.insertParameter(new NumberParameter('HighlightFill', 0.0, [0, 1]), pid++);
    highlightFillParam.valueChanged.connect(this.__updateHighlight)

    this.__materialParam = this.insertParameter(new MaterialParameter('Material'), pid++);
    this.__materialParam.valueChanged.connect(() => {
      this.__updateMaterial();
    })

    this.__updateCutaway = this.__updateCutaway.bind(this)
    this.insertParameter(new BooleanParameter('CutAwayEnabled', false), pid++).valueChanged.connect(this.__updateCutaway);
    this.insertParameter(new Vec3Parameter('CutVector', new Vec3(1, 0, 0)), pid++).valueChanged.connect(this.__updateCutaway);
    this.insertParameter(new NumberParameter('CutDist', 0.0), pid++).valueChanged.connect(this.__updateCutaway);

    this.__globalXfoParam.valueChanged.connect((changeType) => {
      if (!this.propagateXfoToItems)
        return;

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

  ////////////////////////////////


  __updateVisiblity() {
    if (super.__updateVisiblity()) {
      const value = this.getVisible();
      Array.from(this.__itemsParam.getValue()).forEach(item => {
        if (item instanceof TreeItem)
          item.propagateVisiblity(this.__visible ? 1 : -1);
      });
      return true;
    }
    return false;
  }

  ///////////////////////////////

  __updateHighlight() {
    let highlighted = false;
    let color;
    if (this.getParameter('Highlighted').getValue()) {
      highlighted = true;
      color = this.getParameter('HighlightColor').getValue();
      color.a = this.getParameter('HighlightFill').getValue();
    }

    Array.from(this.__itemsParam.getValue()).forEach(item => {
      if (item instanceof TreeItem) {
        if (highlighted)
          item.addHighlight('groupItemHighlight' + this.getId(), color, true);
        else
          item.removeHighlight('groupItemHighlight' + this.getId(), true);
      }
    })
  }

  setSelected(sel) {
    super.setSelected(sel);
    
    if (sel) {
      Array.from(this.__itemsParam.getValue()).forEach(item => {
        if (item instanceof TreeItem)
          item.addHighlight('branchselected' + this.getId(), TreeItem.getBranchSelectionOutlineColor(), true);
      })
    } else {
      this.removeHighlight('selected');
      Array.from(this.__itemsParam.getValue()).forEach(item => {
        if (item instanceof TreeItem)
          item.removeHighlight('branchselected' + this.getId(), true);
      })
    }
  }

  //////////////////////////////////////////
  // Materials

  __updateMaterial() {
    const material = this.getParameter('Material').getValue();

    Array.from(this.__itemsParam.getValue()).forEach(item => {
      item.traverse(treeItem => {
        if (treeItem instanceof TreeItem && treeItem.hasParameter('Material')) {
          if (material) {
            treeItem.__backupMaterial = treeItem.hasParameter('Material').getValue();
            treeItem.hasParameter('Material').setValue(material);
          } else {
            treeItem.hasParameter('Material').setValue(treeItem.__backupMaterial);
          }
        }
      }, false)
    })
  }

  //////////////////////////////////////////
  // Cutaways
  __updateCutaway() {
    const cutEnabled = this.getParameter('CutAwayEnabled').getValue();
    const cutAwayVector = this.getParameter('CutVector').getValue();
    const cutAwayDist = this.getParameter('CutDist').getValue();

    Array.from(this.__itemsParam.getValue()).forEach(item => {
      item.traverse(treeItem => {
        if (treeItem instanceof BaseGeomItem) {
          treeItem.setCutawayEnabled(cutEnabled)
          treeItem.setCutVector(cutAwayVector)
          treeItem.setCutDist(cutAwayDist)
        }
      }, true)
    })
  }

  //////////////////////////////////////////
  // Items
  // This function is mostly used in our demos, and 
  // should be removed from the interface
  setPaths(paths) {
    this.clearItems(false);

    const searchRoot = this.getOwner();
    if (searchRoot == undefined)
      return;
    let items = [];
    paths.forEach(path => {
      const treeItem = searchRoot.resolvePath(path);
      if(treeItem)
        items.push(treeItem);
    })
    this.setItems(items)
  }
  // For backwards compatiblity.
  resolveItems(paths) {
    this.setPaths(paths);
  }

  __bindItem(item, index) {
    if (!(item instanceof TreeItem))
      return;

    const mouseDownIndex = item.mouseDown.connect((event) => {
      this.mouseDown.emit(event);
      this.mouseDownOnItem.emit(event, item);
    });

    /////////////////////////////////
    // Update the item cutaway
    const cutEnabled = this.getParameter('CutAwayEnabled').getValue();
    const cutAwayVector = this.getParameter('CutVector').getValue();
    const cutAwayDist = this.getParameter('CutDist').getValue();
    item.traverse(treeItem => {
      if (treeItem instanceof BaseGeomItem) {
        treeItem.setCutawayEnabled(cutEnabled)
        treeItem.setCutVector(cutAwayVector)
        treeItem.setCutDist(cutAwayDist)
      }
    }, true)

    if (!this.getVisible()) {
      // Decrement the visiblity counter which might cause
      // this item to become invisible. (or it might already be invisible.)
      item.propagateVisiblity(-1);
    }
    // Only used by the Selection Manager.
    // Maybe we should have a special group 
    // for that.
    if (this.propagateSelectionToItems) {
      item.setSelected(this.getSelected());
    } else {
      // Higlight the new item with branch selection color
      if (this.getSelected()) {
        if (item instanceof TreeItem)
          item.addHighlight('branchselected' + this.getId(), TreeItem.getBranchSelectionOutlineColor(), true);
      }
    }

    if (this.propagateSelectionChangesFromItems) {
      const selectedChangedIndex = item.selectedChanged.connect((event) => {
        this.setSelected(item.getSelected());
      });
    }

    const globalXfoChangedIndex = item.globalXfoChanged.connect((mode) => {
      if (mode != ValueSetMode.OPERATOR_SETVALUE && mode != ValueSetMode.OPERATOR_DIRTIED)
        this.__initialXfos[index] = item.getGlobalXfo();
    });
    this.__initialXfos[index] = item.getGlobalXfo();

    const bboxChangedIndex = item.boundingChanged.connect(this._setBoundingBoxDirty);

    this.__signalIndices[index] = {
      mouseDownIndex,
      globalXfoChangedIndex,
      bboxChangedIndex
    }
  }

  __unbindItem(item, index) {
    if (!(item instanceof TreeItem))
      return;

    if (this.getParameter('Highlighted').getValue()) {
      item.removeHighlight('groupItemHighlight' + this.getId(), true)
    }

    if (!this.getVisible()) {
      // Increment the visiblity counter which might cause
      // this item to become visible. 
      // It will stay invisible its parent is invisible, or if 
      // multiple groups connect to it and say it is invisible.
      item.propagateVisiblity(1);
    }

    // Only used by the Selection Manager.
    // Maybe we should have a special group 
    // for that.
    if (this.propagateSelectionToItems) {
      if(this.getSelected())
        item.setSelected(false);
    } else {
      item.removeHighlight('branchselected' + this.getId(), true);
    }

    /////////////////////////////////
    // Update the item cutaway
    item.traverse(treeItem => {
      if (treeItem instanceof BaseGeomItem) {
        treeItem.setCutawayEnabled(false)
      }
    }, true)


    item.mouseDown.disconnectId(this.__signalIndices[index].mouseDownIndex);
    item.globalXfoChanged.disconnectId(this.__signalIndices[index].globalXfoChangedIndex);
    item.boundingChanged.disconnectId(this.__signalIndices[index].bboxChangedIndex);
    this.__signalIndices.splice(index, 1);
    this.__initialXfos.splice(index, 1);
  }

  addItem(item, emit=true) {
    if (!item) {
      console.warn("Error adding item to group. Item is null");
      return;
    }
    this.__itemsParam.addItem(item, emit);
  }

  removeItem(item, emit=true) {
    this.__itemsParam.removeItem(item, emit);
  }

  clearItems(emit = true) {

    // Note: Unbind reversed so that indices
    // do not get changed during the unbind.
    const items = Array.from(this.__itemsParam.getValue());
    for (let i = items.length - 1; i >= 0; i--) {
      this.__unbindItem(items[i], i);
    };
    this.__signalIndices = [];
    this.__initialXfos = [];
    this.__itemsParam.clearItems(emit);
  }

  getItems() {
    return this.__itemsParam.getValue();
  }

  setItems(items) {
    this.clearItems(false)
    this.__itemsParam.setItems(items, false);

    Array.from(items).forEach((item, index) => {
      this.__bindItem(item, index)
    })
    this.__updateHighlight();
    this.recalcInitialXfo(ValueSetMode.DATA_LOAD);
    this._setBoundingBoxDirty();
  }

  recalcInitialXfo(mode) {
    if (!this.propagateXfoToItems)
      return;
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
      let numTreeItems = 0;
      for (let item of items) {
        if (item instanceof TreeItem) {
          const itemXfo = item.getGlobalXfo();
          xfo.tr.addInPlace(itemXfo.tr)
          xfo.ori.addInPlace(itemXfo.ori)
          // xfo.sc.addInPlace(itemXfo.sc)
          numTreeItems++;
        }
      }
      xfo.tr.scaleInPlace(1 / numTreeItems);
      xfo.ori.normalizeInPlace();
      // xfo.sc.scaleInPlace(1/ numTreeItems);
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
    items.forEach((item, index) => {
      if (item instanceof TreeItem) {
        if (item.getVisible() && !item.testFlag(ItemFlags.IGNORE_BBOX))
          bbox.addBox3(item.getBoundingBox());
      }
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