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
   * @member radiusParam - Radius of the sphere.
   */
  radiusParam: NumberParameter = new NumberParameter('Radius', 1.0)

  /**
   * @member sidesParam - Specifies the number of subdivisions around the `Z` axis.
   */
  sidesParam: NumberParameter = new NumberParameter('Sides', 12, [3, 200], 1)

  /**
   * @member loopsParam - Specifies the number of subdivisions(stacks) along the `Z` axis.
   */
  loopsParam: NumberParameter = new NumberParameter('Loops', 6, [3, 200], 1)

  /**
   * Creates an instance of Sphere.
   * @param radius - The radius of the sphere.
   * @param sides - The number of sides.
   * @param loops - The number of loops.
   * @param addNormals - Compute vertex normals for the geometry
   * @param addTextureCoords - Compute texture coordinates for the geometry
   */
  constructor(radius = 1.0, sides = 12, loops = 12) {
    super()

    if (isNaN(radius) || isNaN(sides) || isNaN(loops)) throw new Error('Invalid geom args')

    this.addParameter(this.radiusParam)
    this.addParameter(this.sidesParam)
    this.addParameter(this.loopsParam)

    this.radiusParam.value = radius
    this.sidesParam.value = sides
    this.loopsParam.value = loops

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
    const radius = this.radiusParam.value
    const nbSides = this.sidesParam.value
    const nbLoops = this.loopsParam.value

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
    if (!positions) return

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
        normals.getValueRef(vertex).setFromOther(normal)
        vertex++
      }
    }

    positions.getValueRef(vertex).set(0.0, 0.0, -radius)
    if (normals) normals.getValueRef(vertex).set(0.0, 0.0, -1.0)
    vertex++

    // ////////////////////////////
    // Build the topology
    const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')

    // build the fan at the first pole.
    let faceIndex = 0
    for (let j = 0; j < nbSides; j++) {
      const v0 = 0
      const v1 = ((j + 1) % nbSides) + 1
      const v2 = j + 1
      this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

      if (texCoords) {
        const uv0 = new Vec2(0.5, 0.0)
        const uv1 = new Vec2((j + 1) / (nbSides - 1), 1 / (nbLoops + 1))
        const uv2 = new Vec2(j / (nbSides - 1), 1 / (nbLoops + 1))
        texCoords.setFaceVertexValue(faceIndex, 0, uv0)
        texCoords.setFaceVertexValue(faceIndex, 1, uv1)
        texCoords.setFaceVertexValue(faceIndex, 2, uv2)
      }

      faceIndex++
    }
    // Build the fan at the second pole.
    for (let j = 0; j < nbSides; j++) {
      const v0 = numVertices - 1
      const v2 = nbSides * (nbLoops - 1) + ((j + 1) % nbSides) + 1
      const v1 = nbSides * (nbLoops - 1) + j + 1
      this.setFaceVertexIndices(faceIndex, [v0, v1, v2])

      if (texCoords) {
        const uv0 = new Vec2(0.5, 1.0)
        const uv1 = new Vec2((j + 1) / (nbSides - 1), 1 - 1 / (nbLoops + 1))
        const uv2 = new Vec2(j / (nbSides - 1), 1 - 1 / (nbLoops + 1))
        texCoords.setFaceVertexValue(faceIndex, 0, uv0)
        texCoords.setFaceVertexValue(faceIndex, 1, uv1)
        texCoords.setFaceVertexValue(faceIndex, 2, uv2)
      }

      faceIndex++
    }

    for (let i = 0; i < nbLoops - 1; i++) {
      for (let j = 0; j < nbSides; j++) {
        const v0 = nbSides * i + j + 1
        const v1 = nbSides * i + ((j + 1) % nbSides) + 1
        const v2 = nbSides * (i + 1) + ((j + 1) % nbSides) + 1
        const v3 = nbSides * (i + 1) + j + 1
        this.setFaceVertexIndices(faceIndex, [v0, v1, v2, v3])

        if (texCoords) {
          texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(j / nbSides, (i + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((j + 1) / nbSides, (i + 1) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((j + 1) / nbSides, (i + 2) / nbLoops))
          texCoords.setFaceVertexValue(faceIndex, 3, new Vec2(j / nbSides, (i + 2) / nbLoops))
        }
        faceIndex++
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
