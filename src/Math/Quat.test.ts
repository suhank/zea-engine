import { Quat } from './Quat'

describe('Quat', () => {
  it('creates Quat from buffer', () => {
    const float32Array = Float32Array.of(1, 0, 0, 0)
    const quat = Quat(float32Array)

    expect(quat).toEqual(new Quat(1, 0, 0, 0))
  })
})
