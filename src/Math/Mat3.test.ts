import { Mat3 } from './Mat3'

describe('Mat3', () => {
  it('creates Mat3 from buffer', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
    const mat3 = new Mat3(float32Array)

    expect(mat3).toEqual(new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9))
  })
})
