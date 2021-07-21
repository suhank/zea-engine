import { NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralLines } from './ProceduralLines'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * A class for generating a circle shape using line segments.
 *
 * ```
 * const circle = new Circle(2.2, 12)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the circle.
 * * **Angle(`NumberParameter`):** Number of segments used to build the circle.
 * * **NumSegments(`NumberParameter`):** Segments angle in radiants.
 *
 * @extends {ProceduralLines}
 */
class Circle extends ProceduralLines {
  protected __angle: NumberParameter
  protected __numSegments: NumberParameter
  protected __radius: NumberParameter
  topologyParams: string[]

  /**
   * Creates an instance of Circle.
   * @param {number} radius - The radius of the circle.
   * @param {number} numSegments - The number of segments.
   * @param {number} angle - Arc segments angle(radians)
   */
  constructor(radius = 1.0, numSegments = 32, angle = Math.PI * 2) {
    super()
    this.topologyParams = []
    if (isNaN(radius) || isNaN(numSegments)) throw new Error('Invalid geom args')

    this.__radius = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.__angle = this.addParameter(new NumberParameter('Angle', angle)) as NumberParameter
    this.__numSegments = this.addParameter(
      new NumberParameter('NumSegments', numSegments >= 3 ? numSegments : 3, [3, 200], 1)
    ) as NumberParameter

    this.topologyParams.push('NumSegments')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const segs = this.__numSegments.getValue() || 32
    this.setNumVertices(segs)
    const angle = this.__angle.getValue() || Math.PI * 2
    const arc = angle < Math.PI * 2
    if (arc) this.setNumSegments(segs - 1)
    else this.setNumSegments(segs)
    for (let i = 0; i < (arc ? segs - 1 : segs); i++) this.setSegmentVertexIndices(i, i, (i + 1) % segs)
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const radius = this.__radius.getValue() || 1.0
    const segs = this.__numSegments.getValue() || 32
    const angle = this.__angle.getValue() || Math.PI * 2
    const step = angle / segs
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      for (let i = 0; i < segs; i++) {
        positions.getValueRef(i).set(Math.cos(step * i) * radius, Math.sin(step * i) * radius, 0.0)
      }
    }
  }
}

Registry.register('Circle', Circle)
export { Circle }
