import { Vec2, Vec3 } from '../../../Math/index'
import { NumberParameter } from '../../Parameters/NumberParameter'
import { Registry } from '../../../Registry'
import { ProceduralMesh } from './ProceduralMesh'
import { Vec3Attribute } from '../Vec3Attribute'
import { Vec2Attribute } from '../Vec2Attribute'

/**
 * A class for generating a sphere geometry.
 *
 * ```
 * const sphere = new Sphere(1.4, 13)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the sphere.
 * * **Sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
 * * **Loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) along the `Z` axis.
 *
 * @extends {ProceduralMesh}
 */
class Sphere extends ProceduralMesh {
  /**
   * @member {NumberParameter} loopsParam - Specifies the number of subdivisions(stacks) along the `Z` axis.
   */
  loopsParam: NumberParameter

  /**
   * @member {NumberParameter} radiusParam - Radius of the sphere.
   */
  radiusParam: NumberParameter

  /**
   * @member {NumberParameter} sidesParam - Specifies the number of subdivisions around the `Z` axis.
   */
  sidesParam: NumberParameter

  /**
   * Creates an instance of Sphere.
   * @param {number} [radius=1.0] - The radius of the sphere.
   * @param {number} [sides=12] - The number of sides.
   * @param {number} [loops=12] - The number of loops.
   * @param {boolean} [addNormals=true] - Compute vertex normals for the geometry
   * @param {boolean} [addTextureCoords=true] - Compute texture coordinates for the geometry
   */
  constructor(radius = 1.0, sides = 12, loops = 12) {
    super()

    if (isNaN(radius) || isNaN(sides) || isNaN(loops)) throw new Error('Invalid geom args')

    this.radiusParam = this.addParameter(new NumberParameter('Radius', radius)) as NumberParameter
    this.sidesParam = this.addParameter(
      new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1)
    ) as NumberParameter
    this.loopsParam = this.addParameter(
      new NumberParameter('Loops', loops >= 3 ? loops : 3, [3, 200], 1)
    ) as NumberParameter

    this.addVertexAttribute('texCoords', new Vec2Attribute())
    this.addVertexAttribute('normals', new Vec3Attribute())

    this.topologyParams.push('Sides')
    this.topologyParams.push('Loops')
  }

  /**
   * The rebuild method.
   * @private
   */
  rebuild(): void {
    const radius = this.radiusParam.value || 1.0
    const nbSides = this.sidesParam.value || 12
    const nbLoops = this.loopsParam.value || 12

    const numVertices = 2 + nbSides * nbLoops
    const numTris = nbSides * 2
    const numQuads = nbSides * nbLoops
    this.setNumVertices(numVertices)
    this.setFaceCounts([numTris, numQuads])

    // ////////////////////////////
    // Set Vertex Positions

    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    const normal = new Vec3(0.0, 0.0, 1.0)
    let vertex = 0
    if (!positions || !normals) return

    positions.getValueRef(vertex).set(0.0, 0.0, radius)
    normals.getValueRef(vertex).set(0.0, 0.0, 1.0)
    vertex++

    for (let i = 0; i < nbLoops; i++) {
      const theta = ((i + 1) / (nbLoops + 1)) * Math.PI
      for (let j = 0; j < nbSides; j++) {
        const phi = -((j / nbSides) * 2.0 * Math.PI)
        normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))

        // Set positions and normals at the same time.
        positions.getValueRef(vertex).setFromOther(normal.scale(radius))
        normals.getValueRef(vertex).setFromOther(normal)
        vertex++
      }
    }

    positions.getValueRef(vertex).set(0.0, 0.0, -radius)
    normals.getValueRef(vertex).set(0.0, 0.0, -1.0)
    vertex++

    // ////////////////////////////
    // Build the topology
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
    if (texCoords) {
      // build the fan at the first pole.
      let faceIndex = 0
      for (let j = 0; j < nbSides; j++) {
        const v0 = 0
        const v1 = ((j + 1) % nbSides) + 1
        const v2 = j + 1
        this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

        if (texCoords) {
          const uv0 = new Vec2(0.5, 0.0)
          const uv1 = new Vec2(1.0 - (j + 1) / nbSides, 0.0)
          const uv2 = new Vec2(1.0 - j / nbSides, 1.0 / (nbLoops + 1))
          texCoords.setFaceVertexValue(faceIndex, 0, uv0)
          texCoords.setFaceVertexValue(faceIndex, 1, uv1)
          texCoords.setFaceVertexValue(faceIndex, 2, uv2)
        }

        faceIndex++
      }

      // Build the fan at the second pole.
      for (let j = 0; j < nbSides; j++) {
        const v0 = numVertices - 1
        const v1 = nbSides * (nbLoops - 1) + j + 1
        const v2 = nbSides * (nbLoops - 1) + ((j + 1) % nbSides) + 1
        this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

        const uv0 = new Vec2(1.0 - j / nbSides, nbLoops / (nbLoops + 1))
        const uv1 = new Vec2(1.0 - (j + 1) / nbSides, nbLoops / (nbLoops + 1))
        const uv2 = new Vec2(0.5, 1.0)
        texCoords.setFaceVertexValue(faceIndex, 0, uv0)
        texCoords.setFaceVertexValue(faceIndex, 1, uv1)
        texCoords.setFaceVertexValue(faceIndex, 2, uv2)

        faceIndex++
      }

      for (let i = 0; i < nbLoops - 1; i++) {
        for (let j = 0; j < nbSides; j++) {
          const v0 = nbSides * i + j + 1
          const v1 = nbSides * i + ((j + 1) % nbSides) + 1
          const v2 = nbSides * (i + 1) + ((j + 1) % nbSides) + 1
          const v3 = nbSides * (i + 1) + j + 1
          this.setFaceVertexIndices(faceIndex, [v0, v1, v2, v3])

          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbLoops, j / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / nbLoops, (j + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / nbLoops, (j + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 3, new Vec2((i + 1) / nbLoops, j / nbLoops))
          faceIndex++
        }
      }
    }
  }

  /**
   * The resize method.
   * @private
   */
  resize() {
    const radius = this.radiusParam.value
    const nbSides = this.sidesParam.value
    const nbLoops = this.loopsParam.value
    if (!radius || !nbSides || !nbLoops) {
      console.warn('resize() failed')
      return
    }
    // ////////////////////////////
    // Set Vertex Positions
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    const normals = <Vec3Attribute>this.getVertexAttribute('normals')
    let vertex = 0
    const normal = new Vec3(0.0, 0.0, 1.0)
    positions.getValueRef(vertex).set(0.0, 0.0, radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, 1.0)
    vertex++

    for (let i = 0; i < nbLoops; i++) {
      const theta = ((i + 1) / (nbLoops + 1)) * Math.PI
      for (let j = 0; j < nbSides; j++) {
        const phi = -((j / nbSides) * 2.0 * Math.PI)
        normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))

        // Set positions and normals at the same time.
        positions.getValueRef(vertex).setFromOther(normal.scale(radius))
        if (normals) normals.getValueRef(vertex).setFromOther(normal)
        vertex++
      }
    }
    positions.getValueRef(vertex).set(0.0, 0.0, -radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, -1.0)
    vertex++
  }
}

Registry.register('Sphere', Sphere)

export { Sphere }
