/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable valid-jsdoc */
import { EventEmitter } from '../Utilities/EventEmitter'
import { Registry } from '../Registry'
import { BinReader } from './BinReader'
import { Parameter } from './Parameters'

/**
 * Class that allows other classes to be parameterized by `Parameter` type of objects.
 * Not only hosting parameters, but their events.
 *
 * @extends {EventEmitter}
 */
class ParameterOwner extends EventEmitter {
  protected paramEventHandlers: Record<string, any>
  protected paramMapping: Record<string, number>
  protected params: Parameter<any>[]
  deprecatedParamMapping: Record<string, any>

  /**
   * Creates an instance of ParameterOwner by initializing parameter hosting mappings and events.
   * <br>
   * Every Object has a unique identifier which is based on a counter that is incremented.
   */
  constructor() {
    super()
    this.params = []
    this.paramMapping = {}
    this.deprecatedParamMapping = {}
    this.paramEventHandlers = {}
  }

  // --- Params ---

  /**
   * @deprecated
   * Returns the number of parameters current object has.
   *
   * @return {number} - Amount of parameters in current object.
   */
  numParameters(): number {
    console.warn('Deprecated. Use #getNumParameters instead.')
    return this.getNumParameters()
  }

  /**
   * Returns the number of parameters current object has.
   *
   * @return {number} - Amount of parameters in current object.
   */
  getNumParameters(): number {
    return this.params.length
  }

  /**
   * Returns all the parameters of the object.
   *
   * @return {array} - Parameter List
   */
  getParameters(): Parameter<any>[] {
    return this.params
  }

  /**
   * Returns the index of a parameter in parameter list.
   *
   * @param {string} paramName - Name of the parameter.
   * @return {number} - Position in the array
   */
  getParameterIndex(paramName: string): number {
    return this.paramMapping[paramName]
  }

  /**
   * Returns `Parameter` object in a given index
   *
   * @param {number} index - Position of the parameter in the array
   * @return {Parameter} - Parameter object value
   */
  getParameterByIndex(index: number): Parameter<any> {
    return this.params[index]
  }

  /**
   * Validates if the specified parameter exists in the object.
   *
   * @param {string} paramName - The parameter name.
   * @return {boolean} - The return value.
   */
  hasParameter(paramName: string): boolean {
    return paramName in this.paramMapping
  }

  /**
   * Add a mapping from one name to a new parameter.
   * This is used to handle migrating parameters to new names.
   *
   * @param {string} key - The parameter name.
   * @param {string} paramName - The parameter name.
   * @return {boolean} - The return value.
   */
  addParameterDeprecationMapping(key: string, paramName: string): void {
    this.deprecatedParamMapping[key] = paramName
  }

  /**
   * Returns `Parameter` object using the given name
   *
   * @param {string} paramName - The parameter name.
   * @return {Parameter} - Parameter object value
   */
  getParameter(paramName: string): Parameter<any> | null {
    let index = this.paramMapping[paramName]
    if (index == undefined) {
      const newParamName = this.deprecatedParamMapping[paramName]
      if (!newParamName) return null
      else {
        console.warn(`Parameter name ${paramName} is now deprecated. Please use ${newParamName} instead.`)
        index = this.paramMapping[newParamName]
      }
    }
    return this.params[index]
  }

  /**
   * This method can be overridden in derived classes
   * to perform general updates (see GLPass or BaseItem).
   * @param {Record<string, unknown>} event - The event object emitted by the parameter.
   * @private
   */
  protected parameterValueChanged(event: Record<string, unknown>): void {
    this.emit('parameterValueChanged', event)
  }

  /**
   * Adds `Parameter` object to the owner's parameter list.
   *
   * @emits `parameterAdded` with the name of the param.
   * @param {Parameter} param - The parameter to add.
   * @return {Parameter} - With `owner` and `valueChanged` event set.
   */
  addParameter(param: Parameter<any>): Parameter<any> {
    return this.insertParameter(param, this.params.length)
  }

  /**
   * Adds `Parameter` object to the owner's parameter list using the index.
   * It replaces the event in the specified index.
   *
   *
   * @emits `parameterAdded` with the name of the param.
   * @param {Parameter} param - The parameter to insert.
   * @param {number} index - The index value.
   * @return {Parameter} - With `owner` and `valueChanged` event set.
   */
  insertParameter(param: Parameter<any>, index: number): Parameter<any> {
    const name = param.getName()
    if (this.paramMapping[name] != undefined) {
      console.warn('Replacing Parameter:' + name)
      this.removeParameter(name)
    }
    param.setOwner(this)
    const paramChangedHandler = (event: Record<string, unknown>) => {
      // Note: spread operators cause errors on iOS 11.
      const newEvent: Record<string, unknown> = { param }
      for (const key in event) newEvent[key] = event[key]
      this.parameterValueChanged(newEvent)
    }

    param.on('valueChanged', paramChangedHandler)
    this.paramEventHandlers[name] = paramChangedHandler
    this.params.splice(index, 0, param)
    for (let i = index; i < this.params.length; i++) {
      this.paramMapping[this.params[i].getName()] = i
    }
    this.emit('parameterAdded', { name })
    return param
  }

  /**
   * Removes `Parameter` from owner, by using parameter's name.
   * @emits `parameterRemoved` with the name of the param.
   * @param {string} name - The parameter name.
   */
  removeParameter(name: string): void {
    if (this.paramMapping[name] == undefined) {
      throw new Error('Unable to remove Parameter:' + name)
    }
    const index = this.paramMapping[name]
    const param = this.params[this.paramMapping[name]]
    param.off('valueChanged', this.paramEventHandlers[name])
    this.params.splice(index, 1)
    delete this.paramMapping[name]
    for (let i = index; i < this.params.length; i++) {
      this.paramMapping[this.params[i].getName()] = i
    }

    this.emit('parameterRemoved', { name })
  }

  /**
   * Replaces old `Parameter` by passing a new one with the same name.
   *
   * @param {Parameter} param - The parameter to replace.
   * @return {Parameter} - `Parameter` with `valueChanged` event set.
   */
  replaceParameter(param: Parameter<any>): Parameter<any> {
    const name = param.getName()
    if (this.paramMapping[name] == undefined) {
      throw new Error('Unable to replace Parameter:' + name)
    }
    const index = this.paramMapping[name]
    this.removeParameter(name)
    this.insertParameter(param, index)
    return param
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {Record<string, unknown>} - Returns the json object.
   */
  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    const json = {}
    const paramsJSON: Record<string, unknown> = {}
    let savedParams = 0
    for (const param of this.params) {
      const paramJSON = param.toJSON(context)
      if (paramJSON) {
        paramsJSON[param.getName()] = paramJSON
        savedParams++
      }
    }
    if (savedParams > 0) (json as any).params = paramsJSON
    return json
  }

  /**
   * The fromJSON method decodes a json object for this type.
   *
   * @param {object} j - The json object this item must decode.
   * @param {object} context - The context value.
   */
  fromJSON(j: Record<string, any>, context?: Record<string, any>): void {
    if (j.params) {
      for (const key in j.params) {
        const pj = j.params[key]
        const param = this.getParameter(key)
        if (!param) console.warn('Param not found:' + key)
        else {
          if (pj.paramPath) {
            context?.resolvePath(
              pj.paramPath,
              (param: Parameter<any>) => {
                this.replaceParameter(param)
              },
              (reason: any): void => {
                console.warn('Unable to resolve shared parameter:' + pj.paramPath)
              },
            )
          } else {
            param.fromJSON(pj, context)
          }
        }
      }
    }
  }

  /**
   * Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.
   * <br>
   * In each iteration of the array, propType and propName are extracted and
   * used to build the right `Parameter` class. Then all of them are added to the object.
   *
   * @emits `parameterAdded` with the name of the param.
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, any>} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, any>): void {
    // TODO: make this work
    if (context?.versions['zea-engine'].compare([0, 0, 3]) >= 0) {
      const numProps = reader.loadUInt32()
      for (let i = 0; i < numProps; i++) {
        const propType = reader.loadStr()
        const propName = reader.loadStr()
        let param = this.getParameter(propName)
        if (!param) {
          param = Registry.constructClass(propType, propName) as Parameter<any>
          if (!param) {
            console.error('Unable to construct prop:' + propName + ' of type:' + propType)
            continue
          }
          this.addParameter(param)
        }
        param.readBinary(reader, context)
      }
    }
  }

  /**
   * Converts object's JSON value and converts it to a string.
   *
   * @return {string} - String of object's parameter list state.
   */
  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2)
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * Copies Parameters from another `ParameterOwner` to current object.
   *
   * @param {ParameterOwner} src - The ParameterOwner copy from.
   * @param {Record<string, any>} [context] - The context value
   */
  copyFrom(src: ParameterOwner, context?: Record<string, any>): void {
    // Note: Loop over the parameters in reverse order,
    // this is because often, parameter dependencies
    // are bottom to top (bottom params dependent on higher params).
    // This means that as a parameter is set with a new value
    // it will dirty the params below it.
    let i = src.getNumParameters()
    while (i--) {
      const srcParam = src.getParameterByIndex(i)
      const param = this.getParameter(srcParam.getName())
      if (param) {
        // Note: we are not cloning the values.
        param.loadValue(srcParam.getValue())
      } else {
        this.addParameter(srcParam.clone())
      }
    }
  }
}

export { ParameterOwner }
