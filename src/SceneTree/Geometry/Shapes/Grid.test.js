import { Grid } from './Grid'

describe.skip('Grid', () => {
  it('tests default parameters', () => {
    const grid = new Grid()

    expect(grid.getParameter('x').getValue()).toBe(1)
    expect(grid.getParameter('y').getValue()).toBe(1)
    expect(grid.getParameter('xDivisions').getValue()).toBe(10)
    expect(grid.getParameter('yDivisions').getValue()).toBe(10)
    expect(grid.getParameter('skipCenterLines').getValue()).toBe(false)
  })

  it('updates parameters', () => {
    const grid = new Grid()
    grid.getParameter('x').setValue(2)
    grid.getParameter('y').setValue(2)
    grid.getParameter('xDivisions').setValue(20)
    grid.getParameter('yDivisions').setValue(15)
    grid.getParameter('skipCenterLines').setValue(true)

    expect(grid.getParameter('x').getValue()).toBe(2)
    expect(grid.getParameter('y').getValue()).toBe(2)
    expect(grid.getParameter('xDivisions').getValue()).toBe(20)
    expect(grid.getParameter('yDivisions').getValue()).toBe(15)
    expect(grid.getParameter('skipCenterLines').getValue()).toBe(true)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it.skip('saves to JSON (serialization).', () => {
    const grid = new Grid(1, 1, 2, 2, true)

    const outputJSON = grid.toJSON()
    const expectedOutput = {
      indices: [0, 1, 2, 3, 4, 5, 6, 7, 0, 0],
      numVertices: 10,
      skipCenterLines: { value: true },
      type: 'Grid',
      vertexAttributes: {
        positions: {
          data: [
            -0.5,
            -0.5,
            0,
            -0.5,
            0.5,
            0,
            0.5,
            -0.5,
            0,
            0.5,
            0.5,
            0,
            -0.5,
            -0.5,
            0,
            0.5,
            -0.5,
            0,
            -0.5,
            0.5,
            0,
            0.5,
            0.5,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 10,
        },
      },
      x: { value: 1 },
      xDivisions: { value: 2 },
      yDivisions: { value: 2 },
      z: { value: 1 },
    }

    expect(outputJSON).toEqual(expectedOutput)
  })

  it.skip('restores from JSON (serialization).', () => {
    const grid = new Grid()
    const inputJSON = {
      indices: [0, 1, 2, 3, 4, 5, 6, 7, 0, 0],
      numVertices: 10,
      skipCenterLines: { value: true },
      type: 'Grid',
      vertexAttributes: {
        positions: {
          data: [
            -0.5,
            -0.5,
            0,
            -0.5,
            0.5,
            0,
            0.5,
            -0.5,
            0,
            0.5,
            0.5,
            0,
            -0.5,
            -0.5,
            0,
            0.5,
            -0.5,
            0,
            -0.5,
            0.5,
            0,
            0.5,
            0.5,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
          ],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 10,
        },
      },
      x: { value: 1 },
      xDivisions: { value: 2 },
      yDivisions: { value: 2 },
      z: { value: 1 },
    }
    grid.fromJSON(inputJSON)

    const newGrid = new Grid(1, 1, 2, 2, true)
    // console.log(JSON.stringify(newGrid.toJSON(), null, 2))
    expect(grid.toJSON()).toEqual(newGrid.toJSON())
  })
})
