import { ValueSetMode, ValueGetMode } from '../Parameters/index'

const OperatorOutputMode = {
  OP_WRITE: 0,
  OP_READ_WRITE: 1,
}


/** Class representing an operator output.
 */
class OperatorOutput {
  /**
   * Create an operator output.
   * @param {string} name - The name value.
   * @param {OperatorOutputMode} mode - The filterFn value.
   */
  constructor(name, mode=OperatorOutputMode.OP_WRITE) {
    this.__name = name
    this._mode = mode
    this._param = undefined
    this.detached = false
  }

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name
  }

  setOperator(op) {
    this._op = op
  }

  getOperator() {
    return this._op
  }


  getMode() {
    return this._mode
  }

  /**
   * The isConnected method.
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
   * The setParam method.
   * @param {any} param - The param value.
   */
  setParam(param) {
    this._param = param
    this._param.bindOperatorOutput(this)
  }

  /**
   * The setDirty method.
   * @param {any} fn - The fn value.
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
      paramPath:
        context && context.makeRelative
          ? context.makeRelative(paramPath)
          : paramPath,
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
          console.warn(
            "Operator Output: '" +
              this.getName() +
              "'. Unable to load item:" +
              j.paramPath
          )
        }
      )
    }
  }

  // /**
  //  * The detach method.
  //  */
  // detach() {
  //   // This function is called when we want to suspend an operator
  //   // from functioning because it is deleted and on the undo stack.
  //   // Once operators have persistent connections,
  //   // we will simply uninstall the output from the parameter.
  //   this.detached = true
  // }

  // /**
  //  * The reattach method.
  //  */
  // reattach() {
  //   this.detached = false
  // }
}

/** Class representing an Xfo operator output.
 * @extends OperatorOutput
class XfoOperatorOutput extends OperatorOutput {
  /**
   * Create an Xfo operator output.
   * @param {string} name - The name value.
   * /
  constructor(name) {
    super(name)
  }

  /**
   * The getInitialValue method.
   * @return {any} - The return value.
   * /
  getInitialValue() {
    return this._initialParamValue
  }

  /**
   * The setParam method.
   * @param {any} param - The param value.
   * /
  setParam(param) {
    // Note: sometimes the param value is changed after binding.
    // e.g. The group Xfo is updated after the operator
    // that binds to it is loaded. It could also change if a user
    // Is adding items to the group using the UI. Therefore, the
    // initial Xfo needs to be updated.
    const init = () => {
      this._initialParamValue = param.getValue()
      if (this._initialParamValue.clone)
        this._initialParamValue = this._initialParamValue.clone()

      if (this._initialParamValue == undefined) throw new Error('WTF?')
    }
    init()
    // param.on('valueChanged', event => {
    //   if (
    //     event.mode == ValueSetMode.USER_SETVALUE ||
    //     event.mode == ValueSetMode.REMOTEUSER_SETVALUE ||
    //     event.mode == ValueSetMode.DATA_LOAD
    //   ) {
    //     init()
    //   }
    // })

    this._param = param
    this.emit('paramSet', { param })
  }
}
*/
export { OperatorOutput, OperatorOutputMode }
