import { AssetItem } from './AssetItem';
import { AssetLoadContext } from './AssetLoadContext';
import { BinReader } from './BinReader';
/**
 * Class designed to load and handle `.vla` files.
 *
 * **Events**
 * * **loaded:** Triggered once the tree is loaded. Note: the tree bounding box is valid once the tree is loaded.
 * * **geomsLoaded:** Triggered once all geometries are loaded.
 *
 * @extends AssetItem
 */
declare class VLAAsset extends AssetItem {
    /**
     * Create a VLA asset.
     * @param name - The name value.
     */
    constructor(name?: string);
    /**
     * Sets state of current asset using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     * @return - The return value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): number;
    /**
     * Loads all the geometries and metadata from the asset file.
     * @param url - The URL of the asset to load
     * @param context - The load context object that provides additional data such as the units of the scene we are loading into.
     * @return - Returns a promise that resolves once the initial load is complete
     */
    load(url: string, context?: AssetLoadContext): Promise<void>;
}
export { VLAAsset };
