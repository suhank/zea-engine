import Vec2 from '../../../Math/Vec2';
import Vec3 from '../../../Math/Vec3';
import Mesh from '../Mesh.js';

class Plane extends Mesh {
    constructor(name, x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1) {
        super(name);

        this.__x = x;
        this.__y = y;
        this.__xDivisions = xDivisions;
        this.__yDivisions = yDivisions;
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

    setSize(x, y) {
        this.__x = x;
        this.__y = y;
        this.__resize();
    }

    __rebuild() {
        this.setNumVertices((this.__xDivisions + 1) * (this.__yDivisions + 1));
        this.setFaceCounts([0, this.__xDivisions * this.__yDivisions]);

        let quadId = 0;
        for (let i = 0; i < this.__xDivisions; i++) {
            for (let j = 0; j < this.__yDivisions; j++) {
                let v0 = ((this.__yDivisions + 1) * (i + 1)) + j;
                let v1 = ((this.__yDivisions + 1) * (i + 1)) + (j + 1);
                let v2 = ((this.__yDivisions + 1) * i) + (j + 1);
                let v3 = ((this.__yDivisions + 1) * i) + j;
                this.setFaceVertexIndices(quadId, v0, v1, v2, v3);
                quadId = quadId + 1;
            }
        }

        let voff = 0;
        let normals = this.getVertexAttribute('normals');
        for (let i = 0; i <= this.__xDivisions; i++) {
            for (let j = 0; j <= this.__yDivisions; j++) {
                normals.getValueRef(voff).set(0, 0, 1);
                voff++;
            }
        }

        voff = 0;
        let texCoords = this.getVertexAttribute('texCoords');
        for (let i = 0; i <= this.__xDivisions; i++) {
            let x = i / this.__xDivisions;
            for (let j = 0; j <= this.__yDivisions; j++) {
                let y = j / this.__yDivisions;
                texCoords.getValueRef(voff).set(x, y);
                voff++;
            }
        }

        this.__resize();
    }

    __resize() {
        let voff = 0;
        for (let i = 0; i <= this.__xDivisions; i++) {
            let x = ((i / this.__xDivisions) - 0.5) * this.__x;
            for (let j = 0; j <= this.__yDivisions; j++) {
                let y = ((j / this.__yDivisions) - 0.5) * this.__y;
                this.getVertex(voff).set(x, y, 0.0);
                voff++;
            }
        }

        this.setBoundingBoxDirty();
    }

    toJSON() {
        let json = super.toJSON();
        json['x'] = this.__x;
        json['y'] = this.__y;
        json['xDivisions'] = this.__xDivisions;
        json['yDivisions'] = this.__yDivisions;
        return json
    }
};

export default Plane;