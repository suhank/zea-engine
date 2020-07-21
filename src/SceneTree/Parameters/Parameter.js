import { EventEmitter } from '../../Utilities/EventEmitter.js'
import { sgFactory } from '../SGFactory.js'

// Note: In some cases we want the parameter to emit a notification
// and cause the update of the scene during evaluation (like statemachine updates).
// But we also don't want the parameter value to then
// be considered modified so it is saved to the JSON file. I'm not sure how to address this.
// We need to check what happens if a parameter emits a 'valueChanged' during cleaning (maybe it gets ignored).
const ValueSetMode = {
  USER_SETVALUE: 0 /* A value has being modified by a local user. emit events and set user edited flag */,
  REMOTEUSER_SETVALUE: 1 /* A value has being modified by a remote user. emit events and set user edited flag. may not trigger file save. */,
  USER_SETVALUE_DONE: 2 /* A value has finished being interactively set */,
  OPERATOR_SETVALUE: 3 /* No events*/,
  OPERATOR_DIRTIED: 4 /* Emitted when the param is dirtied. Generate events, but don't flag the parameter as user edited*/,
  COMPUTED_VALUE: 4 /* Generate events, but don't flag the parameter as user edited*/,
  GENERATED_VALUE: 4 /* Generate events, but don't flag the parameter as user edited*/,
  DATA_LOAD: 4 /* Generate events, but don't flag the parameter as user edited*/,
}
const ParamFlags = {
  USER_EDITED: 1 << 1,
  DISABLED: 1 << 2,
}

const OperatorOutputMode = {
  OP_WRITE: 0,
  OP_READ_WRITE: 1,
}


/**
 * Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.
 *
 * **Events**
 * * **nameChanged:** Triggered when the name of the parameter changes.
 * * **valueChanged:** Triggered when the value of the parameter changes.
 */
class Parameter extends EventEmitter {
  /**
   * Create a base parameter.
   * @param {string} name - The name of the base parameter.
   */
  constructor(name, value, dataType) {
    super(name)
  
    this.__name = name
    this.__value = value
    this.__dataType = dataType ? dataType : undefined
    this.__boundOps = []
    this.__dirtyOpIndex = this.__boundOps.length
    this.__flags = 0

    this.getName = this.getName.bind(this)
    this.setName = this.setName.bind(this)
    this.getValue = this.getValue.bind(this)
    this.setValue = this.setValue.bind(this)
  }
  
  /**
   * The clone method.
   * @param {number} flags - The flags value.
   */
  clone(flags) {
    console.warn('@todo-review')
    console.error('TOOD: implment me')
  }

  /**
   * Returns specified name of the parameter.
   *
   * @return {string} - Returns the name.
   */
  getName() {
    return this.__name
  }

  /**
   * Sets the name of the current parameter.
   *
   * @param {string} name - The base parameter name.
   * @return {Parameter} - The instance itself.
   */
  setName(name) {
    if (name === this.__name) {
      return this
    }

    const prevName = this.__name
    this.__name = name
    this.emit('nameChanged', { mode: this.__name, prevName })
  }

  /**
   * Returns the owner item of the current parameter.
   *
   * @return {ParameterOwner} - The return value.
   */
  getOwner() {
    return this.ownerItem
  }

  /**
   * Sets the owner item of the current parameter.
   *
   * @param {ParameterOwner} ownerItem - The ownerItem value.
   */
  setOwner(ownerItem) {
    this.ownerItem = ownerItem
  }

  /**
   * Returns the parameter's path as an array of strings.
   * Includes owner's path in case it is owned by a `ParameterOwner`.
   *
   * @return {array} - The return value.
   */
  getPath() {
    if (this.ownerItem && this.ownerItem.getName) {
      return [...this.ownerItem.getPath(), this.__name]
    } else {
      return [this.__name]
    }
  }

  /**
   * Returns parameter's data type.
   *
   * @return {string} - The return value.
   */
  getDataType() {
    return this.__dataType
  }

  /**
   * The setFlag method.
   * @private
   * @param {number} flag - The flag value.
   */
  setFlag(flag) {
    this.__flags |= flag
  }

  /**
   * The clearFlag method.
   * @private
   * @param {number} flag - The flag value.
   */
  clearFlag(flag) {
    this.__flags &= ~flag
  }

  /**
   * Returns true if the flag if set, otherwise returns false.
   *
   * @private
   * @param {number} flag - The flag to test.
   * @return {boolean} - Returns a boolean indicating if the flag is set.
   */
  testFlag(flag) {
    return (this.__flags & flag) != 0
  }

  //////////////////////////////////////////////////
  // Operator bindings

  /**
   * The bindOperator method.
   *
   * @param {Operator} op - The OperatorOutput value.
   */
  bindOperatorOutput(operatorOutput, index = -1) {
    if (index == -1) index = this.__boundOps.length
    this.__boundOps.splice(index, 0, operatorOutput)
    this.emit('valueChanged'/*, { mode: ValueSetMode.OPERATOR_DIRTIED }*/)
    return index
  }

  /**
   * The unbindOperator method.
   *
   * @param {Operator} op - The cleanerFn value.
   * @return {boolean} - The return value.
   */
  unbindOperator(operatorOutput) {
    // If already dirty, simply return.
    const index = this.__boundOps.indexOf(operatorOutput)
    if (index == -1) {
      return false
    }
    this.__boundOps.splice(index, 1)
    this.__dirtyOpIndex = 0
    this.emit('valueChanged'/*, { mode: ValueSetMode.OPERATOR_DIRTIED }*/)
    return index
  }

  /**
   * The setDirty method.
   *
   * @return {boolean}
   */
  setDirty(operatorOutput) {
    // Determine the first operator in the stack that must evaluate
    // to clean the parameter.
    let dirtyId = Math.min(this.__dirtyOpIndex, this.__boundOps.indexOf(operatorOutput))
    for (; ; dirtyId--) {
      if (dirtyId == 0 || this.__boundOps[dirtyId].getMode() == OperatorOutputMode.OP_WRITE) break
    }

    // console.log("setDirtyFromOp:", this.getPath(), dirtyId, this.__dirtyOpIndex)
    if (dirtyId != this.__dirtyOpIndex) {
      this.__dirtyOpIndex = dirtyId
      this.emit('valueChanged'/*, { mode: ValueSetMode.OPERATOR_DIRTIED }*/) 
      return true
    }
    return false
  }

  /**
   * The isDirty method.
   *
   * @private
   * @return {boolean} - Returns a boolean.
   */
  isDirty() {
    return this.__dirtyOpIndex < this.__boundOps.length
  }
  
  /**
   * The setCleanFromOp method.
   * @param {any} value - The value param.
   */
  setCleanFromOp(value, operatorOutput) {
    this.__value = value

    // As each operator writes its value, the dirty value is incremented
    this.__dirtyOpIndex = this.__boundOps.indexOf(operatorOutput) + 1
  }

  /**
   * The setCleanFromOp method.
   * @param {any} value - The value param.
   */
  getValueFromOp() {
    return this.__value
  }

  /**
   * The _clean method.
   * @private
   */
  _clean() {
    // to clean te parameter, we need to start from the first bound op
    // that needs to be evaluated, and go down the stack from there.
    for (let i = this.__dirtyOpIndex; i < this.__boundOps.length; i++) {
      const operatorOutput = this.__boundOps[i]
      // The op can get the current value and modify it in place
      // and set the output to clean.
      operatorOutput.getOperator().evaluate()
    }
  }

  /**
   * Returns parameter's value.
   *
   * @param {number} mode - The mode value.
   * @return {object|string|number|any} - The return value.
   */
  getValue() {
    if (this.__dirtyOpIndex < this.__boundOps.length) this._clean()
    return this.__value
  }

  /**
   * Sets parameter's value, but runs a few internal cleaning processes.
   *
   * @param {object|string|number|any} value - The value param.
   * @param {number} mode - The mode param.
   */
  setValue(value, mode = ValueSetMode.USER_SETVALUE) {
    if (value == undefined) {
      // eslint-disable-next-line no-throw-literal
      throw 'undefined was passed into the set value for param:' + this.getName()
    }

    if (this.__boundOps.length > 0) {
      for (let i = this.__boundOps.length - 1; i >= 0; i--) {
        const operatorOutput = this.__boundOps[i]
        value = operatorOutput.setValue(value)
        if (operatorOutput.getMode() == 0/*OP_WRITE*/) return;
      }
    }

    if (!value.fromJSON) {
      // Note: equality tests on anything but simple values is going to be super expenseive.
      if (this.__value == value) return
    }
    this.__value = value

    // Note: only users call 'setValue'. Operators call 'setCleanFromOp'
    if (this.__flags & ParamFlags.USER_EDITED) this.setFlag(ParamFlags.USER_EDITED)
    this.emit('valueChanged', { mode })
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   * @return {object} - Returns the json object.
   */
  toJSON(context, flags) {
    if (this.__value.toJSON) return { value: this.__value.toJSON(context, flags) }
    else return { value: this.__value }
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   * @param {number} flags - The flags value.
   */
  fromJSON(j, context, flags) {
    if (j.value == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }
    // Note: JSON data is only used to store user edits, so
    // parameters loaed from JSON are considered user edited.
    this.setFlag(ParamFlags.USER_EDITED)

    if (j.value.type && this.__value == undefined) {
      this.__value = sgFactory.constructClass(j.value.type)
    }
    if (this.__value == undefined || !this.__value.fromJSON) this.setValue(j.value, ValueSetMode.DATA_LOAD)
    else {
      this.__value.fromJSON(j.value, context)
      this.emit('valueChanged', { mode: ValueSetMode.DATA_LOAD })
    }
  }

  /**
   * The readBinary method.
   *
   * @private
   * @param {object} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader, context) {
    console.warn('@todo-review')
    console.error('TODO')
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new parameter, copies its values
   * from this parameter and returns it.
   *
   * @param {number} flags - The flags value.
   * @return {Parameter} - Returns a new cloned parameter.
   */
  clone(flags) {
    const clonedValue = this.__value
    if (clonedValue.clone) clonedValue = clonedValue.clone()
    const clonedParam = new Parameter(this.__name, clonedValue, this.__dataType)
    return clonedParam
  }
}

export { ParamFlags, ValueSetMode, OperatorOutputMode, Parameter }
