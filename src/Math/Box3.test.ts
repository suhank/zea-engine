import { Box3 } from './Box3'
import { Vec3 } from './Vec3'

describe('Box3', () => {
  it('has an initial value.', () => {
    const box3 = new Box3()

    expect(box3.p0).toEqual(new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY))
    expect(box3.p1).toEqual(new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY))
  })

  it('save to JSON (serialization).', () => {
    const p0 = new Vec3(1, 4, 1)
    const p1 = new Vec3(3, 6, 3)
    const box3 = new Box3(p0, p1)

    const expOutput = '{"p0":{"x":1,"y":4,"z":1},"p1":{"x":3,"y":6,"z":3}}'
    expect(JSON.stringify(box3.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const input = '{"p0":{"x":1,"y":4,"z":1},"p1":{"x":3,"y":6,"z":3}}'
    const box3 = new Box3()
    box3.fromJSON(JSON.parse(input))

    const p0 = new Vec3(1, 4, 1)
    const p1 = new Vec3(3, 6, 3)
    const box3Expected = new Box3(p0, p1)

    expect(box3).toEqual(box3Expected)
  })
})
