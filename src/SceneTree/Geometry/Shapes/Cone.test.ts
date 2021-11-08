import { Cone } from './Cone'

describe('Cone', () => {
  it('tests default parameters', () => {
    const cone = new Cone()

    expect(cone.radiusParam.value).toBe(0.5)
    expect(cone.heightParam.value).toBe(1)
    expect(cone.detailParam.value).toBe(32)
    expect(cone.capParam.value).toBe(true)
  })

  it('updates parameters', () => {
    const cone = new Cone()
    cone.radiusParam.value = 1
    cone.heightParam.value = 2
    cone.detailParam.value = 16
    cone.capParam.value = false

    expect(cone.radiusParam.value).toBe(1)
    expect(cone.heightParam.value).toBe(2)
    expect(cone.detailParam.value).toBe(16)
    expect(cone.capParam.value).toBe(false)
  })

  it('saves to JSON (serialization).', () => {
    const cone = new Cone(2, 5, 8, true)
    const outputJSON = cone.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const cone = new Cone()
    const expectedOutput = {
      params: {
        Cap: {
          value: true
        },
        Detail: {
          range: [3, 200],
          step: 1,
          value: 8
        },
        Height: {
          value: 5
        },
        Radius: {
          value: 2
        }
      },
      type: 'Cone',
      vertexAttributes: {}
    }

    cone.fromJSON(expectedOutput)

    const newCone = new Cone(2, 5, 8, true)
    expect(cone.toJSON()).toEqual(newCone.toJSON())
  })
})
