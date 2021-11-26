import { Xfo } from '../../Math/Xfo';
import { XfoParameter } from '../Parameters';
import { Operator } from './Operator';
import { XfoOperatorInput } from './OperatorInput';
import { XfoOperatorOutput } from './OperatorOutput';
/** The operator the calculates the global Xfo of a TreeItem based on its parents GlobalXfo and its own LocalXfo
 * @extends Operator
 * @private
 */
declare class CalcGlobalXfoOperator extends Operator {
    parentGlobal: XfoOperatorInput;
    localXfo: XfoOperatorInput;
    globalXfo: XfoOperatorOutput;
    /**
     * Create a CalcGlobalXfoOperator operator.
     *
     * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
     * @param cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
     */
    constructor(globalXfoParam?: XfoParameter, localXfoParam?: XfoParameter);
    /**
     * The backPropagateValue method inverts the mathematics of the 'evaluate'
     * method so it can propagate the value backwards to its inputs.
     * @param value - the new value being set on the output GlobalXfo
     */
    backPropagateValue(value: Xfo): void;
    /**
     * The evaluate method calculates a new global Xfo based on the parents Global Xfo,
     * and the local Xfo value.
     */
    evaluate(): void;
}
export { CalcGlobalXfoOperator };
