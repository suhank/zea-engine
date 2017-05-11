import {
    Vec2
} from '../../Math/Vec2';
import {
    Xfo
} from '../../Math/Xfo';
import {
    BaseGeom
} from './BaseGeom.js';
import {
    Attribute
} from './Attribute.js';

import {
    Float32,
} from '../../Math';


class Mesh extends BaseGeom {
    constructor(name) {
        super(name);
        this.init();
    }

    init() {
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
        this.edgeAngles = new Float32Array();
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

    setFaceVertexIndices(faceIndex) {
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

    genTopologyInfo() {
        let connectedVertices = {}; // acceleration structure.
        this.vertexEdges = []; // 2d array of vertex to edges. 
        // this.vertexFaces = []; // 2d array of vertex to faces. 
        this.edgeFaces = []; // flat array of 2 face indices per edge
        this.edgeVerts = []; // flat array of 2 vert indices per edge
        this.faceEdges = []; // the edges bordering each face.
        this.numEdges = 0;

        let getEdgeIndex = (v0, v1) => {
            let tmp0 = v0;
            let tmp1 = v1;
            if (tmp1 < tmp0) {
                let tmp = tmp0;
                tmp0 = tmp1;
                tmp1 = tmp;
            }
            let key = tmp0 + '>' + tmp1;
            if (key in connectedVertices) {
                // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1) );
                return connectedVertices[key];
            }

            let p0 = this.vertices.getValueRef(tmp0);
            let p1 = this.vertices.getValueRef(tmp1);
            let edgeVec = p1.subtract(p0);

            let edgeIndex = this.edgeFaces.length / 2;
            let edgeData = {
                'edgeIndex': edgeIndex,
                'edgeVec': edgeVec
            }
            connectedVertices[key] = edgeData;

            this.edgeFaces.push(-1);
            this.edgeFaces.push(-1);
            this.edgeVerts.push(tmp0);
            this.edgeVerts.push(tmp1);
            // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1));

            this.numEdges++;
            return edgeData;
        }

        let addEdge = (v0, v1, faceIndex) => {
            // console.log('addEdge:' + v0 + " :" + v1 + " faceIndex:" + faceIndex );
            let edgeData = getEdgeIndex(v0, v1);
            let edgeIndex = edgeData.edgeIndex;
            let edgeVec = edgeData.edgeVec;
            if (v1 < v0) {
                let edgeFaceIndex = (edgeIndex * 2) + 0;
                if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
                    console.warn("Edge poly 0 already set. Mesh is non-manifold.");
                this.edgeFaces[edgeFaceIndex] = faceIndex;
            } else {
                let edgeFaceIndex = (edgeIndex * 2) + 1;
                if (this.__logTopologyWarnings && this.edgeFaces[edgeFaceIndex] != -1)
                    console.warn("Edge poly 1 already set. Mesh is non-manifold.");
                this.edgeFaces[edgeFaceIndex] = faceIndex;
            }

            if (!(faceIndex in this.faceEdges))
                this.faceEdges[faceIndex] = [];
            this.faceEdges[faceIndex].push(edgeIndex);

            // Push the edge index onto both vertex edge lists.
            // We use Sets to avoid adding the same edge 2x to the same vertex.
            if (this.vertexEdges[v0] == undefined) {
                this.vertexEdges[v0] = new Set();
            }
            if (this.vertexEdges[v1] == undefined) {
                this.vertexEdges[v1] = new Set();
            }
            this.vertexEdges[v0].add(edgeIndex);
            this.vertexEdges[v1].add(edgeIndex);

            // if (this.vertexFaces[v0] == undefined) {
            //     this.vertexFaces[v0] = [];
            // }
            // this.vertexFaces[v0].push(faceIndex);
        }

        let numFaces = this.getNumFaces();
        for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
            let faceVerts = this.getFaceVertexIndices(faceIndex);
            for (let j = 0; j < faceVerts.length; j++) {
                let v0 = faceVerts[j];
                let v1 = faceVerts[((j + 1) % faceVerts.length)];
                addEdge(v0, v1, faceIndex);
            }
        }
    }


    computeFaceNormals() {

        let vertices = this.vertices;
        let faceNormals = this.addFaceAttribute('normals', Vec3);
        let numFaces = this.getNumFaces();
        for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
            let faceVerts = this.getFaceVertexIndices(faceIndex);
            let p0 = vertices.getValueRef(faceVerts[0]);
            let p1 = vertices.getValueRef(faceVerts[1]);
            let prev = p1;
            let faceNormal = new Vec3();
            for (let j = 2; j < faceVerts.length; j++) {
                let pn = vertices.getValueRef(faceVerts[j]);
                let v0 = prev.subtract(p0);
                let v1 = pn.subtract(p0);
                faceNormal.addInPlace(v0.cross(v1).normalize());
                prev = pn;
            }
            if (faceNormal.lengthSquared() < Number.EPSILON) {
                // Note: we are getting many faces with no surface area. 
                // This is simply an authoring issue. 
                //console.warn("Invalid Mesh topology");
                // if(debugMesh){
                //     printf("Face vertices are coincident face:%i", i);
                //     for (let j = 0; j < faceVerts.length; j++)
                //         printf("v:%i", this.__faceVertexIndices[ numFacesVertices + (i*faceVerts.length) + j ]);
                //     printf("\n");
                // }
            }

            faceNormals.setValue(faceIndex, faceNormal.normalize());
        }
    }


    generateEdgeFlags() {

        if (this.vertexEdges == undefined)
            this.genTopologyInfo();

        if (!this.hasFaceAttribute('normals'))
            this.computeFaceNormals();

        let vertices = this.vertices;
        let faceNormals = this.getFaceAttribute("normals");
        this.edgeVecs = [];
        this.edgeFlags = new Uint32Array(this.numEdges);
        this.edgeAngles = new Float32Array();
        for (let i = 0; i < this.edgeFaces.length; i += 2) {

            let v0 = this.edgeVerts[i];
            let v1 = this.edgeVerts[i + 1];
            let e_vec = vertices.getValueRef(v1).subtract(vertices.getValueRef(v0));
            e_vec.normalizeInPlace();
            this.edgeVecs.push(e_vec);

            let p0 = this.edgeFaces[i];
            let p1 = this.edgeFaces[i + 1];
            if (p0 == -1 || p1 == -1) {
                // Flag the edge as a border edge....
                this.edgeFlags[i / 2] = 2;
                continue;
            }

            let n0 = faceNormals.getValueRef(p0);
            let n1 = faceNormals.getValueRef(p1);
            this.edgeAngles[i] = n0.angleTo(n1);
        }
    }

    computeVertexNormals(hardAngle = 1.0 /*radians*/ ) {

        if (this.vertexEdges == undefined)
            this.genTopologyInfo();

        if (!this.hasFaceAttribute('normals'))
            this.computeFaceNormals();

        this.generateEdgeFlags();

        let vertices = this.vertices;
        let faceNormals = this.getFaceAttribute('normals');
        let normalsAttr = this.addVertexAttribute('normals', Vec3);

        let compute_normals_start = performance.now();
        // let iter_edges_total = 0;
        // let set_normal_total = 0;

        // these methods are faster versions than using the methods
        // provided on the attributes. We cache values and use hard coded constants.
        let faceNormalsBuffer = faceNormals.data.buffer;
        let getFaceNormal = (index) => {
            return new Vec3(faceNormalsBuffer, index * 12); // 3 conmponents at 4 bytes each.
        }
        let vertexNormalsArray = normalsAttr.data;
        let setVertexNormal = (index, value) => {
            vertexNormalsArray[(index * 3) + 0] = value.x;
            vertexNormalsArray[(index * 3) + 1] = value.y;
            vertexNormalsArray[(index * 3) + 2] = value.z;
        }
        let getConnectedEdgeVecs = (faceIndex, vertexIndex) => {
            let e0, e1;
            let faceEdges = this.faceEdges[faceIndex];
            for (let e of faceEdges) {
                if (this.edgeVerts[(e * 2)] == vertexIndex) {
                    if (!e0) e0 = this.edgeVecs[e];
                    else e1 = this.edgeVecs[e];
                } else if (this.edgeVerts[(e * 2) + 1] == vertexIndex) {
                    if (!e0) e0 = this.edgeVecs[e];
                    else e1 = this.edgeVecs[e];
                }
            }
            return [e0, e1];
        }

        for (let i = 0; i < this.vertexEdges.length; i++) {

            // If this face indexing doesn't start at 0, then the vertexEdges don't either. 
            if (this.vertexEdges[i] == undefined)
                continue;

            let v = vertices.getValueRef(i);
            let edges = this.vertexEdges[i];

            // Groups of faces having a smooth normal at the current vertex.
            let faceGroups = [];
            let addFaceToGroup = (facegon) => {
                let inGroup = false;
                for (let faceGroup of faceGroups) {
                    inGroup = faceGroup.indexOf(facegon) != -1;
                    if (inGroup)
                        break;
                }
                if (!inGroup)
                    faceGroups.push([facegon]);
            }
            let smooth = true;
            for (let e of edges) {
                let p0 = this.edgeFaces[e * 2];
                let p1 = this.edgeFaces[(e * 2) + 1];
                if (this.edgeAngles[e] < hardAngle) {
                    // This is a smooth edge... Add both faces to the same group.
                    let addedtoGroup = false;
                    let p0groupIndex = -1;
                    let p1groupIndex = -1;
                    for (let groupIndex = 0; groupIndex < faceGroups.length; groupIndex++) {
                        if (p0groupIndex == -1 && faceGroups[groupIndex].indexOf(p0) != -1)
                            p0groupIndex = groupIndex;
                        if (p1groupIndex == -1 && faceGroups[groupIndex].indexOf(p1) != -1)
                            p1groupIndex = groupIndex;
                    }
                    if (p0groupIndex == -1 && p1groupIndex == -1) {
                        faceGroups.push([p0, p1]);
                    } else if (p0groupIndex != -1 && p1groupIndex != -1) {
                        if (p0groupIndex != p1groupIndex) {
                            // Merge the 2 groups that the smooth edge joins.
                            faceGroups[p0groupIndex] = faceGroups[p0groupIndex].concat(faceGroups[p1groupIndex]);
                            faceGroups.splice(p1groupIndex, 1);
                        }
                    } else {
                        if (p0groupIndex == -1) {
                            faceGroups[p1groupIndex].push(p0);
                        }
                        if (p1groupIndex == -1) {
                            faceGroups[p0groupIndex].push(p1);
                        }
                    }
                    continue;
                }
                smooth = false;
                // This is a hard edge or a border edge... Add faces separately group.
                if (p0 != -1)
                    addFaceToGroup(p0);
                if (p1 != -1)
                    addFaceToGroup(p1);
            }

            // Sort the groups to have the biggest group first.
            faceGroups.sort((a, b) => (a.length < b.length) ? 1 : ((a.length > b.length) ? -1 : 0));

            let firstVirtex = true;
            for (let faceGroup of faceGroups) {
                let normal = new Vec3();
                for (let faceIndex of faceGroup) {
                    let face_edges = getConnectedEdgeVecs(faceIndex, i);
                    let weight = face_edges[0].angleTo(face_edges[1]);
                    // if (i == 1) 
                    //     console.log("FaceNormal:" + faceIndex + ":" + getFaceNormal(faceIndex).toString());
                    normal.addInPlace(getFaceNormal(faceIndex).scale(weight));
                }
                normal.normalizeInPlace();
                if (firstVirtex) {
                    setVertexNormal(i, normal);
                    firstVirtex = false;
                } else {
                    normalsAttr.setSplitVertexValues(i, faceGroup, normal);
                }
            }
        }

        // console.log("==Compute Normals: " + (performance.now() - compute_normals_start) + " ==");
        // console.log("==Compute Nomals timings: " + this.vertexEdges.length + " ==");
        // console.log("iter_edges_total : " + iter_edges_total);
        // console.log("set_normal_total : " + set_normal_total);

        return normalsAttr;
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


    computeHardEdgesIndices(hardAngle = 1.0) {
        let hardEdges = [];
        let addEdge = (index) => {
            hardEdges.push(this.edgeVerts[index]);
            hardEdges.push(this.edgeVerts[index + 1]);
        }
        for (let i = 0; i < this.edgeFlags.length; i += 2) {
            let p0 = this.edgeFaces[i];
            let p1 = this.edgeFaces[i + 1];
            if (this.edgeAngles[i / 2] > hardAngle) {
                addEdge(i);
            }
        }
        return hardEdges;
    }

    getWireframeIndices() {
        return indices;
    }



    //////////////////////////////////////////
    // Memory


    genBuffers() {

        // Compute the normals on demand. 
        // if (!('normals' in this.__vertexAttributes)) {
        //     // this.__geom.computeVertexNormals();
        //     this.addVertexAttribute("normals", Vec3, 0.0);
        // }

        let splitIndices = {};
        let splitCount = 0;
        for (let [attrName, attr] of this.__vertexAttributes) {

            let attrSplits = attr.getSplits();
            for (let polygon in attrSplits) {
                if (!(polygon in splitIndices))
                    splitIndices[polygon] = {};
                let vertices = attrSplits[polygon];
                for (let v in vertices) {
                    let vertex = parseInt(v);
                    if (!(vertex in splitIndices[polygon])) {
                        splitIndices[polygon][vertex] = splitCount;
                        splitCount++;
                    }
                }
            }
        }

        let numUnSplitVertices = this.vertices.length;
        let totalNumVertices = numUnSplitVertices + splitCount;
        let indices = this.generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices);

        // Create some vertex attribute buffers
        let debugAttrValues = false;
        let maxIndex;
        if (debugAttrValues)
            maxIndex = Math.max(...indices);
        let attrBuffers = {};
        for (let [attrName, attr] of this.__vertexAttributes) {
            let values;
            if (splitCount == 0)
                values = attr.data;
            else
                values = attr.generateSplitValues(splitIndices, splitCount);

            let dimension = attr.numFloat32Elements;
            let count = values.length / dimension;

            if (debugAttrValues) {
                if (count <= maxIndex)
                    console.warn("Invalid indexing. Attr value is insufficient for indexing:" + attrName + ". Max Index:" + maxIndex + " Attr Size:" + count);
            }

            attrBuffers[attrName] = {
                values: values,
                count: count,
                dimension: dimension,
                normalized: attrName == 'normals'
            };
        }

        return {
            numVertices: this.numVertices(),
            indices,
            attrBuffers
        };

    }

    freeData() {
        super.freeData();
        this.init();
    }

    //////////////////////////////////////////
    // Persistence

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
        this.setFaceCounts(reader.loadUInt32Array());
        this.__faceVertexCounts = reader.loadUInt8Array(this.__faceVertexCounts.length);
        let offsetRange = reader.loadSInt32Vec2();
        let bytes = reader.loadUInt8();
        let faceVertexIndexDeltas;
        if (bytes == 1)
            faceVertexIndexDeltas = reader.loadUInt8Array();
        else if (bytes == 2)
            faceVertexIndexDeltas = reader.loadUInt16Array();
        else if (bytes == 4)
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
                    prevFaceVertex += (j < prevCount) ? j : (prevCount - 1);
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
            if (bytes == 1)
                clusterFaceIndiceDeltas = reader.loadUInt8Array();
            else if (bytes == 2)
                clusterFaceIndiceDeltas = reader.loadUInt16Array();
            else
                clusterFaceIndiceDeltas = reader.loadUInt32Array();
            let prevFace = 0;
            for (let delta of clusterFaceIndiceDeltas) {
                let face = delta + offsetRange.x;
                face += prevFace;
                prevFace = face;
                let vertexIndices = this.getFaceVertexIndices(face);
                for (let vertexIndex of vertexIndices) {
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
//export default Mesh;