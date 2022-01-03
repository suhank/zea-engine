import { BaseGeom } from './BaseGeom';
import { BinReader } from '../BinReader';
import { AssetLoadContext } from '../AssetLoadContext';
/**
 * Class representing a point primitive drawing type, every vertex specified is a point.
 *
 * ```
 * const points = new Points()
 * ```
 *
 * * **Events**
 * * **boundingBoxChanged:** Triggered when the bounding box changes.
 *
 * @extends BaseGeom
 */
declare class Points extends BaseGeom {
    /**
     * Create points.
     */
    constructor();
    /**
     * The clear method.
     */
    clear(): void;
    /**
     * Loads and populates `Points` object from a binary reader.
     *
     * @param reader - The reader value.
     */
    loadBin(reader: BinReader): void;
    /**
     * Sets state of current geometry(Including line segments) using a binary reader object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: AssetLoadContext): void;
}
export { Points };
