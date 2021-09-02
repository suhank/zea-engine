import { Color } from './Color'

describe('Color', () => {
  it('creates Color from buffer', () => {
    const float32Array = Float32Array.of(255 / 255, 200 / 255, 30 / 255, 24 / 255)
    const color = new Color(float32Array, 0)

    expect(color).toEqual(new Color(255 / 255, 200 / 255, 30 / 255, 24 / 255))
  })

  it('toHex', () => {
    const color = new Color(1, 0, 0)
    expect(color.toHex()).toEqual('#ff0000')
  })
})
