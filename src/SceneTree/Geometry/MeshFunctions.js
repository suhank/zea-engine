import { Vec3 } from '../../Math/Vec3';


/////////////////////////////
// Topology

let genTopologyInfo = function(mesh){

    let vertices = mesh.vertices;
    let connectedVertices = {}; // acceleration structure.
    mesh.vertexEdges = []; // 2d array of vertex to edges. 
    // mesh.vertexFaces = []; // 2d array of vertex to faces. 
    mesh.edgeFaces = []; // flat array of 2 face indices per edge
    mesh.edgeVerts = []; // flat array of 2 vert indices per edge
    mesh.faceEdges = []; // the edges bordering each face.
    mesh.numEdges = 0;

    let getEdgeIndex = function(v0, v1) {
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

        let p0 = vertices.getValueRef(tmp0);
        let p1 = vertices.getValueRef(tmp1);
        let edgeVec = p1.subtract(p0);

        let edgeIndex = mesh.edgeFaces.length / 2;
        let edgeData = {
            'edgeIndex': edgeIndex,
            'edgeVec': edgeVec
        }
        connectedVertices[key] = edgeData;

        mesh.edgeFaces.push(-1);
        mesh.edgeFaces.push(-1);
        mesh.edgeVerts.push(tmp0);
        mesh.edgeVerts.push(tmp1);
        // console.log(key + ':' + connectedVertices[key] + " face:" + ( v0 < v1 ? 0 : 1));

        mesh.numEdges++;
        return edgeData;
    }

    let addEdge = function(v0, v1, faceIndex) {
        // console.log('addEdge:' + v0 + " :" + v1 + " faceIndex:" + faceIndex );
        let edgeData = getEdgeIndex(v0, v1);
        let edgeIndex = edgeData.edgeIndex;
        let edgeVec = edgeData.edgeVec;
        if (v1 < v0) {
            let edgeFaceIndex = (edgeIndex * 2) + 0;
            if (mesh.__logTopologyWarnings && mesh.edgeFaces[edgeFaceIndex] != -1)
                console.warn("Edge poly 0 already set. Mesh is non-manifold.");
            mesh.edgeFaces[edgeFaceIndex] = faceIndex;
        } else {
            let edgeFaceIndex = (edgeIndex * 2) + 1;
            if (mesh.__logTopologyWarnings && mesh.edgeFaces[edgeFaceIndex] != -1)
                console.warn("Edge poly 1 already set. Mesh is non-manifold.");
            mesh.edgeFaces[edgeFaceIndex] = faceIndex;
        }

        if (!(faceIndex in mesh.faceEdges))
            mesh.faceEdges[faceIndex] = [];
        mesh.faceEdges[faceIndex].push(edgeIndex);

        // Push the edge index onto both vertex edge lists.
        // We use Sets to avoid adding the same edge 2x to the same vertex.
        if (mesh.vertexEdges[v0] == undefined) {
            mesh.vertexEdges[v0] = new Set();
        }
        if (mesh.vertexEdges[v1] == undefined) {
            mesh.vertexEdges[v1] = new Set();
        }
        mesh.vertexEdges[v0].add(edgeIndex);
        mesh.vertexEdges[v1].add(edgeIndex);

        // if (mesh.vertexFaces[v0] == undefined) {
        //     mesh.vertexFaces[v0] = [];
        // }
        // mesh.vertexFaces[v0].push(faceIndex);
    }

    let numFaces = mesh.getNumFaces();
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
        let faceVerts = mesh.getFaceVertexIndices(faceIndex);
        for (let j = 0; j < faceVerts.length; j++) {
            let v0 = faceVerts[j];
            let v1 = faceVerts[((j + 1) % faceVerts.length)];
            addEdge(v0, v1, faceIndex);
        }
    }
}

let computeFaceNormals = function(mesh){

    let vertices = mesh.vertices;
    let faceNormals = mesh.addFaceAttribute('normals', Vec3);
    let numFaces = mesh.getNumFaces();
    for (let faceIndex = 0; faceIndex < numFaces; faceIndex++) {
        let faceVerts = mesh.getFaceVertexIndices(faceIndex);
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
            //         printf("v:%i", mesh.__faceVertexIndices[ numFacesVertices + (i*faceVerts.length) + j ]);
            //     printf("\n");
            // }
        }

        faceNormals.setValue(faceIndex, faceNormal.normalize());
    }
}


let generateHardEdgesFlags = (mesh, hardAngle = 1.0 /*radians*/ )=>{

    if (mesh.vertexEdges == undefined)
        genTopologyInfo(mesh);

    if (!mesh.hasFaceAttribute('normals'))
        computeFaceNormals(mesh);

    let vertices = mesh.vertices;
    let faceNormals = mesh.getFaceAttribute("normals");
    let cosHardAngle = Math.cos(hardAngle);
    mesh.edgeVecs = [];
    mesh.edgeFlags = new Uint32Array(mesh.numEdges);
    for (let i = 0; i < mesh.edgeFaces.length; i += 2) {

        let v0 = mesh.edgeVerts[i];
        let v1 = mesh.edgeVerts[i + 1];
        let e_vec = vertices.getValueRef(v1).subtract(vertices.getValueRef(v0));
        e_vec.normalizeInPlace();
        mesh.edgeVecs.push(e_vec);

        let p0 = mesh.edgeFaces[i];
        let p1 = mesh.edgeFaces[i + 1];
        if (p0 == -1 || p1 == -1) {
            // Flag the edge as a border edge....
            mesh.edgeFlags[i / 2] = 2;
            continue;
        }

        let n0 = faceNormals.getValueRef(p0);
        let n1 = faceNormals.getValueRef(p1);
        if (n0.dot(n1) <= cosHardAngle) {
            // flag the edge as a hard edge...
            mesh.edgeFlags[i / 2] = 1;
        }
    }
}

let computeVertexNormals = (mesh, hardAngle = 1.0 /*radians*/ )=>{

    if (mesh.vertexEdges == undefined)
        genTopologyInfo(mesh);

    if (!mesh.hasFaceAttribute('normals'))
        computeFaceNormals(mesh);

    generateHardEdgesFlags(mesh);

    let vertices = mesh.vertices;
    let faceNormals = mesh.getFaceAttribute('normals');
    let normalsAttr = mesh.addVertexAttribute('normals', Vec3);

    let cosHardAngle = Math.cos(hardAngle);

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
        let faceEdges = mesh.faceEdges[faceIndex];
        for (let e of faceEdges) {
            if (mesh.edgeVerts[(e * 2)] == vertexIndex) {
                if (!e0) e0 = mesh.edgeVecs[e];
                else e1 = mesh.edgeVecs[e];
            } else if (mesh.edgeVerts[(e * 2) + 1] == vertexIndex) {
                if (!e0) e0 = mesh.edgeVecs[e];
                else e1 = mesh.edgeVecs[e];
            }
        }
        return [e0, e1];
    }

    for (let i = 0; i < mesh.vertexEdges.length; i++) {

        // If mesh face indexing doesn't start at 0, then the vertexEdges don't either. 
        if (mesh.vertexEdges[i] == undefined)
            continue;

        let v = vertices.getValueRef(i);
        let edges = mesh.vertexEdges[i];

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
            let p0 = mesh.edgeFaces[e * 2];
            let p1 = mesh.edgeFaces[(e * 2) + 1];
            if (mesh.edgeFlags[e] == 0) {
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
    // console.log("==Compute Nomals timings: " + mesh.vertexEdges.length + " ==");
    // console.log("iter_edges_total : " + iter_edges_total);
    // console.log("set_normal_total : " + set_normal_total);

    return normalsAttr;
}


export {
    genTopologyInfo,
    computeFaceNormals,
    generateHardEdgesFlags,
    computeVertexNormals
};
