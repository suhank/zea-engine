import { GeometryParameter } from './GeometryParameter'
import { Cylinder } from '../Geometry/Shapes/Cylinder'
import { Cuboid } from '../Geometry/Shapes/Cuboid'
import { GeomItem } from '../GeomItem'
import { BaseGeom } from '..'

describe('GeometryParameter', () => {
  it('has an initial value.', () => {
    const geometryParameter = new GeometryParameter()

    expect(geometryParameter.value).toBeUndefined()
  })

  it('checks value type.', () => {
    const geometryParameter = new GeometryParameter()

    expect(geometryParameter.getDataType()).toEqual('Geometry')
  })

  // TODO: geomItem as arg doesn't work currently
  // it('sets value.', () => {
  //   const geometryParameter = new GeometryParameter()
  //   const cylinder = new Cylinder(5, 0.2, 32)
  //   const geomItem = new GeomItem('gear', cylinder)
  //   geometryParameter.value =(geomItem)

  //   expect(geometryParameter.value).toEqual(geomItem)
  // })

  it('replaces a value.', () => {
    const geometryParameter = new GeometryParameter('Foo', new Cylinder())

    const cuboid = new Cuboid()
    geometryParameter.value = cuboid

    expect(geometryParameter.value).toEqual(cuboid)
  })

  it('propagate events.', () => {
    const geometryParameter = new GeometryParameter('Foo')

    const cuboid = new Cuboid()
    cuboid.getBoundingBox() // force a clean.
    geometryParameter.value = cuboid

    let changed = false
    geometryParameter.on('boundingBoxChanged', () => {
      changed = true
    })

    cuboid.sizeXParam.value = 3

    expect(changed).toEqual(true)
  })

  /* it('saves to JSON (serialization).', () => {
    const geometryParameter = new GeometryParameter()
    const cylinder = new Cylinder(5, 0.2, 32)
    const geomItem = new GeomItem('gear', cylinder)
    geometryParameter.value =(geomItem)
    console.log(geometryParameter.toJSON())

    expect(geometryParameter.toJSON()).toEqual(false)
  })

  it('loads from JSON (serialization).', () => {
    const geometryParameter = new GeometryParameter()
    const geometry = { value: { a: 1, b: 0, g: 0, r: 1 } }
    geometryParameter.fromJSON(geometry)

    expect(geometryParameter.value).toEqual(new Geometry(1.0, 0.0, 0.0))
  })*/

  it.skip('clones parameter object', () => {
    const parameter = new GeometryParameter('TestParameter')
    const cylinder = new Cylinder(5, 0.2, 32)
    const geomItem = new GeomItem('gear', cylinder)
    parameter.value = <BaseGeom>(<unknown>geomItem)

    const parameter2 = parameter.clone()

    expect(parameter.toJSON()).toBe(parameter2.toJSON())
  })
})
