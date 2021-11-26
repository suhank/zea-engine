import { Attribute } from './Attribute';
import { Vec2 } from '../../Math/Vec2';
/**
 * Class representing an attribute.
 */
declare class Vec2Attribute extends Attribute {
    /**
     * Create a Vec2Attribute.
     */
    constructor();
    /**
     * Returns the Vec2 value at the specified index.
     *
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setValue'.
     *
     * @param index - The index value.
     * @returns Vec2 - The value at the specified index.
     */
    getValueRef(index: number): Vec2;
    /**
     * Returns the Vec2 from the specified index.
     *
     * @param index - The index value.
     * @return Vec2 - The return value.
     */
    getValue(index: number): Vec2;
    /**
     * Sets Vec2 at the specified index.
     *
     * @param index - The index value.
     * @param value - The value param.
     */
    setValue(index: number, value: Vec2): void;
    /**
     * Gets the value of a corner vertex of a face.
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setFaceVertexValue'.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @return - The return value.
     */
    getFaceVertexValueRef(face: number, faceVertex: number): Vec2;
    /**
     * Sets the value of a corner vertex of a face.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @param value - The value value.
     */
    setFaceVertexValue(face: number, faceVertex: number, value: Vec2): void;
    /**
     * The setSplitVertexValue method.
     * @param vertex - The vertex value.
     * @param face - The face index.
     * @param value - The value value.
     */
    setSplitVertexValue(vertex: number, face: number, value: Vec2): void;
}
export { Vec2Attribute };
