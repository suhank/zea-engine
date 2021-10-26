/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseItem } from '../BaseItem'
import { OperatorInput } from './OperatorInput'
import { OperatorOutput } from './OperatorOutput'

/**
 * Class representing an operator.
 *
 * @extends BaseItem
 */
class Operator extends BaseItem {
  __inputs: Map<string, OperatorInput>
  __outputs: Map<string, OperatorOutput>
  /**
   * Create an operator.
   * @param name - The name value.
   */
  constructor(name: string = '') {
    super(name)
    this.__inputs = new Map()
    this.__outputs = new Map()
  }

  /**
   * This method sets the state of the operator to dirty which propagates
   * to the outputs of this operator, and which may then propagate to other
   * operators. When the scene is cleaned, which usually is caused by rendering
   * then the chain of operators are cleaned by triggering evaluation.
   * @private
   */
  setDirty(): void {
    this.__outputs.forEach((output: OperatorOutput) => output.setDirty())
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   *
   * @param event
   * @private
   */
  protected parameterValueChanged(event: Record<string, unknown>): void {
    super.parameterValueChanged(event)
    this.setDirty()
  }

  /**
   * The addInput method.
   * @param input - The name of the input, or the input object
   * @return - The return value.
   */
  addInput(input: OperatorInput): OperatorInput {
    if (typeof input == 'string') input = new OperatorInput(input)
    else if (!(input instanceof OperatorInput)) {
      throw new Error(`addInput only accepts string or OperatorInput`)
    }
    input.setOperator(this)
    this.__inputs.set(input.getName(), input)
    this.setDirty()
    return input
  }

  /**
   * The removeInput method.
   * @param input - The name of the input, or the input object
   */
  removeInput(input: OperatorInput): void {
    if (typeof input == 'string') input = this.getInput(input)
    if (!(input instanceof OperatorInput)) {
      throw new Error(`removeInput only accepts string or OperatorInput`)
    }
    if (input.getParam()) input.setParam(undefined)
    this.__inputs.delete(input.getName())
  }

  /**
   * Getter for the number of inputs in this operator.
   * @return - Returns the number of inputs.
   */
  getNumInputs(): number {
    return this.__inputs.size
  }

  /**
   * The getInputByIndex method.
   * @param index - The index value.
   * @return - The return value.
   */
  getInputByIndex(index: number): Record<string, any> {
    return Array.from(this.__inputs.values())[index]
  }

  /**
   * The getInput method.
   * @param name - The name value.
   * @return - The return value.
   */
  getInput(name: string): OperatorInput {
    const input = this.__inputs.get(name)
    if (!input) throw `Couldn't find an Input with the name of '${name}'`
    return input
  }

  /**
   * The addOutput method.
   * @param output - The name of the output, or the output object
   * @return - The return value.
   */
  addOutput(output: OperatorOutput | string): OperatorOutput {
    if (typeof output == 'string') output = new OperatorOutput(output)
    else if (!(output instanceof OperatorOutput)) {
      throw new Error(`addOutput only accepts string or OperatorOutput`)
    }
    output.setOperator(this)
    // if (this.getOutput(output.getName())) throw new Error(`Operator output already exists ${output.getName()}`)
    this.__outputs.set(output.getName(), output)
    this.setDirty()
    return output
  }

  /**
   * The removeOutput method.
   * @param output - The name of the output, or the output object
   */
  removeOutput(output: OperatorOutput | string): void {
    if (typeof output == 'string') output = this.getOutput(output)
    if (!(output instanceof OperatorOutput)) {
      throw new Error(`removeOutput only accepts string or OperatorInput`)
    }
    if (output.getParam()) output.setParam()
    this.__outputs.delete(output.getName())
  }

  /**
   * Getter for the number of outputs in this operator.
   * @return - Returns the number of outputs.
   */
  getNumOutputs(): number {
    return this.__outputs.size
  }

  /**
   * The getOutputByIndex method.
   * @param index - The index value.
   * @return - The return value.
   */
  getOutputByIndex(index: number): OperatorOutput {
    return Array.from(this.__outputs.values())[index]
  }

  /**
   * The getOutput method.
   * @param name - The name value.
   * @return - The return value.
   */
  getOutput(name: string): OperatorOutput {
    const output = this.__outputs.get(name)
    if (!output) throw new Error(`Couldn't find an Output with the name of '${name}'`)
    return output
  }

  /**
   * The evaluate method.
   * Computes the values of each of the outputs based on the values of the inputs
   * and the values of outputs with mode OP_READ_WRITE.
   * This method must be implemented by all Operators.
   */
  evaluate(): void {
    throw new Error('Not yet implemented')
  }

  /**
   * When the value on a Parameter is modified by a user by calling 'setValue,
   * then if any operators are bound, the value of the Parameter cannot be modified
   * directly as it is the result of a computation. Instead, the Parameter calls
   * 'backPropagateValue' on the Operator to cause the Operator to handle propagating
   * the value to one or more of its inputs.
   * to its inputs.
   * @param value - The value param.
   * @return - The modified value.
   */
  backPropagateValue(value: unknown): unknown {
    // TODO: Implement me for custom manipulations.
    return value
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param context - The context value.
   * @return - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    const j = super.toJSON(context)
    ;(j as any).type = this.getClassName()
    const inputs: any = []
    this.__inputs.forEach((input: any) => {
      inputs.push(input.toJSON(context))
    })
    ;(j as any).inputs = inputs
    const outputs: any = []
    this.__outputs.forEach((output: any) => {
      outputs.push(output.toJSON(context))
    })
    ;(j as any).outputs = outputs
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param j - The json object this item must decode.
   * @param context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    super.fromJSON(j, context)
    if (j.inputs) {
      j.inputs.forEach((inputJson: any, index: any) => {
        let input
        if (inputJson.name) {
          input = this.getInput(inputJson.name)
          if (!input) {
            input = this.addInput(inputJson.name)
          }
        } else {
          input = this.getInputByIndex(index)
        }
        ;(input as OperatorInput).fromJSON(inputJson, context)
      })
    }
    if (j.outputs) {
      j.outputs.forEach((outputJson: any, index: any) => {
        let output
        if (outputJson.name) {
          output = this.getOutput(outputJson.name)
          if (!output) {
            output = this.addOutput(outputJson.name)
          }
        } else {
          output = this.getOutputByIndex(index)
        }
        ;(output as OperatorOutput).fromJSON(outputJson, context)
      })
    }
  }

  /**
   * The detach method.
   */
  detach(): void {
    this.__inputs.forEach((input: OperatorInput) => input.detach())
    this.__outputs.forEach((output: OperatorOutput) => output.detach())
  }

  /**
   * The reattach method.
   */
  reattach(): void {
    this.__inputs.forEach((input: OperatorInput) => input.reattach())
    this.__outputs.forEach((output: OperatorOutput) => output.reattach())
  }

  /**
   * The rebind method.
   */
  rebind(): void {
    this.__outputs.forEach((output: OperatorOutput) => output.rebind())
  }
}

export { Operator }
