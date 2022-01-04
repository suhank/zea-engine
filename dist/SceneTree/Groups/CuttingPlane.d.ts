import { BooleanParameter, Vec4Parameter } from '../Parameters/index';
import { BaseGroup } from './BaseGroup';
import { TreeItem } from '../TreeItem';
import { CuttingPlaneOperator } from '../Operators/CuttingPlaneOperator';
import { BaseItem } from '../BaseItem';
import { CloneContext } from '../CloneContext';
/**
 * Groups are a special type of `BaseGroup` that allows you to gather/classify/organize/modify
 * multiple items contained within the group. Items can be added to the group directly, or using
 * its path.
 * All parameters set to the group are also set to the children; in other words, it's a faster way
 * to apply common things to multiple items.
 *
 * **Parameters**
 * * **CutAwayEnabled(`BooleanParameter`):** _todo_
 * * **CutPlaneNormal(`Vec3Parameter`):** _todo_
 * * **CutPlaneDist(`NumberParameter`):** _todo_
 *
 * @extends BaseGroup
 */
declare class CuttingPlane extends BaseGroup {
    cutPlaneOp: CuttingPlaneOperator;
    cutAwayEnabledParam: BooleanParameter;
    cutPlaneParam: Vec4Parameter;
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name?: string);
    /**
     * The updateCutaway method.
     * @param item - The item in the group.
     * @private
     */
    updateCutaway(item: TreeItem): void;
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    bindItem(item: BaseItem, index: number): void;
    /**
     * The unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    unbindItem(item: BaseItem, index: number): void;
    /**
     * The clone method constructs a new group,
     * copies its values and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned group.
     */
    clone(context: CloneContext): CuttingPlane;
}
export { CuttingPlane };
