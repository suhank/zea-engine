/* eslint-disable no-unused-vars */
/* eslint-disable valid-jsdoc */
import { Xfo } from '../Math/index';
import { TreeItem } from './TreeItem';
import { Registry } from '../Registry';
import { CloneContext } from './CloneContext';
/**
 * TreeItem type of class designed for making duplications of parts of the tree.
 *
 * @extends {TreeItem}
 */
class InstanceItem extends TreeItem {
    /**
     * Create an instance item.
     * @param name - The name of the instance item.
     */
    constructor(name) {
        super(name);
        this.srcTreePath = [];
        this.srcTree = null;
    }
    /**
     * Clones passed in `TreeItem` all the way down and adds it as a child of current item.
     *
     * @param treeItem - The treeItem value.
     */
    setSrcTree(treeItem) {
        this.srcTree = treeItem;
        const clonedContext = new CloneContext();
        const clonedTree = this.srcTree.clone(clonedContext);
        clonedTree.localXfoParam.value = new Xfo();
        this.addChild(clonedTree, false);
    }
    /**
     * Returns the last `TreeItem` cloned.
     *
     * @return - The return value.
     */
    getSrcTree() {
        return this.srcTree;
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * Sets state of current Item(Including cloned item) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader, context) {
        super.readBinary(reader, context);
        // console.log("numTreeItems:", context.numTreeItems, " numGeomItems:", context.numGeomItems)
        this.srcTreePath = reader.loadStrArray();
        if (this.srcTreePath.length > 0) {
            try {
                context.resolvePath(this.srcTreePath, (treeItem) => {
                    this.setSrcTree(treeItem);
                }, (error) => {
                    console.warn(`Error loading InstanceItem: ${this.getPath()}, unable to resolve: ${this.srcTreePath}. ` + error.message);
                });
            }
            catch (error) {
                console.warn(`Error loading InstanceItem: ${this.getPath()}: ` + error);
            }
        }
    }
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context = {}) {
        const j = super.toJSON(context);
        return j;
    }
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @todo Needs to be implemented.
     * @param j - The json object this item must decode.
     * @param context - The context value.
     * @param onDone - The onDone value.
     */
    fromJSON(j, context = {}) { }
    // ////////////////////////////////////////
    // Clone and Destroy
    /**
     * The clone method constructs a new instance item, copies its values
     * from this item and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned geom item.
     */
    clone(context) {
        const cloned = new InstanceItem();
        cloned.copyFrom(this, context);
        return cloned;
    }
    /**
     * Copies current TreeItem with all its children.
     *
     * @param src - The tree item to copy from.
     * @param context - The context value.
     */
    copyFrom(src, context) {
        super.copyFrom(src, context);
        this.srcTreePath = src.srcTreePath;
        if (this.srcTreePath.length > 0 && this.getNumChildren() == 0) {
            src.once('childAdded', (event) => {
                const childAddedEvent = event;
                const childItem = childAddedEvent.childItem;
                this.setSrcTree(childItem);
            });
        }
    }
}
Registry.register('InstanceItem', InstanceItem);
export { InstanceItem };
//# sourceMappingURL=InstanceItem.js.map