import {
    Attribute
} from './Attribute.js';


class VertexAttribute extends Attribute {
    constructor(geom, dataType, expectedSize, defaultScalarValue) {
        super(dataType, expectedSize, defaultScalarValue)
        this.__geom = geom // TODO: WeakRef??

        // In polygon meshes, often the number of attribute values (e.g. uvs, normals),
        // is more than the number of vertices. This is because often we have attribute seams.
        // seams occur when we have a discontinuity of and attributes values over a mesh.
        // UV seams occur when neighboring faces have different UV values but share vertex positions.
        // e.g. a Sphere normally has a UV seam down one side due to the way the mesh was unwrapped into 2d coordinates.
        // Normal seams occur when hard edges are create on a mesh. This might happen when Normals are automatically generated.
        // an angle threshold will cause neighboring face vertices to have different normal values. 

        // Splits stores a value{face}{facevertex} mapping of split values.
        // the splits represent the delta between the base vertex set(positions)
        // and this attribute. Note: this means the positions attribute should _never_
        // split.
        // Note: facevertex is the index of the vertex in the face. e.g. 0, 1, 2 (triangles), or 0..3 for quads.
        this.__splits = {};
        this.__splitValues = [];
        // this.__splitValues = new Attribute();
    }

    getFaceVertexValueRef(face, facevertex) {
        let vertex = this.__geom.getFaceVertexIndex(face, facevertex);
        if (vertex in this.__splits && face in this.__splits[vertex]) {
            return this.__splitValues[this.__splits[vertex][face]];
        }
        return this.getValueRef(vertex)
    }

    setFaceVertexValue(face, facevertex, value) {
        let vertex = this.__geom.getFaceVertexIndex(face, facevertex);

        // let valueRef = this.getValueRef(vertex);
        // valueRef.setFromOther(value);

        let result = {
            'kept': true,
            'value': undefined
        }

        let valueRef = this.getValueRef(vertex);
        if (!valueRef.isValid()) {
            // the value is uninitialized. Initialize it.
            valueRef.setFromOther(value);
            result['value'] = valueRef;
        } else if (valueRef.almostEqual(value)) {
            // Keep the existing value, don't generate a split.
            result['kept'] = false;
        }

        if (vertex in this.__splits && face in this.__splits[vertex]) {
            let valueRef = this.__splitValues[this.__splits[vertex][face]];
            valueRef.setFromOther(value);
        } else {
            // Generate a split.
            if (!(vertex in this.__splits))
                this.__splits[vertex] = {};
            this.__splits[vertex][face] = this.__splitValues.length;
            this.__splitValues.push(value);
            result['value'] = value;
        }
        return result;
    }

    setSplitVertexValue(vertex, face, value) {
        if (!(vertex in this.__splits))
            this.__splits[vertex] = {};
        if (face in this.__splits[vertex]) {
            let currValue = this.__splitValues[this.__splits[vertex][face]];
            if (currValue.almostEqual(value))
                return;
            console.warn("Face Vertex Already Split with different value");
        }
        this.__splits[vertex][face] = this.__splitValues.length;
        this.__splitValues.push(value);
    }

    setSplitVertexValues(vertex, faceGroup, value) {
        if (!(vertex in this.__splits))
            this.__splits[vertex] = {};
        let splitIndex = this.__splitValues.length;
        this.__splitValues.push(value);
        for (let face of faceGroup) {
            // if (face in this.__splits[vertex]) {
            //     let currValue = this.__splitValues[this.__splits[vertex][face]];
            //     if (currValue.almostEqual(value))
            //         return;
            //     console.warn("Face Vertex Already Split with different value");
            // }
            this.__splits[vertex][face] = splitIndex;
        }
    }

    getSplits() {
        return this.__splits
    }

    getSplitCount() {
        let splitCount = 0;
        for (let vertex in this.__splits)
            splitCount += Object.keys(this.__splits[vertex]).length;
        return splitCount;
    }

    generateSplitValues(splitIndices, splitCount) {
        if (splitCount == 0)
            return this.__data;

        let numUnSplitValues = this.length;
        let count = this.length + splitCount;
        let numElems = this.__dataType.numFloat32Elements();
        let data = new Float32Array(count * numElems);
        for (let i = 0; i < this.__data.length; i++)
            data[i] = this.__data[i];

        // Now duplicate the split values to generate an attributes array 
        // usig the shared splits accross all attributes. 
        for (let vertex in splitIndices) {
            let faces = splitIndices[vertex]
            for (let face in faces) {
                let tgt = numUnSplitValues + faces[face];
                if (vertex in this.__splits && face in this.__splits[vertex]) {
                    // this attribue has a split value in its array. 
                    // we must use that value...
                    let src = this.__splits[vertex][face];
                    this.__dataType.createFromFloat32Buffer(data.buffer, tgt * numElems).setFromOther(this.__splitValues[src]);
                } else {
                    // Copy each scalar value to the new place in the array.
                    let src = parseInt(vertex);
                    for (let e = 0; e < numElems; e++) {
                        if (((src * numElems) + e) > this.__data.length) {
                            console.log("Error remapping src:" + (src * numElems) + e);
                        }
                        if (((tgt * numElems) + e) > data.length) {
                            console.log("Error remapping tgt:" + (tgt * numElems) + e);
                        }
                        data[(tgt * numElems) + e] = this.__data[(src * numElems) + e];
                    }
                }
            }
        }
        return data;
    }


    toJSON(opts) {
        let json = super.toJSON(opts);
        json.splits =  this.__splits;
        json.splitValues =  this.__splitValues;
        return json;
    }

    fromJSON(json) {
        super.fromJSON(json);
        this.__splits = json.splits;
        this.__splitValues = [];
        for(let valjson of  json.splitValues)
            this.__splitValues.push(this.__dataType.createFromJSON(valjson));
    }

};

export {
    VertexAttribute
};