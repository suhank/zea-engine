import { Version } from './Version';
import { TreeItem } from './TreeItem';
import { GeomLibrary } from './GeomLibrary';
import { MaterialLibrary } from './MaterialLibrary';
import { BinReader } from './BinReader';
import { AssetLoadContext } from './AssetLoadContext';
/**
 * Represents a TreeItem with rendering and material capabilities.
 *
 * @extends TreeItem
 */
declare class AssetItem extends TreeItem {
    geomLibrary: GeomLibrary;
    materialLibrary: MaterialLibrary;
    loaded: boolean;
    protected engineDataVersion?: Version;
    protected unitsScale: number;
    protected units: string;
    /**
     * Create an asset item.
     * @param name - The name of the asset item.
     */
    constructor(name?: string);
    /**
     * Loads all the geometries and metadata from the asset file.
     * @param url - The URL of the asset to load
     * @return - Returns a promise that resolves once the initial load is complete
     */
    load(url: string): Promise<void>;
    /**
     * Returns the loaded status of current item.
     *
     * @return - Returns true if the asset has already loaded its data.
     */
    isLoaded(): boolean;
    /**
     * Returns the zea engine version as an array with major, minor, patch order.
     *
     * @return - The return value.
     */
    getEngineDataVersion(): Version | undefined;
    /**
     * Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.
     *
     * @return - The return value.
     */
    getGeometryLibrary(): GeomLibrary;
    /**
     * Returns `MaterialLibrary` that is in charge of storing all materials of current Item.
     *
     * @return - The return value.
     */
    getMaterialLibrary(): MaterialLibrary;
    /**
     * Returns the scale factor of current item.
     * @return - The return value.
     */
    getUnitsConversion(): number;
    /**
     * The readBinary method.
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context?: Record<string, any>): Record<string, any>;
    /**
     * The fromJSON method decodes a json object for this type.
     *
     * @param j - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(j: Record<string, any>, context?: Record<string, any>): any;
    /**
     * The clone method constructs a new tree item, copies its values
     * from this item and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned tree item.
     */
    clone(context?: Record<string, unknown>): TreeItem;
    /**
     * Copies current TreeItem with all its children.
     *
     * @param src - The tree item to copy from.
     * @param context - The context value.
     */
    copyFrom(src: AssetItem, context?: Record<string, any>): void;
}
export { AssetItem };
