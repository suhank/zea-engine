import { Mat3 } from './Mat3'

describe('Mat3', () => {
  it('creates Mat3 from buffer', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
    const mat3 = Mat3.createFromBuffer(float32Array.buffer, 0)

    expect(mat3).toEqual(new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9))
  })

  it('save to JSON (serialization).', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
    const mat3 = Mat3.createFromBuffer(float32Array.buffer, 0)
    const outputStr = JSON.stringify(mat3.toJSON())

    const expOutput = '[1,2,3,4,5,6,7,8,9]'
    expect(outputStr).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const input = '[1,2,3,4,5,6,7,8,9]'
    const mat3 = new Mat3()
    mat3.fromJSON(JSON.parse(input))

    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
    const expMat3 = Mat3.createFromBuffer(float32Array.buffer, 0)

    expect(expMat3).toEqual(mat3)
  })
})
