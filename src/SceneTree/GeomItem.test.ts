import { TreeItem } from './TreeItem'
import { GeomItem } from './GeomItem'
import { Vec3, Xfo, Color, Mat4, Quat } from '../Math'
import { Material } from './Material'
import { Sphere } from './Geometry/Shapes/Sphere'
import '../Renderer/Shaders/SimpleSurfaceShader'
import Fixtures from './_fixtures_/GeomItem.fixture'

describe('GeomItem', () => {
  it('tests default parameters', () => {
    const geoItem = new GeomItem()

    expect(geoItem.geomParam.value).toBeUndefined()
    expect(geoItem.materialParam.value).toBeUndefined()
    expect(geoItem.geomOffsetXfoParam.value).toEqual(new Xfo())
    expect(geoItem.geomMatParam.value).toEqual(new Mat4())
  })

  it('updates parameters', () => {
    const geoItem = new GeomItem()
    geoItem.geomParam.value = new Sphere(1.4, 13)
    expect(geoItem.geomParam.value.toJSON()).toEqual(new Sphere(1.4, 13).toJSON())

    const standardMaterial = new Material('myMaterial', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').value = new Color(89 / 255, 182 / 255, 92 / 255)
    geoItem.materialParam.value = standardMaterial
    expect(geoItem.materialParam.value).toEqual(standardMaterial)

    const xfo = new Xfo(new Vec3(1, 2, 3), new Quat(0, 0, 1, 0), new Vec3(8, 9, 10))
    geoItem.geomOffsetXfoParam.value = xfo
    expect(geoItem.geomOffsetXfoParam.value.toJSON()).toEqual(xfo.toJSON())

    // This is computed, so the returned value is different
    const mat4 = new Mat4(-8, 0, 0, 0, 0, -9, 0, 0, 0, 0, 10, 0, 1, 2, 3, 1)
    geoItem.geomMatParam.value = mat4
    expect(geoItem.geomMatParam.value).toEqual(mat4)
  })

  test('test GeomOffsetXfo and GeomMat.', () => {
    const parent = new TreeItem('Parent')
    const child = new GeomItem('Child')
    parent.addChild(child)

    parent.localXfoParam.value = new Xfo(new Vec3(5, 2, 0))
    child.localXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    child.geomOffsetXfoParam.value = new Xfo(new Vec3(2, 4, 0))

    let correctXfo = new Xfo(new Vec3(7, 6, 0), new Quat(0, 0, 0, 1))

    // {
    //   ori: { w: 1, x: 0, y: 0, z: 0 },
    //   tr: { x: 7, y: 6, z: 0 }
    // }
    expect(child.globalXfoParam.value.approxEqual(correctXfo, 0.001)).toBe(true)

    expect(child.geomMatParam.value.asArray()).toEqual(Float32Array.of(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 9, 10, 0, 1))
  })

  test('Saving to JSON (serialization).', () => {
    const standardMaterial = new Material('myMaterial', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').value = new Color(89 / 255, 182 / 255, 92 / 255)

    const geomItem = new GeomItem('Item', new Sphere(1.4, 13), standardMaterial)
    geomItem.localXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    geomItem.geomOffsetXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    // To trigger a new calculation of the BBox we need to request its value
    geomItem.boundingBoxParam.value
    expect(geomItem.toJSON()).toMatchSnapshot()
  })

  it('loads from JSON (serialization).', () => {
    const geomItem = new GeomItem('Item')
    geomItem.fromJSON(Fixtures.fromJSON, { numGeomItems: 0 })

    const standardMaterial = new Material('myMaterial', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').value = new Color(89 / 255, 182 / 255, 92 / 255)

    const defaultItem = new GeomItem('Item', new Sphere(1.4, 13), standardMaterial)
    defaultItem.localXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    defaultItem.geomOffsetXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    // To trigger a new calculation of the BBox we need to request its value
    defaultItem.boundingBoxParam.value

    expect(geomItem.toJSON()).toEqual(defaultItem.toJSON())
  })

  it('clones GeomItem', () => {
    const standardMaterial = new Material('myMaterial', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').value = new Color(89 / 255, 182 / 255, 92 / 255)

    const item = new GeomItem('Item', new Sphere(1.4, 13), standardMaterial)
    item.localXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    item.geomOffsetXfoParam.value = new Xfo(new Vec3(2, 4, 0))

    const clonedItem = item.clone()
    expect(item.toJSON()).toEqual(clonedItem.toJSON())
  })

  it('copies from another GeomItem', () => {
    const standardMaterial = new Material('myMaterial', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').value = new Color(89 / 255, 182 / 255, 92 / 255)

    const item = new GeomItem('Item', new Sphere(1.4, 13), standardMaterial)
    item.localXfoParam.value = new Xfo(new Vec3(2, 4, 0))
    item.geomOffsetXfoParam.value = new Xfo(new Vec3(2, 4, 0))

    const copiedItem = new GeomItem()
    copiedItem.copyFrom(item)
    expect(item.toJSON()).toEqual(copiedItem.toJSON())
  })
})
