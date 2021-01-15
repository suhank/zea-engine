import { Box2 } from './Box2'
import { Vec2 } from './Vec2'

describe('Box2', () => {
  it('has an initial value.', () => {
    const box2 = new Box2()

    expect(box2.p0).toEqual(new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY))
    expect(box2.p1).toEqual(new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY))
  })

  it('save to JSON (serialization).', () => {
    const p0 = new Vec2(1, 4)
    const p1 = new Vec2(3, 6)
    const box2 = new Box2(p0, p1)

    const expOutput = '{"p0":{"x":1,"y":4},"p1":{"x":3,"y":6}}'
    expect(JSON.stringify(box2.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const input = '{"p0":{"x":1,"y":4},"p1":{"x":3,"y":6}}'
    const box2 = new Box2()
    box2.fromJSON(JSON.parse(input))

    const p0 = new Vec2(1, 4)
    const p1 = new Vec2(3, 6)
    const box2Expected = new Box2(p0, p1)

    expect(box2).toEqual(box2Expected)
  })
})
