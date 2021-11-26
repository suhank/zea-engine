import { Disc } from './Disc'

describe('Disc', () => {
  it('tests default parameters', () => {
    const disc = new Disc()

    expect(disc.radiusParam.value).toBe(0.5)
    expect(disc.sidesParam.value).toBe(32)
  })

  it('updates parameters', () => {
    const disc = new Disc()
    disc.radiusParam.value = 4
    disc.sidesParam.value = 16

    expect(disc.radiusParam.value).toBe(4)
    expect(disc.sidesParam.value).toBe(16)
  })

  it('saves to JSON (serialization).', () => {
    const disc = new Disc(3, 16)
    const outputJSON = disc.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const disc = new Disc()
    const jsonStr = {
      params: {
        Radius: {
          value: 3
        },
        Sides: {
          value: 16,
          range: [3, 200],
          step: 1
        }
      },
      type: 'Disc',
      vertexAttributes: {}
    }
    disc.fromJSON(jsonStr)

    const newDisc = new Disc(3, 16)
    expect(disc.toJSON()).toEqual(newDisc.toJSON())
  })
})
