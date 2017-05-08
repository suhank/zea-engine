import AttrValue from '../../Math/AttrValue';
import Vec2 from '../../Math/Vec2';
import Vec3 from '../../Math/Vec3';
import RefCounted from '../RefCounted.js';
import Attribute from './Attribute.js';
import VertexAttribute from './VertexAttribute.js';

import {
    genTopologyInfo,
    computeFaceNormals,
    generateHardEdgesFlags,
    computeVertexNormals
} from './MeshFunctions.js';

class BaseGeom {
    constructor() {
        this.__vertexAttributes = new Map();
    }

    addVertexAttribute(name, dataType, defaultScalarValue = undefined) {
        let attr = new VertexAttribute(this, dataType, (this.vertices != undefined) ? this.vertices.length : 0, defaultScalarValue);
        this.__vertexAttributes.set(name, attr);
        return attr;
    }

    hasVertexAttribute(name) {
        return this.__vertexAttributes.has(name);
    }

    getVertexAttribute(name) {
        return this.__vertexAttributes.get(name)
    }

    get vertices() {
        return this.__vertexAttributes.get('positions')
    }

    numVertices() {
        return this.vertices.length;
    }


    toJSON(opts) {
        let vertexAttributes = {};
        for (let [key, attr] of this.__vertexAttributes.entries()){
            if(!opts || !('attrList' in opts) || opts.attrList.indexOf(key) != -1)
                vertexAttributes[key] = attr.toJSON(opts);
        }
        return {
            'name': this.name,
            'vertexAttributes': vertexAttributes
        }
    }

    fromJSON(json) {
        for (let name in json.vertexAttributes){
            let attr = this.__vertexAttributes.get(name);
            let attrJSON = json.vertexAttributes[name];
            if(!attr){
                let dataType;
                if(attrJSON.dataType == 'Vec3')
                    dataType = Vec3;
                attr = new VertexAttribute(this, dataType, 0, attrJSON.defaultScalarValue);
                this.__vertexAttributes.set(name, attr);
            }
            attr.fromJSON(attrJSON);
        }
    }

    getTransferableData(opts){
        let geomData = this.toJSON(opts);
        let transferables = [];
        for(let name in geomData.vertexAttributes)
            transferables.push(geomData.vertexAttributes[name].data.buffer);
        return [geomData, transferables];
    }
};

class Mesh extends BaseGeom {
    constructor() {
        super();
        this.__faceCounts = [];
        this.__faceVertexIndices = new Uint32Array();

        this.__faceAttributes = new Map();
        this.__edgeAttributes = new Map();

        this.__logTopologyWarnings = false;

        this.edgeVerts = undefined;
        this.vertexEdges = undefined;
        this.numEdges = 0;
        this.edgeFlags = new Uint32Array();
    }

    getNumFaces() {
        let numFaces = 0;
        for (let fc of this.__faceCounts)
            numFaces += fc;
        return numFaces;
    }

    /////////////////////////////
    // Face Attributes

    addFaceAttribute(name, dataType, count = undefined) {
        let attr = new Attribute(dataType, (count != undefined) ? count : this.getNumFaces());
        this.__faceAttributes.set(name, attr);
        return attr;
    }

    hasFaceAttribute(name) {
        return this.__faceAttributes.has(name);
    }

    getFaceAttribute(name) {
        return this.__faceAttributes.get(name)
    }

    toJSON(attrList=undefined) {
        let json = super.toJSON(attrList);
        json['faceCounts'] = this.__faceCounts;
        json['faceVertexIndices'] = this.__faceVertexIndices;
        return json
    }

    fromJSON(json) {
        super.fromJSON(json);
        this.__faceCounts = json['faceCounts'];
        this.__faceVertexIndices = json['faceVertexIndices'];
    }

    getTransferableData(opts){
        let meshData = super.getTransferableData(opts);
        meshData[1].push(this.__faceCounts.buffer);
        meshData[1].push(this.__faceVertexIndices.buffer);
        return meshData;
    }
};

let threadId = 0;
let timeComputing = 0;
let computeNormalsMessage = 
    "let _Math = { };\n" + 
    AttrValue.toString() + "\n let _AttrValue = { 'AttrValue':AttrValue };\n _Math.AttrValue = AttrValue;\n" + 
    Vec2.toString() + "\n _Math.Vec2 = Vec2;\n" + 
    Vec3.toString() + "\n _Math.Vec3 = Vec3;\n" + 
    RefCounted.toString() + "\n let _RefCounted = { 'RefCounted':RefCounted };\n" + 
    Attribute.toString() + "\n let _Attribute = { 'Attribute':Attribute };\n" + 
    VertexAttribute.toString() + "\n let _VertexAttribute = { 'VertexAttribute':VertexAttribute };\n" + 
    BaseGeom.toString() + '\n' + 
    Mesh.toString() +  '\n' + 
    "let genTopologyInfo = " + genTopologyInfo.toString() + "\n" + 
    "let computeFaceNormals = " + computeFaceNormals.toString() + "\n" + 
    "let generateHardEdgesFlags = " + generateHardEdgesFlags.toString() + "\n" + 
    "let computeVertexNormals = " + computeVertexNormals.toString() + "\n" + `
this.onmessage = function(e) {
    switch (e.data.msg) {
        case 'init':
            threadId = e.data.threadId;
            timeComputing = 0;
            break;
        case 'compute':
            let mesh = new Mesh();
            mesh.fromJSON(e.data.meshData);
            let start = performance.now();
            computeVertexNormals( mesh );
            let computeTime = performance.now() - start;
            timeComputing += computeTime;
            let transferdata = mesh.getTransferableData();
            postMessage({
                'computeTime': computeTime,
                'meshData': transferdata[0]
            },transferdata[1]);
            break;
        case 'logTime':
            console.log(threadId + " timeComputing:" + timeComputing.toFixed(1));
    }
}`;

export {
    computeNormalsMessage
};
//export default computeNormalsMessage;