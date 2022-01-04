import { BinReader, AssetLoadContext } from '..';
import { CloneContext } from '../CloneContext';
import { PMIItem } from './PMIItem';
/**
 * Represents a view of PMI data. within a CAD assembly.
 *
 * @extends PMIItem
 */
declare class PMIView extends PMIItem {
    camera: any;
    /**
     * Creates an instance of PMIView setting up the initial configuration for Material and Color parameters.
     *
     * @param {string} name - The name value.
     */
    constructor(name?: string);
    /**
     * The clone method constructs a new PMIView, copies its values
     * from this item and returns it.
     *
     * @param context - The clone context.
     * @return - The return value.
     */
    clone(context?: CloneContext): PMIView;
    /**
     * Changes the current state of the selection of this item.
     * Note: the PMIView also ajusts the camera when activated.
     * The camera should have been provided in the AssetLoadContext when the CADAsset was loaded.
     * ```
     * const asset = new CADAsset()
     * const context = new AssetLoadContext()
     * context.camera = renderer.getViewport().getCamera()
     * asset.load(zcad, context).then(() => {
     *   console.log("Done")
     * })
     * ```
     *
     * @emits `selectedChanged` with selected state
     * @param sel - Boolean indicating the new selection state.
     */
    setSelected(sel: boolean): void;
    /**
     * Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo
     */
    activate(): void;
    /**
     * Deactivates the PMIItem
     */
    deactivate(): void;
    /**
     * Load the binary data for this class
     * @param reader - The reader param.
     * @param context - The context param.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
}
export { PMIView };
