import { Xfo } from '../../Math/Xfo'
import { XfoParameter } from '../Parameters/XfoParameter'
import { Operator } from './Operator'
import { XfoOperatorInput } from './OperatorInput'
import { XfoOperatorOutput } from './OperatorOutput'
import { OperatorOutputMode } from '../Parameters/OperatorOutputMode'

/** An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
class GroupTransformXfoOperator extends Operator {
  bindXfo: Xfo = new Xfo()
  invBindXfo: Xfo = new Xfo()
  groupGlobalXfo: XfoOperatorInput = new XfoOperatorInput('GroupGlobalXfo')
  groupTransformXfo: XfoOperatorOutput = new XfoOperatorOutput('GroupTransformXfo')

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  constructor(groupGlobalXfoParam: XfoParameter, groupTransformXfoParam: XfoParameter) {
    super()
    this.groupGlobalXfo.setParam(groupGlobalXfoParam)
    this.groupTransformXfo.setParam(groupTransformXfoParam)
    this.addInput(this.groupGlobalXfo)
    this.addOutput(this.groupTransformXfo)
  }

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param bindXfo - The Bind Xfo calculated from the initial Transforms of the Group Members.
   */
  setBindXfo(bindXfo: Xfo): void {
    this.bindXfo = bindXfo
    this.invBindXfo = bindXfo.inverse()
    this.setDirty()
  }

  /**
   * The evaluate method.
   */
  evaluate(): void {
    if (this.invBindXfo) {
      const groupGlobalXfo = this.groupGlobalXfo.getValue()
      this.groupTransformXfo.setClean(groupGlobalXfo.multiply(this.invBindXfo))
    } else {
      this.groupTransformXfo.setClean(new Xfo())
    }
  }
}

/** An operator for modifying group members by the groups Xfo
 * @private
 * @extends Operator
 *
 */
class GroupMemberXfoOperator extends Operator {
  _enabled: boolean
  groupTransformXfo: XfoOperatorInput = new XfoOperatorInput('GroupTransformXfo')
  memberGlobalXfo: XfoOperatorOutput = new XfoOperatorOutput('MemberGlobalXfo', OperatorOutputMode.OP_READ_WRITE)

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   * @param memberXfoGlobalParam - The GlobalXfo param found on the Member.
   */
  constructor(groupTransformXfoParam: XfoParameter, memberXfoGlobalParam: XfoParameter) {
    super()
    this.groupTransformXfo.setParam(groupTransformXfoParam)
    this.memberGlobalXfo.setParam(memberXfoGlobalParam)
    this.addInput(this.groupTransformXfo)
    this.addOutput(this.memberGlobalXfo)
    this._enabled = true
  }

  /**
   * used to temporarily disable/enable the operator when the Group bind Xfo is being calculated
   */
  disable(): void {
    this._enabled = false
    this.setDirty()
  }

  /**
   * used to temporarily disable/enable the operator when the Group bind Xfo is being calculated
   */
  enable(): void {
    this._enabled = true
    this.setDirty()
  }

  /**
   * The evaluate method.
   */
  evaluate(): void {
    const memberGlobalXfo = this.memberGlobalXfo.getValue()
    if (this._enabled) {
      const groupTransformXfo = this.groupTransformXfo.getValue()
      this.memberGlobalXfo.setClean(groupTransformXfo.multiply(memberGlobalXfo))
    } else {
      this.memberGlobalXfo.setClean(memberGlobalXfo)
    }
  }
}

export { GroupTransformXfoOperator, GroupMemberXfoOperator }
