/* eslint-disable require-jsdoc */
import { Operator } from './Operator'
import { NumberParameter } from '../Parameters/NumberParameter'
import { BaseItem } from '../BaseItem'
import { NumberOperatorInput } from './OperatorInput'
import { NumberOperatorOutput } from './OperatorOutput'
import { OperatorOutputMode } from '../Parameters/OperatorOutputMode'
import { Registry } from '../../Registry'
import { Parameter } from '..'

class AddFloatsOperator extends Operator {
  inputA: NumberOperatorInput = new NumberOperatorInput('A')
  inputB: NumberOperatorInput = new NumberOperatorInput('B')
  outputC: NumberOperatorOutput = new NumberOperatorOutput('C')
  constructor(name?: string) {
    super(name)
    this.addInput(this.inputA)
    this.addInput(this.inputB)
    this.addOutput(this.outputC)
  }

  evaluate() {
    const a = this.inputA.getValue()
    const b = this.inputB.getValue()
    this.outputC.setClean(a + b)
  }
}

Registry.register('AddFloatsOperator', AddFloatsOperator)

// Note: this operator modifies a value in the output attribute
// By reading and then changing. This feature allows us to combine operators
// to compute complex results. (See BoundingBox operators).
class ScaleFloatOperator extends Operator {
  scaleValue: NumberOperatorInput = new NumberOperatorInput('ScaleValue')
  result: NumberOperatorOutput = new NumberOperatorOutput('Result', OperatorOutputMode.OP_READ_WRITE)
  constructor(name?: string) {
    super(name)
    this.addInput(this.scaleValue)
    this.addOutput(this.result)
  }

  evaluate() {
    let scaleValue = 1.0
    const inParam = this.scaleValue.getParam()
    if (inParam) {
      scaleValue = inParam.getValue()
    }
    // Read the value, modify and return.
    const value = this.result.getValue()
    this.result.setClean(value * scaleValue)
  }
}

Registry.register('ScaleFloatOperator', ScaleFloatOperator)
// TODO: enable test -- TypeError: Cannot read property 'OP_WRITE' of undefined
describe('Operator', () => {
  test('AddFloatsOperator', () => {
    const addOperator = new AddFloatsOperator()

    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const myParam = new NumberParameter('MyParam')

    addOperator.getInput('A').setParam(aParam)
    addOperator.getInput('B').setParam(bParam)
    addOperator.getOutput('C').setParam(myParam)

    aParam.setValue(3)
    bParam.setValue(2.5)

    expect(myParam.isDirty()).toBe(true)
    expect(myParam.getValue()).toBe(5.5)
    expect(myParam.isDirty()).toBe(false)
  })

  test('ScaleFloatOperator', () => {
    const scaleOperator = new ScaleFloatOperator()

    const scaleParam = new NumberParameter('A', 2)
    const resultParam = new NumberParameter('MyParam', 3)

    scaleOperator.getInput('ScaleValue').setParam(scaleParam)
    scaleOperator.getOutput('Result').setParam(resultParam)

    expect(resultParam.isDirty()).toBe(true)
    expect(resultParam.getValue()).toBe(6)
    expect(resultParam.isDirty()).toBe(false)

    scaleParam.setValue(4)
    expect(resultParam.isDirty()).toBe(true)
    expect(resultParam.getValue()).toBe(24)
    expect(resultParam.isDirty()).toBe(false)
  })

  test('combining AddFloatsOperator and ScaleFloatOperator', () => {
    const addOperator = new AddFloatsOperator()
    const aParam = new NumberParameter('A', 2)
    const bParam = new NumberParameter('B', 3.5)
    const myParam = new NumberParameter('AddScaleFloatOperator-MyParam')

    addOperator.getInput('A').setParam(aParam)
    addOperator.getInput('B').setParam(bParam)
    addOperator.getOutput('C').setParam(myParam)

    const scaleOperator = new ScaleFloatOperator()
    const scaleParam = new NumberParameter('A', 2)

    scaleOperator.getInput('ScaleValue').setParam(scaleParam)
    scaleOperator.getOutput('Result').setParam(myParam)

    expect(myParam.isDirty()).toBe(true)
    expect(myParam.getValue()).toBe(11)
    expect(myParam.isDirty()).toBe(false)

    scaleParam.setValue(1)

    expect(myParam.isDirty()).toBe(true)
    expect(myParam.getValue()).toBe(5.5)
    expect(myParam.isDirty()).toBe(false)
  })

  class SetFloatOperator extends Operator {
    value
    output: NumberOperatorOutput = new NumberOperatorOutput('Output', OperatorOutputMode.OP_WRITE)
    constructor(name?: string, value?: any) {
      super(name)
      this.value = value
      this.addOutput(this.output)
    }

    evaluate() {
      this.output.setClean(this.value)
    }
  }

  class ScaleFloatsOperator extends Operator {
    scaleValue: NumberOperatorInput = new NumberOperatorInput('ScaleValue')
    outputA: NumberOperatorOutput = new NumberOperatorOutput('OutputA', OperatorOutputMode.OP_READ_WRITE)
    outputB: NumberOperatorOutput = new NumberOperatorOutput('OutputB', OperatorOutputMode.OP_READ_WRITE)
    constructor(name?: string) {
      super(name)
      this.addInput(this.scaleValue)
      this.addOutput(this.outputA)
      this.addOutput(this.outputB)
    }

    evaluate() {
      let scaleValue = 2.0
      const inParam = this.getInput('ScaleValue').getParam()
      if (inParam) {
        scaleValue = inParam.getValue()
      }
      // Read the value, modify and return both values
      const valueA = this.outputA.getValue()
      this.outputA.setClean(valueA * scaleValue)
      const valueB = this.outputB.getValue()
      this.outputB.setClean(valueB * scaleValue)

      this.emit('evaluated')
    }
  }

  test('horizontal dirty propagation', () => {
    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const cParam = new NumberParameter('C')
    const scaleABParam = new NumberParameter('scaleABParam', 2)
    const scaleBCParam = new NumberParameter('scaleBCParam', 2)

    // In the following configuration, we have 3 parameters being driven by
    // 5 different operators. The 'setA/B/C' operators initialize the values to 2
    // Then the scale operators scale that value using the 'scaleAB' and 'scaleBC' values.
    //     Param A: > ['setA', 'scaleAB']
    //     Param B: > ['setB', 'scaleAB', 'scaleBC']
    //     Param C: > ['setC', 'scaleBC']
    // Parameter 'B' is modified by both scale operators.
    const setA = new SetFloatOperator('setA', 2)
    setA.getOutput('Output').setParam(aParam)
    const setB = new SetFloatOperator('setB', 2)
    setB.getOutput('Output').setParam(bParam)
    const setC = new SetFloatOperator('setC', 2)
    setC.getOutput('Output').setParam(cParam)

    const scaleAB = new ScaleFloatsOperator('scaleAB')
    scaleAB.outputA.setParam(aParam)
    scaleAB.outputB.setParam(bParam)
    scaleAB.getInput('ScaleValue').setParam(scaleABParam)

    const scaleBC = new ScaleFloatsOperator('scaleBC')
    scaleBC.outputA.setParam(bParam)
    scaleBC.outputB.setParam(cParam)
    scaleBC.getInput('ScaleValue').setParam(scaleBCParam)

    expect(aParam.isDirty()).toBe(true)
    expect(bParam.isDirty()).toBe(true)
    expect(cParam.isDirty()).toBe(true)
    expect(aParam.getValue()).toBe(4)
    expect(bParam.getValue()).toBe(8)
    expect(cParam.getValue()).toBe(4)
    expect(aParam.isDirty()).toBe(false)
    expect(bParam.isDirty()).toBe(false)
    expect(cParam.isDirty()).toBe(false)

    // Now we do something interesting.
    // We modify scaleAB, which will dirty A and B.
    // However, because ParamB becomes dirty, and it must dirty its
    // entire stack up to the last 'OP_WRITE' connected output,
    // then it also propagates dirty up to scaleBC operator, which then
    // propagates down to all its outputs, which includes C
    scaleABParam.setValue(3)

    expect(aParam.isDirty()).toBe(true)
    expect(bParam.isDirty()).toBe(true)
    expect(cParam.isDirty()).toBe(true) // cParam becomes dirty because bParam becomes dirty
    expect(aParam.getValue()).toBe(6) // 3 * 2
    expect(bParam.getValue()).toBe(12) // (3 * 2) * 2
    expect(cParam.getValue()).toBe(4) // 2 * 2
    expect(aParam.isDirty()).toBe(false)
    expect(bParam.isDirty()).toBe(false)
    expect(cParam.isDirty()).toBe(false)

    scaleBCParam.setValue(3)

    expect(aParam.isDirty()).toBe(true)
    expect(bParam.isDirty()).toBe(true)
    expect(cParam.isDirty()).toBe(true)
    expect(aParam.getValue()).toBe(6) // 3 * 2
    expect(bParam.getValue()).toBe(18) // (3 * 2) * 2
    expect(cParam.getValue()).toBe(6) // 3 * 2
    expect(aParam.isDirty()).toBe(false)
    expect(bParam.isDirty()).toBe(false)
    expect(cParam.isDirty()).toBe(false)
  })

  test('creating an cyclic dependency caused by mixing OP_READ_WRITE layering', () => {
    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const scaleABParam1 = new NumberParameter('scaleABParam1', 2)
    const scaleABParam2 = new NumberParameter('scaleABParam2', 2)

    const setA = new SetFloatOperator('setA', 2)
    setA.getOutput('Output').setParam(aParam)
    const setB = new SetFloatOperator('setB', 2)
    setB.getOutput('Output').setParam(bParam)

    const scaleAB1 = new ScaleFloatsOperator('scaleAB1')
    scaleAB1.getInput('ScaleValue').setParam(scaleABParam1)
    const scaleAB2 = new ScaleFloatsOperator('scaleAB2')
    scaleAB2.getInput('ScaleValue').setParam(scaleABParam2)

    // Now we are going to mix up the bindings.
    // In theory, we should see an operator writing
    // to an output our of schedule. Meaning that
    // scaleAB1 should write the value of

    // Bind aParam: > ['scaleAB1', 'scaleAB2']
    scaleAB1.outputA.setParam(aParam)
    scaleAB2.outputA.setParam(aParam)

    // Bind bParam: > ['scaleAB2', 'scaleAB1']
    scaleAB2.outputB.setParam(bParam)
    scaleAB1.outputB.setParam(bParam)

    expect(aParam.isDirty()).toBe(true)
    expect(bParam.isDirty()).toBe(true)

    // This throws because we cannot evaluated scaleAB1 because its
    // input value depends on the value of scaleAB2, whose input also
    // depends on the output of scaleAB1
    expect(bParam.getValue).toThrow()
  })

  test('rebind to fix a cyclic dependency caused by mixing OP_READ_WRITE layering', () => {
    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const scaleABParam1 = new NumberParameter('scaleABParam1', 2)
    const scaleABParam2 = new NumberParameter('scaleABParam2', 2)

    const setA = new SetFloatOperator('setA', 2)
    setA.getOutput('Output').setParam(aParam)
    const setB = new SetFloatOperator('setB', 2)
    setB.getOutput('Output').setParam(bParam)

    const scaleAB1 = new ScaleFloatsOperator('scaleAB1')
    scaleAB1.getInput('ScaleValue').setParam(scaleABParam1)
    const scaleAB2 = new ScaleFloatsOperator('scaleAB2')
    scaleAB2.getInput('ScaleValue').setParam(scaleABParam2)

    // Now we are going to mix up the bindings.
    // In theory, we should see an operator writing
    // to an output our of schedule. Meaning that
    // scaleAB1 should write the value of

    // Bind aParam: > ['scaleAB1', 'scaleAB2']
    scaleAB1.outputA.setParam(aParam)
    scaleAB2.outputA.setParam(aParam)

    // Bind bParam: > ['scaleAB2', 'scaleAB1']
    scaleAB2.outputB.setParam(bParam)
    scaleAB1.outputB.setParam(bParam)

    expect(aParam.isDirty()).toBe(true)
    expect(bParam.isDirty()).toBe(true)

    // This throws because we cannot evaluated scaleAB1 because its
    // input value depends on the value of scaleAB2, whose input also
    // depends on the output of scaleAB1
    // expect(bParam.getValue).toThrow()

    // Rebind forces the operators to remove and re-add bindings, which flattens the bindings and fixes the problem.
    scaleAB1.rebind()
    scaleAB2.rebind()

    scaleABParam1.setValue(3)
    expect(aParam.getValue()).toBe(12) // (3 * 2) * 2
    expect(bParam.getValue()).toBe(12) // (3 * 2) * 2
  })

  class DoubleFloatsOperator extends Operator {
    input: NumberOperatorInput = new NumberOperatorInput('input')
    out: NumberOperatorOutput = new NumberOperatorOutput('out', OperatorOutputMode.OP_WRITE)
    constructor(name?: string) {
      super(name)
      this.addInput(this.input)
      this.addOutput(this.out)
    }

    evaluate() {
      const a = this.input.getValue()
      this.out.setClean(a * 2)
    }
  }
  class MultiOutputOperator extends Operator {
    input: NumberOperatorInput = new NumberOperatorInput('input')
    out0: NumberOperatorOutput = new NumberOperatorOutput('out0', OperatorOutputMode.OP_WRITE)
    out1: NumberOperatorOutput = new NumberOperatorOutput('out1', OperatorOutputMode.OP_WRITE)
    out2: NumberOperatorOutput = new NumberOperatorOutput('out2', OperatorOutputMode.OP_WRITE)
    constructor(name?: string) {
      super(name)
      this.addInput(this.input)
      this.addOutput(this.out0)
      this.addOutput(this.out1)
      this.addOutput(this.out2)
    }

    evaluate() {
      const value = this.input.getParam().getValue()
      this.out0.setClean(value)
      this.out1.setClean(value)
      this.out2.setClean(value)
    }
  }

  test('layering multi-out on a chain', () => {
    const inAParam = new NumberParameter('inA')
    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const cParam = new NumberParameter('B')

    const doubleOperator0 = new DoubleFloatsOperator()
    doubleOperator0.input.setParam(inAParam)
    doubleOperator0.out.setParam(aParam)

    const doubleOperator1 = new DoubleFloatsOperator()
    doubleOperator1.input.setParam(aParam)
    doubleOperator1.out.setParam(bParam)

    const doubleOperator2 = new DoubleFloatsOperator()
    doubleOperator2.input.setParam(bParam)
    doubleOperator2.out.setParam(cParam)

    inAParam.setValue(2)
    aParam.setValue(2.5)
    expect(aParam.getValue()).toBe(4)
    expect(bParam.getValue()).toBe(8)
    expect(cParam.getValue()).toBe(16)
    expect(cParam.isDirty()).toBe(false)

    const multiOutputOperator = new MultiOutputOperator()
    const inBParam = new NumberParameter('inB', 3)
    multiOutputOperator.input.setParam(inBParam)
    multiOutputOperator.out0.setParam(aParam)
    multiOutputOperator.out1.setParam(bParam)
    multiOutputOperator.out2.setParam(cParam)

    expect(aParam.getValue()).toBe(3)
    expect(bParam.getValue()).toBe(3)
    expect(cParam.getValue()).toBe(3)
    expect(cParam.isDirty()).toBe(false)

    // Now dirty the input to the chain.
    // Because the multi-out layers on top using OP_WRITE outputs,
    // it should prevent the chain from becoming dirty.
    inAParam.setValue(4)
    expect(cParam.isDirty()).toBe(false)
    expect(aParam.getValue()).toBe(3)
    expect(bParam.getValue()).toBe(3)
    expect(cParam.getValue()).toBe(3)
  })

  test('save to JSON (serialization).', () => {
    const addOperator = new AddFloatsOperator()
    const parameterOwner = new BaseItem('Foo')
    const aParam = parameterOwner.addParameter(new NumberParameter('A'))
    const bParam = parameterOwner.addParameter(new NumberParameter('B'))
    const myParam = parameterOwner.addParameter(new NumberParameter('MyParam'))

    addOperator.getInput('A').setParam(aParam)
    addOperator.getInput('B').setParam(bParam)
    addOperator.getOutput('C').setParam(myParam)

    aParam.setValue(3)
    bParam.setValue(2.5)

    expect(JSON.stringify(addOperator.toJSON())).toMatchSnapshot()
  })

  test('load from JSON (serialization).', () => {
    const parameterOwner = new BaseItem('Foo')
    parameterOwner.addParameter(new NumberParameter('A'))
    parameterOwner.addParameter(new NumberParameter('B'))
    parameterOwner.addParameter(new NumberParameter('MyParam'))

    const addOperator = new AddFloatsOperator()
    const input = {
      name: '',
      type: 'AddFloatsOperator',
      inputs: [
        { name: 'A', paramPath: ['Foo', 'A'] },
        { name: 'B', paramPath: ['Foo', 'B'] },
      ],
      outputs: [{ name: 'C', paramPath: ['Foo', 'MyParam'], paramBindIndex: 0 }],
    }
    addOperator.fromJSON(input, {
      resolvePath: (path: string[], cb: (result: BaseItem | Parameter<any> | null) => void) => {
        cb(parameterOwner.resolvePath(path))
      },
    })

    parameterOwner.getParameter('A').setValue(3)
    parameterOwner.getParameter('B').setValue(2.5)

    expect(parameterOwner.getParameter('MyParam').isDirty()).toBe(true)
    expect(parameterOwner.getParameter('MyParam').getValue()).toBe(5.5)
    expect(parameterOwner.getParameter('MyParam').isDirty()).toBe(false)
  })
})
