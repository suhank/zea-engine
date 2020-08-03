import { Rect } from './Rect'

describe.skip('Rect', () => {
  it('tests default parameters', () => {
    const rect = new Rect()

    expect(rect.getParameter('x').getValue()).toBe(1.0)
    expect(rect.getParameter('y').getValue()).toBe(1.0)
  })

  it('sets rectangle size', () => {
    const rect = new Rect()
    rect.setSize(3, 4)

    expect(rect.getParameter('x').getValue()).toBe(3)
    expect(rect.getParameter('y').getValue()).toBe(4)
  })

  it('saves to JSON (serialization).', () => {
    const rect = new Rect(3, 4)

    const outputJSON = rect.toJSON()
    const expectedOutput = {
      indices: [0, 1, 1, 2, 2, 3, 3, 0],
      numVertices: 4,
      type: 'Rect',
      vertexAttributes: {
        positions: {
          data: [-1.5, -2, 0, 1.5, -2, 0, 1.5, 2, 0, -1.5, 2, 0],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 4,
        },
      },
      x: { value: 3 },
      y: { value: 4 },
    }
    expect(outputJSON).toEqual(expectedOutput)
  })

  it('restores from JSON (serialization).', () => {
    const rect = new Rect()
    const expectedOutput = {
      indices: [0, 1, 1, 2, 2, 3, 3, 0],
      numVertices: 4,
      type: 'Rect',
      vertexAttributes: {
        positions: {
          data: [-1.5, -2, 0, 1.5, -2, 0, 1.5, 2, 0, -1.5, 2, 0],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 4,
        },
      },
      x: { value: 3 },
      y: { value: 4 },
    }
    rect.fromJSON(expectedOutput)

    expect(rect.toJSON()).toEqual(new Rect(3, 4).toJSON())
  })
})
