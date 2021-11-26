import { NumberParameter } from '../../Parameters/index';
import { Registry } from '../../../Registry';
import { ProceduralMesh } from './ProceduralMesh';
import { Vec3Attribute } from '../Vec3Attribute';
import { Vec2Attribute } from '../Vec2Attribute';
/**
 * A class for generating a plane geometry.
 *
 * ```
 * const plane = new Plane(2.0, 1.5, 10, 10)
 * ```
 *
 * **Parameters**
 * * **SizeX(`NumberParameter`):** Length of the plane along `X` axis.
 * * **SizeY(`NumberParameter`):** Length of the plane along `Y` axis.
 * * **DetailX(`NumberParameter`):** Number of divisions along `X`axis.
 * * **DetailY(`NumberParameter`):** Number of divisions along `Y`axis.
 *
 * @extends {ProceduralMesh}
 */
class Plane extends ProceduralMesh {
    // topologyParams: string[]
    /**
     * Create a plane.
     * @param SizeX - The length of the plane along the X axis.
     * @param SizeY - The length of the plane along the Y axis.
     * @param DetailX - The number of divisions along the X axis.
     * @param DetailY - The number of divisions along the Y axis.
     * @param addNormals - The addNormals value.
     * @param addTextureCoords - The addTextureCoords value.
     */
    constructor(SizeX = 1.0, SizeY = 1.0, DetailX = 1, DetailY = 1, addNormals = true, addTextureCoords = true) {
        super();
        this.topologyParams = [];
        if (isNaN(SizeX) || isNaN(SizeY) || isNaN(DetailX) || isNaN(DetailY))
            throw new Error('Invalid geom args');
        this.sizeXParam = this.addParameter(new NumberParameter('SizeX', SizeX));
        this.sizeYParam = this.addParameter(new NumberParameter('SizeY', SizeY));
        this.detailXParam = this.addParameter(new NumberParameter('DetailX', DetailX));
        this.detailYParam = this.addParameter(new NumberParameter('DetailY', DetailY));
        if (addNormals)
            this.addVertexAttribute('normals', new Vec3Attribute());
        if (addTextureCoords)
            this.addVertexAttribute('texCoords', new Vec2Attribute());
        this.topologyParams.push('DetailX');
        this.topologyParams.push('DetailY');
    }
    /**
     * The rebuild method.
     * @private
     */
    rebuild() {
        const detailX = this.detailXParam.value;
        const detailY = this.detailYParam.value;
        this.setNumVertices((detailX + 1) * (detailY + 1));
        this.setFaceCounts([0, detailX * detailY]);
        let quadId = 0;
        for (let i = 0; i < detailY; i++) {
            for (let j = 0; j < detailX; j++) {
                const v0 = (detailX + 1) * (i + 1) + j;
                const v1 = (detailX + 1) * i + j;
                const v2 = (detailX + 1) * i + (j + 1);
                const v3 = (detailX + 1) * (i + 1) + (j + 1);
                this.setFaceVertexIndices(quadId, [v0, v1, v2, v3]);
                quadId = quadId + 1;
            }
        }
        let voff = 0;
        const normals = this.getVertexAttribute('normals');
        if (normals) {
            for (let i = 0; i <= detailY; i++) {
                for (let j = 0; j <= detailX; j++) {
                    normals.getValueRef(voff).set(0, 0, 1);
                    voff++;
                }
            }
        }
        voff = 0;
        const texCoords = this.getVertexAttribute('texCoords');
        if (texCoords) {
            for (let i = 0; i <= detailY; i++) {
                const y = i / detailY;
                for (let j = 0; j <= detailX; j++) {
                    const x = j / detailX;
                    texCoords.getValueRef(voff).set(x, y);
                    voff++;
                }
            }
        }
        this.resize();
    }
    /**
     * The resize method.
     *
     * @private
     */
    resize() {
        const sizeX = this.sizeXParam.value;
        const sizeY = this.sizeYParam.value;
        const detailX = this.detailXParam.value;
        const detailY = this.detailYParam.value;
        const positions = this.getVertexAttribute('positions');
        if (!positions)
            return;
        let voff = 0;
        for (let i = 0; i <= detailY; i++) {
            const y = (i / detailY - 0.5) * sizeY;
            for (let j = 0; j <= detailX; j++) {
                const x = (j / detailX - 0.5) * sizeX;
                positions.getValueRef(voff).set(x, y, 0.0);
                voff++;
            }
        }
    }
}
Registry.register('Plane', Plane);
export { Plane };
//# sourceMappingURL=Plane.js.map