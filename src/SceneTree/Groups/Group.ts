/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import { Vec3, Color, Xfo, Box3 } from '../../Math/index'
import { Registry } from '../../Registry'
import {
  BooleanParameter,
  NumberParameter,
  Vec3Parameter,
  ColorParameter,
  XfoParameter,
  MultiChoiceParameter,
} from '../Parameters/index'
import { MaterialParameter } from '../Parameters/MaterialParameter'
import { TreeItem } from '../TreeItem'
import { Material } from '../Material'
import { BaseGeomItem } from '../BaseGeomItem'
import { GroupTransformXfoOperator, GroupMemberXfoOperator } from '../Operators/GroupMemberXfoOperator'
import { BaseGroup } from './BaseGroup'
import { BaseItem } from '../BaseItem'

const GROUP_XFO_MODES = {
  disabled: 0,
  manual: 1,
  first: 2,
  average: 3,
  globalOri: 4,
}

/**
 * Groups are a special type of `TreeItem` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **Items(`ItemSetParameter`):** The items referenced in this group are stored in this parameter.
 * * **Highlighted(`BooleanParameter`):** _todo_
 * * **HighlightColor(`ColorParameter`):** _todo_
 * * **HighlightFill(`NumberParameter`):** _todo_
 * * **Material(`MaterialParameter`):** _todo_
 * * **CutAwayEnabled(`BooleanParameter`):** _todo_
 * * **CutPlaneNormal(`Vec3Parameter`):** _todo_
 * * **CutPlaneDist(`NumberParameter`):** _todo_
 *
 * @extends TreeItem
 */
class Group extends BaseGroup {
  protected groupXfoDirty: boolean
  protected calculatingGroupXfo: boolean
  protected dirty: boolean
  protected _bindXfoDirty: boolean
  protected memberXfoOps: GroupMemberXfoOperator[]
  protected groupTransformOp: GroupTransformXfoOperator
  protected setBoundingBoxDirty: any
  private __backupMaterials: { [key: number]: Material } = {}
  protected listenerIDs: Record<string, number> = {}

  initialXfoModeParam: MultiChoiceParameter = new MultiChoiceParameter('InitialXfoMode', GROUP_XFO_MODES.average, [
    'manual',
    'first',
    'average',
    'global',
  ])

  /**
   * @member {BooleanParameter} highlightedParam - Whether or not the TreeItem should be highlighted.
   */
  highlightedParam: BooleanParameter = new BooleanParameter('Highlighted', false)

  /**
   * @member {ColorParameter} highlightColorParam - The color of the highlight.
   */
  highlightColorParam: ColorParameter = new ColorParameter('HighlightColor', new Color(0.5, 0.5, 1))

  /**
   * @member {NumberParameter} highlightFillParam - TODO
   */
  highlightFillParam: NumberParameter = new NumberParameter('HighlightFill', 0.0, [0, 1])

  /**
   * @member {MaterialParameter} materialParam - The Material to use when rendering this group.
   */
  materialParam: MaterialParameter = new MaterialParameter('Material')

  /**
   * @member {BooleanParameter} CutAwayEnabled - TODO
   */
  CutAwayEnabled: BooleanParameter = new BooleanParameter('CutAwayEnabled', false)

  /**
   * @member {Vec3Parameter} CutPlaneNormal - TODO
   */
  CutPlaneNormal: Vec3Parameter = new Vec3Parameter('CutPlaneNormal', new Vec3(1, 0, 0))

  /**
   * @member {NumberParameter} CutPlaneDist - TODO
   */
  CutPlaneDist: NumberParameter = new NumberParameter('CutPlaneDist', 0.0)

  /**
   * @member {XfoParameter} groupTransformParam - TODO
   */
  groupTransformParam: XfoParameter = new XfoParameter('GroupTransform', new Xfo())

  /**
   * Creates an instance of a group.
   *
   * @param {string} name - The name of the group.
   */
  constructor(name: string = '') {
    super(name)
    // Items which can be constructed by a user (not loaded in binary data.)
    this.groupXfoDirty = false
    this.calculatingGroupXfo = false
    this.dirty = false
    this._bindXfoDirty = false
    this.memberXfoOps = []

    this.addParameter(this.initialXfoModeParam)
    this.initialXfoModeParam.on('valueChanged', (event) => {
      this.calcGroupXfo()
    })

    this.addParameter(this.highlightedParam)
    this.highlightedParam.on('valueChanged', () => {
      this.__updateHighlight()
    })

    this.addParameter(this.highlightColorParam)
    this.highlightColorParam.on('valueChanged', (event) => {
      this.__updateHighlight()
    })

    this.addParameter(this.highlightFillParam)
    this.highlightFillParam.on('valueChanged', (event) => {
      this.__updateHighlight()
    })

    this.addParameter(this.materialParam)
    this.materialParam.on('valueChanged', () => {
      this.__updateMaterial()
    })

    this.addParameter(this.CutAwayEnabled).on('valueChanged', (event) => {
      this.__updateCutaway()
    })
    this.addParameter(this.CutPlaneNormal).on('valueChanged', (event) => {
      this.__updateCutaway()
    })
    this.addParameter(this.CutPlaneDist).on('valueChanged', (event) => {
      this.__updateCutaway()
    })

    this.addParameter(this.groupTransformParam)
    this.groupTransformOp = new GroupTransformXfoOperator(this.globalXfoParam, this.groupTransformParam)
  }

  /**
   * Returns enum of available xfo modes.
   *
   * | Name | Default |
   * | --- | --- |
   * | manual | <code>0</code> |
   * | first | <code>1</code> |
   * | average | <code>2</code> |
   * | globalOri | <code>3</code> |
   */
  static get INITIAL_XFO_MODES() {
    return GROUP_XFO_MODES
  }

  /**
   * The __updateVisibility method.
   * @return {boolean} - The return value.
   * @private
   */
  updateVisibility() {
    if (super.updateVisibility()) {
      const value = this.isVisible()
      Array.from(this.itemsParam.value).forEach((item) => {
        if (item instanceof TreeItem) item.propagateVisibility(value ? 1 : -1)
      })
      return true
    }
    return false
  }

  // /////////////////////////////

  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlight(): void {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.

    //setTimeout(() => {}, 0)
    //TODO: make async
    this.__updateHighlightHelper()
  }
  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlightHelper(): void {
    let highlighted = false
    let color: Color
    if (this.highlightedParam.value || this.isSelected()) {
      highlighted = true
      color = this.highlightColorParam.value
      color.a = this.highlightFillParam.value
    }

    const key = 'groupItemHighlight' + this.getId()
    Array.from(this.itemsParam.value).forEach((item) => {
      if (item instanceof TreeItem) {
        if (highlighted) item.addHighlight(key, color, true)
        else item.removeHighlight(key, true)
      }
    })
  }
  /**
   * Changes selection's state of the group with all items it owns.
   *
   * @param {boolean} sel - Boolean indicating the new selection state.
   */
  setSelected(sel: boolean) {
    super.setSelected(sel)
    this.__updateHighlight()
  }

  // ////////////////////////////////////////
  // Global Xfo

  /**
   * Calculate the group Xfo translate.
   * @private
   * @return {Xfo} - Returns a new Xfo.
   */
  calcGroupXfo() {
    const items = Array.from(this.itemsParam.value)
    if (items.length == 0) return
    this.calculatingGroupXfo = true

    this.memberXfoOps.forEach((op) => op.disable())

    // TODO: Disable the group operator?
    const initialXfoMode = this.initialXfoModeParam.value
    let xfo: Xfo
    if (initialXfoMode == GROUP_XFO_MODES.manual) {
      // The xfo is manually set by the current global xfo.
      xfo = this.globalXfoParam.value
    } else if (initialXfoMode == GROUP_XFO_MODES.first && items[0] instanceof TreeItem) {
      xfo = (<TreeItem>items[0]).globalXfoParam.value
    } else if (initialXfoMode == GROUP_XFO_MODES.average) {
      xfo = new Xfo()
      xfo.ori.set(0, 0, 0, 0)
      let numTreeItems = 0
      items.forEach((item, index) => {
        if (item instanceof TreeItem) {
          const itemXfo = item.globalXfoParam.value
          xfo.tr.addInPlace(itemXfo.tr)
          xfo.ori.addInPlace(itemXfo.ori)
          numTreeItems++
        }
      })
      xfo.tr.scaleInPlace(1 / numTreeItems)
      xfo.ori.normalizeInPlace()
      // xfo.sc.scaleInPlace(1/ numTreeItems);
    } else if (initialXfoMode == GROUP_XFO_MODES.globalOri) {
      xfo = new Xfo()
      let numTreeItems = 0
      items.forEach((item, index) => {
        if (item instanceof TreeItem) {
          const itemXfo = item.globalXfoParam.value
          xfo.tr.addInPlace(itemXfo.tr)
          numTreeItems++
        }
      })
      xfo.tr.scaleInPlace(1 / numTreeItems)
    } else {
      throw new Error('Invalid GROUP_XFO_MODES.')
    }

    // Note: if the Group global param becomes dirty
    // then it stops propagating dirty to its members.
    // const newGlobal = this.globalXfoParam.value // force a cleaning.
    // this.invGroupXfo = newGlobal.inverse()

    this.globalXfoParam.value = xfo
    this.groupTransformOp.setBindXfo(xfo)

    this.memberXfoOps.forEach((op) => op.enable())
    this.calculatingGroupXfo = false
    this.groupXfoDirty = false
  }

  // ////////////////////////////////////////
  // Materials

  /**
   * The __updateMaterial method.
   * @private
   */
  __updateMaterial(): void {
    console.warn('__updateMaterial is not async')
    this.__updateMaterialHelper()
    setTimeout(() => {}, 0) // TODO: unit tests are failing
  }

  /**
   * The __updateMaterialHelper method.
   * @private
   */
  __updateMaterialHelper(): void {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.
    const material = this.materialParam.value

    // TODO: Bind an operator
    Array.from(<Set<TreeItem>>this.itemsParam.value).forEach((item: TreeItem) => {
      item.traverse((treeItem: TreeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          const baseGeomItem = treeItem
          const p = baseGeomItem.materialParam

          if (material) {
            const m = p.value
            // TODO: How do we filter material assignments? this is a nasty hack.
            // but else we end up assigning surface materials to our edges.
            if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
              this.__backupMaterials[p.getId()] = m
              p.loadValue(material)
            }
          } else if (this.__backupMaterials[p.getId()]) {
            p.setValue(this.__backupMaterials[p.getId()])
          }
        }
      }, false)
    })
  }
  // ////////////////////////////////////////
  // Cutaways

  /**
   * The __updateCutaway method.
   * @private
   */
  __updateCutaway(): any {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.

    // setTimeout(() => {}, 0)
    // TODO: make async
    this.__updateCutawayHelper()
  }

  /**
   * The __updateCutaway method.
   * @private
   */
  __updateCutawayHelper(): any {
    const cutEnabled = this.CutAwayEnabled.value
    const cutAwayVector = this.CutPlaneNormal.value
    const cutAwayDist = this.CutPlaneDist.value

    Array.from(<Set<TreeItem>>this.itemsParam.value).forEach((item: TreeItem) => {
      item.traverse((treeItem: TreeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          treeItem.setCutawayEnabled(cutEnabled)
          treeItem.setCutVector(cutAwayVector)
          treeItem.setCutDist(cutAwayDist)
        }
      }, true)
    })
  }
  // ////////////////////////////////////////
  // Items

  /**
   *  sets the root item to be used as the search root.
   * @param {TreeItem} treeItem
   */

  setSearchRoot(treeItem: TreeItem) {
    this.searchRoot = treeItem
  }

  setOwner(owner: any) {
    if (!this.searchRoot || this.searchRoot == this.getOwner()) this.searchRoot = owner
    super.setOwner(owner)
  }

  /**
   * This method is mostly used in our demos,
   * and should be removed from the interface.
   *
   * @deprecated
   * @param {array} paths - The paths value.
   * @private
   */
  setPaths(paths: any[]) {
    this.clearItems(false)

    if (this.searchRoot == undefined) {
      console.warn('Group does not have an owner and so cannot resolve paths:', this.getName())
      return
    }
    const items: any[] = []
    paths.forEach((path) => {
      const treeItem = this.searchRoot!.resolvePath(path)
      if (treeItem) items.push(treeItem)
      else {
        console.warn('Path does not resolve to an Item:', path, ' group:', this.getName())
      }
    })
    this.setItems(items)
  }

  /**
   * Uses the specified list of paths to look and get each `BaseItem` object and add it to Group's `Items` parameter.
   *
   * @param {array} paths - The paths value.
   */
  resolveItems(paths: any[]) {
    this.setPaths(paths)
  }

  /**
   * The __bindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  // TODO: BUG, in main, it looks like __bindItem isn't used,
  // only bindItem ever gets called. __bindItem does not get used.
  __bindItem(item: BaseItem, index: number) {
    super.bindItem(<TreeItem>item, index)
    if (!(item instanceof TreeItem)) return
    const listenerIDs = this.__itemsEventHandlers[index]
    // ///////////////////////////////
    // Update the Material
    const material = this.materialParam.value
    if (material) {
      // TODO: Bind an operator instead
      item.traverse((treeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          const geomItem = treeItem
          const m = geomItem.materialParam.value
          // TODO: How do we filter material assignments? this is a nasty hack.
          // but else we end up assigning surface materials to our edges.
          if (m != material && (!m || m.getShaderName() != 'LinesShader')) {
            this.__backupMaterials[geomItem.materialParam.getId()] = m
            geomItem.materialParam.loadValue(material)
          }
        }
      }, true)
    }

    // ///////////////////////////////
    // Update the highlight
    if (item instanceof TreeItem && this.highlightedParam.value) {
      const color = this.highlightColorParam.value
      color.a = this.highlightFillParam.value
      item.addHighlight('groupItemHighlight' + this.getId(), color, true)
    }

    // ///////////////////////////////
    // Update the item cutaway
    const cutEnabled = this.CutAwayEnabled.value
    if (cutEnabled) {
      const cutAwayVector = this.CutPlaneNormal.value
      const cutAwayDist = this.CutPlaneDist.value
      item.traverse((treeItem) => {
        if (treeItem instanceof BaseGeomItem) {
          treeItem.setCutawayEnabled(cutEnabled)
          treeItem.setCutVector(cutAwayVector)
          treeItem.setCutDist(cutAwayDist)
        }
      }, true)
    }

    if (!this.isVisible()) {
      // Decrement the visibility counter which might cause
      // this item to become invisible. (or it might already be invisible.)
      item.propagateVisibility(-1)
    }

    if (item instanceof TreeItem) {
      const memberGlobalXfoParam = item.globalXfoParam
      const memberXfoOp = new GroupMemberXfoOperator(this.groupTransformParam, memberGlobalXfoParam)
      this.memberXfoOps.splice(index, 0, memberXfoOp)

      listenerIDs['valueChanged'] = item.boundingBoxParam.on('valueChanged', (event) => {
        this.setBoundingBoxDirty(event)
      })
      this._bindXfoDirty = true
    }
  }

  /**
   * The __unbindItem method.
   * @param {BaseItem} item - The item value.
   * @param {number} index - The index value.
   * @private
   */
  unbindItem(item: BaseItem, index: number) {
    const listenerIDs = this.__itemsEventHandlers[index]
    super.unbindItem(<TreeItem>item, index)
    if (!(item instanceof TreeItem)) return

    if (this.highlightedParam.value) {
      item.removeHighlight('groupItemHighlight' + this.getId(), true)
    }

    if (!this.isVisible()) {
      // Increment the Visibility counter which might cause
      // this item to become visible.
      // It will stay invisible if its parent is invisible, or if
      // multiple groups connect to it and say it is invisible.
      item.propagateVisibility(1)
    }

    // ///////////////////////////////
    // Update the item cutaway
    item.traverse((treeItem) => {
      if (treeItem instanceof BaseGeomItem) {
        treeItem.setCutawayEnabled(false)
      }
    }, true)

    if (item instanceof TreeItem) {
      this.memberXfoOps[index].detach()
      this.memberXfoOps.splice(index, 1)
      this.setBoundingBoxDirty()
      item.boundingBoxParam.removeListenerById('valueChanged', this.listenerIDs['valueChanged'])
      this._bindXfoDirty = true
    }
  }

  /**
   * Adds an item to the group(See `Items` parameter).
   *
   * @param {BaseItem} item - The item value.
   * @param {boolean} emit - The emit value.
   */
  addItem(item: BaseItem, emit = true) {
    if (!item) {
      console.warn('Error adding item to group. Item is null')
      return
    }
    this.itemsParam.addItem(item, emit)

    if (emit) {
      this.calcGroupXfo()
    }
  }

  /**
   * Removes an item from the group(See `Items` parameter).
   *
   * @param {BaseItem} item - The item value.
   * @param {boolean} emit - The emit value.
   */
  removeItem(item: any, emit = true) {
    this.itemsParam.removeItem(item, emit)
    if (emit) {
      this.calcGroupXfo()
    }
  }

  /**
   * Removes all items from the group and kind of returns the object to the default state.
   *
   * @param {boolean} emit - `true` triggers `valueChanged` event.
   */
  clearItems(emit = true) {
    // Note: Unbind reversed so that indices
    // do not get changed during the unbind.
    const items = Array.from(this.itemsParam.value)
    for (let i = items.length - 1; i >= 0; i--) {
      this.unbindItem(items[i], i)
    }
    // this.__eventHandlers = []
    this.memberXfoOps = []
    this.itemsParam.clearItems(emit)
    if (emit) {
      this.calcGroupXfo()
    }
  }

  /**
   * Returns the list of `BaseItem` objects owned by the group.
   *
   * @return {array} - The return value.
   */
  getItems() {
    return this.itemsParam.value
  }

  /**
   * Removes old items in current group and adds new ones.
   *
   * @param {array} items - List of `BaseItem` you want to add to the group
   */
  setItems(items: any) {
    this.clearItems(false)
    this.itemsParam.setItems(items)
    this.calcGroupXfo()
  }

  /**
   * The _cleanBoundingBox method.
   * @param {Box3} bbox - The bounding box value.
   * @return {Box3} - The return value.
   * @private
   */
  _cleanBoundingBox(bbox: Box3) {
    const result = super._cleanBoundingBox(bbox)
    const items = Array.from(this.itemsParam.value)
    items.forEach((item) => {
      if (item instanceof TreeItem) {
        if (item.isVisible()) {
          result.addBox3(item.boundingBoxParam.value)
        }
      }
    })
    return result
  }

  // ///////////////////////
  // Events

  /**
   * Occurs when a user presses a mouse button over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   *
   * @private
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onPointerDown(event: MouseEvent) {
    super.onPointerDown(event)
  }

  /**
   * Occurs when a user releases a mouse button over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   *
   * @private
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onPointerUp(event: MouseEvent) {
    super.onPointerUp(event)
  }

  /**
   * Occur when the mouse pointer is moving  while over an element.
   * Note: these methods are useful for debugging mouse event propagation to groups
   * @private
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onPointerMove(event: MouseEvent) {
    super.onPointerMove(event)
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * called once loading is done.
   * @private
   */
  __loadDone() {
    this.calculatingGroupXfo = true
    this.calcGroupXfo()
    this.calculatingGroupXfo = false
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new group,
   * copies its values and returns it.
   *
   * @return {Group} - Returns a new cloned group.
   */
  clone() {
    const cloned = new Group()
    cloned.copyFrom(this)
    return cloned
  }
}

Registry.register('Group', Group)

export { Group }
