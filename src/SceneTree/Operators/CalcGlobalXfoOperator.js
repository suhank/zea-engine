// import { Operator } from './Operator.js'
// import { XfoOperatorOutput } from './OperatorOutput.js'
// import { XfoParameter } from '../Parameters'
import { sgFactory } from '../SGFactory.js'

/** An operator for aiming items at targets.
 * @extends Operator
class CalcGlobalXfoOperator extends Operator {
  /**
   * Create a gears operator.
   * @param {string} name - The name value.
   * /
  constructor(name) {
    super(name)
    this.addParameter(new XfoParameter('ParentGlobal'))
    this.addParameter(new XfoParameter('LocalXfo'))
    this.addOutput(new XfoOperatorOutput('GlobalXfo'))
  }

  /**
   * The evaluate method.
   * /
  evaluate() {
    const parentGlobalXfo = this.getParameter('ParentGlobal').getValue()
    const localXfo = this.getParameter('LocalXfo').getValue()
    this.getOutputByIndex(0).setClean(parentGlobalXfo.multiply(localXfo))
  }
}

sgFactory.registerClass('CalcGlobalXfoOperator', CalcGlobalXfoOperator)

*/

/** An operator for aiming items at targets.
 * @extends Operator
 *
 */
class CalcGlobalXfoOperator {
  /**
   * Create a CalcGlobalXfoOperator operator.
   */
  constructor(globalXfoParam, localXfoParam) {
    this.setDirty = this.setDirty.bind(this)

    this.globalXfoParam = globalXfoParam;
    this.globalXfoParam.bindOperator(this)

    this.localXfoParam = localXfoParam
    this.localXfoParam.valueChanged.connect(this.setDirty)
  }

  /**
   * The setGlobalXfoParam method.
   */
  setGlobalXfoParam(globalXfoParam) {
  }

  /**
   * The setLocalXfoParam method.
   */
  setLocalXfoParam(localXfoParam) {
  }

  /**
   * The setParentGlobal method.
   */
  setParentGlobalParam(parentGlobalXfoParam) {
    if (this.parentGlobalXfoParam)
      this.parentGlobalXfoParam.valueChanged.disconnect(this.setDirty)
    this.parentGlobalXfoParam = parentGlobalXfoParam
    if (this.parentGlobalXfoParam)
      this.parentGlobalXfoParam.valueChanged.connect(this.setDirty)
    this.setDirty()
  }

  /**
   * The setDirty method.
   */
  setDirty() {
    this.globalXfoParam.setDirtyFromOp()
  }

  /**
   * The setValue method.
   */
  setValue(value, mode) {
    if (this.parentGlobalXfoParam) {
      const parentGlobaXfo = this.parentGlobalXfoParam.getValue()
      this.localXfoParam.setValue(
        parentGlobaXfo.inverse().multiply(value),
        mode
      )
    } else {
      this.localXfoParam.setValue(value, mode)
    }
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const localXfo = this.localXfoParam.getValue()
    if (this.parentGlobalXfoParam) {
      const parentGlobaXfo = this.parentGlobalXfoParam.getValue()
      this.globalXfoParam.setClean(parentGlobaXfo.multiply(localXfo))
    } else {
      this.globalXfoParam.setClean(localXfo)
    }
  }
}

sgFactory.registerClass('CalcGlobalXfoOperator', CalcGlobalXfoOperator)

export { CalcGlobalXfoOperator }
