import { Attribute } from './Attribute';
import { Vec3 } from '../../Math/Vec3';
/**
 * Class representing an attribute.
 */
declare class Vec3Attribute extends Attribute {
    /**
     * Create a Vec2Attribute.
     */
    constructor();
    /**
     * Returns the Vec3 value at the specified index.
     *
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setValue'.
     *
     * @param index - The index value.
     * @returns Vec3 - The value at the specified index.
     */
    getValueRef(index: number): Vec3;
    /**
     * Returns a copy of the Vec3 value at the specified index.
     *
     * @param index - The index value.
     * @return Vec3 - The value at the specified index.
     */
    getValue(index: number): Vec3;
    /**
     * Sets Vec3 at the specified index.
     *
     * @param index - The index value.
     * @param value - The value param.
     */
    setValue(index: number, value: Vec3): void;
    /**
     * Gets the value of a corner vertex of a face.
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setFaceVertexValue'.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @return - The return value.
     */
    getFaceVertexValueRef(face: number, faceVertex: number): Vec3;
    /**
     * Sets the value of a corner vertex of a face.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @param value - The value value.
     */
    setFaceVertexValue(face: number, faceVertex: number, value: Vec3): void;
    /**
     * The setSplitVertexValue method.
     * @param vertex - The vertex value.
     * @param face - The face index.
     * @param value - The value value.
     */
    setSplitVertexValue(vertex: number, face: number, value: Vec3): void;
}
export { Vec3Attribute };
