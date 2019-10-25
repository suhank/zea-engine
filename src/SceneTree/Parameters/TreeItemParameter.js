import { Signal } from '../../Utilities'
import {
  ParamFlags,
  ValueSetMode,
  Parameter,
  ListParameter,
} from './Parameter.js'

/** Class representing a tree item parameter.
 * @extends Parameter
 */
class TreeItemParameter extends Parameter {
  /**
   * Create a tree item parameter.
   * @param {string} name - The name value.
   * @param {any} filterFn - The filterFn value.
   */
  constructor(name, filterFn = undefined) {
    super(name, undefined, 'TreeItem')
    this.__filterFn = filterFn
    this.treeItemGlobalXfoChanged = new Signal()
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new TreeItemParameter(this.__name, this.__filterFn)
    return clonedParam
  }

  /**
   * The setOwner method.
   * @param {any} owner - The owner param.
   */
  setOwner(owner) {
    this.__owner = owner
  }

  /**
   * The getOwner method.
   * @return {any} - The return value.
   */
  getOwner() {
    return this.__owner
  }

  /**
   * The setFilterFn method.
   * @param {any} flterFn - The flterFn param.
   */
  setFilterFn(flterFn) {
    this.__filterFn = filterFn
  }

  /**
   * The getFilterFn method.
   * @return {any} - The return value.
   */
  getFilterFn() {
    return this.__filterFn
  }

  /**
   * The setValue method.
   * @param {any} treeItem - The treeItem param.
   * @param {any} mode - The mode param.
   * @return {any} - The return value.
   */
  setValue(treeItem, mode = ValueSetMode.USER_SETVALUE) {
    // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
    if (this.__filterFn && !this.__filterFn(treeItem)) return false
    if (this.__value !== treeItem) {
      if (this.__value) {
        this.__value.globalXfoChanged.disconnect(
          this.treeItemGlobalXfoChanged.emit
        )
        this.__value.removeRef(this)
      }
      this.__value = treeItem
      if (this.__value) {
        this.__value.addRef(this)
        this.__value.globalXfoChanged.connect(
          this.treeItemGlobalXfoChanged.emit
        )
      }
      if (
        mode == ValueSetMode.USER_SETVALUE ||
        mode == ValueSetMode.REMOTEUSER_SETVALUE
      ) {
        this.__flags |= ParamFlags.USER_EDITED
      }
      this.valueChanged.emit(mode)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    if ((this.__flags & ParamFlags.USER_EDITED) == 0) return
    return {
      value: context.makeRelative(this.__value.getPath()),
    }
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    if (j.value == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }
    context.resolvePath(
      j.value,
      treeItem => {
        this.setValue(treeItem)
      },
      reason => {
        console.warn(
          'Unable to resolve tree item parameter value:' + pj.paramPath
        )
      }
    )
    this.__flags |= ParamFlags.USER_EDITED
  }

  /**
   * The destroy method.
   */
  destroy() {
    if (this.__value) {
      this.__value.parameterValueChanged.disconnect(
        this.valueParameterValueChanged.emit
      )
      this.__value.removeRef(this)
    }
  }
}

export { TreeItemParameter /* ,
  TreeItemListParameter */ }
