import { AssetItem } from "../AssetItem";
import { AssetLoadContext } from "../AssetLoadContext";
import { BinReader } from "../BinReader";
import { CloneContext } from "../CloneContext";
import { Version } from "../Version";
/**
 * Class representing a CAD asset.
 *
 * **Events**
 * * **loaded:** Triggered when the  asset is loaded
 * @extends AssetItem
 */
declare class CADAsset extends AssetItem {
    cadfileVersion: Version;
    numCADBodyItems: number;
    __loadPromise: any;
    url: string;
    __datafileLoaded: () => void;
    __datafileParam: any;
    /**
     * Create a CAD asset.
     * @param {string} name - The name value.
     */
    constructor(name?: string);
    /**
     * The clone method constructs a new XRef, copies its values
     * from this item and returns it.
     *
     * @param {number} flags - The flags param.
     * @return {XRef} - The return value.
     */
    clone(context?: CloneContext): CADAsset;
    /**
     * Returns the versioon of the data loaded by thie CADAsset.
     *
     * @return {string} - The return value.
     */
    getVersion(): Version;
    /**
     * Initializes CADAsset's asset, material, version and layers; adding current `CADAsset` Geometry Item toall the layers in reader
     *
     * @param {BinReader} reader - The reader param.
     * @param {AssetLoadContext} context - The load context object that provides additional data such as the units of the scene we are loading into.
     */
    readRootLevelBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * Loads all the geometries and metadata from the asset file.
     * @param {string} url - The URL of the asset to load
     * @param {AssetLoadContext} context - The load context object that provides additional data such as paths to external references.
     * @return {Promise} - Returns a promise that resolves once the load of the tree is complete. Geometries, textures and other resources might still be loading.
     */
    load(url: string, context?: AssetLoadContext): any;
    /**
     * The toJSON method encodes this type as a json object for persistences.
     *
     * @param {object} context - The context param.
     * @param {number} flags - The flags param.
     * @return {object} - The return value.
     */
    toJSON(context: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param {object} j - The json object this item must decode.
     * @param {object} context - The context param.
     * @param {callback} onDone - The onDone param.
     */
    fromJSON(j: Record<string, any>, context: Record<string, any>): void;
}
export { CADAsset };
