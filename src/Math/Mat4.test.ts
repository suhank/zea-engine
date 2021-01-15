import { Mat4 } from './Mat4'

describe('Mat4', () => {
  it('creates Mat4 from buffer', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const mat4 = Mat4.createFromBuffer(float32Array.buffer, 0)

    expect(mat4).toEqual(new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))
  })

  it('save to JSON (serialization).', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const mat4 = Mat4.createFromBuffer(float32Array.buffer, 0)
    const outputStr = JSON.stringify(mat4.toJSON())

    const expOutput = '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'
    expect(outputStr).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const input = '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]'
    const mat4 = new Mat4()
    mat4.fromJSON(JSON.parse(input))

    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const expMat4 = Mat4.createFromBuffer(float32Array.buffer, 0)

    expect(expMat4).toEqual(mat4)
  })
})
