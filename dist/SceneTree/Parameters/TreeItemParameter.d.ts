import { TreeItem } from '../../SceneTree/TreeItem';
import { Parameter } from './Parameter';
/**
 * Represents a specific type of parameter, that only stores `TreeItem` values.
 *
 * i.e.:
 * ```javascript
 * const treeItem = new TreeItem('tree1')
 * const treeItemParam = new TreeItemParameter('MyTreeItem', treeItem)
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(treeItemParam)
 * ```
 *
 * **Events**
 * * **treeItemGlobalXfoChanged:** Triggered when computed world Xfo of parameter's `TreeItem` changes.
 * * **valueChanged:** Triggered when parameter's value changes.
 *
 * @extends Parameter
 */
declare class TreeItemParameter extends Parameter<TreeItem | undefined> {
    protected filterFn?: (...args: any[]) => unknown;
    protected owner: TreeItem;
    protected listenerIDs: Record<string, number>;
    /**
     * Create a tree item parameter.
     * @param name - The name of the tree item parameter.
     * @param filterFn - The filterFn value.
     */
    constructor(name?: string, filterFn?: (...args: []) => unknown);
    private emitTreeItemGlobalXfoChanged;
    /**
     * Sets parameter value's owner `TreeItem`.
     *
     * @param owner - The owner value.
     */
    setOwner(owner: TreeItem): void;
    /**
     * Returns parameter value's owner `TreeItem`.
     *
     * @return - The return value.
     */
    getOwner(): TreeItem;
    /**
     * The setFilterFn method.
     * @param filterFn - The filterFn value.
     */
    setFilterFn(filterFn: (...args: []) => unknown): void;
    /**
     * The getFilterFn method.
     * @return - The return value.
     */
    getFilterFn(): (...args: any[]) => unknown;
    /**
     * Sets parameter's `TreeItem` value.
     *
     * @param treeItem - The treeItem value
     * @return - The return value.
     */
    setValue(treeItem: TreeItem): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context: Record<string, any>): Record<string, unknown>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, unknown>, context: Record<string, any>): void;
    /**
     * The clone method constructs a new tree item parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new tree item parameter.
     */
    clone(context?: Record<string, unknown>): TreeItemParameter;
}
export { TreeItemParameter };
