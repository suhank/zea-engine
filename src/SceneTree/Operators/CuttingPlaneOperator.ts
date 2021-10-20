import { Vec4 } from '../../Math/Vec4'
import { Operator } from './Operator'
import { OperatorOutput } from './OperatorOutput'
import { OperatorInput } from './OperatorInput'
import { Xfo } from '../../Math/Xfo'
import { Vec4Parameter, XfoParameter } from '../Parameters'

/**
 * An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
class CuttingPlaneOperator extends Operator {
  /**
   * Create a GroupMemberXfoOperator operator.
   * @param {XfoParameter} groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param {Vec4Parameter} cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  constructor(groupGlobalXfoParam: XfoParameter, cuttingPlaneParam: Vec4Parameter) {
    super()
    this.addInput(new OperatorInput('GroupGlobalXfo')).setParam(groupGlobalXfoParam)
    this.addOutput(new OperatorOutput('CuttingPlane')).setParam(cuttingPlaneParam)
  }

  /**
   * The evaluate method.
   */
  evaluate(): void {
    const cuttingPlaneOutput = this.getOutput('CuttingPlane')
    const groupGlobalXfo = this.getInput('GroupGlobalXfo').getValue() as Xfo

    const vec = groupGlobalXfo.ori.getZaxis()
    const dist = groupGlobalXfo.tr.dot(vec)

    cuttingPlaneOutput.setClean(new Vec4(vec.x, vec.y, vec.z, -dist))
  }
}

export { CuttingPlaneOperator }
