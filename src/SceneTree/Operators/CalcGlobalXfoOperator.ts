import { Xfo } from '../../Math/Xfo'
import { Registry } from '../../Registry'
import { XfoParameter } from '../Parameters'
import { Operator } from './Operator'
import { XfoOperatorInput } from './OperatorInput'
import { XfoOperatorOutput } from './OperatorOutput'

/** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
 * @extends Operator
 * @private
 */
class CalcGlobalXfoOperator extends Operator {
  parentGlobal: XfoOperatorInput = new XfoOperatorInput('ParentGlobal')
  localXfo: XfoOperatorInput = new XfoOperatorInput('LocalXfo')
  globalXfo: XfoOperatorOutput = new XfoOperatorOutput('GlobalXfo')
  /**
   * Create a CalcGlobalXfoOperator operator.
   *
   * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
   * @param cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
   */
  // TODO: adding new XfoP... to make inheritence work
  constructor(globalXfoParam?: XfoParameter, localXfoParam?: XfoParameter) {
    super('CalcGlobalXfoOperator')
    this.localXfo.setParam(localXfoParam)
    this.globalXfo.setParam(globalXfoParam)
    this.addInput(this.parentGlobal)
    this.addInput(this.localXfo)
    this.addOutput(this.globalXfo)
  }

  /**
   * The backPropagateValue method inverts the mathematics of the 'evaluate'
   * method so it can propagate the value backwards to its inputs.
   * @param value - the new value being set on the output GlobalXfo
   */
  backPropagateValue(value: Xfo): void {
    if (this.parentGlobal.isConnected()) {
      const parentGlobalXfo = this.parentGlobal.getValue()
      this.localXfo.setValue(parentGlobalXfo.inverse().multiply(value))
    } else {
      this.localXfo.setValue(value)
    }
  }

  /**
   * The evaluate method calculates a new global Xfo based on the parents Global Xfo,
   * and the local Xfo value.
   */
  evaluate(): void {
    const localXfo = this.localXfo.getValue()
    if (this.parentGlobal.isConnected()) {
      const parentGlobalXfo = this.parentGlobal.getValue()
      this.globalXfo.setClean(parentGlobalXfo.multiply(localXfo))
    } else {
      this.globalXfo.setClean(localXfo)
    }
  }
}

Registry.register('CalcGlobalXfoOperator', CalcGlobalXfoOperator)

export { CalcGlobalXfoOperator }
