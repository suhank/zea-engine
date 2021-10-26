import { Operator } from './Operator'
import { OperatorInput } from './OperatorInput'
import { OperatorOutput } from './OperatorOutput'
import { Parameter } from '../Parameters'
import { Registry } from '../../Registry'

/** Class representing a router operator.
 * @extends Operator
 * @private
 */
class RouterOperator extends Operator {
  __input: OperatorInput

  /**
   * Create a router operator.
   * @param name - The name value.
   */
  constructor(name?: string) {
    super(name)
    this.__input = this.addInput(new OperatorInput('Input'))
  }

  /**
   * The addRoute method.
   * @param param - The parameter to router values to.
   * @return - The added output.
   */
  addRoute(param: Parameter<unknown>): OperatorOutput {
    const output = this.addOutput(new OperatorOutput('Output' + this.__outputs.size))
    if (param) {
      output.setParam(param)
    }
    return output
  }

  /**
   * The evaluate method.
   */
  evaluate(): void {
    if (this.__input.isConnected()) {
      const inputValue = this.__input.getValue()
      let i = this.__outputs.size
      while (i--) {
        const output = this.getOutputByIndex(i)
        output.setClean(inputValue)
      }
    } else {
      let i = this.__outputs.size
      while (i--) {
        const output = this.getOutputByIndex(i)
        output.setClean(0.0)
      }
    }
  }
}

Registry.register('RouterOperator', RouterOperator)

export { RouterOperator }
