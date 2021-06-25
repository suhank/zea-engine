import { Ray } from './Ray'
import { Vec3 } from './Vec3'

describe('Ray', () => {
  it('has an initial value.', () => {
    const ray = new Ray(new Vec3(0, 0, 0), new Vec3(1, 0, 0))

    expect(ray.dir.x).toEqual(1)
    expect(ray.dir.y).toEqual(0)
    expect(ray.dir.z).toEqual(0)
  })

  it('closestPoint-1', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const point = new Vec3(2, 2, 2)
    expect(ray.closestPoint(point)).toEqual(3)
  })
  it('closestPoint-2', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const point = new Vec3(-1, 0, 0)
    expect(ray.closestPoint(point)).toEqual(0)
  })

  it('closestPointOnLineSegment-1', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(2, 2, 0)
    const p1 = new Vec3(2, -2, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([3, 0.5])
  })

  it('closestPointOnLineSegment-2', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(0, 2, 0)
    const p1 = new Vec3(0, 3, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([1, 0])
  })

  it('closestPointOnLineSegment-3', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(0, 3, 0)
    const p1 = new Vec3(0, 2, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([1, 1])
  })

  it('closestPointOnLineSegment-4', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(-2, 2, 0)
    const p1 = new Vec3(-2, 3, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([-1, 0])
  })

  it('closestPointOnLineSegment-5', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(-2, 3, 0)
    const p1 = new Vec3(-2, 2, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([-1, 1])
  })

  it('closestPointOnLineSegment-6', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(-1, 3, 0)
    const p1 = new Vec3(-1, 2, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([0, 1])
  })

  it('closestPointOnLineSegment-7', () => {
    const ray = new Ray(new Vec3(-1, 0, 0), new Vec3(1, 0, 0))
    const p0 = new Vec3(1, 0, 0)
    const p1 = new Vec3(1, 0, 0)
    expect(ray.closestPointOnLineSegment(p0, p1)).toEqual([2, 0])
  })

  it('save to JSON (serialization).', () => {
    const ray = new Ray(new Vec3(0, 0, 0), new Vec3(1, 0, 0))

    const expOutput = '{"start":{"x":0,"y":0,"z":0},"dir":{"x":1,"y":0,"z":0}}'

    expect(JSON.stringify(ray.toJSON())).toEqual(expOutput)
  })
})
