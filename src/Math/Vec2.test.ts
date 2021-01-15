import { Vec2 } from './Vec2'

describe('Vec2', () => {
  it('has an initial value.', () => {
    const vec2 = new Vec2(1, 2)

    expect(vec2.x).toEqual(1)

    expect(vec2.y).toEqual(2)
  })

  it('save to JSON (serialization).', () => {
    const vec2 = new Vec2(1, 2)

    const expOutput = '{"x":1,"y":2}'

    expect(JSON.stringify(vec2.toJSON())).toEqual(expOutput)
  })

  it('check the length of the vector.', () => {
    const vec2 = new Vec2(1, 2)

    expect(vec2.length()).toBeCloseTo(2.236)
  })

  it('creates Vec2 from buffer', () => {
    const float32Array = Float32Array.of(8, 5)
    const vec2 = Vec2.createFromBuffer(float32Array.buffer, 0)

    expect(vec2).toEqual(new Vec2(8, 5))
  })
})
