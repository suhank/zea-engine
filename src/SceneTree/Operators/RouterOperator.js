import { Operator, OperatorOutput } from './Operator.js';
import {
  ValueGetMode,
  Parameter,
  NumberParameter,
  StructParameter,
  ListParameter,
} from '../Parameters';

import { sgFactory } from '../SGFactory.js';

/** Class representing a router operator.
 * @extends Operator
 */
class RouterOperator extends Operator {
  /**
   * Create a router operator.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);

    this.__inputParam = this.addParameter(new NumberParameter('Input'));
    this.__routesParam = this.addParameter(
      new ListParameter('Routes', NumberParameter)
    );
    this.__routesParam.elementAdded.connect((value, index) => {
      value.setValue(1.0);
      this.addOutput(new OperatorOutput('Output'));
    });
    this.__routesParam.elementRemoved.connect((value, index) => {
      this.removeOutput(this.getOutput(index));
    });
  }

  /**
   * The evaluate method.
   */
  evaluate() {
    const input = this.__inputParam.getValue(ValueGetMode.OPERATOR_GETVALUE);
    const routes = this.__routesParam.getValue();
    let i = this.__outputs.length;
    while (i--) {
      const output = this.__outputs[i];
      output.setValue(
        input * routes[i].getValue(ValueGetMode.OPERATOR_GETVALUE)
      );
    }
    this.postEval.emit(input);
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    return super.toJSON(context, flags);
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy();
  }
}

sgFactory.registerClass('RouterOperator', RouterOperator);

export { RouterOperator };
