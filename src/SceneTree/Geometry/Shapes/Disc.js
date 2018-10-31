import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Mesh } from '../Mesh.js';


class Disc extends Mesh {
    constructor(radius = 0.5, sides = 32) {
        super();

        if(isNaN(radius) || isNaN(sides))
            throw("Invalid geom args");
        
        this.__radius = radius;
        this.__sides = (sides >= 3) ? sides : 3;

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

    set sides(val) {
        this.__sides = (val >= 3) ? val : 3;
        this.__rebuild();
    }

    __rebuild() {
        this.setNumVertices(this.__sides + 1);
        this.setFaceCounts([this.__sides]);


        //////////////////////////////
        // Set Vertex Positions
        this.getVertex(0).set(0.0, 0.0, 0.0);

        //////////////////////////////
        // build the topology
        for (let j = 0; j < this.__sides; j++) {
            const v1 = (j % this.__sides) + 1;
            const v2 = ((j + 1) % this.__sides) + 1;
            this.setFaceVertexIndices(j, 0, v1, v2);
        }

        //////////////////////////////
        // setNormals
        const normals = this.getVertexAttribute('normals');
        // Now set the attrbute values
        const normal = new Vec3(0, 0, 1);
        normals.setValue(0, normal);
        for (let i = 0; i < this.__sides; i++) {
            normals.setValue(i+1, normal);
        }

        //////////////////////////////
        // setUVs
        // Simple rect coords. 
        const texCoords = this.getVertexAttribute('texCoords');
        for (let i = 0; i < this.__sides; i++) {
            let phi = (i / this.__sides) * 2.0 * Math.PI;
            texCoords.getValueRef(i+1).set(Math.sin(phi), Math.cos(phi), 0.0)
        }

        this.setBoundingBoxDirty();
        this.__resize(-1);
    }

    __resize(mode) {
        for (let i = 0; i < this.__sides; i++) {
            let phi = (i / this.__sides) * 2.0 * Math.PI;
            this.getVertex(i+1).set(Math.sin(phi) * this.__radius, Math.cos(phi) * this.__radius, 0.0);
        }
        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['radius'] = this.__radius;
        return json
    }
};

export {
    Disc
};
//export default Disc;