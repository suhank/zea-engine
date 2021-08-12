import { Quat } from './Quat'

describe('Quat', () => {
  it('creates Quat from buffer', () => {
    const float32Array = Float32Array.of(1, 0, 0, 0)
    const quat = Quat.createFromBuffer(float32Array.buffer, 0)

    expect(quat).toEqual(new Quat(1, 0, 0, 0))
  })
})
