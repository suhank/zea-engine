import { Lines } from './Lines'
import { Vec3 } from '../../Math'
import { Vec3Attribute } from './Vec3Attribute'

describe('Lines', () => {
  test('Check for default positions attribute.', () => {
    const lines = new Lines()
    expect(lines.hasVertexAttribute('positions')).toBe(true)
  })

  test('Check for positions attribute has the same length as the number of vertices.', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    const positions = <Vec3Attribute>lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setSides(2)
    lines.setSegmentVertexIndices(0, 0, 1)
    lines.setSegmentVertexIndices(1, 1, 2)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)

    expect(lines.getVertexAttribute('positions').getCount()).toBe(numVertices)
  })

  test('Check resizing bigger the line segment indices.', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    lines.setSides(2)
    lines.setSegmentVertexIndices(0, 0, 1)
    lines.setSegmentVertexIndices(1, 1, 2)

    lines.setSides(3)
    lines.setSegmentVertexIndices(2, 2, 0)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)

    // TODO:  originally: expect(lines.getIndices(1,1).toEqual(new Uint32Array([0, 1, 1, 2, 2, 0]))
    let indices = lines.getIndices()
    let expected = new Uint32Array([0, 1, 1, 2, 2, 0])
    expect(indices.toString()).toEqual(expected.toString())
  })

  test('Check resizing smaller the line segment indices.', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    lines.setSides(3)
    lines.setSegmentVertexIndices(0, 0, 1)
    lines.setSegmentVertexIndices(1, 1, 2)
    lines.setSegmentVertexIndices(2, 2, 0)

    lines.setSides(2)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)
    expect(lines.getIndices().toString()).toEqual(new Uint32Array([0, 1, 1, 2]).toString())
  })

  test('Check generated buffers', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)

    const positions = <Vec3Attribute>lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setSides(2)
    lines.setSegmentVertexIndices(0, 0, 1)
    lines.setSegmentVertexIndices(1, 1, 2)

    expect(lines.getSegmentVertexIndex(1, 0)).toBe(1)
    expect(lines.getSegmentVertexIndex(1, 1)).toBe(2)

    expect(lines.genBuffers()).toEqual({
      attrBuffers: {
        positions: {
          count: 3,
          dataType: 'Vec3',
          normalized: false,
          values: new Float32Array([1, 2, 3, -1, -2, -3, 2, 1, -3]),
        },
      },
      indices: new Uint8Array([0, 1, 1, 2]),
      numVertices: 3,
    })
  })

  it('saves to JSON (serialization).', () => {
    const lines = new Lines()
    const numVertices = 3
    lines.setNumVertices(numVertices)
    const positions = <Vec3Attribute>lines.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    lines.setSides(2)
    lines.setSegmentVertexIndices(0, 0, 1)
    lines.setSegmentVertexIndices(1, 1, 2)

    expect(JSON.stringify(lines.toJSON())).toMatchSnapshot()
  })

  it('loads from JSON (serialization).', () => {
    const lines = new Lines()
    const input = {
      type: 'Lines',
      numVertices: 3,
      vertexAttributes: {
        positions: { data: [1, 2, 3, -1, -2, -3, 2, 1, -3], dataType: 'Vec3', defaultValue: 0, length: 3 },
      },
      indices: [0, 1, 1, 2],
    }
    lines.fromJSON(input)

    expect(lines.getVertexAttribute('positions').getCount()).toBe(3)
    expect(lines.getNumSegments()).toBe(2)
  })
})
