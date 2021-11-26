import { Vec4 } from '../../Math/Vec4';
import { Operator } from './Operator';
import { Vec4OperatorOutput } from './OperatorOutput';
import { XfoOperatorInput } from './OperatorInput';
/**
 * An operator that calculates the delta transform of the group since items were bound to it.
 * @extends Operator
 *
 */
class CuttingPlaneOperator extends Operator {
    /**
     * Create a GroupMemberXfoOperator operator.
     * @param groupGlobalXfoParam - The GlobalXfo param found on the Group.
     * @param cuttingPlaneParam - The parameter on the Group which defines the displacement to apply to the members.
     */
    constructor(groupGlobalXfoParam, cuttingPlaneParam) {
        super();
        this.groupGlobalXfo = new XfoOperatorInput('GroupGlobalXfo');
        this.cuttingPlane = new Vec4OperatorOutput('CuttingPlane');
        this.groupGlobalXfo.setParam(groupGlobalXfoParam);
        this.cuttingPlane.setParam(cuttingPlaneParam);
        this.addInput(this.groupGlobalXfo);
        this.addOutput(this.cuttingPlane);
    }
    /**
     * The evaluate method.
     */
    evaluate() {
        const groupGlobalXfo = this.groupGlobalXfo.getValue();
        const vec = groupGlobalXfo.ori.getZaxis();
        const dist = groupGlobalXfo.tr.dot(vec);
        this.cuttingPlane.setClean(new Vec4(vec.x, vec.y, vec.z, -dist));
    }
}
export { CuttingPlaneOperator };
//# sourceMappingURL=CuttingPlaneOperator.js.map