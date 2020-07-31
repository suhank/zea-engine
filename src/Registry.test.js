import Registry from './Registry'
import { Vec3 } from './Math/Vec3'

describe('Registry', () => {
  it('registers classes', () => {
    Registry.register('Foo', Float32Array)

    const result = Registry.getBlueprint('Foo')
    expect(result).toBe(Float32Array)
  })

  it('registers types', () => {
    const UInt32 = 4
    Registry.register('UInt32', UInt32)

    const result = Registry.getBlueprint('UInt32')
    expect(result).toBe(UInt32)
  })

  it('returns blueprint name for class', () => {
    Registry.register('FloatArray', Float64Array)

    const result = Registry.getBlueprintName(new Float64Array(1, 2))
    expect(result).toEqual('FloatArray')
  })

  it('returns blueprint name for type', () => {
    const UInt64 = 8
    Registry.register('UInt64', UInt64)

    const result = Registry.getBlueprintName(UInt64)
    expect(result).toEqual('UInt64')
  })

  it('instantiates the class', () => {
    Registry.register('Vec3', Vec3)

    const result = Registry.constructClass('Vec3', 3, 4, 5)
    expect(result).toEqual(new Vec3(3, 4, 5))
  })
})
