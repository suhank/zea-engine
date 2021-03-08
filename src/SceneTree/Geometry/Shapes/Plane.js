import { Vec2 } from '../../../Math/Vec2'
import { Vec3 } from '../../../Math/Vec3'
import { NumberParameter } from '../../Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'

/**
 * A class for generating a plane geometry.
 *
 * ```
 * const plane = new Plane(2.0, 1.5, 10, 10)
 * ```
 *
 * **Parameters**
 * * **SizeX(`NumberParameter`):** Length of the plane along `X` axis.
 * * **SizeY(`NumberParameter`):** Length of the plane along `Y` axis.
 * * **DetailX(`NumberParameter`):** Number of divisions along `X`axis.
 * * **DetailY(`NumberParameter`):** Number of divisions along `Y`axis.
 *
 * @extends {ProceduralMesh}
 */
class Plane extends ProceduralMesh {
  /**
   * Create a plane.
   * @param {number} [SizeX=1.0] - The length of the plane along the X axis.
   * @param {number} [SizeY=1.0] - The length of the plane along the Y axis.
   * @param {number} [DetailX=1] - The number of divisions along the X axis.
   * @param {number} [DetailY=1] - The number of divisions along the Y axis.
   * @param {boolean} [addNormals=true] - The addNormals value.
   * @param {boolean} [addTextureCoords=true] - The addTextureCoords value.
   */
  constructor(SizeX = 1.0, SizeY = 1.0, DetailX = 1, DetailY = 1, addNormals = true, addTextureCoords = true) {
    super()

    if (isNaN(SizeX) || isNaN(SizeY) || isNaN(DetailX) || isNaN(DetailY)) throw new Error('Invalid geom args')

    this.__sizeXParam = this.addParameter(new NumberParameter('SizeX', SizeX))
    this.__sizeYParam = this.addParameter(new NumberParameter('SizeY', SizeY))
    this.__detailXParam = this.addParameter(new NumberParameter('DetailX', DetailX))
    this.__detailYParam = this.addParameter(new NumberParameter('DetailY', DetailY))
    if (addNormals) this.addVertexAttribute('normals', Vec3)
    if (addTextureCoords) this.addVertexAttribute('texCoords', Vec2)

    this.topologyParams.push('DetailX')
    this.topologyParams.push('DetailY')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild() {
    const detailX = this.__detailXParam.getValue()
    const detailY = this.__detailYParam.getValue()
    this.setNumVertices((detailX + 1) * (detailY + 1))
    this.setFaceCounts([0, detailX * detailY])

    let quadId = 0
    for (let i = 0; i < detailY; i++) {
      for (let j = 0; j < detailX; j++) {
        const v0 = (detailX + 1) * (i + 1) + (j + 1)
        const v1 = (detailX + 1) * (i + 1) + j
        const v2 = (detailX + 1) * i + j
        const v3 = (detailX + 1) * i + (j + 1)
        this.setFaceVertexIndices(quadId, [v0, v1, v2, v3])
        quadId = quadId + 1
      }
    }

    let vOff = 0
    const normals = this.getVertexAttribute('normals')
    if (normals) {
      for (let i = 0; i <= detailY; i++) {
        for (let j = 0; j <= detailX; j++) {
          normals.getValueRef(vOff).set(0, 0, 1)
          vOff++
        }
      }
    }

    vOff = 0
    const texCoords = this.getVertexAttribute('texCoords')
    if (texCoords) {
      for (let i = 0; i <= detailY; i++) {
        const y = i / detailY
        for (let j = 0; j <= detailX; j++) {
          const x = j / detailX
          texCoords.getValueRef(vOff).set(x, y)
          vOff++
        }
      }
    }

    this.resize()
  }

  /**
   * The resize method.
   *
   * @private
   */
  resize() {
    const sizeX = this.__sizeXParam.getValue()
    const sizeY = this.__sizeYParam.getValue()
    const detailX = this.__detailXParam.getValue()
    const detailY = this.__detailYParam.getValue()
    const positions = this.getVertexAttribute('positions')
    let vOff = 0
    for (let i = 0; i <= detailY; i++) {
      const y = (i / detailY - 0.5) * sizeY
      for (let j = 0; j <= detailX; j++) {
        const x = (j / detailX - 0.5) * sizeX
        positions.getValueRef(vOff).set(x, y, 0.0)
        vOff++
      }
    }
  }
}

Registry.register('Plane', Plane)
export { Plane }
