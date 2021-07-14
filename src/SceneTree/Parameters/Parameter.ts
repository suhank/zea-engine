import { ParameterOwner } from '../ParameterOwner'
import { BaseItem } from '../BaseItem'
import { EventEmitter } from '../../Utilities/EventEmitter'
import { Registry } from '../../Registry'
import { OperatorOutput } from '../Operators/OperatorOutput'
import { ICloneable } from '../../Utilities/ICloneable'
import { ISerializable } from '../../Utilities/ISerializable'
import { OperatorOutputMode } from './OperatorOutputMode'
// import { BinReader } from '../BinReader'

/**
 * Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.
 *
 * **Events**
 * * **nameChanged:** Triggered when the name of the parameter changes.
 * * **valueChanged:** Triggered when the value of the parameter changes.
 */
abstract class Parameter<T> extends EventEmitter implements ICloneable, ISerializable {
  // TODO:(refactor) boundOps, cleaning, dirtyOpIndex, firstOP_WRITE, were private.
  protected dirty: boolean
  protected boundOps: OperatorOutput[]
  protected cleaning: boolean
  protected dirtyOpIndex: number
  protected firstOP_WRITE: number
  protected name: string
  protected value?: T
  protected dataType?: string
  protected ownerItem: ParameterOwner

  /**
   * When initializing a new parameter, the passed in value could be anything.
   * If it is a new type of value, just ensure you register it in the `Registry`.
   *
   * How to use it:
   *
   * ```javascript
   *  // Creating a parameter object
   *  const param = new Parameter('Title', 'Awesome Parameter Value', 'String')
   *
   *   // Capturing events
   *  param.on('valueChanged', (...params) => console.log('Value changed!'))
   *
   *  // Changing parameter's value will cause `valueChanged` event to trigger.
   *  param.setValue('A New Awesome Parameter Value')
   *  // As result the console log code will execute: Value Changed!
   * ```
   *
   * @param {string} name - The name of the parameter.
   * @param {T} value - The value of the parameter.
   * @param {string} dataType - The data type of the parameter.
   */
  constructor(name: string, value?: T, dataType?: string) {
    super()

    this.name = name
    this.value = value
    this.dataType = dataType
    this.boundOps = []
    this.dirtyOpIndex = 0
    this.cleaning = false
  }

  /**
   * Returns specified name of the parameter.
   *
   * @return {string} - Returns the name.
   */
  getName = (): string => {
    return this.name
  }

  /**
   * Sets the name of the current parameter.
   *
   * @param {string} name - The base parameter name.
   * @return {Parameter} - The instance itself.
   */
  setName = (name: string): void => {
    if (name === this.name) {
      return
    }

    const prevName = this.name
    this.name = name
    this.emit('nameChanged', { newName: this.name, prevName })
  }

  /**
   * Returns the owner item of the current parameter.
   *
   * @return {ParameterOwner} - The return value.
   */
  getOwner(): ParameterOwner {
    return this.ownerItem
  }

  /**
   * Sets the owner item of the current parameter.
   *
   * @param {ParameterOwner} ownerItem - The ownerItem value.
   */
  setOwner(ownerItem: ParameterOwner): void {
    this.ownerItem = ownerItem
  }

  /**
   * Returns the parameter's path as an array of strings.
   * Includes owner's path in case it is owned by a `ParameterOwner`.
   *
   * @return {string[]} - The return value.
   */
  getPath(): string[] {
    if (this.ownerItem && this.ownerItem instanceof BaseItem) {
      return [...this.ownerItem.getPath(), this.name]
    } else {
      return [this.name]
    }
  }

  /**
   * Returns parameter's data type.
   *
   * @return {string} - The return value.
   */
  getDataType(): string | undefined {
    return this.dataType
  }

  // ////////////////////////////////////////////////
  // Operator bindings

  /**
   * Binds an OperatorOutput to this parameter.
   *
   * @param {OperatorOutput} operatorOutput - The output that we are unbinding from the Parameter
   * @param {number} index - The index(optional) that the output is being bound at.
   * @return {number} - The index of the bound output.
   */
  bindOperatorOutput(operatorOutput: OperatorOutput, index = -1): number {
    if (index == -1) index = this.boundOps.length
    this.boundOps.splice(index, 0, operatorOutput)
    // Update the remaining binding indices
    for (let i = index; i < this.boundOps.length; i++) {
      this.boundOps[i].setParamBindIndex(i)
    }
    // If we weren't already dirty, make sure to emit a 'valueChanged' anyway.
    this.__findFirstOP_WRITE()
    if (!this.setDirty(index)) this.emit('valueChanged', { mode: 0 })
    return index
  }

  /**
   * The unbindOperator method.
   *
   * @param {OperatorOutput} operatorOutput - The output that we are unbinding from the Parameter
   * @return {boolean} - The return value.
   */
  unbindOperator(operatorOutput: OperatorOutput): number {
    const index = operatorOutput.getParamBindIndex()
    this.boundOps.splice(index, 1)
    // Update the remaining binding indices
    for (let i = index; i < this.boundOps.length; i++) {
      this.boundOps[i].setParamBindIndex(i)
    }
    this.__findFirstOP_WRITE()
    this.setDirty(Math.max(0, index - 1))
    return index
  }

  /**
   * Find the first operator in our stack which writes using an OP_WRITE connection.
   * All operators before this op can be ignored during dirty propagation.
   * @private
   */
  __findFirstOP_WRITE(): void {
    this.firstOP_WRITE = this.boundOps.length
    if (this.boundOps.length > 0) {
      for (this.firstOP_WRITE--; this.firstOP_WRITE > 0; this.firstOP_WRITE--) {
        // Find the first OP_WRITE binding. (Note: we could cache this)
        if (this.boundOps[this.firstOP_WRITE].getMode() == OperatorOutputMode.OP_WRITE) break
      }
    }
  }

  /**
   * Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.
   *
   * @param {number} index - Index of the operator
   * @return {boolean} - `true` if the Parameter was made dirty, else `false` if it was already dirty.
   */
  setDirty(index: number): boolean {
    // Determine the first operator in the stack that must evaluate to clean the parameter.
    if (index < this.dirtyOpIndex) {
      // If we must dirty all operators in the stack from the last OP_WRITE to the end.
      // Note: If a setDirty call comes from an op that precedes an OP_WRITE operator, we
      // can safely discard it, as its output will have no effect on the value of this parameter.
      let newDirtyIndex = this.firstOP_WRITE
      if (newDirtyIndex <= index) {
        this.dirtyOpIndex = newDirtyIndex
        for (newDirtyIndex++; newDirtyIndex < this.boundOps.length; newDirtyIndex++) {
          // Dirty all the other bound ops from the OP_WRITE to the top of the stack.
          if (newDirtyIndex != index) {
            // This will cause the other outputs of the operator to become dirty.
            this.boundOps[newDirtyIndex].getOperator().setDirty()
          }
        }
        this.emit('valueChanged', { mode: 0 })
        return true
      }
    }

    return false
  }

  /**
   * Returns true if this parameter is currently dirty and will evaluate its bound
   * operators if its value is requested by a call to getValue.
   *
   * @return {boolean} - Returns a boolean.
   */
  isDirty(): boolean {
    return this.dirtyOpIndex < this.boundOps.length
  }

  /**
   * Returns the index of the first 'dirty' binding in the stack. This will be the index of the
   * first operator that will evaluate when the parameter needs to be cleaned.
   *
   * @return {number} - The index of the dirty binding in the binding stack.
   */
  getDirtyBindingIndex(): number {
    return this.dirtyOpIndex
  }

  /**
   * The setCleanFromOp method.
   * @param {T} value - The computed value to be stored in the Parameter.
   * @param {number} index - The index of the bound OperatorOutput.
   */
  setCleanFromOp(value: T, index: number): void {
    if (index != this.dirtyOpIndex) {
      if (index < this.dirtyOpIndex) {
        // This can happen when an operator in the following case.

        // ParamA [OpC, OpB, OpA]
        // ParamB [OpC, OpA]
        // When OpB dirties ParamA, and is evaluated, ParamB is considered clean because OpA was never dirtied

        // We see this message when parameters are evaluated as soon as a change is detected instead of
        // in batches. Now that all rendering code is pulling data only during the render cycle, we ara
        // not seeing it anymore. However, maybe with a UI open, it will start emitting this warning.
        // Note: this would be caused, if a Parameter is already cleaned by an Operator, and yet the Operator
        // is re-evaluating. I am not sure how this can occur.
        // const op = operatorOutput.getOperator()
        // console.log(
        //   `Operator:: ${
        //     op.constructor.name
        //   } with name: ${op.getName()} is being cleaned immediately, instead of lazily.`
        // )
        console.log(`Parameter is cleaned when it was already clean to that point in the stack:`, this.getPath())
      } else if (this.boundOps[index].getMode() != OperatorOutputMode.OP_WRITE) {
        // A parameter can become dirty (so __dirtyOpIndex == 0), and then another operator bound on top.
        // if the next op is a WRITE op, then we can fast forward the dirty index.
        const thisClassName = Registry.getBlueprintName(this)
        const op = this.boundOps[index].getOperator()
        const opClassName = Registry.getBlueprintName(op)
        throw new Error(
          `Parameter: ${thisClassName} with name: ${this.getName()} is not cleaning all outputs during evaluation of op: ${opClassName} with name: ${op.getName()}`
        )
      }
    } else {
      // console.log(`cleaned:`, this.getPath())
    }

    this.value = value

    // As each operator writes its value, the dirty value is incremented
    this.dirtyOpIndex = index + 1
  }

  /**
   * During operator evaluation, operators can use this method to retrieve the existing
   * value of one of their outputs.
   * @param {number} index - The index of the bound OperatorOutput to evaluate up to.
   * @return {T | undefined} - The return value.
   */
  getValueFromOp(index: number): T | undefined {
    // Note: during evaluation of an Operator that writes to multiple outputs,
    // it can write to an output with an IO setting, which means it retrieves
    // the previous value while calculating the next.
    if (this.dirtyOpIndex < index) {
      this._clean(index)
    }
    return this.value
  }

  /**
   * Cleans the parameter up tp the index of the specified index of the bound OperatorOutput
   *
   * @param {number} index - The index of the bound OperatorOutput to evaluate up to.
   */
  _clean(index: number): void {
    if (this.cleaning) {
      throw new Error(`Cycle detected when cleaning: ${this.getPath()}. Operators need to be rebound to fix errors`)
    }
    this.cleaning = true

    while (this.dirtyOpIndex < index) {
      const tmp = this.dirtyOpIndex
      const operatorOutput = this.boundOps[this.dirtyOpIndex]
      // The op can get the current value and modify it in place
      // and set the output to clean.
      operatorOutput.getOperator().evaluate()

      if (tmp == this.dirtyOpIndex) {
        // During initial configuration of an operator, cleaning outputs might be disabled.
        const op = this.boundOps[this.dirtyOpIndex].getOperator()
        const opClassName = Registry.getBlueprintName(op)
        console.warn(
          `Operator: ${opClassName} with name: ${op.getName()} is not cleaning its outputs during evaluation`
        )
        this.dirtyOpIndex++
      }
    }

    this.cleaning = false
  }

  /**
   * Returns parameter's value.
   *
   * @param {number} mode - The mode value.
   * @return {T} - The return value.
   */
  getValue(mode?: number): T {
    if (mode != undefined) {
      console.warn("WARNING in Parameter.setValue: 'mode' is deprecated.")
    }
    if (this.dirtyOpIndex < this.boundOps.length) {
      this._clean(this.boundOps.length)
    }

    return this.value
  }

  /**
   * Sets value of the parameter.
   *
   * @param {T} value - The value param.
   * @param {number} mode - This is deprecated now.
   */
  setValue(value: T, mode?: number): void {
    if (value == undefined) {
      // eslint-disable-next-line no-throw-literal
      throw 'undefined was passed into the set value for param:' + this.getName()
    }
    //if (mode != undefined) {
    //  console.warn("WARNING in Parameter.setValue: 'mode' is deprecated.")
    //}

    if (this.boundOps.length > 0) {
      for (let i = this.boundOps.length - 1; i >= 0; i--) {
        const operatorOutput = this.boundOps[i]
        value = operatorOutput.backPropagateValue(value)
        if (operatorOutput.getMode() == 0 /* OP_WRITE */) return
      }
    }

    if (typeof value !== 'object') {
      // Note: equality tests on anything but simple values is going to be super expensive.
      if (this.value == value) return
    }
    this.value = value

    // Note: only users call 'setValue'. Operators call 'setCleanFromOp'
    this.emit('valueChanged', {})
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The loadValue is used to change the value of a parameter, without triggering a
   * valueChanges, or setting the USER_EDITED state.
   *
   * @param {T} value - The context value.
   */
  loadValue(value: T): void {
    this.value = value
  }

  abstract toJSON(context?: Record<string, any>): Record<string, any>

  abstract fromJSON(j: Record<string, any>, context?: Record<string, any>): void

  abstract clone(): any

  /**
   * The readBinary method.
   *
   * @param {object} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context) {
    console.warn(`TODO: Parameter: ${this.constructor.name} with name: ${this.name} does not implement readBinary`)
  }

  /**
   * The readBinary method.
   *
   * @param {object} reader - The reader value.
   * @param {object} context - The context value.
   */
  destroy() {
    console.warn("nothing destroyed. This method was not overwritten in subclass")
  }
}

export { Parameter }
