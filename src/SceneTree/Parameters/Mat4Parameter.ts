/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Mat4 } from '../../Math/Mat4'
import { Parameter } from './Parameter'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
import { BinReader } from '../../SceneTree/BinReader'

/**
 * Represents a specific type of parameter, that only stores Mat4(4x4 matrix) values.
 *
 * i.e.:
 * ```javascript
 * const mat4Param = new Ma3Parameter('MyMat4', new Mat4(...args))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(mat4Param)
 * ```
 *
 * @extends Parameter
 */
class Mat4Parameter extends Parameter<Mat4> implements IBinaryReader {
  /**
   * Create a Mat4 parameter.
   *
   * @param {string} name - The name of the Mat4 parameter.
   * @param {Mat4} value - The value of the parameter.
   */
  constructor(name: string = '', value?: Mat4) {
    super(name, value ? value : new Mat4(), 'Mat4')
  }

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
      value: this.value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, unknown>, context?: Record<string, unknown>): void {
    const mat4 = new Mat4()
    mat4.fromJSON(j.value as any)
    this.value = mat4
  }

  /**
   * The clone method constructs a new Mat4 parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {Mat4Parameter} - Returns a new cloned Mat4 parameter.
   */
  clone(): Mat4Parameter {
    const clonedParam = new Mat4Parameter(this.name, this.value?.clone())
    return clonedParam
  }
}

Registry.register('Mat4Parameter', Mat4Parameter)

export { Mat4Parameter }
