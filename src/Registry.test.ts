import { Registry } from './Registry'
import { BaseItem } from './SceneTree/BaseItem'

class Foo extends BaseItem {}
class Bar extends Foo {}

describe('Registry', () => {
  beforeEach(() => Registry.flush())

  it('registers a new class/type', () => {
    Registry.register('Foo', Foo)
    const classResult = Registry.getClassDefinition('Foo')
    expect(classResult).toBe(Foo)
  })

  it('instantiates a new class/type', () => {
    Registry.register('Foo', Foo)
    Registry.register('Bar', Bar)
    const foo = Registry.constructClass('Foo')
    expect(foo instanceof Foo).toBe(true)

    const bar = Registry.constructClass('Bar')
    expect(bar instanceof Foo).toBe(true)
    expect(bar instanceof Bar).toBe(true)
  })

  // test('throws on duplicated class/type name registration', () => {
  //   Registry.register('Foo', Foo)
  //   expect(() => Registry.register('Foo', Bar)).toThrow()
  // })

  it('returns blueprint name for class/type', () => {
    Registry.register('Foo', Foo)

    const foo = new Foo()
    expect(foo.getClassName()).toEqual('Foo')
  })

  it('throws on unregistered class construction', () => {
    expect(() => Registry.constructClass('Unregistered')).toThrow()
  })
})
