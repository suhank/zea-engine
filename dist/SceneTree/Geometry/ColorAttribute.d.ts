import { Attribute } from './Attribute';
import { Color } from '../../Math/Color';
/**
 * Class representing an attribute.
 */
declare class ColorAttribute extends Attribute {
    /**
     * Create a ColorAttribute.
     */
    constructor();
    /**
     * Returns the Color value at the specified index.
     *
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setValue'.
     *
     * @param index - The index value.
     * @returns Color - The value at the specified index.
     */
    getValueRef(index: number): Color;
    /**
     * Returns a copy of the Color value at the specified index.
     *
     * @param index - The index value.
     * @return Color - The return value.
     */
    getValue(index: number): Color;
    /**
     * Sets Color at the specified index.
     *
     * @param index - The index value.
     * @param value - The value param.
     */
    setValue(index: number, value: Color): void;
    /**
     * Gets the value of a corner vertex of a face.
     * > Note: 'Ref' means that the value contains a reference to the data in the attribute.
     * > The components of the value can be changed causing the attributes data is changed.
     * > No need to call 'setFaceVertexValue'.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @return - The return value.
     */
    getFaceVertexValueRef(face: number, faceVertex: number): Color;
    /**
     * Sets the value of a corner vertex of a face.
     * @param face - The face index.
     * @param faceVertex - The index of vertex within the face. [0... num face vertices]
     * @param value - The value value.
     */
    setFaceVertexValue(face: number, faceVertex: number, value: Color): void;
    /**
     * The setSplitVertexValue method.
     * @param vertex - The vertex value.
     * @param face - The face index.
     * @param value - The value value.
     */
    setSplitVertexValue(vertex: number, face: number, value: Color): void;
}
export { ColorAttribute };
