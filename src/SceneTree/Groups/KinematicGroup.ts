/* eslint-disable no-unused-vars */
import { Color, Xfo } from '../../Math/index'
import { Registry } from '../../Registry'
import { XfoParameter, MultiChoiceParameter } from '../Parameters/index'
import { BaseGroup } from './BaseGroup'
import { TreeItem } from '../TreeItem'
import { GroupTransformXfoOperator, GroupMemberXfoOperator } from '../Operators/GroupMemberXfoOperator'
import { BaseItem } from '../BaseItem'

const GROUP_XFO_MODES = {
  disabled: 0,
  manual: 1,
  first: 2,
  average: 3,
  globalOri: 4,
}

/**
 * The KinematicGroup is used to control the transform of a collection of objects int eh scene.
 * Objects can be added to a kinematic group and then the group can be transformed, causing each
 * of the members to be transformed as one.
 *
 **Parameters**
 * **InitialXfoMode(`MultiChoiceParameter`):** _todo_
 * **GroupTransform(`XfoParameter`):** _todo_
 *
 * @extends BaseGroup
 */
class KinematicGroup extends BaseGroup {
  protected calculatingGroupXfo: boolean
  protected memberXfoOps: GroupMemberXfoOperator[]

  /**
   * @member initialXfoModeParam - TODO
   */
  initialXfoModeParam: MultiChoiceParameter = new MultiChoiceParameter('InitialXfoMode', GROUP_XFO_MODES.average, [
    'manual',
    'first',
    'average',
    'global',
  ])

  /**
   * @member groupTransformParam - TODO
   */
  groupTransformParam: XfoParameter = new XfoParameter('GroupTransform', new Xfo())

  protected groupTransformOp: GroupTransformXfoOperator
  /**
   * Creates an instance of a group.
   *
   * @param name - The name of the group.
   */
  constructor(name: string = '') {
    super(name)
    // Items which can be constructed by a user (not loaded in binary data.)
    this.calculatingGroupXfo = false
    this.memberXfoOps = []

    this.addParameter(this.initialXfoModeParam)
    this.initialXfoModeParam.on('valueChanged', (event) => {
      this.calcGroupXfo()
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

  // /////////////////////////////

  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlight() {
    // Make this function async so that we don't pull on the
    // graph immediately when we receive a notification.
    // Note: propagating using an operator would be much better.
    // setTimeout(() => {}, 0)

    // TODO: make this async
    this.__updateHighlightHelper()
  }
  /**
   * The __updateHighlight method.
   * @private
   */
  __updateHighlightHelper() {
    let highlighted = false
    let color: Color
    if (this.isSelected()) {
      highlighted = true
      color = this.getHighlight()
      color.a = 0.2
    }

    const key = 'kinematicGroupItemHighlight' + this.getId()
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
   * @param sel - Boolean indicating the new selection state.
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
   * @return - Returns a new Xfo.
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

    // Note: if the KinematicGroup global param becomes dirty
    // then it stops propagating dirty to its members.
    // const newGlobal = this.globalXfoParam.value // force a cleaning.
    // this.invGroupXfo = newGlobal.inverse()
    this.globalXfoParam.value = xfo
    this.groupTransformOp.setBindXfo(xfo)

    this.memberXfoOps.forEach((op) => op.enable())
    this.calculatingGroupXfo = false
  }

  // ////////////////////////////////////////
  // Items

  /**
   * The __bindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  bindItem(item: BaseItem, index: number) {
    if (!(item instanceof TreeItem)) return

    // ///////////////////////////////
    // Update the highlight
    if (this.isSelected()) {
      const color = this.getHighlight()
      color.a = 0.2
      const key = 'kinematicGroupItemHighlight' + this.getId()
      item.addHighlight(key, color, true)
    }

    {
      const memberGlobalXfoParam = item.globalXfoParam
      const memberXfoOp = new GroupMemberXfoOperator(this.groupTransformParam, memberGlobalXfoParam)
      this.memberXfoOps.splice(index, 0, memberXfoOp)

      if (!this.__itemsEventHandlers[index]) this.__itemsEventHandlers[index] = {} // initialize
      const listenerIDs = this.__itemsEventHandlers[index]
      listenerIDs['BoundingBox.valueChanged'] = item.boundingBoxParam.on('valueChanged', (event) => {
        this.setBoundingBoxDirty()
      })
    }
  }

  /**
   * The unbindItem method.
   * @param item - The item value.
   * @param index - The index value.
   * @private
   */
  unbindItem(item: BaseItem, index: number) {
    super.unbindItem(<TreeItem>item, index)
    if (!(item instanceof TreeItem)) return

    if (this.isSelected()) {
      const key = 'kinematicGroupItemHighlight' + this.getId()
      item.removeHighlight(key, true)
    }

    {
      this.memberXfoOps[index].detach()
      this.memberXfoOps.splice(index, 1)
      this.setBoundingBoxDirty()
    }
  }

  /**
   * Adds an item to the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  addItem(item: BaseItem, emit = true) {
    super.addItem(<TreeItem>item, emit)
    if (emit) {
      this.calcGroupXfo()
    }
  }

  /**
   * Removes an item from the group(See `Items` parameter).
   *
   * @param item - The item value.
   * @param emit - The emit value.
   */
  removeItem(item: BaseItem, emit = true) {
    super.removeItem(<TreeItem>item, emit)
    if (emit) {
      this.calcGroupXfo()
    }
  }

  /**
   * Sets an entire new array of items to the BaseGroup replacing any previous items.
   *
   * @param items - List of `BaseItem` you want to add to the group
   */
  setItems(items: Set<BaseItem>) {
    super.setItems(items) // TODO: originally: super.setItems(emit) -- should emit be done here?
    this.calcGroupXfo()
  }

  /**
   * Removes all items from the group.
   *
   * @param emit - `true` triggers `valueChanged` event.
   */
  clearItems(emit = true) {
    super.clearItems(emit)
    this.memberXfoOps = []
    if (emit) {
      this.calcGroupXfo()
    }
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
  // Clone

  /**
   * The clone method constructs a new group,
   * copies its values and returns it.
   *
   * @param context - The context value.
   * @return - Returns a new cloned group.
   */
  clone(context: Record<string, unknown>) {
    const cloned = new KinematicGroup()
    cloned.copyFrom(this, context)
    return cloned
  }
}

Registry.register('KinematicGroup', KinematicGroup)

export { KinematicGroup }
