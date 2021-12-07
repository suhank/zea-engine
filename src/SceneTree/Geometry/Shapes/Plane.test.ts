import { Plane } from './Plane'

describe('Plane', () => {
  it('tests default parameters', () => {
    const plane = new Plane()

    expect(plane.sizeXParam.value).toBe(1)
    expect(plane.sizeYParam.value).toBe(1)
    expect(plane.detailXParam.value).toBe(1)
    expect(plane.detailYParam.value).toBe(1)
  })

  it('updates parameters', () => {
    const plane = new Plane()
    plane.sizeXParam.value = 3
    plane.sizeYParam.value = 3
    plane.detailXParam.value = 3
    plane.detailYParam.value = 4

    expect(plane.sizeXParam.value).toBe(3)
    expect(plane.sizeYParam.value).toBe(3)
    expect(plane.detailXParam.value).toBe(3)
    expect(plane.detailYParam.value).toBe(4)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it('saves to JSON (serialization).', () => {
    const plane = new Plane(2, 2, 2, 2, true, true)
    const outputJSON = plane.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const plane = new Plane()
    const inputJSON = {
      params: { SizeX: { value: 2 }, SizeY: { value: 2 }, DetailX: { value: 2 }, DetailY: { value: 2 } },
      type: 'Plane',
      numVertices: 9,
      vertexAttributes: {}
    }
    plane.fromJSON(inputJSON)

    const newPlane = new Plane(2, 2, 2, 2, true, true)
    expect(plane.toJSON()).toEqual(newPlane.toJSON())
  })
})
