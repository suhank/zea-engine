import { Cuboid } from './Cuboid'

describe('Cuboid', () => {
  it('tests default parameters', () => {
    const cuboid = new Cuboid()

    expect(cuboid.getParameter('X').getValue()).toBe(1)
    expect(cuboid.getParameter('Y').getValue()).toBe(1)
    expect(cuboid.getParameter('Z').getValue()).toBe(1)
    expect(cuboid.getParameter('BaseZAtZero').getValue()).toBe(false)
  })

  it('updates parameters', () => {
    const cuboid = new Cuboid()
    cuboid.getParameter('X').setValue(3)
    cuboid.getParameter('Y').setValue(4)
    cuboid.getParameter('Z').setValue(5)
    cuboid.getParameter('BaseZAtZero').setValue(true)

    expect(cuboid.getParameter('X').getValue()).toBe(3)
    expect(cuboid.getParameter('Y').getValue()).toBe(4)
    expect(cuboid.getParameter('Z').getValue()).toBe(5)
    expect(cuboid.getParameter('BaseZAtZero').getValue()).toBe(true)
  })

  it('saves to JSON (serialization).', () => {
    const cuboid = new Cuboid(4, 6, 4)
    const outputJSON = cuboid.toJSON()

    expect(outputJSON).toMatchSnapshot()
  })

  it('restores from JSON (serialization).', () => {
    const cuboid = new Cuboid(4, 6, 4)
    const inputStr =
      '{"params":{"X":{"value":4},"Y":{"value":6},"Z":{"value":4},"BaseZAtZero":{"value":false}},"type":"Cuboid","numVertices":8,"vertexAttributes":{"positions":{"data":[2,-3,2,2,3,2,-2,3,2,-2,-3,2,2,-3,-2,2,3,-2,-2,3,-2,-2,-3,-2],"dataType":"Vec3","defaultValue":0,"length":8,"splits":{},"splitValues":[]},"texCoords":{"data":[0,0,1,0,1,1,0,1,0,1,1,1,1,0,0,0],"dataType":"Vec2","defaultValue":1.7976931348623157e+308,"length":8,"splits":{"0":{"2":1},"1":{"2":0},"2":{"3":5,"5":10},"3":{"3":4,"4":8},"4":{"2":2},"5":{"2":3},"6":{"3":6,"5":11},"7":{"3":7,"4":9}},"splitValues":[{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1},{"x":0,"y":0},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":1},{"x":1,"y":0},{"x":1,"y":1},{"x":0,"y":0},{"x":0,"y":1}]},"normals":{"data":[0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1],"dataType":"Vec3","defaultValue":1.7976931348623157e+308,"length":8,"splits":{"0":{"2":1,"4":8},"1":{"2":0,"5":13},"2":{"3":5,"5":12},"3":{"3":4,"4":9},"4":{"2":2,"4":11},"5":{"2":3,"5":14},"6":{"3":6,"5":15},"7":{"3":7,"4":10}},"splitValues":[{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":-1,"y":0,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0},{"x":0,"y":-1,"z":0}]}},"faceCounts":[0,6],"faceVertexIndices":[0,1,2,3,7,6,5,4,1,0,4,5,3,2,6,7,0,3,7,4,2,1,5,6]}'
    cuboid.fromJSON(JSON.parse(inputStr))

    const newCuboid = new Cuboid(4, 6, 4)
    expect(cuboid.toJSON()).toEqual(newCuboid.toJSON())
  })
})
