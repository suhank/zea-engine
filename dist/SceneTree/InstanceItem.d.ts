import { TreeItem } from './TreeItem';
import { BinReader } from './BinReader';
/**
 * TreeItem type of class designed for making duplications of parts of the tree.
 *
 * @extends {TreeItem}
 */
declare class InstanceItem extends TreeItem {
    protected srcTree: TreeItem | null;
    /**
     * Create an instance item.
     * @param name - The name of the instance item.
     */
    constructor(name?: string);
    /**
     * Clones passed in `TreeItem` all the way down and adds it as a child of current item.
     *
     * @param treeItem - The treeItem value.
     */
    setSrcTree(treeItem: TreeItem, context: Record<string, any>): void;
    /**
     * Returns the last `TreeItem` cloned.
     *
     * @return - The return value.
     */
    getSrcTree(): TreeItem;
    /**
     * Sets state of current Item(Including cloned item) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context?: Record<string, any>): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: {}): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @todo Needs to be implemented.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     * @param onDone - The onDone value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): void;
    /**
     * The clone method constructs a new instance item, copies its values
     * from this item and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned geom item.
     */
    clone(context?: Record<string, any>): InstanceItem;
}
export { InstanceItem };
