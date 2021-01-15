/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parameter } from '@SceneTree/Parameters'
import { EventEmitter } from '@Utilities/EventEmitter'
import { Operator } from './Operator'

/** Class representing an operator input.
 * @extends EventEmitter
 */
class OperatorInput extends EventEmitter {
  __name: string
  _op: Operator
  _param?: Parameter
  detached: boolean

  /**
   * Create an operator input.
   * @param {string} name - The name value.
   */
  constructor(name: string) {
    super()
    this.__name = name
    this.paramValueChanged = this.paramValueChanged.bind(this)
  }

  /**
   * The getName method.
   * @return {string} - The return value.
   */
  getName(): string {
    return this.__name
  }

  /**
   * Sets operator that owns this input. Called by the operator when adding inputs
   * @param {Operator} op - The operator object.
   */
  setOperator(op: Operator): void {
    this._op = op
  }

  /**
   * Returns operator that owns this input.
   * @return {Operator} - The operator object.
   */
  getOperator(): Operator {
    return this._op
  }

  /**
   * Returns true if this input is connected to a parameter.
   * @return {boolean} - The return value.
   */
  isConnected(): boolean {
    return this._param != undefined
  }

  /**
   * The getParam method.
   * @return {Parameter} - The return value.
   */
  getParam(): Parameter | undefined {
    return this._param
  }

  /**
   * @private
   * The handler function for when the input paramter changes.
   * @param {object} event - The event object.
   */
  protected paramValueChanged = (event: Record<string, any>): void => {
    if (this._op) this._op.setDirty()
  }

  /**
   * Assigns the Paramter to be used to provide the input value.
   * @param {Parameter} param - The param value.
   */
  setParam(param?: Parameter): void {
    if (this._param) {
      this._param.off('valueChanged', this.paramValueChanged)
    }
    this._param = param
    if (this._param) {
      this._param.on('valueChanged', this.paramValueChanged)
    }
    this.emit('paramSet', { param: this._param })
  }

  /**
   * The getValue method.
   * @return {unknown} - The return value.
   */
  getValue(): unknown {
    if (this._param) return this._param.getValue()
  }

  /**
   * The setValue method.
   * @param {unknown} value - The value param.
   */
  setValue(value: unknown): void {
    if (this._param) {
      this._param.setValue(value)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {{ name: string; paramPath: any }} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): { name: string; paramPath: any } {
    const paramPath = this._param ? this._param.getPath() : ''
    return {
      name: this.__name,
      paramPath: context && context.makeRelative ? context.makeRelative(paramPath) : paramPath,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (j.paramPath) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context?.resolvePath(
        j.paramPath,
        (param: any) => {
          this.setParam(param)
        },
        (reason: any) => {
          console.warn("OperatorInput: '" + this.getName() + "'. Unable to connect to:" + j.paramPath)
        },
      )
    }
  }

  /**
   * The detach method is called when an operator is being removed from the scene tree.
   * It removes all connections to parameters in the scene.
   */
  detach(): void {
    // This function is called when we want to suspend an operator
    // from functioning because it is deleted and on the undo stack.
    // Once operators have persistent connections,
    // we will simply uninstall the output from the parameter.
    if (this._param) {
      this._param.off('valueChanged', this.paramValueChanged)
    }
  }

  /**
   * The reattach method can be called when re-instating an operator in the scene.
   */
  reattach(): void {
    this.detached = false
    if (this._param) {
      this._param.on('valueChanged', this.paramValueChanged)
    }
  }
}

export { OperatorInput }
