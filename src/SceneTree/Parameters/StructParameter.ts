/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry'
import { Parameter } from './Parameter'

/**
 * Represents a specific type of parameter, that stores multiple parameters in object format.
 *
 * i.e.:
 * ```javascript
 * const structParam = new StructParameter('MyStructParam')
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(structParam)
 * ```
 *
 * **Events**
 * * **valueChanged:** Triggered whenever parameter's value changes.
 *
 * @extends Parameter
 */
class StructParameter extends Parameter<Record<string, unknown>> {
  protected members: Parameter<unknown>[]

  /**
   * Create a struct parameter.
   * @param {string} name - The name of the struct parameter.
   */
  constructor(name?: string) {
    super(name, {}, 'Struct')
    this.members = []
  }

  /**
   * The _addMember method.
   * @param {Parameter} parameter - The parameter value.
   * @return {Parameter} - The return value.
   * @private
   */
  protected addMember(parameter: Parameter<any>) {
    if (this.value) this.value[parameter.getName()] = parameter.getValue()

    parameter.on('valueChanged', () => {
      if (this.value) this.value[parameter.getName()] = parameter.getValue()
    })

    this.members.push(parameter)
    this.emit('valueChanged')
    return parameter
  }

  /**
   * The getParameter method.
   *
   * @private
   * @param {string} name - The parameter name.
   * @return {Parameter} - The return value.
   */
  getParameter(name: string): Parameter<unknown> | undefined {
    for (const p of this.members) {
      if (p.getName() == name) return p
    }
    return undefined
  }

  /**
   * Looks for a member parameter with the specified name and returns it.
   *
   * @param {string} name - The parameter name.
   * @return {Parameter} - The return value.
   */
  getMember(name: string) {
    return this.getParameter(name)
  }

  /**
   * Returns the name of all parameters in StructParameter.
   *
   * @return {array} - The return value.
   */
  getMemberNames(): Array<any> {
    const names = []
    for (let i = 0; i < this.members.length; i++) {
      const member = this.members[i]
      if (member != null) names[i] = member.getName()
    }
    return names
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, any>} [context] - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context?: Record<string, any>): Record<string, any> {
    const j: Record<string, any> = {}
    const members = []
    for (const p of this.members) members.push(p.toJSON(context))

    j.members = members
    j.name = this.name
    return j
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} [context] - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any>): void {
    if (j.members == undefined) {
      console.warn('Invalid Parameter JSON')
      return
    }

    for (let i = 0; i < j.members.length; i++) {
      if (j.members[i]) {
        this.members[i].fromJSON(j.members[i], context)
      }
    }

    this.name = j.name
  }

  clone(): StructParameter {
    const clonedParam = new StructParameter(this.name)

    return clonedParam
  }

  // ////////////////////////////////////////
  // Destroy

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    for (const p of this.members) {
      // TODO: not sure about this. I added a do-nothing destroy method in Parameter<T> to be overwritten
      // since only some subclasses use destroy.
      p.destroy()
    }
  }
}

Registry.register('StructParameter', StructParameter)

export { StructParameter }
