import { Cuboid } from './Cuboid'

describe('Cuboid', () => {
  it('tests default parameters', () => {
    const cuboid = new Cuboid()

    expect(cuboid.getParameter('X').getValue()).toBe(1)
    expect(cuboid.getParameter('Y').getValue()).toBe(1)
    expect(cuboid.getParameter('Z').getValue()).toBe(1)
    expect(cuboid.getParameter('BaseZAtZero').getValue()).toBe(false)
  })

  it('updates parameters', () => {
    const cuboid = new Cuboid()
    cuboid.getParameter('X').setValue(3)
    cuboid.getParameter('Y').setValue(4)
    cuboid.getParameter('Z').setValue(5)
    cuboid.getParameter('BaseZAtZero').setValue(true)

    expect(cuboid.getParameter('X').getValue()).toBe(3)
    expect(cuboid.getParameter('Y').getValue()).toBe(4)
    expect(cuboid.getParameter('Z').getValue()).toBe(5)
    expect(cuboid.getParameter('BaseZAtZero').getValue()).toBe(true)
  })
})
