import { Vec2 } from '../../../Math/Vec2';
import { Vec3 } from '../../../Math/Vec3';
import { Mesh } from '../Mesh.js';
import {
    sgFactory
} from '../../SGFactory.js';

class Cuboid extends Mesh {
    constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero=false) {
        super();

        if(isNaN(x) || isNaN(y) || isNaN(z))
            throw("Invalid geom args");
        this.__x = x;
        this.__y = y;
        this.__z = z;
        this.__baseZAtZero = baseZAtZero;

        this.setFaceCounts([0, 6]);
        this.setFaceVertexIndices(0, 0, 1, 2, 3);
        this.setFaceVertexIndices(1, 7, 6, 5, 4);

        this.setFaceVertexIndices(2, 1, 0, 4, 5);
        this.setFaceVertexIndices(3, 3, 2, 6, 7);

        this.setFaceVertexIndices(4, 0, 3, 7, 4);
        this.setFaceVertexIndices(5, 2, 1, 5, 6);
        this.setNumVertices(8);
        this.addVertexAttribute('texCoords', Vec2);
        this.addVertexAttribute('normals', Vec3);
        this.__rebuild();
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

    setBaseSize(x, y) {
        this.__x = x;
        this.__y = y;
        this.__resize();
    }


    __rebuild() {
        const normals = this.getVertexAttribute('normals');
        for (let i = 0; i < 6; i++) {
            let normal;
            switch(i) {
            case 0: normal = new Vec3(0,0,1); break;
            case 1: normal = new Vec3(0,0,-1); break;
            case 2: normal = new Vec3(1,0,0); break;
            case 3: normal = new Vec3(-1,0,0); break;
            case 4: normal = new Vec3(0,1,0); break;
            case 5: normal = new Vec3(0,-1,0); break;
            }
            normals.setFaceVertexValue(i, 0, normal);
            normals.setFaceVertexValue(i, 1, normal);
            normals.setFaceVertexValue(i, 2, normal);
            normals.setFaceVertexValue(i, 3, normal);
        }
        const texCoords = this.getVertexAttribute('texCoords');
        for (let i = 0; i < 6; i++) {
            texCoords.setFaceVertexValue(i, 0, new Vec2(0, 0));
            texCoords.setFaceVertexValue(i, 1, new Vec2(1, 0));
            texCoords.setFaceVertexValue(i, 2, new Vec2(1, 1));
            texCoords.setFaceVertexValue(i, 3, new Vec2(0, 1));
        }
        this.__resize();
    }

    __resize(mode) {
        let zoff = 0.5;
        if(this.__baseZAtZero)
            zoff = 1.0
        this.getVertex(0).set(0.5 * this.__x, -0.5 * this.__y, zoff * this.__z);
        this.getVertex(1).set(0.5 * this.__x, 0.5 * this.__y, zoff * this.__z);
        this.getVertex(2).set(-0.5 * this.__x, 0.5 * this.__y, zoff * this.__z);
        this.getVertex(3).set(-0.5 * this.__x, -0.5 * this.__y, zoff * this.__z);

        zoff = -0.5;
        if(this.__baseZAtZero)
            zoff = 0.0
        this.getVertex(4).set(0.5 * this.__x, -0.5 * this.__y, zoff * this.__z);
        this.getVertex(5).set(0.5 * this.__x, 0.5 * this.__y, zoff * this.__z);
        this.getVertex(6).set(-0.5 * this.__x, 0.5 * this.__y, zoff * this.__z);
        this.getVertex(7).set(-0.5 * this.__x, -0.5 * this.__y, zoff * this.__z);


        this.setBoundingBoxDirty();
        this.geomDataChanged.emit();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        json['z'] = this.__z;
        return json
    }
};

sgFactory.registerClass('Cuboid', Cuboid);

export {
    Cuboid
};
//export default Cuboid;