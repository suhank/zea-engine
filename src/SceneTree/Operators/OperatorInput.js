
import { sgFactory } from '../SGFactory'

/** Class representing an operator output.
 */
class OperatorInput  {
  /**
   * Create an operator output.
   * @param {string} name - The name value.
   */
  constructor(name) {
    // super()
    this.__name = name
    this._param = undefined
    this._paramValueChanged = this._paramValueChanged.bind(this)
  }

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name
  }

  setOperator(op) {
    this.__op = op
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

  _paramValueChanged(event) {
    if (this.__op) this.__op.setDirty(this.__name)
  }

  /**
   * The setParam method.
   * @param {any} param - The param value.
   */
  setParam(param) {
    if (this._param) {
      this._param.off("valueChanged", this._paramValueChanged)
    }
    this._param = param
    if (this._param) {
      this._param.on("valueChanged", this._paramValueChanged)
    }
    // this.emit('paramSet', { param })
  }

  /**
   * The getValue method.
   * @return {any} - The return value.
   */
  getValue() {
    if (this._param) return this._param.getValue()
  }

  /**
   * The setValue method.
   * Note: Sometimes outputs are used in places like statemachines,
   * where we would want the change to cause an event.
   * @param {any} value - The value param.
   */
  setValue(value) {
    if (this._param) {
      this._param.setValue(value, mode)
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
      paramPath: context && context.makeRelative
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
}


export { OperatorInput }
