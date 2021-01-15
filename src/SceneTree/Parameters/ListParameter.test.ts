import { ListParameter } from './ListParameter'

describe('ListParameter', () => {
  it('has an initial value.', () => {
    const listParameter = new ListParameter('', 'string')

    expect(listParameter.getValue()).toEqual([])
  })

  it('checks value type.', () => {
    const listParameter = new ListParameter('Foo', 'string')

    expect(listParameter.getDataType()).toEqual('string')
  })

  it('sets value.', () => {
    const listParameter = new ListParameter('Foo', 'string')
    const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    listParameter.setValue(list)

    expect(listParameter.getValue()).toEqual(list)
  })
})
