import { Cylinder } from './Cylinder'

describe('Cylinder', () => {
  it('tests default parameters', () => {
    const cylinder = new Cylinder()

    expect(cylinder.radiusParam.value).toBe(0.5)
    expect(cylinder.heightParam.value).toBe(1)
    expect(cylinder.sidesParam.value).toBe(32)
    expect(cylinder.loopsParam.value).toBe(2)
    expect(cylinder.capsParam.value).toBeTruthy()
    expect(cylinder.baseZAtZeroParam.value).toBeFalsy()
  })

  it.skip('updates parameters', () => {
    const cylinder = new Cylinder()

    cylinder.sidesParam.value = 16
    expect(cylinder.sidesParam.value).toBe(16)

    cylinder.radiusParam.value = 3
    expect(cylinder.radiusParam.value).toBe(3)

    cylinder.heightParam.value = 6
    expect(cylinder.heightParam.value).toBe(6)

    cylinder.loopsParam.value = 3
    expect(cylinder.loopsParam.value).toBe(3)

    cylinder.capsParam.value = false
    expect(cylinder.capsParam.value).toBeFalsy()

    cylinder.baseZAtZeroParam.value = true
    expect(cylinder.baseZAtZeroParam.value).toBeTruthy()
  })

  it('saves to JSON (serialization).', () => {
    const cylinder = new Cylinder(5, 0.2, 32)
    const outputJSON = cylinder.toJSON()

    expect(outputJSON).toEqual({
      params: {
        BaseZAtZero: {
          value: false
        },
        Caps: {
          value: true
        },
        Height: {
          value: 0.2
        },
        Loops: {
          range: [1, 200],
          step: 1,
          value: 2
        },
        Radius: {
          value: 5
        },
        Sides: {
          range: [3, 200],
          step: 1,
          value: 32
        }
      },
      type: 'Cylinder',
      vertexAttributes: {}
    })
  })

  it('restores from JSON (serialization).', () => {
    const cylinder = new Cylinder()
    const inputJSON = {
      params: {
        BaseZAtZero: {
          value: false
        },
        Caps: {
          value: true
        },
        Height: {
          value: 0.2
        },
        Loops: {
          range: [1, 200],
          step: 1,
          value: 2
        },
        Radius: {
          value: 5
        },
        Sides: {
          range: [3, 200],
          step: 1,
          value: 32
        }
      },
      type: 'Cylinder',
      vertexAttributes: {}
    }
    cylinder.fromJSON(inputJSON)

    const newCylinder = new Cylinder(5, 0.2, 32)
    expect(cylinder.toJSON()).toEqual(newCylinder.toJSON())
  })
})
