import { BooleanParameter } from './BooleanParameter'

describe('BooleanParameter', () => {
  it('has an initial value.', () => {
    const booleanParameter = new BooleanParameter()

    expect(booleanParameter.value).toBeDefined()
  })

  it('checks value type.', () => {
    const booleanParameter = new BooleanParameter()

    expect(booleanParameter.getDataType()).toEqual('Boolean')
  })

  it('sets value.', () => {
    const booleanParameter = new BooleanParameter()
    booleanParameter.value = true

    expect(booleanParameter.value).toBe(true)
  })

  it('saves to JSON (serialization).', () => {
    const booleanParameter = new BooleanParameter()
    booleanParameter.value = true

    const expOutput = '{"value":true}'

    expect(JSON.stringify(booleanParameter.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const booleanParameter = new BooleanParameter()
    const input = { value: true }
    booleanParameter.fromJSON(input)

    expect(booleanParameter.value).toBe(true)
  })

  // TODO: "do not use boolean as a constructor" was a booleanParameter intended?
  // it('clones parameter object', () => {
  //   const parameter = new BooleanParameter('TestParameter')
  //   const value = new Boolean(1, 2)
  //   parameter.value =(value)

  //   const parameter2 = parameter.clone()

  //   expect(parameter.toJSON()).toEqual(parameter2.toJSON())
  // })
})
