/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Xfo } from '../../Math/index'
import { Parameter } from './Parameter'
import { BinReader } from '../BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'

/**
 * Represents a specific type of parameter, that only stores `Xfo` transform values.
 *
 * ```javascript
 * const xfoParam = new XfoParameter('MyXfo', new Xfo(new Vec3(1.2, 3.4, 1)))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(xfoParam)
 * ```
 *
 * @extends Parameter
 */
class XfoParameter extends Parameter<Xfo> implements IBinaryReader {
  /**
   * Create a Xfo parameter.
   * @param name - The name of the Xfo parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Xfo) {
    super(name, value ? value : new Xfo(), 'Xfo')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Extracts a number value from a buffer, updating current parameter state.
   *
   * @param reader - The reader value.
   * @param context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    this.__value.readBinary(reader)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    return {
      name: this.name,
      value: this.__value.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const xfo = new Xfo()
    xfo.fromJSON(j.value as any)
    this.__value = xfo

    if (j.name) this.name = j.name as string
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new Xfo parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new Xfo parameter.
   */
  clone(): XfoParameter {
    const clonedParam = new XfoParameter(this.name, this.__value.clone())
    return clonedParam
  }
}

Registry.register('XfoParameter', XfoParameter)

export { XfoParameter }
