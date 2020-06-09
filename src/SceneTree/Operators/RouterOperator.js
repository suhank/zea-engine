import { Operator } from './Operator.js'
import { OperatorOutput } from './OperatorOutput.js'
import { ValueGetMode, NumberParameter, ListParameter } from '../Parameters/index'

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

    this.__inputParam = this.addParameter(new NumberParameter('Input'))
    this.__multipliersParam = this.addParameter(
      new ListParameter('Multipliers', NumberParameter)
    )
    this.__routesParam.addListener('elementAdded', event => {
      event.elem.setValue(1.0)
      this.addOutput(new OperatorOutput('Output'))
    })
    this.__routesParam.addListener('elementRemoved', event => {
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
    const input = this.__inputParam.getValue(ValueGetMode.OPERATOR_GETVALUE)
    const mults = this.__multipliersParam.getValue()
    let i = this.__outputs.length
    while (i--) {
      const output = this.__outputs[i]
      const mult = mults[i].getValue(ValueGetMode.OPERATOR_GETVALUE)
      output.setValue(input * mult)
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
