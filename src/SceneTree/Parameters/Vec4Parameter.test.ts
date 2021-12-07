import { Vec4 } from '../../Math/Vec4'
import { Vec4Parameter } from './Vec4Parameter'
import { BinReader } from '../../SceneTree/BinReader'

describe('Vec4Parameter', () => {
  it('has an initial value.', () => {
    const vec4Parameter = new Vec4Parameter()
    const vec4 = new Vec4()

    expect(vec4Parameter.value.isEqual(vec4)).toBe(true)
  })

  it('checks value type.', () => {
    const vec4Parameter = new Vec4Parameter()

    expect(vec4Parameter.getDataType()).toEqual('Vec4')
  })

  it('sets value.', () => {
    const vec4Parameter = new Vec4Parameter()
    const value = new Vec4()
    vec4Parameter.value = value

    expect(vec4Parameter.value).toEqual(value)
  })

  it('saves to JSON (serialization).', () => {
    const vec4Parameter = new Vec4Parameter()

    vec4Parameter.value = new Vec4(1, 2, 3, 4)

    const expOutput = '{"name":"","value":{"x":1,"y":2,"z":3,"t":4}}'

    expect(JSON.stringify(vec4Parameter.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const vec4Parameter = new Vec4Parameter()
    const input = { value: { x: 1, y: 2, z: 3, t: 4 } }
    vec4Parameter.fromJSON(input)

    expect(vec4Parameter.value.toJSON()).toEqual(input.value)
  })

  it('loads from binary (serialization).', () => {
    const vec4Parameter = new Vec4Parameter()

    const data = new Float32Array(4)
    data[0] = 1
    data[1] = 2
    data[2] = 3
    data[3] = 4
    const reader = new BinReader(<Buffer>data.buffer)
    vec4Parameter.readBinary(reader)

    expect(vec4Parameter.value.toJSON()).toEqual({ x: 1, y: 2, z: 3, t: 4 })
  })

  it('clones parameter object', () => {
    const parameter = new Vec4Parameter('TestParameter')
    const value = new Vec4(1, 2, 3, 4)
    parameter.value = value

    const parameter2 = parameter.clone()

    expect(parameter.toJSON()).toEqual(parameter2.toJSON())
  })
})
