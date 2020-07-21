import { Operator } from './Operator'



/** An operator for aiming items at targets.
 * @extends Operator
 *
 */
class GroupTransformXfoOperator extends Operator {
  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {Parameter} groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param {Parameter} groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  constructor(groupGlobalXfoParam, groupTransformXfoParam) {
    super()
    this.addInput(new OperatorOutput('GroupGlobalXfo')).setParam(groupGlobalXfoParam)
    this.addOutput(new OperatorInput('GroupTransformXfo')).setParam(groupTransformXfoParam)
  }

  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {Xfo} bindXfo - The Bind Xfo calculated from the initial Transforms of the Group Members.
   */
  setBindXfo(bindXfo) {
    this.bindXfo = bindXfo
    this.invBindXfo = bindXfo.inverse()
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const groupGlobalXfo = this.getInput('GroupGlobalXfo').getParam().getValue()
    const groupTransformXfo = this.getOutput('GroupTransformXfo')
    groupTransformXfo.setClean(groupGlobalXfo.multiply(this.invBindXfo))
  }
}

/** An operator for aiming items at targets.
 * @extends Operator
 *
 */
class GroupMemberXfoOperator extends Operator {
  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {Parameter} groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
   * @param {Parameter} memberXfoGlobalParam - The GlobalXfo param found on the Member.
   */
  constructor(groupTransformXfoParam, memberXfoGlobalParam) {
    super()
    this.addInput(new OperatorInput('GroupTransformXfo')).setParam(groupTransformXfoParam)
    this.addOutput(new OperatorOutput('MemberGlobalXfo', OperatorOutputMode.OP_READ_WRITE)).setParam(memberXfoGlobalParam)
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const groupTransformXfo = this.getInput('GroupTransformXfo').getParam().getValue()
    const memberGlobalXfo = this.getOutput('MemberGlobalXfo')
    // Read the value, modify and return.
    const value = memberGlobalXfo.getValue()
    memberGlobalXfo.setClean(groupTransformXfo.multiply(value))
  }
}

export { GroupTransformXfoOperator, GroupMemberXfoOperator }
