import {
    Float32,
    Vec2,
    Vec3,
    Mat4,
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

    generateTriangulatedIndices(numUnSplitVertices, splitIndices) {

        let faceCount = this.getNumFaces();
        // let faceVertexIndices = this.getFaceVertexIndices();

        let trisCount = this.computeNumTriangles();

        let trianglulatedIndices = new Uint32Array(trisCount * 3);

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


    // populateTriangulatedIndices(splitData, trianglulatedIndices, indicesOffset, attrOffset) {

    //     let trisCount = this.computeNumTriangles();

    //     let faceVertexIndices = this.getFaceVertexIndices();
    //     let faceCounts = this.getFaceCounts();
    //     let faceCount = this.getNumFaces();
    //     let numVertsPerFace = 3;
    //     let numFaceVertices = 0;
    //     let faceIndex = 0;
    //     let triangleVertex = 0;
    //     let addTriangleVertexIndex = function(vertex, faceIndex) {
    //         if (vertex in splitIndices && faceIndex in splitIndices[vertex])
    //             vertex = numUnSplitVertices + splitIndices[vertex][faceIndex];
    //         trianglulatedIndices[indicesOffset+triangleVertex] = attrOffset+vertex;
    //         triangleVertex++;
    //     }
    //     for (let fc of faceCounts) {
    //         for (let i = 0; i < fc; i++) {
    //             for (let j = 0; j < numVertsPerFace; j++) {
    //                 if (j >= 3) {
    //                     // For each aditional triangle, we have to add 2 indices.
    //                     addTriangleVertexIndex(faceVertexIndices[numFaceVertices + (i * numVertsPerFace)], faceIndex);
    //                     addTriangleVertexIndex(faceVertexIndices[numFaceVertices + (i * numVertsPerFace) + (j - 1)], faceIndex);
    //                 }
    //                 addTriangleVertexIndex(faceVertexIndices[numFaceVertices + (i * numVertsPerFace) + j], faceIndex);
    //             }
    //             faceIndex++;
    //         }
    //         numFaceVertices += fc * numVertsPerFace;
    //         numVertsPerFace++;
    //     }
    //     return trianglulatedIndices

    // }


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

            // Note: cluster transforms often cannot be inverted due to zero scaling
            // on the axis.
            let normalMatrix = mat4.clone();
            for(let i=0; i<normalMatrix.__data.length; i++)
                normalMatrix.__data[i] *= 100.0;
            if(sclY < 0.0001)
                normalMatrix.yAxis = normalMatrix.zAxis.cross(normalMatrix.xAxis).normalize();
            normalMatrix = normalMatrix.inverse();
            if(!normalMatrix)
                continue;
            normalMatrix.transposeInPlace();
            for(let i=0; i<normalMatrix.__data.length; i++)
                normalMatrix.__data[i] /= 100.0;

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
                normalsAttr.setValue(voffset + j, normalMatrix.transformVec3(normal));

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