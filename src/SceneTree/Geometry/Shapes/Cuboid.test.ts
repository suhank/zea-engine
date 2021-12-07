import { Cuboid } from './Cuboid'

describe('Cuboid', () => {
  it('tests default parameters', () => {
    const cuboid = new Cuboid()

    expect(cuboid.sizeXParam.value).toBe(1)
    expect(cuboid.sizeYParam.value).toBe(1)
    expect(cuboid.sizeZParam.value).toBe(1)
    expect(cuboid.baseZAtZeroParam.value).toBe(false)
  })

  it('updates parameters', () => {
    const cuboid = new Cuboid()
    cuboid.sizeXParam.value = 3
    cuboid.sizeYParam.value = 4
    cuboid.sizeZParam.value = 5
    cuboid.baseZAtZeroParam.value = true

    expect(cuboid.sizeXParam.value).toBe(3)
    expect(cuboid.sizeYParam.value).toBe(4)
    expect(cuboid.sizeZParam.value).toBe(5)
    expect(cuboid.baseZAtZeroParam.value).toBe(true)
  })

  it('saves to JSON (serialization).', () => {
    const cuboid = new Cuboid(4, 6, 4)
    const outputJSON = cuboid.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const cuboid = new Cuboid(4, 6, 4)
    const inputJSON = {
      params: {
        BaseZAtZero: {
          value: false
        },
        X: {
          value: 4
        },
        Y: {
          value: 6
        },
        Z: {
          value: 4
        }
      },
      type: 'Cuboid',
      vertexAttributes: {}
    }
    cuboid.fromJSON(inputJSON)

    const newCuboid = new Cuboid(4, 6, 4)
    expect(cuboid.toJSON()).toEqual(newCuboid.toJSON())
  })
})
