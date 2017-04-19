import {
    Float32,
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Xfo,
    Signal
} from '../../Math';

import {
    BaseGeom
} from './BaseGeom.js';

import {
    Attribute
} from './Attribute.js';

import './VertexAttribute.js';

import {
    genTopologyInfo,
    computeFaceNormals,
    generateHardEdgesFlags,
    computeVertexNormals
} from './MeshFunctions.js';

class Mesh extends BaseGeom {
    constructor(name) {
        super(name);
        this.__faceCounts = [];
        this.__faceVertexCounts = new Uint8Array();
        this.__faceOffsets = new Uint32Array();
        this.__faceVertexIndices = new Uint32Array();
        this.__numPopulatedFaceVertexIndices = 0;

        this.__faceAttributes = new Map();
        this.__edgeAttributes = new Map();

        this.__logTopologyWarnings = false;

        this.edgeVerts = undefined;
        this.vertexEdges = undefined;
        this.numEdges = 0;
        this.edgeFlags = new Uint32Array();
    }

    getFaceVertexIndices() {
        return this.__faceVertexIndices;
    }

    getFaceCounts() {
        return this.__faceCounts;
    }

    clear() {
        this.__faceVertexIndices = undefined;
        this.__faceCounts = [];
        this.__numPopulatedFaceVertexIndices = 0;
    }

    setFaceCounts(faceCounts) {
        if (this.__numPopulatedFaceVertexIndices) {
            throw ("Cannot set face counts on a mesh that is already populated. Please call 'clear' before re-building the mesh.");
        }
        this.__faceCounts = faceCounts;

        let numFaces = 0;
        let numFacesVertices = 0;
        let numVertsPerFace = 3;
        for (let fc of this.__faceCounts) {
            numFaces += fc;
            numFacesVertices += fc * numVertsPerFace;
            numVertsPerFace++;
        }
        this.__faceVertexCounts = new Uint8Array(numFaces);
        this.__faceOffsets = new Uint32Array(numFaces);
        this.__faceVertexIndices = new Uint32Array(numFacesVertices);

        for (let attr of this.__faceAttributes)
            attr.resize(numFaces);
    }

    setFaceVertexIndices(faceIndex, /*vertexIndices*/ ) {
        let vertexIndices = Array.prototype.slice.call(arguments, 1);

        let start = this.__numPopulatedFaceVertexIndices;
        for (let i = 0; i < vertexIndices.length; i++) {
            this.__faceVertexIndices[start + i] = vertexIndices[i];
        }
        this.__faceVertexCounts[faceIndex] = vertexIndices.length - 3;
        this.__faceOffsets[faceIndex] = start;
        this.__numPopulatedFaceVertexIndices += vertexIndices.length;
    }

    getFaceVertexIndices(faceIndex) {
        let vertexIndices = [];
        let start = this.__faceOffsets[faceIndex];
        let count = this.__faceVertexCounts[faceIndex] + 3;
        for (let i = 0; i < count; i++) {
            vertexIndices.push(this.__faceVertexIndices[start + i]);
        }
        return vertexIndices;
    }

    getFaceVertexIndex(faceIndex, facevertex) {
        let start = this.__faceOffsets[faceIndex];
        return this.__faceVertexIndices[start + facevertex];
    }

    getNumFaces() {
        return this.__faceVertexCounts.length;
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

    ///////////////////////////
    // Edge Attributes

    addEdgeAttribute(name, dataType, count = undefined) {
        let attr = new Attribute(dataType, (count != undefined) ? count : this.getNumEdges());
        this.__edgeAttributes.set(name, attr);
        return attr;
    }

    hasEdgeAttribute(name) {
        return this.__edgeAttributes.has(name);
    }

    getEdgeAttribute(name) {
        return this.__edgeAttributes.get(name)
    }

    /////////////////////////////
    // Topology
    genTopologyInfo() {
        return genTopologyInfo(this);
    }
    generateHardEdgesFlags(hardAngle = 1.0) {
        return generateHardEdgesFlags(this, hardAngle);
    }
    computeVertexNormals(hardAngle = 1.0 /*radians*/ ) {
        return computeVertexNormals(this, hardAngle);
    }

    computeNumTriangles() {
        let numVertsPerFace = 3;
        let trisCount = 0;
        for (let fc of this.__faceCounts) {
            trisCount += fc * (numVertsPerFace - 2);
            numVertsPerFace++;
        }
        return trisCount;
    }

    generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices) {

        let faceCount = this.getNumFaces();
        // let faceVertexIndices = this.getFaceVertexIndices();

        let trisCount = this.computeNumTriangles();

        let trianglulatedIndices;
        if (totalNumVertices < Math.pow(2, 8)) 
            trianglulatedIndices = new Uint8Array(trisCount * 3);
        else if (totalNumVertices < Math.pow(2, 16)) 
            trianglulatedIndices = new Uint16Array(trisCount * 3);
        else
            trianglulatedIndices = new Uint32Array(trisCount * 3);

        let triangleVertex = 0;
        let addTriangleVertexIndex = function(vertex, faceIndex) {
            if (vertex in splitIndices && faceIndex in splitIndices[vertex])
                vertex = numUnSplitVertices + splitIndices[vertex][faceIndex];
            trianglulatedIndices[triangleVertex] = vertex;
            triangleVertex++;
        }
        let numFaces = this.getNumFaces();
        for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
            let faceVerts = this.getFaceVertexIndices(faceIndex);
            for (let j = 0; j < faceVerts.length; j++) {
                if (j >= 3) {
                    // For each aditional triangle, we have to add 2 indices.
                    addTriangleVertexIndex(faceVerts[0], faceIndex);
                    addTriangleVertexIndex(faceVerts[j - 1], faceIndex);
                }
                addTriangleVertexIndex(faceVerts[j], faceIndex);
            }
        }
        return trianglulatedIndices

    }


    computeHardEdgesIndices() {
        let hardEdges = [];
        let addEdge = (index) => {
            hardEdges.push(this.edgeVerts[index]);
            hardEdges.push(this.edgeVerts[index + 1]);
        }
        for (let i = 0; i < this.edgeFlags.length; i += 2) {
            let p0 = this.edgeFaces[i];
            let p1 = this.edgeFaces[i + 1];
            if (this.edgeFlags[i / 2] !== 0) {
                addEdge(i);
            }
        }
        return hardEdges;
    }

    getWireframeIndices() {
        return indices;
    }

/*
    loadBin(reader) {

        this.name = reader.loadStr();
        this.__boundingBox.set(reader.loadFloat32Vec3(), reader.loadFloat32Vec3());

        let normalsAttr = this.addVertexAttribute('normals', Vec3);
        let lightmapCoordsAttr = this.addVertexAttribute('lightmapCoords', Vec2);
        let clusterIDsAttr = this.addVertexAttribute('clusterIDs', Float32);

        let numVertices = reader.loadUInt32();
        this.setNumVertices(numVertices);

        let faceCounts_8bit = reader.loadUInt32Array();
        this.setFaceCounts(faceCounts_8bit);

        let numClusters = reader.loadUInt32();
        let clustersData = [];
        for (let i = 0; i < numClusters; i++) {
            let numVerts = reader.loadUInt32();
            let texelSize = reader.loadFloat32();
            let positions = reader.loadUInt16Array(numVerts * 3);
            let normals = reader.loadUInt8Array(numVerts * 2);
            let faceVertexCounts = reader.loadUInt8Array();
            let numFaceVerts = 0;
            for (let c of faceVertexCounts)
                numFaceVerts += 3 + c;
            let faceVertexIndices = reader.loadUInt8Array(numFaceVerts);
            clustersData.push({
                numVerts,
                texelSize,
                positions,
                normals,
                numFaceVerts,
                faceVertexCounts,
                faceVertexIndices
            });
        }

        let numClusterInstances = reader.loadUInt32();
        let vertices = this.vertices;
        let voffset = 0;
        let foffset = 0;
        let fvoffset = 0;
        for (let i = 0; i < numClusterInstances; i++) {
            let id = reader.loadUInt32();
            let mat4 = new Mat4();
            mat4.setFromMat3x4Array(reader.loadFloat32Array(12));
            let uvAtlasPos = new Vec2(reader.loadFloat32Array(2));
            let clusterId = reader.loadUInt32();

            let sclX = mat4.xAxis.length();
            let sclY = mat4.yAxis.length();
            let sclZ = mat4.zAxis.length();

            let normalMatrix;
            let normalQuat;
            if(true)
            {
                normalMatrix = mat4.toMat3();
                normalMatrix.xAxis.normalizeInPlace();
                normalMatrix.zAxis.normalizeInPlace();
                let xaxis = normalMatrix.xAxis;
                let zaxis = normalMatrix.zAxis;
                let yaxis = zaxis.cross(xaxis);
                yaxis.normalizeInPlace();
                normalMatrix.yAxis = yaxis;
                normalMatrix.transposeInPlace();
            }
            else //if(false)
            {
                normalMatrix = mat4.clone();
                // Note: cluster transforms often cannot be inverted due to zero scaling
                // on the axis.
                if(sclY < 0.0001)
                    normalMatrix.yAxis = normalMatrix.zAxis.cross(normalMatrix.xAxis).normalize();
                if(!normalMatrix.invertInPlace())
                    continue;
                normalMatrix.transposeInPlace();
            }


            let clusterData = clustersData[clusterId];
            let scaleFactor = (1 << 16)-1;
            for (let j = 0; j < clusterData.numVerts; j++) {
                let pos_x =  clusterData.positions[(j * 3) + 0] / scaleFactor;
                let pos_y =  clusterData.positions[(j * 3) + 1] / scaleFactor;
                let pos_z =  clusterData.positions[(j * 3) + 2] / scaleFactor;
                let pos = new Vec3(pos_x, pos_y, pos_z);
                vertices.setValue(voffset + j, mat4.transformVec3(pos));

                // Note: 127 represents 0.5, so our range of values is actualluy 0..124
                let normal_x =  clusterData.normals[(j * 2) + 0] / 254.0;
                let normal_z =  clusterData.normals[(j * 2) + 1] / 254.0;

                // Decompress the scalar value
                normal_x = (normal_x - 0.5) * 2.0;
                normal_z = (normal_z - 0.5) * 2.0;
                
                // const EXPONENT = 3.0;
                // normal_x = Math.pow(normal_x, EXPONENT);
                // normal_z = Math.pow(normal_z, EXPONENT);
                normal_x = normal_x * Math.HALF_PI;
                normal_z = normal_z * Math.HALF_PI;
                let normal = new Vec3(
                    Math.sin(normal_x),
                    Math.cos(normal_x),
                    Math.sin(normal_z)
                    );
                normal = normalMatrix.transformVec3(normal);
                normal.normalizeInPlace();
                normalsAttr.setValue(voffset + j, normal);

                let texCoord = new Vec2( (pos_x * sclX) / clusterData.texelSize, (pos_z * sclZ) / clusterData.texelSize);
                lightmapCoordsAttr.setValue(voffset + j, texCoord.add(uvAtlasPos));

                // for debugging.
                clusterIDsAttr.setFloat32Value(voffset + j, clusterId);
            }

            let numFaceVertexIndices = clusterData.faceVertexIndices.length;
            for (let j = 0; j < numFaceVertexIndices; j++) {
                this.__faceVertexIndices[fvoffset + j] = voffset + clusterData.faceVertexIndices[j];
            }
            
            let numClusterFaces = clusterData.faceVertexCounts.length;
            for (let j = 0; j < numClusterFaces; j++) {
                let faceVertexCount = clusterData.faceVertexCounts[j];
                this.__faceVertexCounts[foffset+j] = faceVertexCount;
                this.__faceOffsets[foffset+j] = fvoffset;
                fvoffset += 3 + faceVertexCount;
            }


            voffset += clusterData.numVerts;
            foffset += numClusterFaces;
        }

        // this.computeVertexNormals();
        this.geomDataChanged.emit();
    }
*/

    readBinary(reader) {
        super.loadBaseGeomBinary(reader);

        console.log("Loading:" + this.name);

        this.setFaceCounts(reader.loadUInt32Array());
        this.__faceVertexCounts = reader.loadUInt8Array(this.__faceVertexCounts.length);
        let offsetRange = reader.loadSInt32Vec2();
        let bytes = reader.loadUInt8();
        let faceVertexIndexDeltas;
        if(bytes == 1)
            faceVertexIndexDeltas = reader.loadUInt8Array();
        else if(bytes == 2)
            faceVertexIndexDeltas = reader.loadUInt16Array();
        else if(bytes == 4)
            faceVertexIndexDeltas = reader.loadUInt32Array();

        let numVerts = this.numVertices();

        let numFaces = this.getNumFaces();
        let offset = 0;
        let prevCount = 0;
        for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
            let count = this.__faceVertexCounts[faceIndex] + 3;
            this.__faceOffsets[faceIndex] = offset;
            for (let j = 0; j < count; j++) {
                let faceVertex = offset + j;
                let delta = faceVertexIndexDeltas[faceVertex] + offsetRange.x;
                if (faceIndex == 0)
                    this.__faceVertexIndices[faceVertex] = delta;
                else {
                    let prevFaceVertex = this.__faceOffsets[faceIndex - 1];
                    prevFaceVertex += (j < prevCount) ? j : (prevCount-1);
                    this.__faceVertexIndices[faceVertex] = this.__faceVertexIndices[prevFaceVertex] + delta;
                }
            }
            offset += count;
            prevCount = count;
        }
        this.__numPopulatedFaceVertexIndices = offset;

        /////////////////////////////////////
        // Clusters
        const numClusters = reader.loadUInt32();
        const positionsAttr = this.vertices;
        const lightmapCoordsAttr = this.addVertexAttribute('lightmapCoords', Vec2);
        // let clusterIDsAttr = this.addVertexAttribute('clusterIDs', Float32);
        for (let i = 0; i < numClusters; i++) {
            let xfo = new Xfo(reader.loadFloat32Vec3(), reader.loadFloat32Quat());
            const coordsScale = reader.loadFloat32();
            let offset = reader.loadFloat32Vec2();
            let offsetRange = reader.loadSInt32Vec2();
            let bytes = reader.loadUInt8();
            let clusterFaceIndiceDeltas;
            if(bytes == 1)
                clusterFaceIndiceDeltas = reader.loadUInt8Array();
            else if(bytes == 2)
                clusterFaceIndiceDeltas = reader.loadUInt16Array();
            else
                clusterFaceIndiceDeltas = reader.loadUInt32Array();
            let prevFace = 0;
            for (let delta of clusterFaceIndiceDeltas) {
                let face = delta + offsetRange.x;
                face += prevFace;
                prevFace = face;
                let vertexIndices = this.getFaceVertexIndices(face);
                for(let vertexIndex of vertexIndices){
                    let pos = positionsAttr.getValueRef(vertexIndex);
                    let tmp = xfo.transformVec3(pos);
                    let lightmapCoord = new Vec2(tmp.x, tmp.z); // Discard y, use x,z
                    lightmapCoord.scaleInPlace(coordsScale);
                    lightmapCoord.addInPlace(offset);
                    lightmapCoordsAttr.setFaceVertexValue_ByVertexIndex(face, vertexIndex, lightmapCoord);

                    // for debugging.
                    // clusterIDsAttr.setFaceVertexValue_ByVertexIndex(face, vertexIndex, i);
                }
            }

            // Now compute the Uvs for the vertices.
        }


        // this.computeVertexNormals();
        this.geomDataChanged.emit();
    }


    toJSON(attrList = undefined) {
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

    getTransferableData(opts) {
        let meshData = super.getTransferableData(opts);
        meshData[1].push(this.__faceCounts.buffer);
        meshData[1].push(this.__faceVertexIndices.buffer);
        return meshData;
    }
};

export {
    Mesh
};