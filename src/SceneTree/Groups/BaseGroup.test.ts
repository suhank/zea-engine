import { BaseGroup } from './BaseGroup'
import { TreeItem } from '../TreeItem'
import { ItemSetParameter } from '../Parameters'

describe('BaseGroup', () => {
  it('is visible by default.', () => {
    const baseGroup = new BaseGroup('Foo')

    expect(baseGroup.isVisible()).toBe(true)
  })

  test('Adding members.', () => {
    const group = new BaseGroup('Foo')
    const treeItem = new TreeItem('TreeItem')
    const treeItem2 = new TreeItem('TreeItem')
    group.addItem(treeItem)
    group.addItem(treeItem2)
    const group_param = group.itemsParam
    expect(group_param.getNumItems()).toBe(2)
  })

  test('Events propagating from members to the group.', () => {
    const group = new BaseGroup('Foo')
    const parent = new TreeItem('Parent')
    const child = new TreeItem('Child')

    parent.addChild(child)

    group.addItem(parent)

    const mockFn = jest.fn()
    group.on('pointerDown', mockFn)

    const event = {
      detail: 'foo',
      propagating: true,
    }
    child.onPointerDown(event)

    expect(mockFn).toHaveBeenCalledWith(event)
  })
})
