import { Vec2, Vec3 } from '../../../Math';
import { SAVE_FLAG_SKIP_GEOMDATA } from '../BaseGeom.js';
import { Mesh } from '../Mesh.js';

import {
    NumberParameter
} from '../../Parameters/NumberParameter.js';
import {
    sgFactory
} from '../../SGFactory.js';

class Sphere extends Mesh {
    constructor(radius = 1.0, sides = 12, loops = 12) {
        super();

        if(isNaN(radius) || isNaN(sides) || isNaN(loops))
            throw("Invalid geom args");

        this.__radius = radius;
        this.__sides = (sides >= 3) ? sides : 3;
        this.__loops = (loops >= 3) ? loops : 3;

        this.addVertexAttribute('texCoords', Vec2);
        this.addVertexAttribute('normals', Vec3);
        this.__rebuild();
    }

    get radius() {
        return this.__radius
    }

    set radius(val) {
        this.__radius = val;
        this.__resize();
    }

    get sides() {
        return this.__sides
    }

    set sides(val) {
        this.__sides = (val >= 3) ? val : 3;
        this.__rebuild();
    }

    get loops() {
        return this.__loops
    }

    set loops(val) {
        this.__loops = (val >= 3) ? val : 3;
        this.__rebuild();
    }

    __rebuild() {
        const numVertices = 2 + this.__sides * this.__loops;
        const numTris = this.__sides * 2;
        const numQuads = this.__sides * this.__loops;
        this.setNumVertices(numVertices);
        this.setFaceCounts([numTris, numQuads]);

        //////////////////////////////
        // Set Vertex Positions

        const normals = this.getVertexAttribute('normals');
        const normal = new Vec3(0.0, 0.0, 1.0);
        let vertex = 0;
        this.getVertex(vertex).set(0.0, 0.0, this.__radius);
        normals.getValueRef(vertex).set(0.0, 0.0, 1.0);
        vertex++;

        for (let i = 0; i < this.__loops; i++) {
            let theta = ((i + 1) / (this.__loops + 1)) * Math.PI;
            for (let j = 0; j < this.__sides; j++) {
                let phi = (j / this.__sides) * 2.0 * Math.PI;
                normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta));

                // Set positions and normals at the same time.
                this.getVertex(vertex).setFromOther(normal.scale(this.__radius));
                normals.getValueRef(vertex).setFromOther(normal);
                vertex++;
            }
        }
        this.getVertex(vertex).set(0.0, 0.0, -this.__radius);
        normals.getValueRef(vertex).set(0.0, 0.0, -1.0);
        vertex++;

        //////////////////////////////
        // build the topology
        const texCoords = this.getVertexAttribute('texCoords');

        // build the fan at the first pole.
        let faceIndex = 0;
        for (let j = 0; j < this.__sides; j++) {
            const v0 = 0;
            const v1 = ((j + 1) % this.__sides) + 1;
            const v2 = j + 1;
            this.setFaceVertexIndices(faceIndex, v0, v1, v2);

            const uv0 = new Vec2(0.5, 0.0);
            const uv1 = new Vec2(1.0 - ((j + 1) / this.__sides), 0.0);
            const uv2 = new Vec2(1.0 - (j / this.__sides), 1.0 / (this.__loops + 1));
            texCoords.setFaceVertexValue(faceIndex, 0, uv0);
            texCoords.setFaceVertexValue(faceIndex, 1, uv1);
            texCoords.setFaceVertexValue(faceIndex, 2, uv2);

            faceIndex++;
        }
        // build the fan at the second pole.
        for (let j = 0; j < this.__sides; j++) {
            const v0 = numVertices - 1;
            const v1 = (this.__sides * (this.__loops - 1)) + j + 1;
            const v2 = (this.__sides * (this.__loops - 1)) + ((j + 1) % this.__sides) + 1;
            this.setFaceVertexIndices(faceIndex, v0, v1, v2);

            const uv0 = new Vec2(1.0 - (j / this.__sides), this.__loops / (this.__loops + 1));
            const uv1 = new Vec2(1.0 - ((j + 1) / this.__sides), this.__loops / (this.__loops + 1));
            const uv2 = new Vec2(0.5, 1.0);
            texCoords.setFaceVertexValue(faceIndex, 0, uv0);
            texCoords.setFaceVertexValue(faceIndex, 1, uv1);
            texCoords.setFaceVertexValue(faceIndex, 2, uv2);

            faceIndex++;
        }

        for (let i = 0; i < this.__loops - 1; i++) {
            for (let j = 0; j < this.__sides; j++) {
                const v0 = (this.__sides * i) + j + 1;
                const v1 = (this.__sides * i) + ((j + 1) % this.__sides) + 1;
                const v2 = (this.__sides * (i + 1)) + ((j + 1) % this.__sides) + 1;
                const v3 = (this.__sides * (i + 1)) + j + 1;
                this.setFaceVertexIndices(faceIndex, v0, v1, v2, v3);

                texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / this.__loops, j / this.__loops));
                texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / this.__loops, (j + 1) / this.__loops));
                texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / this.__loops, (j + 1) / this.__loops));
                texCoords.setFaceVertexValue(faceIndex, 3, new Vec2((i + 1) / this.__loops, j / this.__loops));
                faceIndex++;
            }
        }

        this.setBoundingBoxDirty();
        this.geomDataTopologyChanged.emit();
    }

    __resize() {
        //////////////////////////////
        // Set Vertex Positions
        let vertex = 0;
        const normal = new Vec3(0.0, 0.0, 1.0);
        this.getVertex(vertex).set(0.0, 0.0, this.__radius);
        vertex++;

        for (let i = 0; i < this.__loops; i++) {
            const theta = ((i + 1) / (this.__loops + 1)) * Math.PI;
            for (let j = 0; j < this.__sides; j++) {
                const phi = (j / this.__sides) * 2.0 * Math.PI;
                normal.set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta));

                // Set positions and normals at the same time.
                this.getVertex(vertex).setFromOther(normal.scale(this.__radius));
                vertex++;
            }
        }
        this.getVertex(vertex).set(0.0, 0.0, -this.__radius);
        vertex++;

        this.setBoundingBoxDirty();
        this.geomDataChanged.emit();
    }

    toJSON(context, flags) {
        const j = super.toJSON(context, flags|SAVE_FLAG_SKIP_GEOMDATA);
        j.radius = this.__radius;
        j.sides = this.__sides;
        j.loops = this.__loops;
        return j
    }

    fromJSON(j, context, flags) {
        super.fromJSON(j, context, flags);
        this.__radius = j.radius;
        this.__sides = j.sides;
        this.__loops = j.loops;
        this.__rebuild();
    }
};
sgFactory.registerClass('Sphere', Sphere);

export {
    Sphere
};
