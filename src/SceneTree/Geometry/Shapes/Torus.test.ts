import { Torus } from './Torus'

describe('Torus', () => {
  test('test default parameters.', () => {
    const torus = new Torus()

    expect(torus.innerRadiusParam.value).toBe(0.5)
    expect(torus.outerRadiusParam.value).toBe(3)
    expect(torus.detailParam.value).toBe(32)
  })

  test('test update parameters.', () => {
    const torus = new Torus()
    torus.innerRadiusParam.value = 3
    torus.outerRadiusParam.value = 5
    torus.detailParam.value = 16

    expect(torus.innerRadiusParam.value).toBe(3)
    expect(torus.outerRadiusParam.value).toBe(5)
    expect(torus.detailParam.value).toBe(16)
  })

  it('saves to JSON (serialization).', () => {
    const torus = new Torus(3, 5, 8)
    const outputJSON = torus.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const torus = new Torus()
    const inputJSON = {
      params: {
        Detail: {
          range: [3, 200],
          step: 1,
          value: 8
        },
        InnerRadius: {
          value: 3
        },
        OuterRadius: {
          value: 5
        }
      },
      type: 'Torus',
      vertexAttributes: {}
    }
    torus.fromJSON(inputJSON)

    expect(torus.toJSON()).toEqual(new Torus(3, 5, 8).toJSON())
  })
})
