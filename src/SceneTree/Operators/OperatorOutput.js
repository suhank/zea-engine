import { OperatorOutputMode } from '../Parameters/index'

/** Class representing an operator output.
 */
class OperatorOutput {
  /**
   * Create an operator output.
   * @param {string} name - The name value.
   * @param {OperatorOutputMode} mode - The filterFn value.
   */
  constructor(name, mode = OperatorOutputMode.OP_WRITE) {
    this.__name = name
    this._mode = mode
    this._param = undefined
    this.detached = false
  }

  /**
   * Returns name of the output.
   * @return {string} - The name string.
   */
  getName() {
    return this.__name
  }

  /**
   * Sets operator that owns this output. Called by the operator when adding outputs
   * @param {Operator} - The operator object.
   */
  setOperator(op) {
    this._op = op
  }

  /**
   * Returns operator that owns this output.
   * @return {Operator} - The operator object.
   */
  getOperator() {
    return this._op
  }

  /**
   * Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode
   * @return {OperatorOutputMode} - The mode value.
   */
  getMode() {
    return this._mode
  }

  /**
   * Returns true if this output is connected to a parameter.
   * @return {boolean} - The return value.
   */
  isConnected() {
    return this._param != undefined
  }

  /**
   * The getParam method.
   * @return {any} - The return value.
   */
  getParam() {
    return this._param
  }

  /**
   * Sets the Parameter for this out put to write to.
   * @param {Parameter} param - The param value.
   */
  setParam(param) {
    this._param = param
    this._param.bindOperatorOutput(this)
  }

  /**
   * Propagates dirty to the connected parameter.
   */
  setDirty() {
    if (this._param) {
      this._param.setDirty(this)
    }
  }

  /**
   * The getValue method.
   * @param {boolean} mode - The mode param.
   * @return {any} - The return value.
   */
  getValue() {
    if (this._param) return this._param.getValueFromOp()
  }

  /**
   * The setValue method.
   * Note: FIXME Sometimes outputs are used in places like statemachines,
   * where we would want the change to cause an event.
   * Note: when a user sets a parameter value that is being driven by
   * an operator, the operator can propagate the value back up the chain
   * to its inputs.
   * @param {any} value - The value param.
   * @return {any} - The modified value.
   */
  setValue(value) {
    if (this._param) {
      value = this._op.setValue(value, this)
    }
    return value
  }

  /**
   * The setClean method.
   * @param {any} value - The value param.
   */
  setClean(value) {
    if (this._param) {
      this._param.setCleanFromOp(value, this)
    }
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
    const paramPath = this._param ? this._param.getPath() : ''
    return {
      paramPath: context && context.makeRelative ? context.makeRelative(paramPath) : paramPath,
    }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    if (j.paramPath) {
      // Note: the tree should have fully loaded by the time we are loading operators
      // even new items and groups should have been created. Operators and state machines
      // are loaded last.
      context.resolvePath(
        j.paramPath,
        param => {
          this.setParam(param)
        },
        reason => {
          console.warn("OperatorOutput: '" + this.getName() + "'. Unable to connect to:" + j.paramPath)
        }
      )
    }
  }
}

export { OperatorOutput, OperatorOutputMode }
