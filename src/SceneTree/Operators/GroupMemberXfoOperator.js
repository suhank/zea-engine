
import { sgFactory } from '../SGFactory.js'
import { Xfo } from '../../Math'
import { ValueSetMode } from '../Parameters'

const GROUP_XFO_MODES = {
  disabled: 0,
  manual: 1,
  first: 2,
  average: 3,
  globalOri: 4,
}

/** An operator for aiming items at targets.
 * @extends Operator
 *
 */
class GroupMemberXfoOperator {
  /**
   * Create a GroupMemberXfoOperator operator.
   */
  constructor(groupGlobalXfoParam, initialXfoModeParam) {
    this.setDirty = this.setDirty.bind(this)
    this.disabled = true
    // this.dirty = false
    this.propagatingDirty = false
    this.calculatingGroupXfo = false

    this.groupGlobalXfoParam = groupGlobalXfoParam
    this.groupGlobalXfoParam.valueChanged.connect(this.setDirty)
    this.initialXfoModeParam = initialXfoModeParam
    this.initialXfoModeParam.valueChanged.connect(this.calcGroupXfo.bind(this))

    this.members = []
  }

  /**
   * Bind a new member to the group Xfo
   */
  addMember(memberGlobalXfoParam, index) {
    
    const updateGlobalXfo = () => {
      const initialXfoMode = this.initialXfoModeParam.getValue()
      if (initialXfoMode == GROUP_XFO_MODES.disabled) {
        return;
      }
      if (initialXfoMode == GROUP_XFO_MODES.first && index == 0) {
        this.calcGroupXfo()
      } else if (
        initialXfoMode == GROUP_XFO_MODES.average ||
        initialXfoMode == GROUP_XFO_MODES.globalOri
      ) {
        this.calcGroupXfo()
      }
    }

    const globalXfoChangedIndex = memberGlobalXfoParam.valueChanged.connect(mode => {
      // If the item's xfo changees, potentially through its own hierarchy
      // then we need to re-bind here.
      const initialXfoMode = this.initialXfoModeParam.getValue()
      if (initialXfoMode == GROUP_XFO_MODES.disabled) {
        return;
      }
      if (!this.propagatingDirty) {
        this.members[index].initialXfo = memberGlobalXfoParam.getValue()
        updateGlobalXfo()
      }
    })
    const initialXfo = memberGlobalXfoParam.getValue()

    this.members[index] = {
      memberGlobalXfoParam,
      globalXfoChangedIndex,
      initialXfo,
    }
    
    updateGlobalXfo()
    memberGlobalXfoParam.bindOperator(this)
  }

  removeMember(index) {
    this.members[index].memberGlobalXfoParam.disconnectId(this.members[index].globalXfoChangedIndex)
  }

  /**
   * Calculate the group Xfo translate.
   * @return {Xfo} - Returns a new Xfo.
   */
  calcGroupXfo() {
    // console.log("calcGroupXfo")
    if (this.members.length == 0) return
    const initialXfoMode = this.initialXfoModeParam.getValue()
    if (initialXfoMode == GROUP_XFO_MODES.disabled)
      return;

    this.disabled = true
    this.calculatingGroupXfo = true
    let xfo
    if (initialXfoMode == GROUP_XFO_MODES.manual) {
      // The xfo is manually set by the current global xfo.
      this.invGroupXfo = this.getGlobalXfo().inverse()
      this.disabled = false
      return
    } else if (initialXfoMode == GROUP_XFO_MODES.first) {
      xfo = this.members[0].initialXfo
    } else if (initialXfoMode == GROUP_XFO_MODES.average) {
      xfo = new Xfo()
      xfo.ori.set(0, 0, 0, 0)
      let numTreeItems = 0
      this.members.forEach((member, index) => {
        if (member) {
          const memberXfo = this.members[index].initialXfo
          xfo.tr.addInPlace(memberXfo.tr)
          xfo.ori.addInPlace(memberXfo.ori)
          numTreeItems++
        }
      })
      xfo.tr.scaleInPlace(1 / numTreeItems)
      xfo.ori.normalizeInPlace()
      // xfo.sc.scaleInPlace(1/ numTreeItems);
    } else if (initialXfoMode == GROUP_XFO_MODES.globalOri) {
      xfo = new Xfo()
      let numTreeItems = 0
      this.members.forEach((member, index) => {
        if (member) {
          const memberXfo = this.members[index].initialXfo
          xfo.tr.addInPlace(memberXfo.tr)
          numTreeItems++
        }
      })
      xfo.tr.scaleInPlace(1 / numTreeItems)
    } else {
      throw new Error('Invalid mode.')
    }

    this.groupGlobalXfoParam.setValue(xfo, ValueSetMode.GENERATED_VALUE)
    
    // Note: if the Group global param becomes dirty
    // then it stops propagating dirty to its members.
    const newGlobal = this.groupGlobalXfoParam.getValue() // force a cleaning.
    this.invGroupXfo = newGlobal.inverse()

    this.disabled = false
    this.calculatingGroupXfo = false
  }

  /**
   * The setDirty method.
   */
  setDirty() {
    if (this.disabled) return
    if (this.calculatingGroupXfo) return
    
    // this.dirty = true
    this.propagatingDirty = true
    for (let member of this.members) {
      member.memberGlobalXfoParam.setDirtyFromOp(this)
    }
    this.propagatingDirty = false
  }

  /**
   * The setValue method.
   */
  setValue(value, mode) {
    // if (this.parentGlobalXfoParam) {
    //   const parentGlobaXfo = this.parentGlobalXfoParam.getValue()
    //   this.localXfoParam.setValue(
    //     parentGlobaXfo.inverse().multiply(value),
    //     mode
    //   )
    // } else {
    //   this.localXfoParam.setValue(value, mode)
    // }
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    // console.log("Evaluate")
    // Compute the skinning transform that we can
    // apply to all the items in the group.
    if (this.disabled) 
      return
    if (this.calculatingGroupXfo) 
      return
    // if (this.propagatingDirty) {
    //   return
    // }
    const initialXfoMode = this.initialXfoModeParam.getValue()
    if (initialXfoMode == GROUP_XFO_MODES.disabled) {
      for (let member of this.members) {
        member.memberGlobalXfoParam.setCleanFromOp(member.memberGlobalXfoParam.getValue(), this)
      }
      return;
    }
      // console.log("Clean:", this.groupGlobalXfoParam.getPath())
    const xfo = this.groupGlobalXfoParam.getValue()
    const delta = xfo.multiply(this.invGroupXfo)

    for (let member of this.members) {
      member.memberGlobalXfoParam.setCleanFromOp(delta.multiply(member.initialXfo), this)
    }
    // this.dirty = false
  }

  destroy() {
    this.groupGlobalXfoParam.valueChanged.disconnect(this.setDirty)
    for (let member of this.members) {
      member.memberGlobalXfoParam.unbindOperator(this)
    }
  }
}

sgFactory.registerClass('GroupMemberXfoOperator', GroupMemberXfoOperator)

export { GroupMemberXfoOperator, GROUP_XFO_MODES }
