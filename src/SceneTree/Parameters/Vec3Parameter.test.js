import { Vec3} from '../../Math/Vec3'
import { Vec3Parameter,  } from './Vec3Parameter'

describe('Vec3Parameter', () => {
  it('has an initial value.', () => {
    const vec3Parameter = new Vec3Parameter()

    const vec3 = new Vec3()

    expect(vec3Parameter.getValue().isEqual(vec3)).toBe(true)
  })

  it('check value type.', () => {
    const vec3Parameter = new Vec3Parameter()

    expect(vec3Parameter.getDataType()).toEqual('Vec3')
  })

  it('set a value.', () => {
    const vec3Parameter = new Vec3Parameter()
    const value = new Vec3()
    vec3Parameter.setValue(value)
    expect(vec3Parameter.getValue()).toEqual(value)
  })

  // it('save to JSON (serialization).', () => {
  //   // test param without data type.
  //   const vec3Parameter = new Vec3Parameter()
  //   const value = 1356
  //   vec3Parameter.setValue(value)

  //   const expOutput = '{"value":1356}'

  //   expect(JSON.stringify(vec3Parameter.toJSON())).to.equal(expOutput)
  // })

  // it('load from JSON (serialization).', () => {
  //   // test param without data type.
  //   const vec3Parameter = new Vec3Parameter()
  //   const input = { value: 1356 }
  //   vec3Parameter.fromJSON(input)

  //   expect(vec3Parameter.getValue()).to.equal(input.value)
  // })

  // it('check ranges -> set & get.', () => {})
})
