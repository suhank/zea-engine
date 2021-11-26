import { BooleanParameter } from '../../../SceneTree/Parameters/BooleanParameter';
import { NumberParameter } from '../../../SceneTree/Parameters/NumberParameter';
import { Vec3 } from '../../../Math/Vec3';
import { ProceduralMesh } from './ProceduralMesh';
import { Registry } from '../../../Registry';
import { Vec3Attribute } from '../Vec3Attribute';
// import { Vec2 } from '../../../Math/Vec2'
// import { Vec2Attribute } from '../Vec2Attribute'
/**
 * A class for generating a cuboid geometry.
 *
 * **Parameters**
 * * **x(`NumberParameter`):** Length of the line cuboid along the `X` axis
 * * **y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
 * * **z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
 * * **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.
 *
 * @extends {ProceduralMesh}
 */
class Cuboid extends ProceduralMesh {
    /**
     * Create a cuboid.
     * @param x - The length of the cuboid along the X axis.
     * @param y - The length of the cuboid along the Y axis.
     * @param z - The length of the cuboid along the Z axis.
     * @param baseZAtZero - The baseZAtZero value.
     */
    constructor(x = 1.0, y = 1.0, z = 1.0, baseZAtZero = false) {
        super();
        if (isNaN(x) || isNaN(y) || isNaN(z))
            throw new Error('Invalid geom args');
        this.sizeXParam = this.addParameter(new NumberParameter('X', x));
        this.sizeYParam = this.addParameter(new NumberParameter('Y', y));
        this.sizeZParam = this.addParameter(new NumberParameter('Z', z));
        this.baseZAtZeroParam = this.addParameter(new BooleanParameter('BaseZAtZero', baseZAtZero));
        this.setFaceCounts([0, 6]);
        this.setFaceVertexIndices(0, [0, 1, 2, 3]);
        this.setFaceVertexIndices(1, [7, 6, 5, 4]);
        this.setFaceVertexIndices(2, [1, 0, 4, 5]);
        this.setFaceVertexIndices(3, [3, 2, 6, 7]);
        this.setFaceVertexIndices(4, [0, 3, 7, 4]);
        this.setFaceVertexIndices(5, [2, 1, 5, 6]);
        this.setNumVertices(8);
        this.addVertexAttribute('normals', new Vec3Attribute());
        // this.addVertexAttribute('texCoords', new Vec2Attribute())
    }
    /**
     * The rebuild method.
     * @private
     */
    rebuild() {
        const normals = this.getVertexAttribute('normals');
        if (normals) {
            for (let i = 0; i < 6; i++) {
                let normal;
                switch (i) {
                    case 0:
                        normal = new Vec3(0, 0, 1);
                        break;
                    case 1:
                        normal = new Vec3(0, 0, -1);
                        break;
                    case 2:
                        normal = new Vec3(1, 0, 0);
                        break;
                    case 3:
                        normal = new Vec3(-1, 0, 0);
                        break;
                    case 4:
                        normal = new Vec3(0, -1, 0);
                        break;
                    //case 5:
                    default:
                        normal = new Vec3(0, 1, 0);
                        break;
                }
                normals.setFaceVertexValue(i, 0, normal);
                normals.setFaceVertexValue(i, 1, normal);
                normals.setFaceVertexValue(i, 2, normal);
                normals.setFaceVertexValue(i, 3, normal);
            }
        } /*
        const texCoords = <Vec2Attribute>this.getVertexAttribute('texCoords')
        if (texCoords) {
          for (let i = 0; i < 6; i++) {
            texCoords.setFaceVertexValue(i, 0, new Vec2(0, 0))
            texCoords.setFaceVertexValue(i, 1, new Vec2(1, 0))
            texCoords.setFaceVertexValue(i, 2, new Vec2(1, 1))
            texCoords.setFaceVertexValue(i, 3, new Vec2(0, 1))
          }
        }
        */
        this.resize();
    }
    /**
     * The resize method.
     * @private
     */
    resize() {
        const x = this.sizeXParam.value;
        const y = this.sizeYParam.value;
        const z = this.sizeZParam.value;
        const baseZAtZero = this.baseZAtZeroParam.value;
        let zoff = 0.5;
        const positions = this.getVertexAttribute('positions');
        if (baseZAtZero)
            zoff = 1.0;
        if (!positions)
            return;
        positions.getValueRef(0).set(0.5 * x, -0.5 * y, zoff * z);
        positions.getValueRef(1).set(0.5 * x, 0.5 * y, zoff * z);
        positions.getValueRef(2).set(-0.5 * x, 0.5 * y, zoff * z);
        positions.getValueRef(3).set(-0.5 * x, -0.5 * y, zoff * z);
        zoff = -0.5;
        if (baseZAtZero)
            zoff = 0.0;
        positions.getValueRef(4).set(0.5 * x, -0.5 * y, zoff * z);
        positions.getValueRef(5).set(0.5 * x, 0.5 * y, zoff * z);
        positions.getValueRef(6).set(-0.5 * x, 0.5 * y, zoff * z);
        positions.getValueRef(7).set(-0.5 * x, -0.5 * y, zoff * z);
    }
}
Registry.register('Cuboid', Cuboid);
export { Cuboid };
//# sourceMappingURL=Cuboid.js.map