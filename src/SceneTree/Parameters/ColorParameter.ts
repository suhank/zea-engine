/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Registry } from '../../Registry'
import { Color } from '../../Math/index'
import { Parameter } from './Parameter'
import { BinReader } from '../BinReader'
import { IBinaryReader } from '../../Utilities/IBinaryReader'
/**
 * Represents a specific type of parameter, that only stores `Color` values.
 *
 * i.e.:
 * ```javascript
 * const colorParam = new ColorParameter('MyColor', new Color(0, 254, 2))
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(colorParam)
 * ```
 *
 * @extends Parameter
 */
class ColorParameter extends Parameter<Color> implements IBinaryReader {
  /**
   * Create a color parameter.
   * @param {string} name - The name of the color parameter.
   * @param {Color} value - The value of the parameter.
   */
  constructor(name: string, value?: Color) {
    super(name, value ? value : new Color(), 'Color')
  }

  /**
   * Extracts `Color` values from a buffer, updating current parameter state.
   *
   * @param {BinReader} reader - The reader value.
   * @param {object} context - The context value.
   */
  readBinary(reader: BinReader, context?: Record<string, unknown>): void {
    const value = reader.loadRGBAFloat32Color()
    // If the value is in linear space, then we should convert it to gamma space.
    // Note: !! this should always be done in preprocessing...
    value.applyGamma(2.2)

    this.value = value
  }

  toJSON(context?: Record<string, unknown>): Record<string, any> {
    return {
      value: this.value?.toJSON(),
    }
  }

  fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void {
    if (j.value.type) this.value = Registry.constructClass('Color') as Color
    this.value?.fromJSON(j.value)
  }

  /**
   * The clone method constructs a new color parameter,
   * copies its values from this parameter and returns it.
   *
   * @return {ColorParameter} - Returns a new cloned color parameter.
   */
  clone(): ColorParameter {
    const clonedParam = new ColorParameter(this.name, this.value?.clone())
    return clonedParam
  }
}

Registry.register('ColorParameter', ColorParameter)

export { ColorParameter }