/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Vec4 } from '../../Math/index'
import { Parameter } from './Parameter'
import { BinReader } from '../../SceneTree/BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'

/**
 * Represents a specific type of parameter, that only stores Vec4(four-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec4Param = new Vec4Parameter('MyVec4', new Vec4(1.2, 3.4, 1, 4.2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec4Param)
 * ```
 *
 * @extends Parameter
 */
class Vec4Parameter extends Parameter<Vec4> implements IBinaryReader {
  /**
   * Create a Vec4 parameter.
   * @param {string} name - The name of the Vec4 parameter.
   * @param {Vec4} value - The value of the parameter.
   */
  constructor(name: string, value?: Vec4) {
    super(name, value ? value : new Vec4(), 'Vec4')
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * Extracts a number value from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, unknown>} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    this.value?.readBinary(reader)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    return {
      name: this.name,
      value: this.value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const vec4 = new Vec4()
    vec4.fromJSON(j.value as any)
    this.value = vec4

    if (j.name) this.name = j.name as string
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new Vec4 parameter, copies its values
   * from this parameter and returns it.
   *
   * @return {Vec4Parameter} - Returns a new Vec4 parameter.
   */
  clone(): Vec4Parameter {
    const clonedParam = new Vec4Parameter(this.name, this.value?.clone())
    return clonedParam
  }
}

Registry.register('Vec4Parameter', Vec4Parameter)

export { Vec4Parameter }
