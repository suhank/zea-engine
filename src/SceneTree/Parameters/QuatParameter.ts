/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Registry } from '../../Registry'
import { Quat } from '../../Math/index'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'

/**
 * Represents a specific type of parameter, that only stores Vec3(four-dimensional coordinate) values.
 *
 * i.e.:
 * ```javascript
 * const quatParam = new QuatParameter('MyQuat', new Quat(1.2, 3.4, 1, 4.2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(quatParam)
 * ```
 *
 * @extends Parameter
 */
class QuatParameter extends Parameter<Quat> implements IBinaryReader {
  /**
   * Create a Quat parameter.
   * @param name - The name of the Quat parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Quat) {
    super(name, value ? value : new Quat(), 'Quat')
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
      value: this.__value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const quat = new Quat()
    quat.fromJSON(j.value as any)
    this.__value = quat
  }

  // ////////////////////////////////////////
  // Clone

  /**
   * The clone method constructs a new Quat parameter, copies its values
   * from this parameter and returns it.
   *
   * @return - Returns a new Quat parameter.
   */
  clone() {
    const clonedParam = new QuatParameter(this.name, this.__value?.clone())
    return clonedParam
  }
}

Registry.register('QuatParameter', QuatParameter)

export { QuatParameter }
