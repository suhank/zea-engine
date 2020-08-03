import { Cross } from './Cross'

describe('Cross', () => {
  it('tests default parameters', () => {
    const cross = new Cross()

    expect(cross.getParameter('Size').getValue()).toBe(1)
  })

  it('updates parameters', () => {
    const cross = new Cross()
    cross.getParameter('Size').setValue(5)

    expect(cross.getParameter('Size').getValue()).toBe(5)
  })
})
