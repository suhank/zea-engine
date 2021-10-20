import { Vec2 } from '../../../Math/Vec2'
import { ProceduralMesh } from './ProceduralMesh'
import { Registry } from '../../../Registry'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec2Attribute } from '../Vec2Attribute'

/**
 * A class for generating a torus geometry.
 *
 * ```
 * const torus = new Torus(0.4, 1.3)
 * ```
 *
 * @extends ProceduralMesh
 */
class Torus extends ProceduralMesh {
  /**
   * @member {NumberParameter} arcAngleParam - TODO
   */
  arcAngleParam: NumberParameter

  /**
   * @member {NumberParameter} detailParam - TODO
   */
  detailParam: NumberParameter

  /**
   * @member {NumberParameter} innerRadiusParam - TODO
   */
  innerRadiusParam: NumberParameter

  /**
   * @member {NumberParameter} outerRadiusParam - TODO
   */
  outerRadiusParam: NumberParameter

  /**
   * Creates an instance of Torus.
   *
   * @param {number} [innerRadius=0.5] - The inner radius of the torus.
   * @param {number} [outerRadius=3] - The outer radius of the torus.
   * @param {number} [detail=32] - The detail of the cone.
   * @param {number} [arcAngle=Math.PI * 2.0] - The angle of the arc.
   */
  constructor(innerRadius = 0.5, outerRadius = 3, detail = 32, arcAngle = Math.PI * 2.0) {
    super()

    if (isNaN(innerRadius) || isNaN(outerRadius) || isNaN(detail)) throw new Error('Invalid geom args')

    this.innerRadiusParam = this.addParameter(new NumberParameter('InnerRadius', innerRadius)) as NumberParameter
    this.outerRadiusParam = this.addParameter(new NumberParameter('OuterRadius', outerRadius)) as NumberParameter
    this.detailParam = this.addParameter(
      new NumberParameter('Detail', detail >= 3 ? detail : 3, [3, 200], 1)
    ) as NumberParameter
    this.arcAngleParam = this.addParameter(new NumberParameter('ArcAngle', arcAngle)) as NumberParameter

    this.addVertexAttribute('texCoords', new Vec2Attribute())
    this.addVertexAttribute('normals', new Vec3Attribute())

    this.topologyParams.push('Detail')
    this.topologyParams.push('ArcAngle')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const arcAngle = this.arcAngleParam.value || Math.PI * 2.0
    const open = arcAngle < 2.0 * Math.PI
    const detail = this.detailParam.value || 32
    const nbSlices = detail
    const nbLoops = detail * 2 + (open ? 1 : 0)
    const numVertices = nbSlices * nbLoops

    this.setNumVertices(numVertices)
    this.setFaceCounts([0, nbSlices * nbLoops])

    // ////////////////////////////
    // Build the topology and texCoords
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      let faceIndex = 0
      for (let i = 0; i < (open ? nbLoops - 1 : nbLoops); i++) {
        for (let j = 0; j < nbSlices; j++) {
          const ip = (i + 1) % nbLoops
          const jp = (j + 1) % nbSlices
          const v0 = nbSlices * i + j
          const v1 = nbSlices * i + jp
          const v2 = nbSlices * ip + jp
          const v3 = nbSlices * ip + j
          this.setFaceVertexIndices(faceIndex, [v0, v1, v2, v3])

          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbLoops, j / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / nbLoops, (j + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / nbLoops, (j + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 3, new Vec2((i + 1) / nbLoops, j / nbLoops))
          faceIndex++
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
    const innerRadius = this.innerRadiusParam.value || 0.5
    const outerRadius = this.outerRadiusParam.value || 3
    const arcAngle = this.arcAngleParam.value || Math.PI * 2
    const detail = this.detailParam.value || 32
    const open = arcAngle < 2.0 * Math.PI
    const nbSlices = detail
    const nbLoops = detail * 2 + (open ? 1 : 0)

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    if (!positions || !normals) return

    let vertex = 0
    for (let i = 0; i < nbLoops; i++) {
      // const theta = (i / nbLoops) * arcAngle
      const theta = -((i / (open ? nbLoops - 1 : nbLoops)) * arcAngle)
      const ctheta = Math.cos(theta)
      const stheta = Math.sin(theta)

      for (let j = 0; j < nbSlices; j++) {
        const phi = (j / nbSlices) * 2.0 * Math.PI

        const sphi = Math.sin(phi)
        const cphi = Math.cos(phi)
        const d = outerRadius + cphi * innerRadius

        // Set positions and normals at the same time.
        positions.getValueRef(vertex).set(ctheta * d, stheta * d, innerRadius * sphi)
        normals.getValueRef(vertex).set(ctheta * cphi, stheta * cphi, sphi)
        vertex++
      }
    }
  }
}

Registry.register('Torus', Torus)

export { Torus }
