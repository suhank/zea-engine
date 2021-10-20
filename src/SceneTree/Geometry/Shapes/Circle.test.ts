import { Circle } from './Circle'

describe('Circle', () => {
  it('tests default parameters', () => {
    const circle = new Circle()

    expect(circle.radiusParam.value).toBe(1.0)
    expect(circle.angleParam.value).toBe(Math.PI * 2)
    expect(circle.sidesParam.value).toBe(32)
  })

  it('updates parameters', () => {
    const circle = new Circle()
    circle.radiusParam.value = 2
    circle.angleParam.value = Math.PI
    circle.sidesParam.value = 64

    expect(circle.radiusParam.value).toBe(2)
    expect(circle.angleParam.value).toBe(Math.PI)
    expect(circle.sidesParam.value).toBe(64)
  })

  it('saves to JSON (serialization).', () => {
    const circle = new Circle(2, 6, Math.PI * 2)
    const outputJSON = circle.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const circle = new Circle()
    const expectedOutput = {
      params: {
        Angle: { value: 6.283185307179586 },
        Sides: {
          range: [3, 200],
          step: 1,
          value: 6
        },
        Radius: { value: 2 }
      },
      type: 'Circle',
      vertexAttributes: {}
    }
    circle.fromJSON(expectedOutput)

    const newCircle = new Circle(2, 6, Math.PI * 2)
    expect(circle.toJSON()).toEqual(newCircle.toJSON())
  })
})
