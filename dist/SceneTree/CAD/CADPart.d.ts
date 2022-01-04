import { AssetLoadContext } from "../AssetLoadContext";
import { BinReader } from "../BinReader";
import { CloneContext } from "../CloneContext";
import { TreeItem } from "../TreeItem";
/**
 * Represents a Part within a CAD assembly.
 *
 * @extends TreeItem
 */
declare class CADPart extends TreeItem {
    /**
     * Creates an instance of CADPart setting up the initial configuration for Material and Color parameters.
     *
     * @param {string} name - The name value.
     */
    constructor(name?: string);
    /**
     * The clone method constructs a new CADPart, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {CADPart} - The return value.
     */
    clone(context?: CloneContext): CADPart;
    /**
     * The copyFrom method.
     * @param {CADPart} src - The src param.
     * @param {number} flags - The flags param.
     * @private
     */
    copyFrom(src: CADPart, context?: CloneContext): void;
    /**
     * Initializes CADPart's asset, material, version and layers; adding current `CADPart` Geometry Item toall the layers in reader
     *
     * @param {BinReader} reader - The reader param.
     * @param {object} context - The context param.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * The toJSON method encodes this type as a json object for persistences.
     *
     * @param {number} flags - The flags param.
     * @return {object} - The return value.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param {object} j - The j param.
     * @param {number} flags - The flags param.
     */
    fromJSON(j?: Record<string, any>): void;
}
export { CADPart };
