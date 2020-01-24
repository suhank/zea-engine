
import { sgFactory } from '../SGFactory.js'

/** An operator for aiming items at targets.
 * @extends Operator
 *
 */
class GroupMemberXfoOperator {
  /**
   * Create a GroupMemberXfoOperator operator.
   */
  constructor(groupGlobalXfoParam, memberGlobalXfoParam, group) {
    this.setDirty = this.setDirty.bind(this)
    this.disabled = true
    this.dirty = false
    this.group = group

    this.groupGlobalXfoParam = groupGlobalXfoParam
    this.groupGlobalXfoParam.valueChanged.connect(this.setDirty)

    this.memberGlobalXfoParam = memberGlobalXfoParam
    this.globalXfoChangedIndex = this.memberGlobalXfoParam.valueChanged.connect(mode => {
      // If the item's xfo changees, potentially through its own hierarchy
      // then we need to re-bind here.
      // if (!this.dirty) {
      //   this.initialXfo = this.memberGlobalXfoParam.getValue()
      //   this.group.calcGroupXfo()
      // }
    })
    this.initialXfo = this.memberGlobalXfoParam.getValue()
    this.memberGlobalXfoParam.bindOperator(this)

  }

  calculatingGroupXfo() {
    this.disabled = true
  }

  setInvGroupXfo(invGroupXfo) {
    this.invGroupXfo = invGroupXfo
    this.disabled = false
  }

  getInitialXfo() {
    return this.initialXfo
  }

  /**
   * The setDirty method.
   */
  setDirty() {
    if (this.disabled) return
    this.memberGlobalXfoParam.setDirtyFromOp()
    this.dirty = true
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
    // Compute the skinning transform that we can
    // apply to all the items in the group.
    if (this.disabled) return
    const xfo = this.groupGlobalXfoParam.getValue()
    const delta = xfo.multiply(this.invGroupXfo)
    this.memberGlobalXfoParam.setClean(delta.multiply(this.initialXfo))
    this.dirty = false
  }

  destroy() {
    this.groupGlobalXfoParam.valueChanged.disconnect(this.setDirty)
    this.memberGlobalXfoParam.unbindOperator(this)
  }
}

sgFactory.registerClass('GroupMemberXfoOperator', GroupMemberXfoOperator)

export { GroupMemberXfoOperator }
