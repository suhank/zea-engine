import { Operator } from './Operator.js'
import { OperatorInput } from './OperatorInput.js'
import { OperatorOutput } from './OperatorOutput.js'

/** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
 * @extends Operator
 * @private
 */
class CalcGlobalXfoOperator extends Operator {
  /**
   * Create a CalcGlobalXfoOperator operator.
   * @param {string} name - The name value.
   */
  constructor(globalXfoParam, localXfoParam) {
    super("CalcGlobalXfoOperator")
    this.addInput(new OperatorInput('ParentGlobal'))
    this.addInput(new OperatorInput('LocalXfo')).setParam(localXfoParam)
    this.addOutput(new OperatorOutput('GlobalXfo')).setParam(globalXfoParam)
  }

  /**
   * The setValue method.
   * @param {Xfo} value - the new value being set on the GlobalXfo
   */
  setValue(value) {
    const localXfoParam = this.getInput('LocalXfo').getParam()
    const parentGlobalInput = this.getInput('ParentGlobal')
    if (parentGlobalInput.isConnected()) {
      const parentGlobalXfo = parentGlobalInput.getValue()
      localXfoParam.setValue(parentGlobalXfo.inverse().multiply(value))
    } else {
      localXfoParam.setValue(value)
    }
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const localXfo = this.getInput('LocalXfo').getValue()
    const parentGlobalInput = this.getInput('ParentGlobal')
    const globalXfoOutput = this.getOutput('GlobalXfo')
    if (parentGlobalInput.isConnected()) {
      const parentGlobalXfo = parentGlobalInput.getValue()
      globalXfoOutput.setClean(parentGlobalXfo.multiply(localXfo), this)
    } else {
      globalXfoOutput.setClean(localXfo, this)
    }
  }
}

// sgFactory.registerClass('CalcGlobalXfoOperator', CalcGlobalXfoOperator)

export { CalcGlobalXfoOperator }


/** An operator for aiming items at targets.
 * @extends Operator
 *
 * /
class CalcGlobalXfoOperator {
  /**
   * Create a CalcGlobalXfoOperator operator.
   * /
  constructor(globalXfoParam, localXfoParam) {
    this.setDirty = this.setDirty.bind(this)

    this.globalXfoParam = globalXfoParam;
    this.globalXfoParam.bindOperator(this)

    this.localXfoParam = localXfoParam
    this.localXfoParam.valueChanged.connect(this.setDirty)
  }

  /**
   * The setGlobalXfoParam method.
   * /
  setGlobalXfoParam(globalXfoParam) {
  }

  /**
   * The setLocalXfoParam method.
   * /
  setLocalXfoParam(localXfoParam) {
  }

  /**
   * The setParentGlobal method.
   * /
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
   * /
  setDirty() {
    this.globalXfoParam.setDirtyFromOp(this)
  }

  /**
   * The setValue method.
   * /
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
   * /
  evaluate() {
    const localXfo = this.localXfoParam.getValue()
    if (this.parentGlobalXfoParam) {
      const parentGlobaXfo = this.parentGlobalXfoParam.getValue()
      this.globalXfoParam.setCleanFromOp(parentGlobaXfo.multiply(localXfo), this)
    } else {
      this.globalXfoParam.setCleanFromOp(localXfo, this)
    }
  }
}

sgFactory.registerClass('CalcGlobalXfoOperator', CalcGlobalXfoOperator)
*/

