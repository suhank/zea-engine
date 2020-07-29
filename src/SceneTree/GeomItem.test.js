import { TreeItem } from './TreeItem'
import { GeomItem } from './GeomItem'
import { Vec3, Xfo, Quat } from '../Math'

describe('GeomItem', () => {
  test('test GeomOffsetXfo and GeomMat.', () => {
    const parent = new TreeItem('Parent')
    const child = new GeomItem('Child')
    parent.addChild(child)

    parent.getParameter('LocalXfo').setValue(new Xfo(new Vec3(5, 2, 0)))
    child.getParameter('LocalXfo').setValue(new Xfo(new Vec3(2, 4, 0)))
    child.getParameter('GeomOffsetXfo').setValue(new Xfo(new Vec3(2, 4, 0)))

    expect(
      child
        .getParameter('GlobalXfo')
        .getValue()
        .approxEqual(
          {
            ori: { w: 1, x: 0, y: 0, z: 0 },
            tr: { x: 7, y: 6, z: 0 },
          },
          0.001
        )
    ).toBe(true)

    expect(child.getParameter('GeomMat').getValue().asArray()).toEqual(
      Float32Array.of(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 9, 10, 0, 1)
    )
  })

  test('Saving to JSON (serialization).', () => {
    const parent = new GeomItem('Parent')
    const child = new GeomItem('Child')

    const expOutput = '{"x":1,"y":2,"z":3}'

    // console.log(parent.toJSON())
  })
})
