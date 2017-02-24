import {
    JSON_stringify_fixedPrecision
} from './Common.js';
import {
    Rect2
} from './Rect2.js';
import {
    Vec2
} from './Vec2.js';
import {
    Vec3
} from './Vec3.js';
import {
    Mat4
} from './Mat4.js';

class BaseCluster {
    constructor(rect = undefined) {
        this.rect = rect ? rect : new Rect2();
    }

    setTexelSize(texelSize) {
        // Scale the UV coords to be in texel space(not uv space)
        // This means that a 5x4 rect is 5 pixels by 4 pixels. 
        // these values are converted back to UV coords in the pixel shader. 
        this.scaleFactor = 1.0 / texelSize;
        this.rect.scaleInPlace(this.scaleFactor);

        // We expand the rect by the margin to ensure a small space between clusters.
        // 1 pixel margin on both left right, top & bottom (2 pixels between each cluster)
        this.margin = 1.0;
        this.rect.size.x += this.margin * 2.0;
        this.rect.size.y += this.margin * 2.0;
    }

};

class UVCluster extends BaseCluster {
    constructor(centroid, normal, biNormal, faceIndex, vertices) {
        super();
        this.uvs = new Array();
        this.id = faceIndex; // Init the id with the face index. 
        this.centroid = centroid;
        this.normal = normal;
        this.biNormal = biNormal;
        this.scaleFactor = 1.0;
        this.curvature = 0.0;

        this.faces = {};
        this.faces[faceIndex] = {
            'vertices': vertices
        };

        // the face id and the face vertex making up the border.(we assume a complete perimeter.)
        this.perimeter = 0.0;
        let edgeLengths = [];
        let v0 = vertices[0];
        for (let i = 0; i < vertices.length; i++) {
            let v1 = vertices[(i + 1) % vertices.length];
            let edgeLength = v0.distanceTo(v1);
            edgeLengths.push(edgeLength);
            this.perimeter += edgeLength;
            v0 = v1;
        }
        let triangleArea = function(a, b, c) {
            // let s = (a + b + c) * 0.5;
            // return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            // https://en.wikipedia.org/wiki/Heron%27s_formula
            let result = 0.25 * Math.sqrt((a + (b + c)) * (c - (a - b)) * (a + (b - c)));
            if (isNaN(result)) {
                throw ("Invalid Area");
            }
            return result;
        }
        if (vertices.length == 3) {
            // compute the area of the triangle.
            this.area = triangleArea(edgeLengths[0], edgeLengths[1], edgeLengths[2]);
        } else {
            let v0 = vertices[0];
            let v2 = vertices[2];
            let diagonal = v0.distanceTo(v2);
            this.area = triangleArea(edgeLengths[0], edgeLengths[1], diagonal) +
                triangleArea(edgeLengths[2], edgeLengths[3], diagonal);
        }

        this.clusterEdges = new Array();
        // We set this to true once a cluster has been merged.
        this.deleted = false;
    }

    mergeCluster(other, edge, normal, removeEdge, updateEdge) {
        this.normal = normal;

        if (other.area > this.area)
            this.biNormal = other.biNormal;

        this.centroid.scaleInPlace(this.area);
        this.centroid.addInPlace(other.centroid.scale(other.area));
        this.centroid.scaleInPlace(1.0 / (this.area + other.area));

        this.area += other.area;
        // Merge the perimeters minus the shared edge length.
        this.perimeter += (other.perimeter - (edge.length * 2.0));

        for (let faceIndex in other.faces) {
            // Note: as we merge faces, we end up with edges that both clusters are the same...
            // We need to remove all edges between 2 clusters.
            if (faceIndex in this.faces)
                console.warn("corrupt edge graph...");
            this.faces[faceIndex] = other.faces[faceIndex];
        }

        // Remove the edge
        let faceEdges = {};
        for (let i = 0; i < this.clusterEdges.length; i++) {
            let e = this.clusterEdges[i];
            if (e == edge) {
                this.clusterEdges.splice(i, 1);
                i--;
            } else {
                if (e.c0 == this) {
                    faceEdges[e.c1.id] = e;
                } else if (e.c1 == this) {
                    faceEdges[e.c0.id] = e;
                }
            }
        }
        removeEdge(edge);

        // Now re-map the edges from 'other' to 'this'...
        // We merge duplicate edges that point to the same cluster
        for (let e of other.clusterEdges) {
            if (e == edge)
                continue;
            // // Note: some edges might end up pointing to the same cluster. 
            // if(e.c0 == this || e.c1 == this)
            //     console.warn("Need to kill this redundant edge...");
            if (e.c0 == other) {
                if (e.c1.id in faceEdges) {
                    // merge the edge with the existing one.
                    faceEdges[e.c1.id].mergeEdge(e);
                    removeEdge(e);
                } else {
                    e.c0 = this;
                    faceEdges[e.c1.id] = e;
                    this.clusterEdges.push(e);
                }
            } else if (e.c1 == other) {
                if (e.c0.id in faceEdges) {
                    // merge the edge with the existing one.
                    faceEdges[e.c0.id].mergeEdge(e);
                    removeEdge(e);
                } else {
                    e.c1 = this;
                    faceEdges[e.c0.id] = e;
                    this.clusterEdges.push(e);
                }
            }
        }
        for (let e of this.clusterEdges) {
            e.computeCost();
            updateEdge(e);
        }
    }

    computeClusterUVs(uvsAttr) {
        // console.log("computeClusterUVs:" + this.id);
        let mat4 = new Mat4();
        let tangent = this.normal.cross(this.biNormal);
        this.normal.normalizeInPlace();
        tangent.normalizeInPlace();

        mat4.set(this.biNormal.x, this.biNormal.y, this.biNormal.z, 0,
            this.normal.x, this.normal.y, this.normal.z, 0,
            tangent.x, tangent.y, tangent.z, 0,
            this.centroid.x, this.centroid.y, this.centroid.z, 1);

        let mat4Inv = mat4.inverse();
        if (mat4Inv == null)
            mat4Inv = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        for (let faceIndex in this.faces) {
            let faceVertices = this.faces[faceIndex]['vertices'];
            // let faceUVs = [];
            for (let faceVertex in faceVertices) {
                let vertex = faceVertices[faceVertex];
                let vec3 = mat4Inv.transformVec3(vertex);

                // Note: this line generates the new UV seams formed by the lightmap.
                // Once the UV coors have been generated and stored, we can then move and scale
                // then into place.
                // Note: we add the id to the x coord so that it forces the UV coorinate to the split
                // from neighboring faces. We then subtract it off after to get back the orriginal coord.
                let res = uvsAttr.setFaceVertexValue(parseInt(faceIndex), parseInt(faceVertex), new Vec2(vec3.x + this.id, vec3.z));
                if (res['kept']) {
                    res['value'].x -= this.id;
                    this.uvs.push(res['value']);
                    this.rect.expandByPoint(res['value']);
                }
            }
        }
        let size = this.rect.size;
        this.boundingRectArea = size.x * size.y;
    }

    bakeUVs(delta) {
        // Include the margin when moving the uvs to the new location.
        delta.x += this.margin;
        delta.y += this.margin;

        for (let uv of this.uvs) {
            uv.scaleInPlace(this.scaleFactor);
            uv.addInPlace(delta);
            // console.log(String(uv));
        }
    }

    toJSON() {
        let uvsJSON = [];
        for (let uv of this.uvs)
            uvsJSON.push(uv.toJSON());

        return {
            "id": this.id,
            "area": this.area,
            "rect": this.rect.toJSON(),
            "uvs": uvsJSON
        }
    }

    uvsJSON() {
        let uvsJSON = [];
        for (let uv of this.uvs)
            uvsJSON.push(uv.toJSON());
        return uvsJSON;
    }

    toString() {
        return JSON_stringify_fixedPrecision(this.toJSON())
    }
}

// A node connecting 2 clusters.
class CGGraphEdge {
    constructor(c0, c1, length) {
        this.c0 = c0;
        this.c1 = c1;
        this.length = length;
        this.c0.clusterEdges.push(this);
        this.c1.clusterEdges.push(this);
    }

    computeCost() {

        // Compute the coordinate frame of the new cluster.
        // Merge the normals using the area to weight thier contributions.
        this.normal = new Vec3();
        this.normal.addInPlace(this.c0.normal.scale(this.c0.area));
        this.normal.addInPlace(this.c1.normal.scale(this.c1.area));
        this.normal.normalizeInPlace();

        if (!this.normal.isValid()) {
            throw ("Invalid normal");
        }

        // Note: we could check for other edges between the 2 clusters.
        this.cost = 0.0;

        //////////////////////////////////////////////////////////////////
        // Measure the planarity error
        //
        {
            let angle0 = this.c0.normal.angleTo(this.normal);
            let angle1 = this.c1.normal.angleTo(this.normal);
            this.curvature = Math.max(angle0, angle1);
            let fit_cost = Math.pow(this.curvature / (Math.PI * 0.5), 2.5);
            this.cost += fit_cost;
        }

        // Quadric Q_fit = n1.Q_fit;
        // Q_fit += n2.Q_fit;

        // // if( new_frame.compute_frame(Q_fit, n1.nverts + n2.nverts) )
        // {
        //     Mat3 A = Q_fit.tensor();
        //     Vec3 v = Q_fit.vector();
        //     double k = Q_fit.offset();
        //     double d = new_frame.plane_offset();
        //     Vec3 n(new_frame.axis(MXFRAME_NORMAL));

        //     let fit_cost = n*(A*n) + 2*d*(v*n) + d*d*k;
        //     if( weight_by_area )
        //         fit_cost /= Q_fit.area();

        //     this.cost += fit_cost;
        // }


        //////////////////////////////////////////////////////////////////
        // Measure the orientation error
        //
        // Quadric Q_dir = n1.Q_dir;
        // Q_dir += n2.Q_dir;

        // this.cost += Q_dir(new_frame.normal()) / Q_dir.area();


        //////////////////////////////////////////////////////////////////
        // Shape heuristics
        //
        let new_area = this.c0.area + this.c1.area;
        let ir0 = this.c0.perimeter * this.c0.perimeter / this.c0.area;
        let ir1 = this.c1.perimeter * this.c1.perimeter / this.c1.area;

        let new_perim = this.c0.perimeter + this.c1.perimeter - 2 * this.length;
        let ir_new = new_perim * new_perim / new_area;

        let ir_cost, ir_old = Math.max(ir0, ir1);
        if (ir_new < Number.EPSILON)
            ir_cost = 0.0;
        else
            ir_cost = (ir_new - ir_old) / ir_new;

        this.cost += ir_cost;
    }

    mergeEdge(other) {
        this.length += other.length;
    }

    mergeClusters(removeEdge, updateEdge) {
        this.c0.mergeCluster(this.c1, this, this.normal, removeEdge, updateEdge);
        this.c1.deleted = true;
    }
};

export {
    BaseCluster,
    UVCluster,
    CGGraphEdge
};
