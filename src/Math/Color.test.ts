import { Color } from './Color'

describe('Color', () => {
  it('creates Color from buffer', () => {
    const float32Array = Float32Array.of(255, 200, 30, 24)
    const color = Color.createFromBuffer(float32Array.buffer, 0)

    expect(color).toEqual(new Color(255, 200, 30, 24))
  })
})
