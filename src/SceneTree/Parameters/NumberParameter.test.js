import { NumberParameter } from './NumberParameter'

describe('NumberParameter', () => {
  it('has an initial value.', () => {
    const numberParameter = new NumberParameter()

    expect(numberParameter.getValue()).toEqual(0)
  })

  it('check value type.', () => {
    const numberParameter = new NumberParameter()

    expect(numberParameter.getDataType()).toEqual('Number')
  })

  it('set a value.', () => {
    const numberParameter = new NumberParameter()
    const value = 1356
    numberParameter.setValue(value)
    expect(numberParameter.getValue()).toEqual(value)
  })

  it('save to JSON (serialization).', () => {
    // test param without data type.
    const numberParameter = new NumberParameter()
    const value = 1356
    numberParameter.setValue(value)

    const expOutput = '{"value":1356}'

    expect(JSON.stringify(numberParameter.toJSON())).toEqual(expOutput)
  })

  it('load from JSON (serialization).', () => {
    // test param without data type.
    const numberParameter = new NumberParameter()
    const input = { value: 1356 }
    numberParameter.fromJSON(input)

    expect(numberParameter.getValue()).toEqual(input.value)
  })

  it('check ranges -> set & get.', () => {})
})
