import { Grid } from './Grid'

describe('Grid', () => {
  it('tests default parameters', () => {
    const grid = new Grid()

    expect(grid.xParam.value).toBe(1)
    expect(grid.yParam.value).toBe(1)
    expect(grid.xDivisionsParam.value).toBe(10)
    expect(grid.yDivisionsParam.value).toBe(10)
    expect(grid.skipCenterLinesParam.value).toBe(false)
  })

  it('updates parameters', () => {
    const grid = new Grid()
    grid.xParam.value = 2
    grid.yParam.value = 2
    grid.xDivisionsParam.value = 20
    grid.yDivisionsParam.value = 15
    grid.skipCenterLinesParam.value = true

    expect(grid.xParam.value).toBe(2)
    expect(grid.yParam.value).toBe(2)
    expect(grid.xDivisionsParam.value).toBe(20)
    expect(grid.yDivisionsParam.value).toBe(15)
    expect(grid.skipCenterLinesParam.value).toBe(true)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it('saves to JSON (serialization).', () => {
    const grid = new Grid(4, 4, 2, 2, true)
    const outputJSON = grid.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const grid = new Grid()
    const inputJSON = {
      params: {
        X: { value: 4 },
        Y: { value: 4 },
        XDivisions: { value: 2 },
        YDivisions: { value: 2 },
        SkipCenterLines: { value: true }
      },
      type: 'Grid',
      vertexAttributes: {}
    }
    grid.fromJSON(inputJSON)

    const newGrid = new Grid(4, 4, 2, 2, true)
    expect(grid.toJSON()).toEqual(newGrid.toJSON())
  })
})
