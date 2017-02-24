import {
    Vec3,
    Box3,
    Signal,
    typeRegistry
} from '../../Math/Math.js';

import {
    RefCounted
} from '../RefCounted.js';

import './Attribute.js';
import {
    VertexAttribute
} from './VertexAttribute.js';

class BaseGeom extends RefCounted {
    constructor(name) {
        super();
        this.name = name;
        this.__boundingBox = new Box3();
        this.__boundingBoxDirty = true;
        this.__vertexAttributes = new Map();
        this.__metaData = new Map();
        this.addVertexAttribute('positions', Vec3, 0.0);

        this.boundingBoxChanged = new Signal();
        this.geomDataChanged = new Signal();
        this.geomDataTopologyChanged = new Signal();
        this.destructing = new Signal();
    }

    destroy(){
        this.destructing.emit();
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

    getVertexAttributes(name) {
        let vertexAttributes = {};
        for (let [key, attr] of this.__vertexAttributes.entries())
            vertexAttributes[key] = attr;
        return vertexAttributes
    }

    get vertices() {
        return this.__vertexAttributes.get('positions')
    }

    numVertices() {
        return this.vertices.length;
    }

    setNumVertices(count) {
        // If this works, remove the old version.
        // for (let [key, attr] of this.__vertexAttributes.entries())
        //     attr.resize(count);
        this.__vertexAttributes.forEach(attr => attr.resize(count));
    }

    getVertex(index) {
        return Vec3.createFromFloat32Buffer(this.vertices.data.buffer, index * 3)
    }

    setVertex(index, vec3) {
        return Vec3.createFromFloat32Buffer(this.vertices.data.buffer, index * 3).setFromOther(vec3)
    }

    moveVertices(delta){
        let vertices = this.vertices;
        for(let i=0; i<vertices.length; i++)
            vertices.getValueRef(i).addInPlace(delta);
        this.setBoundingBoxDirty();
    }

    //////////////////////////////////////////
    // BoundingBox

    get boundingBox() {
        if(this.__boundingBoxDirty)
            this.updateBoundingBox();
        return this.__boundingBox;
    }

    setBoundingBoxDirty(){
        this.__boundingBoxDirty = true;
        this.boundingBoxChanged.emit();
    }

    updateBoundingBox(){
        let vertices = this.vertices;
        let bbox = new Box3();
        let numVerts = vertices.length;
        for(let i=0; i<numVerts; i++)
            bbox.addPoint(vertices.getValueRef(i));
        this.__boundingBox = bbox;
    }

    //////////////////////////////////////////
    // Metadata

    getMetadata(key) {
        return this.__metaData.get(key)
    }

    hasMetadata(key) {
        return this.__metaData.has(key)
    }

    setMetadata(key, metaData) {
        this.__metaData.set(key, metaData);
    }

    //////////////////////////////////////////
    // Persistence
    
    loadBaseGeomBin(reader){

        this.name = reader.loadStr();
        let numVerts = reader.loadUInt32();
        this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
        this.setNumVertices(numVerts);
        let vertices = this.vertices;

        if (numVerts < 256) {
            let bboxMat = this.__boundingBox.toMat4();
            let posAttr_8bit = reader.loadUInt8Array(numVerts*3);
            for (let i = 0; i<numVerts; i++) {
                let pos = new Vec3(
                    posAttr_8bit[(i * 3) + 0] / 255.0, 
                    posAttr_8bit[(i * 3) + 1] / 255.0, 
                    posAttr_8bit[(i * 3) + 2] / 255.0
                    );
                vertices.setValue(i, bboxMat.transformVec3(pos));
            }
        }
        else{
            let numClusters = reader.loadUInt32();
            let clusters = [];
            for (let i = 0; i < numClusters; i++) {
                let range = reader.loadUInt32Vec2();
                let p0 = reader.loadFloat32Vec3();
                let p1 = reader.loadFloat32Vec3();
                clusters.push({
                    'range': range,
                    'bbox': new Box3(p0, p1)
                });
            }
            let posAttr_8bit = reader.loadUInt8Array(numVerts*3);

            for (let i = 0; i < numClusters; i++) {
                let bboxMat = clusters[i]['bbox'].toMat4();
                for (let j = clusters[i]['range'].x; j < clusters[i]['range'].y; j++) {
                    let pos = new Vec3(
                        posAttr_8bit[(j * 3) + 0] / 255.0, 
                        posAttr_8bit[(j * 3) + 1] / 255.0, 
                        posAttr_8bit[(j * 3) + 2] / 255.0
                        );
                    vertices.setValue(j, bboxMat.transformVec3(pos));
                }
            }
        }
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
                let dataType = typeRegistry.getType(attrJSON.dataType);
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

    toString() {
        return JSON.stringify(this.toJSON(), null, 2)
    }
};

export {
    BaseGeom
};
