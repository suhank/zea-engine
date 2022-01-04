import { AssetLoadContext } from '../AssetLoadContext';
import { BaseGeomItem } from '../BaseGeomItem';
import { BinReader } from '../BinReader';
import { CloneContext } from '../CloneContext';
import { CADAsset } from './CADAsset';
/**
 * Represents a Body within a CAD Part. A Body is made up of either a single mesh or a collection of meshes, one for each surface.
 * When a zcad file is produced, the tool can  optimize bodies to contain only one mesh to speed up loading of large models, and support bigger models being loaded.
 *
 * **Parameters**
 * * **Material(`MaterialParameter`):** Specifies the material of the geometry item.
 * * **Color(`ColorParameter`):** Specifies the color of the geometry item.
 *
 * @extends BaseGeomItem
 */
declare class CADBody extends BaseGeomItem {
    __cadAsset: CADAsset;
    /**
     * Creates an instance of CADBody setting up the initial configuration for Material and Color parameters.
     *
     * @param {string} name - The name value.
     * @param {CADAsset} cadAsset - The cadAsset value.
     */
    constructor(name?: string, cadAsset?: CADAsset);
    /**
     * Returns the `CADAsset` object in current `CADBody`
     *
     * @return {CADAsset} - The return value.
     */
    getCADAsset(): CADAsset;
    /**
     * The clone method constructs a new CADBody, copies its values
     * from this item and returns it.
     *
     * @param {object} context - The context value.
     * @return {CADBody} - The return value.
     */
    clone(context: CloneContext): CADBody;
    /**
     * The copyFrom method.
     * @param {CADBody} src - The src param.
     * @param {object} context - The context value.
     * @private
     */
    copyFrom(src: CADBody, context: CloneContext): void;
    /**
     * Initializes CADBody's asset, material, version and layers; adding current `CADBody` Geometry Item toall the layers in reader
     *
     * @param reader - The reader param.
     * @param context - The context param.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * The toJSON method encodes this type as a json object for persistences.
     *
     * @param {number} flags - The flags param.
     * @return {object} - The return value.
     */
    toJSON(context: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param {object} j - The j param.
     * @param {number} flags - The flags param.
     */
    fromJSON(j: Record<string, any>): void;
}
export { CADBody };
