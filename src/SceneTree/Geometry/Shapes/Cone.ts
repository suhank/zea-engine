/* eslint-disable no-unused-vars */
import { Vec2 } from '../../../Math/Vec2'
import { BooleanParameter, NumberParameter } from '../../../SceneTree/Parameters/index'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec2Attribute } from '../Vec2Attribute'

/**
 * Represents a cone geometry.
 *
 * ```
 * const cone = new Cone(1.2, 4.0)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Specifies the radius of the base of the cone.
 * * **Height(`NumberParameter`):** Specifies the height of the cone.
 * * **Detail(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Cap(`BooleanParameter`):** Specifies whether the base of the cone is capped or open.
 *
 * @extends {ProceduralMesh}
 */
class Cone extends ProceduralMesh {
  protected __cap!: boolean
  protected __capParam: BooleanParameter
  protected __detailParam: NumberParameter
  protected __heightParam: NumberParameter
  protected __radiusParam: NumberParameter
  // topologyParams: string[]

  /**
   * Create a cone.
   * @param {number} radius - The radius of the base of the cone.
   * @param {number} height - The height of the cone.
   * @param {number} detail - The detail of the cone.
   * @param {boolean} cap -  A boolean indicating whether the base of the cone is capped or open.
   */
  constructor(radius = 0.5, height = 1.0, detail = 32, cap = true) {
    super()
    this.topologyParams = []
    if (isNaN(radius) || isNaN(height) || isNaN(detail)) throw new Error('Invalid geom args')

    this.__radiusParam = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.__heightParam = this.addParameter(new NumberParameter('Height', height)) as NumberParameter
    this.__detailParam = this.addParameter(
      new NumberParameter('Detail', detail >= 3 ? detail : 3, [3, 200], 1)
    ) as NumberParameter
    this.__capParam = this.addParameter(new BooleanParameter('Cap', cap)) as BooleanParameter

    this.addVertexAttribute('texCoords', new Vec2Attribute())
    this.addVertexAttribute('normals', new Vec3Attribute())

    this.topologyParams.push('Detail')
    this.topologyParams.push('Cap')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const nbSides = this.__detailParam.getValue() || 32
    const radius = this.__radiusParam.getValue() || 0.5
    const height = this.__heightParam.getValue() || 1.0
    const cap = this.__capParam.getValue()
    let numVertices = nbSides + 1
    if (cap) {
      numVertices += 1
    }
    this.setNumVertices(numVertices)
    const tipPoint = nbSides
    const basePoint = nbSides + 1

    // ////////////////////////////
    // Set Vertex Positions
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')

    if (positions) {
      positions.getValueRef(tipPoint).set(0.0, 0.0, height)
      for (let i = 0; i < nbSides; i++) {
        const theta = -((i / nbSides) * 2.0 * Math.PI)
        positions.getValueRef(i).set(radius * Math.cos(theta), radius * Math.sin(theta), 0.0)
      }
      if (cap) {
        positions.getValueRef(basePoint).set(0.0, 0.0, 0.0)
      }
    }

    // ////////////////////////////
    // Build the topology
    this.setFaceCounts([nbSides + (cap ? nbSides : 0)])
    for (let i = 0; i < nbSides; i++) {
      const j = (i + 1) % nbSides
      this.setFaceVertexIndices(i, [j, i, tipPoint])
    }
    if (cap) {
      for (let i = 0; i < nbSides; i++) {
        const j = (i + 1) % nbSides
        this.setFaceVertexIndices(nbSides + i, [i, j, basePoint])
      }
    }

    // ////////////////////////////
    // setUVs
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      // Now set the attrbute values
      let tri = 0
      for (let i = 0; i < nbSides; i++) {
        if ('setFaceVertexValue' in texCoords) {
          texCoords.setFaceVertexValue(tri, 0, new Vec2((i + 1) / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 1, new Vec2(i / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0))
        }
      }
      if (cap) {
        for (let i = 0; i < nbSides; i++) {
          texCoords.setFaceVertexValue(tri, 0, new Vec2(i / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 1, new Vec2((i + 1) / nbSides, 0.0))
          texCoords.setFaceVertexValue(tri, 2, new Vec2((i + 0.5) / nbSides, 1.0))
          tri++
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
    const nbSides = this.__detailParam.getValue() || 32
    const radius = this.__radiusParam.getValue() || 0.5
    const height = this.__heightParam.getValue() || 1.0

    const tipPoint = nbSides
    const basePoint = nbSides + 1

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    if (positions) {
      positions.getValueRef(tipPoint).set(0.0, 0.0, height)
      for (let i = 0; i < nbSides; i++) {
        const theta = -((i / nbSides) * 2.0 * Math.PI)
        positions.getValueRef(i).set(radius * Math.cos(theta), radius * Math.sin(theta), 0.0)
      }
      if (this.__cap) {
        positions.getValueRef(basePoint).set(0.0, 0.0, 0.0)
      }
    }

    // Note: this breaks an infinite loop where computeVertexNormals calls update which calls rebuild.
    this.dirtyTopology = false
    this.dirtyVertices = false
    this.computeVertexNormals()
  }
}

Registry.register('Cone', Cone)
export { Cone }
