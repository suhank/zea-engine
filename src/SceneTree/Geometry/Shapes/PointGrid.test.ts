import { PointGrid } from './PointGrid'

describe('PointGrid', () => {
  it('tests default parameters', () => {
    const pointGrid = new PointGrid()

    expect(pointGrid.sizeXParam.value).toBe(1)
    expect(pointGrid.sizeYParam.value).toBe(1)
    expect(pointGrid.divisionsXParam.value).toBe(1)
    expect(pointGrid.divisionsYParam.value).toBe(1)
  })

  it('updates parameters', () => {
    const pointGrid = new PointGrid()

    pointGrid.sizeXParam.value = 5
    pointGrid.sizeYParam.value = 5
    pointGrid.divisionsXParam.value = 10
    pointGrid.divisionsYParam.value = 10

    expect(pointGrid.sizeXParam.value).toBe(5)
    expect(pointGrid.sizeYParam.value).toBe(5)
    expect(pointGrid.divisionsXParam.value).toBe(10)
    expect(pointGrid.divisionsYParam.value).toBe(10)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it('saves to JSON (serialization).', () => {
    const pointGrid = new PointGrid(3, 3, 6, 6, true)
    const outputJSON = pointGrid.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const pointGrid = new PointGrid()
    const inputJSON = {
      params: {
        X: {
          value: 3
        },
        XDivisions: {
          value: 6
        },
        Y: {
          value: 3
        },
        YDivisions: {
          value: 6
        }
      },
      type: 'PointGrid',
      vertexAttributes: {}
    }
    pointGrid.fromJSON(inputJSON)

    const newPointGrid = new PointGrid(3, 3, 6, 6, true)
    expect(pointGrid.toJSON()).toEqual(newPointGrid.toJSON())
  })
})
