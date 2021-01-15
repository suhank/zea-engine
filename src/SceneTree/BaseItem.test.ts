import { BaseItem } from './BaseItem'

describe('BaseItem', () => {
  it("doesn't have base items by default.", () => {
    expect(BaseItem.getNumBaseItems()).toBe(0)
  })

  test('Setting owner.', () => {
    const baseItem = new BaseItem('foo')
    const owner = new BaseItem('Owner')
    baseItem.setOwner(owner)

    expect(baseItem.getOwner()).toBe(owner)
  })
})
