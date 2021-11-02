/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Vec3 } from '../../Math/index'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'

/**
 * Represents a specific type of parameter, that only stores Vec3(three-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const vec3Param = new Vec3Parameter('MyVec3', new Vec3(1.2, 3.4, 1))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(vec3Param)
 * ```
 * @extends Parameter
 */
class Vec3Parameter extends Parameter<Vec3> implements IBinaryReader {
  protected range?: Vec3[]

  /**
   * Create a Vec3 parameter.
   *
   * @param name - The name of the Vec3 parameter.
   * @param value - The value of the parameter.
   * @param range - The range value is an array of two `Vec3` objects.
   */
  constructor(name: string = '', value?: Vec3, range?: Vec3[]) {
    super(name, value ? value : new Vec3(), 'Vec3')
    this.range = range
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
    this.__value?.readBinary(reader)
  }

  toJSON(context?: Record<string, unknown>): Record<string, unknown> {
    return {
      name: this.name,
      value: this.__value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const vec4 = new Vec3()
    vec4.fromJSON(j.value as any)
    this.__value = vec4

    if (j.name) this.name = j.name as string
  }

  /**
   * The clone method constructs a new Vec3 parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new Vec3 parameter.
   */
  clone(): Vec3Parameter {
    const clonedParam = new Vec3Parameter(this.name, this.__value?.clone())
    return clonedParam
  }
}

Registry.register('Vec3Parameter', Vec3Parameter)
Registry.register('Property_Vec3_32f', Vec3Parameter)

export { Vec3Parameter }
