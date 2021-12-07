import { MaterialParameter } from './MaterialParameter'
import { Material } from '../Material'

import { ColorParameter } from './ColorParameter'
import { Color } from '../../Math'

describe('MaterialParameter', () => {
  it('has an initial value.', () => {
    const materialParameter = new MaterialParameter()

    expect(materialParameter.value).toBeUndefined()
  })

  it('checks value type.', () => {
    const materialParameter = new MaterialParameter()

    expect(materialParameter.getDataType()).toEqual('Material')
  })

  it('sets value.', () => {
    const materialParameter = new MaterialParameter('Foo')
    const material = new Material('itemMaterial')
    materialParameter.value = material

    expect(materialParameter.value).toEqual(material)
  })

  // TODO: material arguments are wrong... is this ok?
  it('replaces a value.', () => {
    const materialParameter = new MaterialParameter('Foo')

    const material2 = new Material('itemMaterial') // TODO: blueprint error.
    materialParameter.value = material2

    expect(materialParameter.value).toEqual(material2)
  })

  it('propagate events.', () => {
    const materialParameter = new MaterialParameter('Foo')

    const material = new Material('itemMaterial1')
    material.addParameter(new ColorParameter('Color', new Color(1, 0, 0)))
    materialParameter.value = material

    let changedParam
    materialParameter.on('valueParameterValueChanged', (event: any) => {
      changedParam = event.param
    })

    material.getParameter('Color').value = new Color(0, 1, 0)

    expect(changedParam).toEqual(material.getParameter('Color'))
  })
  /*
  it.skip('saves to JSON (serialization).', () => {
    const materialParameter = new MaterialParameter('Foo')
    const material = new Material('itemMaterial')
    materialParameter.value =(material)

    const expOutput = '{"value":...}'

    expect(JSON.stringify(materialParameter.toJSON())).toEqual(expOutput)
  })

  it('loads from JSON (serialization).', () => {
    const materialParameter = new MaterialParameter('Foo')
    const input = { value: 1 }
    materialParameter.fromJSON(input)

    expect(materialParameter.value).toEqual(input.value)
  })

  it('loads from binary (serialization).', () => {
    const materialParameter = new MaterialParameter('Foo', 1, [1, 2, 3])

    const data = Float32Array.of(1)
    const reader = new BinReader(data.buffer)
    materialParameter.readBinary(reader)

    expect(materialParameter.value).toEqual(1)
  })

  it('clones parameter object', () => {
    const parameter = new MaterialParameter('Foo')
    const material = new Material('itemMaterial')
    parameter.value =(material)

    const parameter2 = parameter.clone()

    expect(parameter).toEqual(parameter2)
  })*/
})
