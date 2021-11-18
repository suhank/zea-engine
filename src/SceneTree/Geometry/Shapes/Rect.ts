import { ProceduralLines } from './ProceduralLines'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * A class for generating a rectangle shape.
 *
 * ```
 * const rect = new Rect(1.5, 2.0)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the rectangle along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the rectangle along the `Y` axis.
 *
 *
 * @extends {ProceduralLines}
 */
class Rect extends ProceduralLines {
  /**
   * @member sizeXParam - Length of the rectangle along the `X` axis.
   */
  sizeXParam: NumberParameter

  /**
   * @member sizeYParam - Length of the rectangle along the `Y` axis.
   */
  sizeYParam: NumberParameter

  /**
   * Create a rect.
   * @param x - The length of the rect along the `X` axis.
   * @param y - The length of the rect along the `Y` axis.
   */
  constructor(x = 1.0, y = 1.0) {
    super()

    if (isNaN(x) || isNaN(y)) throw new Error('Invalid geom args')

    this.sizeXParam = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.sizeXParam.on('valueChanged', this.resize.bind(this))

    this.sizeYParam = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.sizeYParam.on('valueChanged', this.resize.bind(this))
    this.rebuild()
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    this.setNumVertices(4)
    this.setNumSegments(4)
    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 1, 2)
    this.setSegmentVertexIndices(2, 2, 3)
    this.setSegmentVertexIndices(3, 3, 0)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    this.resize(false)
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const x = this.sizeXParam.value
    const y = this.sizeYParam.value

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) return

    positions.getValueRef(0).set(-0.5 * x, -0.5 * y, 0.0)
    positions.getValueRef(1).set(0.5 * x, -0.5 * y, 0.0)
    positions.getValueRef(2).set(0.5 * x, 0.5 * y, 0.0)
    positions.getValueRef(3).set(-0.5 * x, 0.5 * y, 0.0)
  }
}

Registry.register('Rect', Rect)

export { Rect }
