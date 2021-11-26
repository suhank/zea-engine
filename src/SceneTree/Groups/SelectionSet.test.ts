import { SelectionSet } from './SelectionSet'
import { TreeItem } from '../TreeItem'
import { Color } from '../../Math'

describe('SelectionSet', () => {
  it('is visible by default.', () => {
    const group = new SelectionSet('Foo')

    expect(group.isVisible()).toBe(true)
  })

  test('Changing members visibility.', () => {
    const group = new SelectionSet('Foo')
    const treeItem = new TreeItem('TreeItem')

    group.addItem(treeItem)

    expect(treeItem.isVisible()).toBe(true)

    group.setVisible(false)

    expect(treeItem.isVisible()).toBe(false)
  })

  test('Changing Tree visibility.', () => {
    const group = new SelectionSet('Foo')
    const parent = new TreeItem('Parent')
    const child = new TreeItem('Child')

    parent.addChild(child)

    group.addItem(parent)
    group.setVisible(false)

    expect(child.isVisible()).toBe(false)
  })

  test('Adding Highlight to items.', () => {
    const group = new SelectionSet('Foo')
    const parent = new TreeItem('Parent')
    const child = new TreeItem('Child')

    parent.addChild(child)

    group.addItem(parent)
    group.highlightedParam.value = true
    group.highlightColorParam.value = new Color(1, 0, 0)
    group.highlightFillParam.value = 0.5

    const expHighlight = new Color(1, 0, 0, 0.5)
    expect(child.getHighlight().toString()).toBe(expHighlight.toString())
  })
})
