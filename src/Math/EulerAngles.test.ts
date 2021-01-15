import { EulerAngles } from './EulerAngles'

describe('EulerAngles', () => {
  it('creates EulerAngle from JSON(serialization)', () => {
    const eulerAngle = new EulerAngles(5, 0, 8, 2)

    const expEulerAngle = new EulerAngles()
    expEulerAngle.fromJSON({ x: 5, y: 0, z: 8, order: 2 })
    expect(eulerAngle).toEqual(expEulerAngle)
  })
})
