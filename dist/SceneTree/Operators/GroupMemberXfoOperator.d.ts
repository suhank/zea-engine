import { Xfo } from '../../Math/Xfo';
import { XfoParameter } from '../Parameters/XfoParameter';
import { Operator } from './Operator';
import { XfoOperatorInput } from './OperatorInput';
import { XfoOperatorOutput } from './OperatorOutput';
/** An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
declare class GroupTransformXfoOperator extends Operator {
    bindXfo: Xfo;
    invBindXfo: Xfo;
    groupGlobalXfo: XfoOperatorInput;
    groupTransformXfo: XfoOperatorOutput;
    /**
     * Create a GroupMemberXfoOperator operator.
     * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
     * @param groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
     */
    constructor(groupGlobalXfoParam: XfoParameter, groupTransformXfoParam: XfoParameter);
    /**
     * Create a GroupMemberXfoOperator operator.
     * @param bindXfo - The Bind Xfo calculated from the initial Transforms of the Group Members.
     */
    setBindXfo(bindXfo: Xfo): void;
    /**
     * The evaluate method.
     */
    evaluate(): void;
}
/** An operator for modifying group members by the groups Xfo
 * @private
 * @extends Operator
 *
 */
declare class GroupMemberXfoOperator extends Operator {
    _enabled: boolean;
    groupTransformXfo: XfoOperatorInput;
    memberGlobalXfo: XfoOperatorOutput;
    /**
     * Create a GroupMemberXfoOperator operator.
     * @param groupTransformXfoParam - The parameter on the Group which defines the displacement to apply to the members.
     * @param memberXfoGlobalParam - The GlobalXfo param found on the Member.
     */
    constructor(groupTransformXfoParam: XfoParameter, memberXfoGlobalParam: XfoParameter);
    /**
     * used to temporarily disable/enable the operator when the Group bind Xfo is being calculated
     */
    disable(): void;
    /**
     * used to temporarily disable/enable the operator when the Group bind Xfo is being calculated
     */
    enable(): void;
    /**
     * The evaluate method.
     */
    evaluate(): void;
}
export { GroupTransformXfoOperator, GroupMemberXfoOperator };
