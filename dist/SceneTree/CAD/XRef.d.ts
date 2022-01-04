import { AssetLoadContext } from '../AssetLoadContext';
import { BinReader } from '../BinReader';
import { CloneContext } from '../CloneContext';
import { XfoParameter } from '../Parameters/XfoParameter';
import { CADAsset } from './CADAsset';
/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends TreeItem
 */
declare class XRef extends CADAsset {
    /**
     * Creates an instance of XRef setting up the initial configuration for Material and Color parameters.
     *
     * @param {string} name - The name value.
     */
    localXfoParam: XfoParameter;
    constructor(name?: string);
    /**
     * The clone method constructs a new XRef, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {XRef} - The return value.
     */
    clone(context?: CloneContext): XRef;
    /**
     * Copies data from the source XRef onto this XRef.
     *
     * @param {XRef} src - The XRef to copy from.
     * @param {object} context - The context value.
     */
    copyFrom(src?: XRef, context?: CloneContext): void;
    /**
     * Initializes XRef's asset, material, version and layers; adding current `XRef` Geometry Item toall the layers in reader
     *
     * @paramreader - The reader param.
     * @param context - The load context param.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
}
export { XRef };
