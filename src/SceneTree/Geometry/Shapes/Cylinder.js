import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Mesh } from '../Mesh.js';


class Cylinder extends Mesh {
    constructor(radius = 0.5, height = 1.0, sides = 32, loops = 2, caps = true) {
        super();

        this.__radius = radius;
        this.__height = height;
        this.__sides = (sides >= 3) ? sides : 3;
        this.__loops = (loops >= 2) ? loops : 2;
        this.__caps = caps;

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

    get height() {
        return this.__height
    }

    set height(val) {
        this.__height = val;
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
        this.__loops = (val >= 2) ? val : 2;
        this.__rebuild();
    }

    get caps() {
        return this.__caps
    }

    set caps(val) {
        this.__caps = val;
        this.__rebuild();
    }

    __rebuild() {
        let nbSides = this.__sides;
        let nbLoops = this.__loops;
        let numVertices = nbSides * nbLoops;
        let numTris = 0;
        let numQuads = nbSides;
        if (this.__caps) {
            numVertices += 2;
            numTris = nbSides * 2;
        }
        this.setNumVertices(numVertices);
        if (this.__caps) 
            this.setFaceCounts([nbSides * 2, nbSides]);
        else
            this.setFaceCounts([0, nbSides]);

        //////////////////////////////
        // Set Vertex Positions
        let vertex = 0;
        for (let i = 0; i < nbLoops; i++) {
            let y = ((i / (nbLoops - 1)) * this.__height) - (this.__height * 0.5);
            for (let j = 0; j < nbSides; j++) {
                let phi = (j / nbSides) * 2.0 * Math.PI;
                this.getVertex(vertex).set(Math.sin(phi) * this.__radius, y, Math.cos(phi) * this.__radius);
                vertex++;
            }
        }
        if (this.__caps) {
            // Top caps
            this.getVertex(numVertices - 1).set(0.0, this.__height * -0.5, 0.0);
            this.getVertex(numVertices - 2).set(0.0, this.__height * 0.5, 0.0);
        }

        //////////////////////////////
        // build the topology
        let faceIndex = 0;
        // build the topology for the body of the cylinder
        for (let i = 0; i < (nbLoops - 1); i++) {
            for (let j = 0; j < nbSides; j++) {
                let v0 = (nbSides * i) + j;
                let v1 = (nbSides * i) + ((j + 1) % nbSides);
                let v2 = (nbSides * (i + 1)) + ((j + 1) % nbSides);
                let v3 = (nbSides * (i + 1)) + j;
                this.setFaceVertexIndices(faceIndex++, v0, v1, v2, v3);
            }
        }

        if (this.__caps) {
            // Bottom caps topology
            for (let j = 0; j < nbSides; j++) {
                let v0 = numVertices - 1;
                let v1 = ((j + 1) % nbSides);
                let v2 = j;
                this.setFaceVertexIndices(faceIndex++, v0, v1, v2);
            }
            // Top caps topology
            for (let j = 0; j < nbSides; j++) {
                let v0 = (nbSides * (nbLoops - 1)) + j;
                let v1 = (nbSides * (nbLoops - 1)) + ((j + 1) % nbSides);
                let v2 = numVertices - 2;
                this.setFaceVertexIndices(faceIndex++, v0, v1, v2);
            }
        }

        //////////////////////////////
        // setNormals
        let normals = this.getVertexAttribute('normals');

        // Now set the attrbute values
        faceIndex = 0;
        for (let i = 0; i < (nbLoops - 1); i++) {
            for (let j = 0; j < nbSides; j++) {

                let phi = (j / nbSides) * 2.0 * Math.PI;
                let normal1 = new Vec3(Math.sin(phi), 0.0, Math.cos(phi));
                normals.setFaceVertexValue(faceIndex, 0, normal1);
                normals.setFaceVertexValue(faceIndex, 1, normal1);

                phi = ((j + 1) / nbSides) * 2.0 * Math.PI;
                let normal2 = new Vec3(Math.sin(phi), 0.0, Math.cos(phi));
                normals.setFaceVertexValue(faceIndex, 2, normal2);
                normals.setFaceVertexValue(faceIndex, 3, normal2);
                faceIndex++;
            }
        }
        if (this.__caps) {
            let normal = new Vec3(0.0, -1.0, 0.0);
            for (let i = 0; i < nbSides; i++) {
                normals.setFaceVertexValue(faceIndex, 0, normal);
                normals.setFaceVertexValue(faceIndex, 1, normal);
                normals.setFaceVertexValue(faceIndex, 2, normal);
                faceIndex++;
            }
            normal.set(0.0, 1.0, 0.0);
            for (let i = 0; i < nbSides; i++) {
                normals.setFaceVertexValue(faceIndex, 0, normal);
                normals.setFaceVertexValue(faceIndex, 1, normal);
                normals.setFaceVertexValue(faceIndex, 2, normal);
                faceIndex++;
            }
        }

        //////////////////////////////
        // setUVs
        let texCoords = this.getVertexAttribute('texCoords');

        // Now set the attrbute values
        faceIndex = 0;
        for (let i = 0; i < nbSides; i++) {
            texCoords.setFaceVertexValue(faceIndex, 0, new Vec2((i + 1) / nbSides, 0.0));
            texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 1) / nbSides, 1.0));
            texCoords.setFaceVertexValue(faceIndex, 1, new Vec2(i / nbSides, 0.0));
            texCoords.setFaceVertexValue(faceIndex, 3, new Vec2(i / nbSides, 1.0));
            faceIndex++;
        }
        if (this.__caps) {
            for (let i = 0; i < nbSides; i++) {
                texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbSides, 0.0));
                texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((i + 1) / nbSides, 0.0));
                texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 0.5) / nbSides, 1.0));
                faceIndex++;
            }
            for (let i = 0; i < nbSides; i++) {
                texCoords.setFaceVertexValue(faceIndex, 0, new Vec2(i / nbSides, 0.0));
                texCoords.setFaceVertexValue(faceIndex, 1, new Vec2((i + 1) / nbSides, 0.0));
                texCoords.setFaceVertexValue(faceIndex, 2, new Vec2((i + 0.5) / nbSides, 1.0));
                faceIndex++;
            }
        }

        this.setBoundingBoxDirty();
    }

    __resize() {
        let nbSides = this.__sides;
        let nbLoops = this.__loops;
        let numVertices = nbSides * nbLoops;
        if (this.__caps) {
            numVertices += 2;
        }
        let vertex = 0;
        for (let i = 0; i < nbLoops; i++) {
            let y = ((i / (nbLoops - 1)) * this.__height) - (this.__height * 0.5);
            for (let j = 0; j < nbSides; j++) {
                let phi = (j / nbSides) * 2.0 * Math.PI;
                this.getVertex(vertex).set(Math.sin(phi) * this.__radius, y, Math.cos(phi) * this.__radius);
                vertex++;
            }
        }
        if (this.__caps) {
            this.getVertex(numVertices - 1).set(0.0, this.__height * -0.5, 0.0);
            this.getVertex(numVertices - 2).set(0.0, this.__height * 0.5, 0.0);
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['radius'] = this.__radius;
        json['height'] = this.__height;
        json['sides'] = this.__sides;
        json['loops'] = this.__loops;
        json['caps'] = this.__caps;
        return json
    }
};

export {
    Cylinder
};
//export default Cylinder;