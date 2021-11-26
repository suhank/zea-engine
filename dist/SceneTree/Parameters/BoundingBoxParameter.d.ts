import { Parameter } from './Parameter';
import { Box3 } from '../../Math/Box3';
import { BinReader } from '../BinReader';
import { TreeItem } from '../TreeItem';
import { IBinaryReader } from '../../Utilities/IBinaryReader';
/**
 * Represents a specific type of parameter, that only stores `Box3` values.
 *
 * i.e.:
 * ```javascript
 * const boundingBox = new BoundingBoxParameter('MyBBox', new TreeItem())
 * //'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
 * // Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
 * myParameterOwnerItem.addParameter(boundingBox)
 * ```
 * @extends Parameter
 */
declare class BoundingBoxParameter extends Parameter<Box3> implements IBinaryReader {
    protected treeItem: TreeItem;
    /**
     * Creates an instance of BoundingBoxParameter.
     * @param name - Name of the parameter
     * @param treeItem - `TreeItem` that contains `Box3` representing the Bounding Box
     */
    constructor(name: string, treeItem: TreeItem);
    setParameterAsDirty(): void;
    /**
     * Makes parameter value be dirty, so when `getValue` is called,
     * an evaluation is then executed to re-calculate the BoundingBox
     *
     * @memberof BoundingBoxParameter
     */
    setDirty(index: number): boolean;
    /**
     * Returns bounding box value
     *
     * @return - The return value.
     */
    getValue(): Box3;
    toJSON(context?: Record<string, unknown>): Record<string, any>;
    fromJSON(j: Record<string, any>, context?: Record<string, unknown>): void;
    readBinary(reader: BinReader, context?: Record<string, unknown>): void;
    clone(): BoundingBoxParameter;
}
export { BoundingBoxParameter };
