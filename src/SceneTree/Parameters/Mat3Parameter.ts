/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Registry } from '../../Registry'
import { Mat3 } from '../../Math/index'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'
/**
 * Represents a specific type of parameter, that only stores Mat3(3x3 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const mat3Param = new Ma3Parameter('MyMat3', new Mat3(...args))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(mat3Param)
 * ```
 *
 * @extends Parameter
 */
class Mat3Parameter extends Parameter<Mat3> implements IBinaryReader {
  /**
   * Create a Mat3 parameter.
   * @param name - The name of the Mat3 parameter.
   * @param value - The value of the parameter.
   */
  constructor(name: string = '', value?: Mat3) {
    super(name, value ? value : new Mat3(), 'Mat3')
  }

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
    const mat3 = new Mat3()
    mat3.fromJSON(j.value as any)
    this.__value = mat3
  }

  /**
   * The clone method constructs a new Mat3 parameter,
   * copies its values from this parameter and returns it.
   *
   * @return - Returns a new cloned Mat3 parameter.
   */
  clone(): Mat3Parameter {
    const clonedParam = new Mat3Parameter(this.name, this.__value?.clone())
    return clonedParam
  }
}

Registry.register('Mat3Parameter', Mat3Parameter)

export { Mat3Parameter }
