/* eslint-disable require-jsdoc */
import { Operator } from './Operator'
import { NumberParameter } from '../Parameters/NumberParameter'
import { OperatorInput } from './OperatorInput'
import { OperatorOutput, OperatorOutputMode } from './OperatorOutput'

class AddFloatsOperator extends Operator {
  constructor(name) {
    super(name)
    this.addInput(new OperatorInput('A'))
    this.addInput(new OperatorInput('B'))
    this.addOutput(new OperatorOutput('C'))
  }
  
  evaluate() {
    const a = this.getInput('A').getValue()
    const b = this.getInput('B').getValue()
    this.getOutput('C').setClean(a + b)
  }
}


// Note: this operatore modifies a value in the output attribute
// By reading and then changing. This feature allows us to combine operators
// to compute complex results. (See BoundingBox operators).
class ScaleFloatOperator extends Operator {
  constructor(name) {
    super(name)
    this.addInput(new OperatorInput("ScaleValue"));
    this.addOutput(new OperatorOutput("Result", OperatorOutputMode.OP_READ_WRITE));
  }

  evaluate() {
    let scaleValue = 1.0
    const inParam = this.getInput("ScaleValue").getParam()
    if (inParam) {
      scaleValue = inParam.getValue()
    }
    // Read the value, modify and return.
    const value = this.getOutput("Result").getValue()
    this.getOutput("Result").setClean(value * scaleValue)
  }
}

describe('Operator', () => {
  it('AddFloatsOperator', () => {
    const addOperator = new AddFloatsOperator()

    const aParam = new NumberParameter('A')
    const bParam = new NumberParameter('B')
    const myParam = new NumberParameter('MyParam')

    addOperator.getInput("A").setParam(aParam)
    addOperator.getInput("B").setParam(bParam)
    addOperator.getOutput("C").setParam(myParam)

    aParam.setValue(3)
    bParam.setValue(2.5)

    expect(myParam.isDirty()).toEqual(true)
    expect(myParam.getValue()).toEqual(5.5)
    expect(myParam.isDirty()).toEqual(false)
  })

  it('ScaleFloatOperator', () => {
    const scaleOperator = new ScaleFloatOperator()

    const scaleParam = new NumberParameter('A', 2)
    const resultParam = new NumberParameter('MyParam', 3)

    scaleOperator.getInput("ScaleValue").setParam(scaleParam)
    scaleOperator.getOutput("Result").setParam(resultParam)

    expect(resultParam.isDirty()).toEqual(true)
    expect(resultParam.getValue()).toEqual(6)
    expect(resultParam.isDirty()).toEqual(false)

    scaleParam.setValue(4)

    expect(resultParam.isDirty()).toEqual(true)
    expect(resultParam.getValue()).toEqual(24)
    expect(resultParam.isDirty()).toEqual(false)
  })

  it('AddScaleFloatOperator', () => {
    const addOperator = new AddFloatsOperator()
    const aParam = new NumberParameter('A', 2)
    const bParam = new NumberParameter('B', 3.5)
    const myParam = new NumberParameter('AddScaleFloatOperator-MyParam')

    addOperator.getInput("A").setParam(aParam)
    addOperator.getInput("B").setParam(bParam)
    addOperator.getOutput("C").setParam(myParam)

    const scaleOperator = new ScaleFloatOperator()
    const scaleParam = new NumberParameter('A', 2)

    scaleOperator.getInput("ScaleValue").setParam(scaleParam)
    scaleOperator.getOutput("Result").setParam(myParam)

    expect(myParam.isDirty()).toEqual(true)
    expect(myParam.getValue()).toEqual(11)
    expect(myParam.isDirty()).toEqual(false)

    scaleParam.setValue(1)

    expect(myParam.isDirty()).toEqual(true)
    expect(myParam.getValue()).toEqual(5.5)
    expect(myParam.isDirty()).toEqual(false)
  })
})
