import GridTreeItem from './GridTreeItem'

describe('GridTreeItem', () => {
  it('Setup GridTreeItem', () => {
    const grid = new GridTreeItem(5, 5)

    expect(grid.getParameter('BoundingBox').getValue()).toBe(true)
  })
})
