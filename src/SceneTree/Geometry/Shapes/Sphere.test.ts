import { Sphere } from './Sphere'

describe('Sphere', () => {
  test('test default parameters.', () => {
    const sphere = new Sphere()

    expect(sphere.radiusParam.value).toBe(1.0)
    expect(sphere.sidesParam.value).toBe(12)
    expect(sphere.loopsParam.value).toBe(12)
  })

  test('test update parameters.', () => {
    const sphere = new Sphere()
    sphere.radiusParam.value = 2.6
    sphere.sidesParam.value = 24
    sphere.loopsParam.value = 30

    expect(sphere.radiusParam.value).toBe(2.6)
    expect(sphere.sidesParam.value).toBe(24)
    expect(sphere.loopsParam.value).toBe(30)
  })

  it('saves to JSON (serialization).', () => {
    const sphere = new Sphere(2.6, 5, 5)
    const outputJSON = sphere.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const sphere = new Sphere()
    const inputJSON = {
      params: {
        Loops: {
          range: [3, 200],
          step: 1,
          value: 5
        },
        Radius: {
          value: 2.6
        },
        Sides: {
          range: [3, 200],
          step: 1,
          value: 5
        }
      },
      type: 'Sphere',
      vertexAttributes: {}
    }
    sphere.fromJSON(inputJSON)

    expect(sphere.toJSON()).toEqual(new Sphere(2.6, 5, 5).toJSON())
  })
})
