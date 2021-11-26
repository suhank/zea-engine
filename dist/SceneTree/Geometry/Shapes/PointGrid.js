import { ProceduralPoints } from './ProceduralPoints';
import { NumberParameter } from '../../Parameters/NumberParameter';
import { Registry } from '../../../Registry';
import { Vec2Attribute } from '../Vec2Attribute';
/**
 * Represents an ordered grid of points along `X` and `Y` axes.
 *
 * ```
 * const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
 * ```
 *
 * **Parameters**
 * * **X(`NumberParameter`):** Length of the grid along the `X` axis.
 * * **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
 * * **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
 * * **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis
 * @extends {ProceduralPoints}
 */
class PointGrid extends ProceduralPoints {
    // topologyParams: string[]
    /**
     * Creates an instance of PointGrid.
     *
     * @param x - The length of the point grid along the X axis.
     * @param y - The length of the point grid along the Y axis.
     * @param xDivisions - The number of divisions along the X axis.
     * @param yDivisions - The number of divisions along the Y axis.
     * @param addTextureCoords - The addTextureCoords value.
     */
    constructor(x = 1.0, y = 1.0, xDivisions = 1, yDivisions = 1, addTextureCoords = false) {
        super();
        this.topologyParams = [];
        if (isNaN(x) || isNaN(y) || isNaN(xDivisions) || isNaN(yDivisions))
            throw new Error('Invalid geom args');
        this.sizeXParam = this.addParameter(new NumberParameter('X', x));
        this.sizeYParam = this.addParameter(new NumberParameter('Y', y));
        this.divisionsXParam = this.addParameter(new NumberParameter('XDivisions', xDivisions));
        this.divisionsYParam = this.addParameter(new NumberParameter('YDivisions', yDivisions));
        if (addTextureCoords)
            this.addVertexAttribute('texCoords', new Vec2Attribute());
        this.topologyParams.push('XDivisions');
        this.topologyParams.push('YDivisions');
    }
    /**
     * The rebuild method.
     * @private
     */
    rebuild() {
        const xDivisions = this.divisionsXParam.value;
        const yDivisions = this.divisionsYParam.value;
        this.setNumVertices(xDivisions * yDivisions);
        const texCoords = this.getVertexAttribute('texCoords');
        if (texCoords) {
            for (let i = 0; i < yDivisions; i++) {
                const y = i / (yDivisions - 1);
                for (let j = 0; j < xDivisions; j++) {
                    const x = j / (xDivisions - 1);
                    texCoords.getValueRef(i * xDivisions + j).set(x, y);
                }
            }
        }
        this.resize();
    }
    /**
     * The resize method.
     * @private
     */
    resize() {
        const xDivisions = this.divisionsXParam.value;
        const yDivisions = this.divisionsYParam.value;
        const x = this.sizeXParam.value;
        const y = this.sizeYParam.value;
        const positions = this.getVertexAttribute('positions');
        if (!positions)
            return;
        for (let i = 0; i < yDivisions; i++) {
            const newY = (i / (yDivisions - 1) - 0.5) * y;
            for (let j = 0; j < xDivisions; j++) {
                const newX = (j / (xDivisions - 1) - 0.5) * x;
                positions.getValueRef(i * xDivisions + j).set(newX, newY, 0.0);
            }
        }
    }
}
Registry.register('PointGrid', PointGrid);
export { PointGrid };
//# sourceMappingURL=PointGrid.js.map