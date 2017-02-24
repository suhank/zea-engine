import {
    Vec2,
    Vec3
} from '../../../Math/Math.js';
import {
    Mesh
} from '../Mesh.js';


class Cuboid extends Mesh {
    constructor(name, x = 1.0, y = 1.0, z = 1.0) {
        super(name);

        this.__x = x;
        this.__y = y;
        this.__z = z;

        this.setFaceCounts([0, 6]);
        this.setFaceVertexIndices(0, 0, 1, 2, 3);
        this.setFaceVertexIndices(1, 7, 6, 5, 4);

        this.setFaceVertexIndices(2, 1, 0, 4, 5);
        this.setFaceVertexIndices(3, 3, 2, 6, 7);

        this.setFaceVertexIndices(4, 0, 3, 7, 4);
        this.setFaceVertexIndices(5, 2, 1, 5, 6);
        this.setNumVertices(8);
        this.addVertexAttribute('texCoords', Vec2);
        this.__resize();
        this.computeVertexNormals();
    }

    get x() {
        return this.__x
    }

    set x(val) {
        this.__x = val;
        this.__resize();
    }

    get y() {
        return this.__y
    }

    set y(val) {
        this.__y = val;
        this.__resize();
    }

    get z() {
        return this.__z
    }

    set z(val) {
        this.__z = val;
        this.__resize();
    }

    setSize(x, y, z) {
        this.__x = x;
        this.__y = y;
        this.__z = z;
        this.__resize();
    }

    __resize() {
        this.getVertex(0).set(0.5 * this.__x, -0.5 * this.__y, 0.5 * this.__z);
        this.getVertex(1).set(0.5 * this.__x, 0.5 * this.__y, 0.5 * this.__z);
        this.getVertex(2).set(-0.5 * this.__x, 0.5 * this.__y, 0.5 * this.__z);
        this.getVertex(3).set(-0.5 * this.__x, -0.5 * this.__y, 0.5 * this.__z);

        this.getVertex(4).set(0.5 * this.__x, -0.5 * this.__y, -0.5 * this.__z);
        this.getVertex(5).set(0.5 * this.__x, 0.5 * this.__y, -0.5 * this.__z);
        this.getVertex(6).set(-0.5 * this.__x, 0.5 * this.__y, -0.5 * this.__z);
        this.getVertex(7).set(-0.5 * this.__x, -0.5 * this.__y, -0.5 * this.__z);


        let texCoords = this.getVertexAttribute('texCoords');
        for (let i = 0; i < 6; i++) {
            texCoords.setFaceVertexValue(i, 0, new Vec2(0, 0));
            texCoords.setFaceVertexValue(i, 1, new Vec2(1, 0));
            texCoords.setFaceVertexValue(i, 2, new Vec2(1, 1));
            texCoords.setFaceVertexValue(i, 3, new Vec2(0, 1));
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        json['z'] = this.__z;
        return json
    }
};

export {
    Cuboid
};