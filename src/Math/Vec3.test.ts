import { Vec3 } from './Vec3'

describe('Vec3', () => {
  it('has an initial value.', () => {
    const vec3 = new Vec3(1, 2, 3)

    expect(vec3.x).toEqual(1)

    expect(vec3.y).toEqual(2)

    expect(vec3.z).toEqual(3)
  })

  it('save to JSON (serialization).', () => {
    const vec3 = new Vec3(1, 2, 3)

    const expOutput = '{"x":1,"y":2,"z":3}'

    expect(JSON.stringify(vec3.toJSON())).toEqual(expOutput)
  })

  it('check the lenght of the vector.', () => {
    const vec3 = new Vec3(1, 2, 3)

    expect(vec3.length()).toBeCloseTo(3.741)
  })

  it('creates Vec3 from buffer', () => {
    const float32Array = Float32Array.of(8, 5, 6)
    const vec3 = Vec3.createFromBuffer(float32Array.buffer, 0)

    expect(vec3).toEqual(new Vec3(8, 5, 6))
  })
})
