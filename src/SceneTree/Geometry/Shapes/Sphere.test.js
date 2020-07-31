import { Sphere } from './Sphere'
import { Vec3 } from '../../../Math'

describe('Sphere', () => {
  test('test default parameters.', () => {
    const sphere = new Sphere()
    expect(sphere.getNumFaces()).toBe(168)
    expect(sphere.getNumVertices()).toBe(146)
  })

  test('test default parameters.', () => {
    const sphere = new Sphere()

    sphere.getParameter('radius').setValue(2.6)
    sphere.getParameter('sides').setValue(24)
    sphere.getParameter('loops').setValue(30)
    expect(sphere.getNumFaces()).toBe(768)
    expect(sphere.getNumVertices()).toBe(722)
  })

  test.skip('Saving to JSON (serialization).', () => {
    const sphere = new Sphere()
    const expOutput = '{"x":1,"y":2,"z":3}'

    // console.log(parent.toJSON())
  })
})
