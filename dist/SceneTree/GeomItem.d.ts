import { Xfo, Box3 } from '../Math/index';
import { XfoParameter, Mat4Parameter } from './Parameters/index';
import { GeometryParameter } from './Parameters/GeometryParameter';
import { BaseGeomItem } from './BaseGeomItem';
import { Operator } from './Operators/Operator';
import { BaseGeom } from './Geometry';
import { Material } from './Material';
import { BinReader } from './BinReader';
import { AssetItem } from '.';
/**
 * Class representing a geometry item in a scene tree.
 *
 * **Parameters**
 * * **Geometry(`GeometryParameter`):** The geometry to be rendered for this GeomItem
 * * **Material(`MaterialParameter`):** The Material to use when rendering this GeomItem
 * * **GeomOffsetXfo(`XfoParameter`):** Provides an offset transformation that is applied only to the geometry and not inherited by child items.
 * * **GeomMat(`Mat4Parameter`):** Calculated from the GlobalXfo and the GeomOffsetXfo, this matrix is provided to the renderer for rendering.
 *
 * @extends BaseGeomItem
 */
declare class GeomItem extends BaseGeomItem {
    protected listenerIDs: Record<string, number>;
    protected geomBBox?: Box3;
    protected geomIndex: number;
    protected assetItem: AssetItem | null;
    protected calcGeomMatOperator: Operator;
    cullable: boolean;
    /**
     * @member geomOffsetXfoParam - Provides an offset transformation that is applied only to the geometry and not inherited by child items.
     */
    geomOffsetXfoParam: XfoParameter;
    /**
     * @member geomParam - The geometry to be rendered for this GeomItem
     */
    geomParam: GeometryParameter;
    /**
     * @member geomMatParam - Calculated from the GlobalXfo and the GeomOffsetXfo, this matrix is provided to the renderer for rendering.
     */
    geomMatParam: Mat4Parameter;
    /**
     * Creates a geometry item.
     * @param name - The name of the geom item.
     * @param geometry - The geometry value.
     * @param material - The material value.
     * @param xfo - The initial Xfo of the new GeomItem.
     */
    constructor(name?: string, geometry?: BaseGeom, material?: Material, xfo?: Xfo);
    /**
     * The _cleanBoundingBox method.
     * @param bbox - The bounding box value.
     * @return - The return value.
     * @private
     */
    _cleanBoundingBox(bbox: Box3): Box3;
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
     * @param json - The json object this item must decode.
     * @param context - The context value.
     */
    fromJSON(json: Record<string, any>, context: Record<string, any>): void;
    /**
     * Loads state of the Item from a binary object.
     *
     * @param reader - The reader value.
     * @param context - The context value.
     */
    readBinary(reader: BinReader, context: Record<string, any>): void;
    /**
     * Returns string representation of current object's state.
     * @param context
     * @return - The return value.
     */
    toString(context: Record<string, any>): string;
    /**
     * The clone method constructs a new geom item, copies its values
     * from this item and returns it.
     *
     * @param context - The context value.
     * @return - Returns a new cloned geom item.
     */
    clone(context?: Record<string, any>): GeomItem;
    /**
     * Copies current GeomItem with all its children.
     *
     * @param src - The geom item to copy from.
     * @param context - The context value.
     */
    copyFrom(src: GeomItem, context?: Record<string, any>): void;
    /**
     * Sets the global boolean that controls if GeomItems calculate precise bounding boxes
     * or use the approximate bounding boxes that are much faster to generate.
     * Note: computing the precise bounding box is much slower and can make loading
     * big scenes take a bit longer. This setting is only relevant to geometries loaded
     * from zcad files.
     * @param value - true for precise bounding boxes, else false for faster approximate bounding boxes.
     */
    static setCalculatePreciseBoundingBoxes(value: boolean): void;
}
export { GeomItem };
