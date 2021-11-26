/* eslint-disable @typescript-eslint/no-unused-vars */
import { Parameter } from './Parameter';
import { Box3 } from '../../Math/Box3';
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
class BoundingBoxParameter extends Parameter {
    /**
     * Creates an instance of BoundingBoxParameter.
     * @param name - Name of the parameter
     * @param treeItem - `TreeItem` that contains `Box3` representing the Bounding Box
     */
    constructor(name = '', treeItem) {
        super(name, new Box3(), 'Box3');
        this.treeItem = treeItem;
        this.dirty = true;
    }
    setParameterAsDirty() {
        this.dirty = true;
    }
    /**
     * Makes parameter value be dirty, so when `getValue` is called,
     * an evaluation is then executed to re-calculate the BoundingBox
     *
     * @memberof BoundingBoxParameter
     */
    setDirty(index) {
        const result = super.setDirty(index);
        if (result) {
            this.dirty = true;
        }
        // console.warn('check this if this method needs to be overloaded')
        return result;
    }
    /**
     * Returns bounding box value
     *
     * @return - The return value.
     */
    getValue() {
        if (this.dirty) {
            this.__value = this.treeItem._cleanBoundingBox(this.__value);
        }
        return this.__value;
    }
    toJSON(context) {
        var _a;
        return {
            value: (_a = this.__value) === null || _a === void 0 ? void 0 : _a.toJSON(),
        };
    }
    fromJSON(j, context) {
        var _a;
        // if (j.value.type) this.__value = Registry.constructClass('Box3') as Box3 // TODO: this is now broken
        (_a = this.__value) === null || _a === void 0 ? void 0 : _a.fromJSON(j.value);
    }
    readBinary(reader, context) {
        throw new Error('Method not implemented.');
    }
    clone() {
        var _a;
        const bBox3Clone = new BoundingBoxParameter(this.name, this.treeItem);
        bBox3Clone.value = (_a = this.__value) === null || _a === void 0 ? void 0 : _a.clone();
        return bBox3Clone;
    }
}
export { BoundingBoxParameter };
//# sourceMappingURL=BoundingBoxParameter.js.map