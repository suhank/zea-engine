import { Operator } from './Operator.js'
import { OperatorInput } from './OperatorInput.js'
import { OperatorOutput } from './OperatorOutput.js'
import { NumberParameter, ListParameter } from '../Parameters/index'

import { sgFactory } from '../SGFactory.js'

/** Class representing a router operator.
 * @extends Operator
 * @private
 */
class RouterOperator extends Operator {
  /**
   * Create a router operator.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name)

    this.__input = this.addInput(new OperatorInput('Input'))
    this.__multipliersParam = this.addParameter(new ListParameter('Multipliers', NumberParameter))
    this.__multipliersParam.on('elementAdded', (event) => {
      event.elem.setValue(1.0)
      this.addOutput(new OperatorOutput('Output'))
    })
    this.__multipliersParam.on('elementRemoved', (event) => {
      this.removeOutput(this.getOutputByIndex(event.index))
    })
  }

  /**
   * The addRoute method.
   */
  addRoute() {
    const index = this.__multipliersParam.getCount()
    this.__multipliersParam.addElement(new NumberParameter("Mult"+index))
    return this.getOutputByIndex(index)
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const input = this.__input.getValue()
    const multipliers = this.__multipliersParam.getValue()
    let i = this.__outputs.length
    while (i--) {
      const output = this.__outputs[i]
      const multiplier = multipliers[i].getValue()
      output.setValue(input * multiplier)
    }
    this.emit('postEval', {})
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   * @return {object} - Returns the json object.
   */
  toJSON(context, flags) {
    return super.toJSON(context, flags)
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {
    super.destroy()
  }
}

sgFactory.registerClass('RouterOperator', RouterOperator)

export { RouterOperator }
