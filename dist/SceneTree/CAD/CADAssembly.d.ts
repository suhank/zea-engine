import { CloneContext } from "../CloneContext";
import { TreeItem } from "../TreeItem";
/**
 * Represents a Tree Item of an Assembly modeling. Brings together components to define a larger product.
 *
 * @extends TreeItem
 */
declare class CADAssembly extends TreeItem {
    /**
     * Create a CAD assembly.
     *
     * @param {string} name - The name of the tree item.
     */
    constructor(name?: string);
    /**
     * The clone method constructs a new CADAssembly item, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {CADAssembly} - The return value.
     */
    clone(context: CloneContext): CADAssembly;
    /**
     * The toJSON method encodes this type as a json object for persistences.
     *
     * @param {object} context - The context param.
     * @param {number} flags - The flags param.
     * @return {object} - Returns the json object.
     */
    toJSON(context: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param {object} j - The json object this item must decode.
     * @param {object} context - The context param.
     * @param {number} flags - The flags param.
     */
    fromJSON(j: Record<string, any>, context: Record<string, any>): void;
}
export { CADAssembly };
