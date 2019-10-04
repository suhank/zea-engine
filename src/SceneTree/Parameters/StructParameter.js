import { ParamFlags, ValueSetMode, Parameter } from './Parameter.js'

/** Class representing a struct parameter.
 * @extends Parameter
 */
class StructParameter extends Parameter {
  /**
   * Create a struct parameter.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name, {}, 'Struct')
    this.__members = []
  }

  /**
   * The _addMember method.
   * @param {any} parameter - The parameter param.
   * @return {any} - The return value.
   * @private
   */
  _addMember(parameter) {
    this.__value[parameter.getName()] = parameter.getValue()
    parameter.valueChanged.connect(() => {
      this.__value[parameter.getName()] = parameter.getValue()
    })
    this.__members.push(parameter)
    this.__flags |= ParamFlags.USER_EDITED
    this.valueChanged.emit()
    return parameter
  }

  /**
   * The getParameter method.
   * @param {string} name - The name param.
   * @return {any} - The name value.
   */
  getParameter(name) {
    for (const p of this.__members) {
      if (p.getName() == name) return p
    }
  }

  /**
   * The getMember method.
   * @param {string} name - The name param.
   * @return {any} - The name value.
   */
  getMember(name) {
    return this.getParameter(name)
  }

  getMemberNames() {
    const names = []
    for (let i = 0; i < this.__members.length; i++) {
      const member = this.__members[i]
      if (member != null) names[i] = member.getName()
    }
    return names
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
    const members = []
    for (const p of this.__members) members.push(p.toJSON(context, flags))
    return {
      members,
    }
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    if (j.members == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }
    // Note: JSON data is only used to store user edits, so
    // parameters loaed from JSON are considered user edited.
    this.__flags |= ParamFlags.USER_EDITED

    for (let i = 0; i < j.members.length; i++) {
      if (j.members[i]) {
        this.__members[i].fromJSON(j.members[i], context)
      }
    }
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy()
    for (const p of this.__members) p.destroy()
  }
}

export { StructParameter }
