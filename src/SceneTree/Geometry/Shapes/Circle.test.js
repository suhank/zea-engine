import { Circle } from './Circle'

describe('Circle', () => {
  it('tests default parameters', () => {
    const circle = new Circle()

    expect(circle.getParameter('Radius').getValue()).toBe(1.0)
    expect(circle.getParameter('Angle').getValue()).toBe(Math.PI * 2)
    expect(circle.getParameter('NumSegments').getValue()).toBe(32)
  })

  it('updates parameters', () => {
    const circle = new Circle()
    circle.getParameter('Radius').setValue(2)
    circle.getParameter('Angle').setValue(Math.PI)
    circle.getParameter('NumSegments').setValue(64)

    expect(circle.getParameter('Radius').getValue()).toBe(2)
    expect(circle.getParameter('Angle').getValue()).toBe(Math.PI)
    expect(circle.getParameter('NumSegments').getValue()).toBe(64)
  })

  // There's an issue with flags, that are preventing parameters to be exported.
  it.skip('saves to JSON (serialization).', () => {
    const circle = new Circle(2, 6, Math.PI * 2)
    debugger
    const outputJSON = circle.toJSON()
    const expectedOutput = {
      type: 'Circle',
      numVertices: 6,
      vertexAttributes: {
        positions: {
          data: [
            1,
            0,
            0,
            0.5,
            0.8660253882408142,
            0,
            -0.5,
            0.8660253882408142,
            0,
            -1,
            1.2246468525851679e-16,
            0,
            -0.5,
            -0.8660253882408142,
            0,
            0.5,
            -0.8660253882408142,
            0,
          ],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 6,
        },
      },
      indices: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0],
      Angle: { value: Math.PI * 2 },
      NumSegments: {
        range: [3, 200],
        step: 1,
        value: 6,
      },
      Radius: { value: 1 },
    }

    expect(outputJSON).toEqual(expectedOutput)
  })

  it.skip('restores from JSON (serialization).', () => {
    const circle = new Circle()
    const expectedOutput = {
      type: 'Circle',
      numVertices: 6,
      vertexAttributes: {
        positions: {
          data: [
            1,
            0,
            0,
            0.5,
            0.8660253882408142,
            0,
            -0.5,
            0.8660253882408142,
            0,
            -1,
            1.2246468525851679e-16,
            0,
            -0.5,
            -0.8660253882408142,
            0,
            0.5,
            -0.8660253882408142,
            0,
          ],
          dataType: 'Vec3',
          defaultValue: 0,
          length: 6,
        },
      },
      indices: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0],
      Angle: { value: Math.PI * 2 },
      NumSegments: {
        range: [3, 200],
        step: 1,
        value: 6,
      },
      Radius: { value: 2 },
    }
    circle.fromJSON(expectedOutput)

    const newCircle = new Circle(2, 6, Math.PI)
    // console.log(JSON.stringify(newCircle.toJSON(), null, 2))
    expect(circle.toJSON()).toEqual(newCircle.toJSON())
  })
})
