import { Parameter } from './Parameter';
import { TreeItem } from '../../SceneTree/TreeItem';
import { BaseEvent } from '../../Utilities/BaseEvent';
declare class ItemEvent extends BaseEvent {
    item: TreeItem;
    index: number;
    constructor(item: TreeItem, index: number);
}
/** Class representing an item set parameter.
 * @extends Parameter
 * @private
 */
declare class ItemSetParameter extends Parameter<Set<TreeItem>> {
    protected filterFn: (item: TreeItem) => boolean;
    /**
     * Create an item set parameter.
     * @param name - The name of the item set parameter.
     * @param filterFn - The filterFn value.
     */
    constructor(name: string, filterFn: (item: TreeItem) => boolean);
    /**
     * The setFilterFn method.
     * @param filterFn - The filterFn value.
     */
    setFilterFn(filterFn: (item: TreeItem) => boolean): void;
    /**
     * The getFilterFn method.
     * @return - The return value.
     */
    getFilterFn(): (item: TreeItem) => boolean;
    /**
     * The getItem method.
     * @param index - The index param.
     * @return - The return value.
     */
    getItem(index: number): TreeItem | undefined;
    /**
     * The addItem method.
     * @param item - The item value.
     * @param emitValueChanged - The emit value.
     * @return - The return value.
     */
    addItem(item: TreeItem, emitValueChanged?: boolean): number | void;
    /**
     * Adds items to the parameter value
     *
     * @param items - list of items to add to the parameter
     * @param emitValueChanged
     * @memberof ItemSetParameter
     */
    addItems(items: Set<TreeItem>, emitValueChanged?: boolean): void;
    /**
     * The removeItem method.
     * @param index - The index value.
     * @param emitValueChanged - The emit param.
     * @return - The return value.
     */
    removeItem(index: number, emitValueChanged?: boolean): TreeItem | void;
    /**
     * The setItems method.
     * @param items - The item param.
     * @param emit - The emit param.
     */
    setItems(items: Set<TreeItem>, emit?: boolean): void;
    /**
     * The clearItems method.
     * @param emit - The emit value.
     */
    clearItems(emitValueChanged?: boolean): void;
    /**
     * The getNumItems method.
     * @return - The return value.
     */
    getNumItems(): number;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     * @param context - The context value.
     * @return - The return value.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The clone method constructs a item set new parameter, copies its values
     * from this parameter and returns it.
     *
     * @return - Returns a new item set parameter.
     */
    clone(): ItemSetParameter;
}
export { ItemSetParameter, ItemEvent };
