import { Rect } from './Rect'

describe('Rect', () => {
  it('tests default parameters', () => {
    const rect = new Rect()

    expect(rect.sizeXParam.value).toBe(1.0)
    expect(rect.sizeYParam.value).toBe(1.0)
  })

  it('sets rectangle size', () => {
    const rect = new Rect()
    rect.sizeXParam.value = 3
    rect.sizeYParam.value = 4

    expect(rect.sizeXParam.value).toBe(3)
    expect(rect.sizeYParam.value).toBe(4)
  })

  it('saves to JSON (serialization).', () => {
    const rect = new Rect(3, 4)
    const outputJSON = rect.toJSON()

    const expectedOutput = {
      params: {
        X: {
          value: 3
        },
        Y: {
          value: 4
        }
      },
      type: 'Rect',
      vertexAttributes: {}
    }

    expect(outputJSON).toEqual(expectedOutput)
  })

  it('restores from JSON (serialization).', () => {
    const rect = new Rect()
    const json = {
      params: { X: { value: 3 }, Y: { value: 4 } },
      type: 'Rect'
    }
    rect.fromJSON(json)

    expect(rect.toJSON()).toEqual(new Rect(3, 4).toJSON())
  })
})
