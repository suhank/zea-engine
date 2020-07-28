import { Mesh } from './Mesh'
import { Vec2, Vec3, Box3 } from '../../Math'

describe('Mesh', () => {
  test('Check for default positions attribute.', () => {
    const mesh = new Mesh()
    expect(mesh.hasVertexAttribute('positions')).toBe(true)
  })

  test('Check for setting up a single triangle', () => {
    const mesh = new Mesh()
    const numVertices = 3
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    mesh.setFaceCounts([1])
    mesh.setFaceVertexIndices(0, 0, 1, 2)

    expect(mesh.getFaceVertexIndices(0)).toEqual([0, 1, 2])

    expect(mesh.getVertexAttribute('positions').length).toBe(numVertices)
  })

  test('Check for setting up a single quad', () => {
    const mesh = new Mesh()
    const numVertices = 4
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(0, -1, -1)
    positions.getValueRef(1).set(0, -1, 1)
    positions.getValueRef(2).set(0, 1, 1)
    positions.getValueRef(3).set(0, 1, -1)

    const normals = mesh.addVertexAttribute('normals', Vec3, 0.0)
    normals.getValueRef(0).set(-1, 0, 0)
    normals.getValueRef(1).set(-1, 0, 0)
    normals.getValueRef(2).set(-1, 0, 0)
    normals.getValueRef(3).set(-1, 0, 0)

    mesh.setFaceCounts([0, 1])
    mesh.setFaceVertexIndices(0, 0, 1, 2, 3)

    expect(mesh.getFaceVertexIndices(0)).toEqual([0, 1, 2, 3])
  })

  test('Check for setting up 2 neighboring quads', () => {
    const mesh = new Mesh()
    const numVertices = 6
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(0, -1, -1)
    positions.getValueRef(1).set(0, -1, 1)
    positions.getValueRef(2).set(0, 1, 1)
    positions.getValueRef(3).set(0, 1, -1)
    positions.getValueRef(4).set(1, 1, 1)
    positions.getValueRef(5).set(1, 1, -1)

    mesh.setFaceCounts([0, 2])
    mesh.setFaceVertexIndices(0, 0, 1, 2, 3)
    mesh.setFaceVertexIndices(1, 3, 2, 4, 5)

    const normals = mesh.addVertexAttribute('normals', Vec3, 0.0)

    // The first face has normals along the -X axis
    normals.setFaceVertexValue(0, 0, new Vec3(-1, 0, 0))
    normals.setFaceVertexValue(0, 1, new Vec3(-1, 0, 0))
    normals.setFaceVertexValue(0, 2, new Vec3(-1, 0, 0))
    normals.setFaceVertexValue(0, 3, new Vec3(-1, 0, 0))

    // The second face has normals along the -Y axis
    normals.setFaceVertexValue(1, 0, new Vec3(0, -1, 0))
    normals.setFaceVertexValue(1, 1, new Vec3(0, -1, 0))
    normals.setFaceVertexValue(1, 2, new Vec3(0, -1, 0))
    normals.setFaceVertexValue(1, 3, new Vec3(0, -1, 0))

    expect(mesh.getFaceVertexIndices(0)).toEqual([0, 1, 2, 3])
    expect(mesh.getFaceVertexIndices(1)).toEqual([3, 2, 4, 5])
  })

  test('Check for setting up 2 neighboring quads', () => {
    const mesh = new Mesh()
    const numVertices = 6
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(0, -1, -1)
    positions.getValueRef(1).set(0, -1, 1)
    positions.getValueRef(2).set(0, 1, 1)
    positions.getValueRef(3).set(0, 1, -1)
    positions.getValueRef(4).set(1, 1, 1)
    positions.getValueRef(5).set(1, 1, -1)

    mesh.setFaceCounts([0, 1])
    mesh.setFaceVertexIndices(0, 0, 1, 2, 3)
    mesh.setFaceVertexIndices(1, 3, 2, 4, 5)

    mesh.computeVertexNormals()

    expect(JSON.stringify(mesh.toJSON())).toMatchSnapshot()
  })

  test.skip('Check resizing bigger the face indices.', () => {
    const mesh = new Mesh()
    const numVertices = 4
    mesh.setNumVertices(numVertices)

    mesh.setFaceCounts([1])
    mesh.setFaceVertexIndices(0, 0, 1, 2)

    mesh.setFaceCounts([2])
    mesh.setFaceVertexIndices(1, 2, 1, 3)

    expect(mesh.getFaceVertexIndices(0)).toEqual([0, 1, 2])
    expect(mesh.getFaceVertexIndices(1)).toEqual([2, 1, 3])
  })

  test.skip('Check resizing smaller the face indices.', () => {
    const mesh = new Mesh()
    const numVertices = 4
    mesh.setNumVertices(numVertices)

    mesh.setFaceCounts([2])
    mesh.setFaceVertexIndices(0, 0, 1, 2)
    mesh.setFaceVertexIndices(1, 2, 1, 3)

    mesh.setFaceCounts([1])

    expect(mesh.getFaceVertexIndices(0)).toEqual([0, 1, 2])
  })

  test('Check generated buffers', () => {
    const mesh = new Mesh()
    const numVertices = 3
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    mesh.setFaceCounts([1])
    mesh.setFaceVertexIndices(0, 0, 1, 2)

    expect(mesh.genBuffers()).toEqual({
      attrBuffers: {
        positions: {
          count: 3,
          dataType: Vec3,
          dimension: 3,
          normalized: false,
          values: new Float32Array([1, 2, 3, -1, -2, -3, 2, 1, -3]),
        },
      },
      indices: new Uint8Array([0, 1, 2]),
      numRenderVerts: 3,
      numVertices: 3,
    })
  })

  test('saves to JSON (serialization).', () => {
    const mesh = new Mesh()
    const numVertices = 3
    mesh.setNumVertices(numVertices)

    const positions = mesh.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    mesh.setFaceCounts([1])
    mesh.setFaceVertexIndices(0, 0, 1, 2)

    expect(JSON.stringify(mesh.toJSON())).toMatchSnapshot()
  })

  test.skip('loads from JSON (serialization).', () => {
    const mesh = new Mesh()
    const input = {
      type: 'Mesh',
      numVertices: 3,
      vertexAttributes: {
        positions: {
          data: [1, 2, 3, -1, -2, -3, 2, 1, -3],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 3,
          splits: {},
          splitValues: [],
        },
      },
      faceVertexIndices: [0, 1, 2],
    }
    mesh.fromJSON(input)

    expect(mesh.getVertexAttribute('positions').length).toBe(3)
    expect(mesh.getFaceCounts()).toEqual([2])
  })
})
