import { Cylinder } from './Cylinder'

describe('Cylinder', () => {
  it('tests default parameters', () => {
    const cylinder = new Cylinder()

    expect(cylinder.getParameter('Radius').getValue()).toBe(0.5)
    expect(cylinder.getParameter('Height').getValue()).toBe(1)
    expect(cylinder.getParameter('Sides').getValue()).toBe(32)
    expect(cylinder.getParameter('Loops').getValue()).toBe(2)
    expect(cylinder.getParameter('Caps').getValue()).toBeTruthy()
    expect(cylinder.getParameter('BaseZAtZero').getValue()).toBeFalsy()
  })

  it.skip('updates parameters', () => {
    const cylinder = new Cylinder()

    cylinder.getParameter('Sides').setValue(16)
    expect(cylinder.getParameter('Sides').getValue()).toBe(16)

    cylinder.getParameter('Radius').setValue(3)
    expect(cylinder.getParameter('Radius').getValue()).toBe(3)

    cylinder.getParameter('Height').setValue(6)
    expect(cylinder.getParameter('Height').getValue()).toBe(6)

    cylinder.getParameter('Loops').setValue(3)
    expect(cylinder.getParameter('Loops').getValue()).toBe(3)

    cylinder.getParameter('Caps').setValue(false)
    expect(cylinder.getParameter('Caps').getValue()).toBeFalsy()

    cylinder.getParameter('BaseZAtZero').setValue(true)
    expect(cylinder.getParameter('BaseZAtZero').getValue()).toBeTruthy()
  })

  it.skip('saves to JSON (serialization).', () => {
    const cylinder = new Cylinder(3, 6, 8, 3)
    const outputJSON = cylinder.toJSON()
    console.log(JSON.stringify(outputJSON))

    expect(outputJSON).toBe({})
  })

  it.skip('restores from JSON (serialization).', () => {
    const cylinder = new Cylinder(4, 6, 4)
    const inputStr =
      '{"params":{"X":{"value":4},"Y":{"value":6},"Z":{"value":4},"BaseZAtZero":{"value":false}},"type":"Cylinder","numVertices":8,"vertexAttributes":{"positions":{"data":[2,-3,2,2,3,2,-2,3,2,-2,-3,2,2,-3,-2,2,3,-2,-2,3,-2,-2,-3,-2],"dataType":"Vec3","defaultValue":0,"length":8,"splits":{},"splitValues":[]},"texCoords":{"data":[0,0,1,0,1,1,0,1,0,1,1,1,1,0,0,0],"dataType":"Vec2","defaultValue":1.7976931348623157e+308,"length":8,"splits":{"0":{"2":1},"1":{"2":0},"2":{"3":5,"5":10},"3":{"3":4,"4":8},"4":{"2":2},"5":{"2":3},"6":{"3":6,"5":11},"7":{"3":7,"4":9}},"splitValues":[{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":0},{"x":0,"y":1}]},"normals":{"data":[0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1],"dataType":"Vec3","defaultValue":1.7976931348623157e+308,"length":8,"splits":{"0":{"2":1,"4":8},"1":{"2":0,"5":13},"2":{"3":5,"5":12},"3":{"3":4,"4":9},"4":{"2":2,"4":11},"5":{"2":3,"5":14},"6":{"3":6,"5":15},"7":{"3":7,"4":10}},"splitValues":[{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0}]}},"faceCounts":[0,6],"faceVertexIndices":[0,1,2,3,7,6,5,4,1,0,4,5,3,2,6,7,0,3,7,4,2,1,5,6]}'
    cylinder.fromJSON(JSON.parse(inputStr))

    const newCylinder = new Cylinder(4, 6, 4)
    expect(cylinder.toJSON()).toEqual(newCylinder.toJSON())
  })
})
