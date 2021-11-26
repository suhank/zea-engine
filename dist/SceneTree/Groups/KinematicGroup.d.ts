import { XfoParameter, MultiChoiceParameter } from '../Parameters/index';
import { BaseGroup } from './BaseGroup';
import { TreeItem } from '../TreeItem';
import { GroupTransformXfoOperator, GroupMemberXfoOperator } from '../Operators/GroupMemberXfoOperator';
/**
 * The KinematicGroup is used to control the transform of a collection of objects int eh scene.
 * Objects can be added to a kinematic group and then the group can be transformed, causing each
 * of the members to be transformed as one.
 *
 **Parameters**
 * **InitialXfoMode(`MultiChoiceParameter`):** _todo_
 * **GroupTransform(`XfoParameter`):** _todo_
 *
 * @extends BaseGroup
 */
declare class KinematicGroup extends BaseGroup {
    protected calculatingGroupXfo: boolean;
    protected memberXfoOps: GroupMemberXfoOperator[];
    /**
     * @member initialXfoModeParam - TODO
     */
    initialXfoModeParam: MultiChoiceParameter;
    /**
     * @member groupTransformParam - TODO
     */
    groupTransformParam: XfoParameter;
    protected groupTransformOp: GroupTransformXfoOperator;
    /**
     * Creates an instance of a group.
     *
     * @param name - The name of the group.
     */
    constructor(name?: string);
    /**
     * Returns enum of available xfo modes.
     *
     * | Name | Default |
     * | --- | --- |
     * | manual | <code>0</code> |
     * | first | <code>1</code> |
     * | average | <code>2</code> |
     * | globalOri | <code>3</code> |
     */
    static get INITIAL_XFO_MODES(): {
        disabled: number;
        manual: number;
        first: number;
        average: number;
        globalOri: number;
    };
    /**
     * The updateHighlight method.
     * @private
     */
    updateHighlight(): void;
    /**
     * Changes selection's state of the group with all items it owns.
     *
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel: boolean): void;
    /**
     * Calculate the group Xfo translate.
     * @private
     * @return - Returns a new Xfo.
     */
    calcGroupXfo(): void;
    /**
     * The __bindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    protected bindItem(item: TreeItem, index: number): void;
    /**
     * The unbindItem method.
     * @param item - The item value.
     * @param index - The index value.
     * @private
     */
    protected unbindItem(item: TreeItem, index: number): void;
    /**
     * Adds an item to the group(See `Items` parameter).
     *
     * @param item - The item value.
     * @param emit - The emit value.
     */
    addItem(item: TreeItem, emit?: boolean): void;
    /**
     * Removes an item from the group(See `Items` parameter).
     *
     * @param item - The item value.
     * @param emit - The emit value.
     */
    removeItem(item: TreeItem, emit?: boolean): void;
    /**
     * Sets an entire new array of items to the BaseGroup replacing any previous items.
     *
     * @param items - List of `TreeItem` you want to add to the group
     */
    setItems(items: Set<TreeItem>): void;
    /**
     * Removes all items from the group.
     *
     * @param emit - `true` triggers `valueChanged` event.
     */
    clearItems(emit?: boolean): void;
    /**
     * called once loading is done.
     * @private
     */
    loadDone(): void;
    /**
     * The clone method constructs a new group,
     * copies its values and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned group.
     */
    clone(context: Record<string, unknown>): KinematicGroup;
}
export { KinematicGroup };
