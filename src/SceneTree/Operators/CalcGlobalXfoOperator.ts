import { Xfo } from '../../Math/Xfo'
import { Registry } from '../../Registry'
import { XfoParameter } from '../Parameters'
import { Operator } from './Operator'
import { OperatorInput } from './OperatorInput'
import { OperatorOutput } from './OperatorOutput'

/** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
 * @extends Operator
 * @private
 */
class CalcGlobalXfoOperator extends Operator {
  /**
   * Create a CalcGlobalXfoOperator operator.
   *
   * @param {XfoParameter} groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param {XfoParameter} cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  // TODO: adding new XfoP... to make inheritence work
  constructor(globalXfoParam?: XfoParameter, localXfoParam?: XfoParameter) {
    super('CalcGlobalXfoOperator')
    this.addInput(new OperatorInput('ParentGlobal'))
    this.addInput(new OperatorInput('LocalXfo')).setParam(localXfoParam)
    this.addOutput(new OperatorOutput('GlobalXfo')).setParam(globalXfoParam)
  }

  /**
   * The backPropagateValue method inverts the mathematics of the 'evaluate'
   * method so it can propagate the value backwards to its inputs.
   * @param {Xfo} value - the new value being set on the output GlobalXfo
   */
  backPropagateValue(value: Xfo): void {
    const localXfoParam = this.getInput('LocalXfo').getParam()
    const parentGlobalInput = this.getInput('ParentGlobal')
    if (parentGlobalInput.isConnected()) {
      const parentGlobalXfo = parentGlobalInput.getValue() as Xfo
      localXfoParam?.setValue(parentGlobalXfo.inverse().multiply(value))
    } else {
      localXfoParam?.setValue(value)
    }
  }

  /**
   * The evaluate method calculates a new global Xfo based on the parents Global Xfo,
   * and the local Xfo value.
   */
  evaluate(): void {
    const localXfo = this.getInput('LocalXfo').getValue() as Xfo
    const parentGlobalInput = this.getInput('ParentGlobal')
    const globalXfoOutput = this.getOutput('GlobalXfo')
    if (parentGlobalInput.isConnected()) {
      const parentGlobalXfo = parentGlobalInput.getValue() as Xfo
      globalXfoOutput.setClean(parentGlobalXfo.multiply(localXfo))
    } else {
      globalXfoOutput.setClean(localXfo)
    }
  }
}

Registry.register('CalcGlobalXfoOperator', CalcGlobalXfoOperator)

export { CalcGlobalXfoOperator }
