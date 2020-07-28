import { Points } from './Points'
import { Vec2, Vec3, Box3 } from '../../Math'

describe('Points', () => {
  test('Check for default positions attribute.', () => {
    const points = new Points()
    expect(points.hasVertexAttribute('positions')).toBe(true)
  })

  test('Check for positions attribute has the same length as the number of vertices.', () => {
    const points = new Points()
    const numVertices = 10
    points.setNumVertices(numVertices)
    expect(points.getVertexAttribute('positions').length).toBe(numVertices)
  })

  test('Check if new attribute has the same length as the number of vertices.', () => {
    const points = new Points()
    const numVertices = 10
    points.setNumVertices(numVertices)
    points.addVertexAttribute('foo', Vec2, 1.0)
    expect(points.getVertexAttribute('foo').length).toBe(numVertices)
    expect(points.getVertexAttribute('foo').getValueRef(0).toJSON()).toStrictEqual({ x: 1, y: 1 })
  })

  test('Check for calculation of bounding box.', () => {
    const points = new Points()
    const numVertices = 3
    points.setNumVertices(numVertices)
    const positions = points.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    points.setBoundingBoxDirty()

    const box3 = new Box3()
    box3.min.set(-1, -2, -3)
    box3.max.set(2, 2, 3)
    expect(points.getBoundingBox()).toEqual(box3)
  })

  test('Check resizing bigger the number of vertices.', () => {
    const points = new Points()

    points.setNumVertices(3)
    const positions = points.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    points.setNumVertices(4)
    expect(positions.getValueRef(0)).toEqual(new Vec3(1, 2, 3))
  })

  test('Check resizing smaller the number of vertices.', () => {
    const points = new Points()

    points.setNumVertices(3)
    const positions = points.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    points.setNumVertices(2)
    expect(positions.getValueRef(0)).toEqual(new Vec3(1, 2, 3))
  })

  test('Check generated buffers', () => {
    const points = new Points()
    const numVertices = 3
    points.setNumVertices(numVertices)
    const positions = points.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    expect(points.genBuffers()).toEqual({
      attrBuffers: {
        positions: {
          count: 3,
          dataType: Vec3,
          normalized: false,
          values: new Float32Array([1, 2, 3, -1, -2, -3, 2, 1, -3]),
        },
      },
      numVertices: 3,
    })
  })

  it('saves to JSON (serialization).', () => {
    const points = new Points()
    const numVertices = 3
    points.setNumVertices(numVertices)
    const positions = points.getVertexAttribute('positions')
    positions.getValueRef(0).set(1, 2, 3)
    positions.getValueRef(1).set(-1, -2, -3)
    positions.getValueRef(2).set(2, 1, -3)

    expect(JSON.stringify(points.toJSON())).toMatchSnapshot()
  })

  it('loads from JSON (serialization).', () => {
    const points = new Points()
    const input = {
      type: 'Points',
      numVertices: 3,
      vertexAttributes: {
        positions: { data: [1, 2, 3, -1, -2, -3, 2, 1, -3], dataType: 'Vec3', defaultValue: 0, length: 3 },
      },
    }
    points.fromJSON(input)

    expect(points.getVertexAttribute('positions').length).toBe(3)
  })
})
