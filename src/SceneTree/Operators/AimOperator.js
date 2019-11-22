import { Quat } from '../../Math'
import { Operator } from './Operator.js'
import { XfoOperatorOutput } from './OperatorOutput.js'
import {
  BooleanParameter,
  NumberParameter,
  MultiChoiceParameter,
  XfoParameter,
} from '../Parameters'
import { sgFactory } from '../SGFactory.js'

/** An operator for aiming items at targets.
 * @extends Operator
 */
class AimOperator extends Operator {
  /**
   * Create a gears operator.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name)

    this.addParameter(new NumberParameter('weight', 1))
    this.addParameter(
      new MultiChoiceParameter('axis', 0, [
        '+X Axis',
        '-X Axis',
        '+Y Axis',
        '-Y Axis',
        '+Z Axis',
        '-Z Axis',
      ]));

    this.addParameter(new BooleanParameter('stretch', false))
    this.addParameter(new XfoParameter('Target'))
    this.addOutput(new XfoOperatorOutput('InputOutput'))
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const weight = this.getParameter('weight').getValue()
    const target = this.getParameter('Target').getValue()
    const axis = this.getParameter('axis').getValue()
    const stretch = this.getParameter('stretch').getValue()
    const output = this.getOutputByIndex(0)
    const xfo = output.getValue()
    const dir = target.tr.subtract(xfo.tr)
    const dist = dir.length()
    if (dist < 0.000001) return
    dir.scaleInPlace(1 / dist)
    let vec
    switch (axis) {
      case 0:
        vec = xfo.ori.getXaxis()
        break
      case 1:
        vec = xfo.ori.getXaxis().negate()
        break
      case 2:
        vec = xfo.ori.getYaxis()
        break
      case 3:
        vec = xfo.ori.getYaxis().negate()
        break
      case 4:
        vec = xfo.ori.getZaxis()
        break
      case 5:
        vec = xfo.ori.getZaxis().negate()
        break
    }

    let align = new Quat()
    align.setFrom2Vectors(vec, dir)
    align.alignWith(new Quat())
    if (weight < 1.0) align = new Quat().lerp(align, weight)

    xfo.ori = align.multiply(xfo.ori)

    if (stretch) {
      // Scale the output to reach towards the target.
      switch (axis) {
        case 0:
        case 1:
          xfo.sc.x = dist
          break
        case 2:
        case 3:
          xfo.sc.y = dist
          break
        case 4:
        case 5:
          xfo.sc.y = dist
          break
      }
    }
    output.setClean(xfo)
  }
}

sgFactory.registerClass('AimOperator', AimOperator)

export { AimOperator }
