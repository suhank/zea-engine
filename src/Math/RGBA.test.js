import { RGBA } from './RGBA-temp'

describe('RGBA', () => {
  it('creates RGBA from buffer', () => {
    const uInt8Array = Uint8Array.of(255, 20, 150, 1)
    const rgba = RGBA.createFromBuffer(uInt8Array.buffer, 0)

    expect(rgba).toEqual(new RGBA(255, 20, 150, 1))
  })
})
