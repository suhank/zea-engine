import Vec3 from '../../Math/Vec3';
import Box3 from '../../Math/Box3';
import Signal from '../../Math/Signal';
import typeRegistry from '../../Math/TypeRegistry';
import RefCounted from '../RefCounted.js';
import VertexAttribute from './VertexAttribute.js';

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
        this.__boundingBoxDirty = false;
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
    // Memory
    
    freeData(){
        // Before destroying all our data, 
        // make sure the bbox is up to date.
        if (this.__boundingBoxDirty)
            this.updateBoundingBox();
        this.__vertexAttributes = new Map();
    }

    //////////////////////////////////////////
    // Persistence
    
    loadBaseGeomBinary(reader){

        this.name = reader.loadStr();
        this.debugColor = reader.loadRGBFloat32Color();
        let numVerts = reader.loadUInt32();
        this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());

        this.setNumVertices(numVerts);
        let positionsAttr = this.vertices;
        let normalsAttr = this.getVertexAttribute('normals');
        if(!normalsAttr)
            normalsAttr = this.addVertexAttribute('normals', Vec3, 0.0)

        let load8BitPositionsArray = (start, end, offset, sclVec, positions_8bit)=>{
            for (let i = start; i<end; i++) {
                let pos = new Vec3(
                    positions_8bit[(i * 3) + 0] / 255.0, 
                    positions_8bit[(i * 3) + 1] / 255.0, 
                    positions_8bit[(i * 3) + 2] / 255.0
                    );
                pos.multiplyInPlace(sclVec);
                pos.addInPlace(offset);
                positionsAttr.setValue(i, pos);
            }

        }

        let load8BitNormalsArray = (start, end, offset, sclVec, normals_8bit)=>{
            if(sclVec.isNull())
                sclVec.set(1,1,1);
            for (let i = start; i<end; i++) {    
                let normal = new Vec3(
                    normals_8bit[(i * 3) + 0] / 255.0, 
                    normals_8bit[(i * 3) + 1] / 255.0, 
                    normals_8bit[(i * 3) + 2] / 255.0
                    );
                normal.multiplyInPlace(sclVec);
                normal.addInPlace(offset);
                normal.normalizeInPlace();
                normalsAttr.setValue(i, normal);
            }
        }

        let numClusters = reader.loadUInt32();
        if (numClusters == 1) {
            let box3 = this.__boundingBox;
            let positions_8bit = reader.loadUInt8Array(numVerts*3);
            load8BitPositionsArray(0, numVerts, box3.p0, box3.diagonal(), positions_8bit);

            box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
            let normals_8bit = reader.loadUInt8Array(numVerts*3);
            load8BitNormalsArray(0, numVerts, box3.p0, box3.diagonal(), normals_8bit);

            normalsAttr.loadSplitValues(reader);
        }
        else{
            let clusters = [];
            let offset = 0;
            for (let i = 0; i < numClusters; i++) {
                let count = reader.loadUInt32();
                let box3 = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                let normalsRange = new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());
                clusters.push({
                    'range': [offset, offset + count],
                    'bbox': box3,
                    'normalsRange': normalsRange
                });

                offset += count;
            }
            let positions_8bit = reader.loadUInt8Array(numVerts*3);
            let normals_8bit = reader.loadUInt8Array(numVerts*3);

            for (let i = 0; i < numClusters; i++) {

                let box3 = clusters[i].bbox;
                load8BitPositionsArray(clusters[i].range[0], clusters[i].range[1], box3.p0, box3.diagonal(), positions_8bit);
                
                box3 = clusters[i].normalsRange;
                load8BitNormalsArray(clusters[i].range[0], clusters[i].range[1], box3.p0, box3.diagonal(), normals_8bit);
            }
            normalsAttr.loadSplitValues(reader);
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

export default BaseGeom;
