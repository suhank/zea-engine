import { Xfo } from '../../Math/Xfo'
import { XfoParameter } from '../Parameters/XfoParameter'
import { Operator } from './Operator'
import { OperatorInput } from './OperatorInput'
import { OperatorOutput } from './OperatorOutput'
import { OperatorOutputMode } from '../Parameters/OperatorOutputMode'

/** An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
class GroupTransformXfoOperator extends Operator {
  bindXfo: Xfo = new Xfo()
  invBindXfo: Xfo = new Xfo()

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {XfoParameter} groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param {XfoParameter} groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  constructor(groupGlobalXfoParam: XfoParameter, groupTransformXfoParam: XfoParameter) {
    super()
    this.addInput(new OperatorInput('GroupGlobalXfo')).setParam(groupGlobalXfoParam)
    this.addOutput(new OperatorOutput('GroupTransformXfo')).setParam(groupTransformXfoParam)
  }

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {Xfo} bindXfo - The Bind Xfo calculated from the initial Transforms of the Group Members.
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
    const groupTransformOutput = this.getOutput('GroupTransformXfo')
    if (this.invBindXfo) {
      const groupGlobalXfo = this.getInput('GroupGlobalXfo').getValue() as Xfo
      groupTransformOutput.setClean(groupGlobalXfo.multiply(this.invBindXfo))
    } else {
      groupTransformOutput.setClean(new Xfo())
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

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {XfoParameter} groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   * @param {XfoParameter} memberXfoGlobalParam - The GlobalXfo param found on the Member.
   */
  constructor(groupTransformXfoParam: XfoParameter, memberXfoGlobalParam: XfoParameter) {
    super()
    this.addInput(new OperatorInput('GroupTransformXfo')).setParam(groupTransformXfoParam)
    this.addOutput(new OperatorOutput('MemberGlobalXfo', OperatorOutputMode.OP_READ_WRITE)).setParam(
      memberXfoGlobalParam
    )
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
    const memberGlobalXfoOutput = this.getOutput('MemberGlobalXfo')
    const memberGlobalXfo = memberGlobalXfoOutput.getValue() as Xfo
    if (this._enabled) {
      const groupTransformXfo = this.getInput('GroupTransformXfo').getParam()?.value as Xfo
      memberGlobalXfoOutput.setClean(groupTransformXfo.multiply(memberGlobalXfo))
    } else {
      memberGlobalXfoOutput.setClean(memberGlobalXfo)
    }
  }
}

export { GroupTransformXfoOperator, GroupMemberXfoOperator }
