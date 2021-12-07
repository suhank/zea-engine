import { LinesCuboid } from './LinesCuboid'

describe('LinesCuboid', () => {
  it('tests default parameters', () => {
    const linesCuboid = new LinesCuboid()

    expect(linesCuboid.sizeXParam.value).toBe(1)
    expect(linesCuboid.sizeYParam.value).toBe(1)
    expect(linesCuboid.sizeZParam.value).toBe(1)
    expect(linesCuboid.baseZAtZeroParam.value).toBeFalsy()
  })

  it('updates parameters', () => {
    const linesCuboid = new LinesCuboid()
    linesCuboid.sizeXParam.value = 3
    linesCuboid.sizeYParam.value = 3
    linesCuboid.sizeZParam.value = 3
    linesCuboid.baseZAtZeroParam.value = true

    expect(linesCuboid.sizeXParam.value).toBe(3)
    expect(linesCuboid.sizeYParam.value).toBe(3)
    expect(linesCuboid.sizeZParam.value).toBe(3)
    expect(linesCuboid.baseZAtZeroParam.value).toBeTruthy()
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it('saves to JSON (serialization).', () => {
    const linesCuboid = new LinesCuboid(2, 2, 2, true)
    const outputJSON = linesCuboid.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const linesCuboid = new LinesCuboid()
    const inputJSON = {
      params: { X: { value: 2 }, Y: { value: 2 }, Z: { value: 2 }, BaseZAtZero: { value: true } },
      type: 'LinesCuboid',
      vertexAttributes: {}
    }
    linesCuboid.fromJSON(inputJSON)

    const newLinesCuboid = new LinesCuboid(2, 2, 2, true)
    expect(linesCuboid.toJSON()).toEqual(newLinesCuboid.toJSON())
  })
})
