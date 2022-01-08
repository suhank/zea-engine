import { Lines, Vec3Attribute } from '../../SceneTree/Geometry'

/**
 * @private
 * @extends {ProceduralMesh}
 */
class BBoxOcclusionLinesCuboid extends Lines {
  constructor() {
    super()
    this.setNumVertices(8)
    const positions = <Vec3Attribute>this.getVertexAttribute('positions')
    positions.getValueRef(0).set(0.5, -0.5, 0.5)
    positions.getValueRef(1).set(0.5, 0.5, 0.5)
    positions.getValueRef(2).set(-0.5, 0.5, 0.5)
    positions.getValueRef(3).set(-0.5, -0.5, 0.5)

    positions.getValueRef(4).set(0.5, -0.5, -0.5)
    positions.getValueRef(5).set(0.5, 0.5, -0.5)
    positions.getValueRef(6).set(-0.5, 0.5, -0.5)
    positions.getValueRef(7).set(-0.5, -0.5, -0.5)
    //
    //      7*----------*6
    //     /   \  /   / |
    //  4*----------*5  |
    //   | \     /  |   |
    //   |   \ /    |   |
    //   |   / \3   |  /2
    //   | /     \  |/
    //  0*----------*1
    //
    this.setNumSegments(34)

    this.setSegmentVertexIndices(0, 0, 1)
    this.setSegmentVertexIndices(1, 0, 2)
    this.setSegmentVertexIndices(2, 0, 3)
    this.setSegmentVertexIndices(3, 0, 4)
    this.setSegmentVertexIndices(4, 0, 5)
    this.setSegmentVertexIndices(5, 0, 6)
    this.setSegmentVertexIndices(6, 0, 7)

    this.setSegmentVertexIndices(7, 1, 0)
    this.setSegmentVertexIndices(8, 1, 2)
    this.setSegmentVertexIndices(9, 1, 3)
    this.setSegmentVertexIndices(10, 1, 4)
    this.setSegmentVertexIndices(11, 1, 5)
    this.setSegmentVertexIndices(12, 1, 6)
    this.setSegmentVertexIndices(13, 1, 7)

    this.setSegmentVertexIndices(14, 2, 0)
    this.setSegmentVertexIndices(15, 2, 1)
    this.setSegmentVertexIndices(16, 2, 3)
    this.setSegmentVertexIndices(17, 2, 4)
    this.setSegmentVertexIndices(18, 2, 5)
    this.setSegmentVertexIndices(19, 2, 6)
    this.setSegmentVertexIndices(20, 2, 7)

    this.setSegmentVertexIndices(21, 3, 1)
    this.setSegmentVertexIndices(22, 3, 2)
    this.setSegmentVertexIndices(23, 3, 0)
    this.setSegmentVertexIndices(24, 3, 4)
    this.setSegmentVertexIndices(25, 3, 5)
    this.setSegmentVertexIndices(26, 3, 6)
    this.setSegmentVertexIndices(27, 3, 7)

    this.setSegmentVertexIndices(28, 4, 5)
    this.setSegmentVertexIndices(29, 4, 6)
    this.setSegmentVertexIndices(30, 4, 7)

    this.setSegmentVertexIndices(31, 5, 6)
    this.setSegmentVertexIndices(32, 5, 7)

    this.setSegmentVertexIndices(33, 6, 7)
  }
}

export { BBoxOcclusionLinesCuboid }
