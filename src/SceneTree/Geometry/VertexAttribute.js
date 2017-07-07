import { Attribute } from './Attribute.js';
import {
    Float32
} from '../../Math';


class VertexAttribute extends Attribute {
    constructor(geom, dataType, expectedSize, defaultScalarValue) {
        super(dataType, expectedSize, defaultScalarValue)
        this.__geom = geom // TODO: WeakRef??

        this.__splits = {};
        this.__splitValues = [];
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
        this.setFaceVertexValue_ByVertexIndex(face, vertex, value);
    }

    setFaceVertexValue_ByVertexIndex(face, vertex, value) {

        let valueRef = this.getValueRef(vertex);
        if (!valueRef.isValid()) {
            // the value is uninitialized. Initialize it.
            valueRef.setFromOther(value);
        } else if (valueRef.approxEqual(value)) {
            // Reusing vertex value. Do nothing
        }  else{
            // The new value is different from the existing value

            if (vertex in this.__splits){
                // Now check if any existing splits for this vertex match the value being set.
                // i.e. for faces around a vertex, there will often be a seam along 2 edges
                // where the values differ. On each side of the seam, all faces can use the same
                // value. We should see then only one split value for the vertex.
                let vertexSplitIds = this.__splits[vertex];
                for(let fid in vertexSplitIds) {
                    let splitId = vertexSplitIds[fid];
                    if(this.__splitValues[splitId].approxEqual(value)){
                        // re-use this split value
                        vertexSplitIds[face] = splitId;
                        return;
                    }
                }

                // If a split already exists for this face, re-use it.
                if(face in this.__splits[vertex]) {
                    let valueRef = this.__splitValues[this.__splits[vertex][face]];
                    valueRef.setFromOther(value);
                    return;
                }
            } else {
                this.__splits[vertex] = {};
            }
            this.__splits[vertex][face] = this.__splitValues.length;
            this.__splitValues.push(value);
        }
    }

    setSplitVertexValue(vertex, face, value) {
        if (!(vertex in this.__splits))
            this.__splits[vertex] = {};
        if (face in this.__splits[vertex]) {
            let currValue = this.__splitValues[this.__splits[vertex][face]];
            if (currValue.approxEqual(value))
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
            //     if (currValue.approxEqual(value))
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
        let numElems = this.__dataType == Float32 ? 1 : this.__dataType.numFloat32Elements();
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
                    if(this.__dataType == Float32)
                        data[tgt * numElems] = this.__splitValues[src];
                    else
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

    loadSplitValues(reader){

        let splitIndices = reader.loadUInt32Array();
        if(splitIndices.length == 0)
            return;
        console.log("loadSplitValues:" + splitIndices.length );
        let offset = 0;
        let numSplitValues = 0;
        while (true) {
            let vertexId = splitIndices[offset++];
            let numSplits = splitIndices[offset++];

            let splits = {};
            for (let i = 0; i<numSplits; i++) {
                let faceId = splitIndices[offset++];
                let splitId = splitIndices[offset++];
                splits[faceId] = splitId;
                if(splitId >= numSplitValues)
                    numSplitValues = splitId+1;
            }
            this.__splits[vertexId] = splits;
            if(offset >= splitIndices.length)
                break;
        }
        let dim = this.__numFloat32Elements;
        let splitValues = reader.loadFloat32Array(numSplitValues*dim);
        this.__splitValues = [];
        for (let i = 0; i<numSplitValues; i++) {
            let val = this.__dataType.createFromFloat32Array(splitValues.slice(i*dim, (i*dim)+dim));
            this.__splitValues.push(val);
        }
    }

};

export {
    VertexAttribute
};
//export default VertexAttribute;