import { Vec4 } from './Vec4-temp'

describe('Vec4', () => {
  it('has an initial value.', () => {
    const vec4 = new Vec4(1, 2, 3, 4)

    expect(vec4.x).toEqual(1)
    expect(vec4.y).toEqual(2)
    expect(vec4.z).toEqual(3)
    expect(vec4.t).toEqual(4)
  })

  // it('check value type.', () => {
  //   const numberParameter = new NumberParameter()

  //   expect(numberParameter.getDataType()).toEqual('Number')
  // })

  // it('set a value.', () => {
  //   const numberParameter = new NumberParameter()
  //   const value = 1356
  //   numberParameter.setValue(value)
  //   expect(numberParameter.getValue()).toEqual(value)
  // })

  it('save to JSON (serialization).', () => {
    const vec4 = new Vec4(1, 2, 3, 4)

    const expOutput = '{"x":1,"y":2,"z":3,"t":4}'

    expect(JSON.stringify(vec4.toJSON())).toEqual(expOutput)
  })

  // it('load from JSON (serialization).', () => {
  //   // test param without data type.
  //   const numberParameter = new NumberParameter()
  //   const input = { value: 1356 }
  //   numberParameter.fromJSON(input)

  //   expect(numberParameter.getValue()).toEqual(input.value)
  // })

  // it('check ranges -> set & get.', () => {})

  it('check the lenght of the vector.', () => {
    const vec4 = new Vec4(1, 2, 3, 4)

    expect(vec4.length()).toBeCloseTo(4.795)
  })

  it('creates Vec4 from buffer', () => {
    const float32Array = Float32Array.of(8, 5, 9, 1)
    const vec4 = Vec4.createFromBuffer(float32Array.buffer, 0)

    expect(vec4).toEqual(new Vec4(8, 5, 9, 1))
  })
})
