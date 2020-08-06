import { PointGrid } from './PointGrid'

describe('PointGrid', () => {
  it('tests default parameters', () => {
    const pointGrid = new PointGrid()

    expect(pointGrid.getParameter('X').getValue()).toBe(1)
    expect(pointGrid.getParameter('Y').getValue()).toBe(1)
    expect(pointGrid.getParameter('XDivisions').getValue()).toBe(1)
    expect(pointGrid.getParameter('YDivisions').getValue()).toBe(1)
  })

  it('updates parameters', () => {
    const pointGrid = new PointGrid()

    pointGrid.getParameter('X').setValue(5)
    pointGrid.getParameter('Y').setValue(5)
    pointGrid.getParameter('XDivisions').setValue(10)
    pointGrid.getParameter('YDivisions').setValue(10)

    expect(pointGrid.getParameter('X').getValue()).toBe(5)
    expect(pointGrid.getParameter('Y').getValue()).toBe(5)
    expect(pointGrid.getParameter('XDivisions').getValue()).toBe(10)
    expect(pointGrid.getParameter('YDivisions').getValue()).toBe(10)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it.skip('saves to JSON (serialization).', () => {
    const pointGrid = new PointGrid(3, 3, 6, 6, true)
    debugger
    const outputJSON = pointGrid.toJSON()
    console.log(outputJSON)

    expect(outputJSON).toMatchSnapshot()
  })

  it.skip('restores from JSON (serialization).', () => {
    const pointGrid = new PointGrid()
    const inputJSON = {
      params: { X: { value: 3 }, Y: { value: 3 }, XDivisions: { value: 6 }, YDivisions: { value: 6 } },
      type: 'PointGrid',
      numVertices: 0,
      vertexAttributes: {
        positions: { data: [], dataType: 'Vec3', defaultValue: 0, length: 0 },
        texCoords: { data: [], dataType: 'Vec2', defaultValue: 1.7976931348623157e308, length: 0 },
      },
    }
    pointGrid.fromJSON(inputJSON)

    const newPointGrid = new PointGrid(3, 3, 6, 6, true)
    expect(JSON.stringify(pointGrid.toJSON())).toEqual(JSON.stringify(newPointGrid.toJSON()))
  })
})
