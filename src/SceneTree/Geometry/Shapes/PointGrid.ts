import { Vec2 } from '../../../Math/Vec2'
import { ProceduralPoints } from './ProceduralPoints'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { Vec2Attribute } from '../Vec2Attribute'
import { Vec3Attribute } from '../Vec3Attribute'

/**
 * Represents an ordered grid of points along `X` and `Y` axes.
 *
 * ```
 * const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * @extends {ProceduralPoints}
 */
class PointGrid extends ProceduralPoints {
  protected __x: NumberParameter
  protected __xDivisions: NumberParameter
  protected __y: NumberParameter
  protected __yDivisions: NumberParameter
  topologyParams: string[]

  /**
   * Creates an instance of PointGrid.
   *
   * @param {number} [x=1.0] - The length of the point grid along the X axis.
   * @param {number} [y=1.0] - The length of the point grid along the Y axis.
   * @param {number} [xDivisions=1] - The number of divisions along the X axis.
   * @param {number} [yDivisions=1] - The number of divisions along the Y axis.
   * @param {boolean} [addTextureCoords=false] - The addTextureCoords value.
   */
  constructor(x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1, addTextureCoords = false) {
    super()
    this.topologyParams = []
    if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions)) throw new Error('Invalid geom args')
    this.__x = this.addParameter(new NumberParameter('X', x)) as NumberParameter
    this.__y = this.addParameter(new NumberParameter('Y', y)) as NumberParameter
    this.__xDivisions = this.addParameter(new NumberParameter('XDivisions', xDivisions)) as NumberParameter
    this.__yDivisions = this.addParameter(new NumberParameter('YDivisions', yDivisions)) as NumberParameter

    if (addTextureCoords) this.addVertexAttribute('texCoords', new Vec2Attribute())

    this.topologyParams.push('XDivisions')
    this.topologyParams.push('YDivisions')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const xDivisions = this.__xDivisions.getValue() || 1
    const yDivisions = this.__yDivisions.getValue() || 1
    this.setNumVertices(xDivisions * yDivisions)

    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      for (let i = 0; i < yDivisions; i++) {
        const y = i / (yDivisions - 1)
        for (let j = 0; j < xDivisions; j++) {
          const x = j / (xDivisions - 1)
          texCoords.getValueRef(i * xDivisions + j).set(x, y)
        }
      }
    }
    this.resize()
  }

  /**
   * The resize method.
   * @private
   */
  resize(): void {
    const xDivisions = this.__xDivisions.getValue() || 1
    const yDivisions = this.__yDivisions.getValue() || 1
    const x = this.__x.getValue() || 1.0
    const y = this.__y.getValue() || 1.0

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (!positions) return
    for (let i = 0; i < yDivisions; i++) {
      const newY = (i / (yDivisions - 1) - 0.5) * y
      for (let j = 0; j < xDivisions; j++) {
        const newX = (j / (xDivisions - 1) - 0.5) * x
        positions.getValueRef(i * xDivisions + j).set(newX, newY, 0.0)
      }
    }
  }
}

Registry.register('PointGrid', PointGrid)
export { PointGrid }
