import { Operator } from './Operator';
import { Vec4OperatorOutput } from './OperatorOutput';
import { XfoOperatorInput } from './OperatorInput';
import { Vec4Parameter, XfoParameter } from '../Parameters';
/**
 * An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
declare class CuttingPlaneOperator extends Operator {
    groupGlobalXfo: XfoOperatorInput;
    cuttingPlane: Vec4OperatorOutput;
    /**
     * Create a GroupMemberXfoOperator operator.
     * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
     * @param cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
     */
    constructor(groupGlobalXfoParam: XfoParameter, cuttingPlaneParam: Vec4Parameter);
    /**
     * The evaluate method.
     */
    evaluate(): void;
}
export { CuttingPlaneOperator };
