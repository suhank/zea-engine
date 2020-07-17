import { Parameter } from './Parameter'
import { ParameterOwner } from '../ParameterOwner'

describe('ParameterOwner', () => {
  it('has empty params count', () => {
    const parameterOwner = new ParameterOwner()

    expect(parameterOwner.getNumParameters()).toEqual(0)
  })

  it('it emits an event when a parameter is added.', () => {
    const parameterOwner = new ParameterOwner()

    const mockFn = jest.fn()

    parameterOwner.on('parameterAdded', mockFn)

    const name = 'foo'
    const parameter = new Parameter(name)

    parameterOwner.addParameter(parameter)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('name can be setted', () => {
    const name1 = 'foo'
    const name2 = 'bar'
    const parameter = new Parameter(name1)
    parameter.setName(name2)

    expect(parameter.getName()).toEqual(name2)
  })

  it('save to JSON and load from JSON (serialization).', () => {
    // test param without data type.
  })

  it('add a param at a given index.', () => {})

  it('removing a nonexisting param.', () => {})

  it('replacing a nonexisting param.', () => {})
})
