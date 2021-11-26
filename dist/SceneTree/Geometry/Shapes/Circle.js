import { NumberParameter } from '../../Parameters/index';
import { Registry } from '../../../Registry';
import { ProceduralLines } from './ProceduralLines';
/**
 * A class for generating a circle shape using line segments.
 *
 * ```
 * const circle = new Circle(2.2, 12)
 * ```
 *
 * **Parameters**
 * * **Radius(`NumberParameter`):** Radius of the circle.
 * * **Angle(`NumberParameter`):** Number of segments used to build the circle.
 * * **Sides(`NumberParameter`):** Segments angle in radiants.
 *
 * @extends {ProceduralLines}
 */
class Circle extends ProceduralLines {
    // topologyParams: string[]
    /**
     * Creates an instance of Circle.
     * @param radius - The radius of the circle.
     * @param sides - The number of segments.
     * @param angle - Arc segments angle(radians)
     */
    constructor(radius = 1.0, sides = 32, angle = Math.PI * 2) {
        super();
        this.topologyParams = [];
        if (isNaN(radius) || isNaN(sides))
            throw new Error('Invalid geom args');
        this.radiusParam = this.addParameter(new NumberParameter('Radius', radius));
        this.angleParam = this.addParameter(new NumberParameter('Angle', angle));
        this.sidesParam = this.addParameter(new NumberParameter('Sides', sides >= 3 ? sides : 3, [3, 200], 1));
        this.topologyParams.push('Sides');
    }
    /**
     * The rebuild method.
     * @private
     */
    rebuild() {
        const segs = this.sidesParam.value;
        this.setNumVertices(segs);
        const angle = this.angleParam.value;
        const arc = angle < Math.PI * 2;
        if (arc)
            this.setNumSegments(segs - 1);
        else
            this.setNumSegments(segs);
        for (let i = 0; i < (arc ? segs - 1 : segs); i++)
            this.setSegmentVertexIndices(i, i, (i + 1) % segs);
        this.resize();
    }
    /**
     * The resize method.
     * @private
     */
    resize() {
        const radius = this.radiusParam.value;
        const segs = this.sidesParam.value;
        const angle = this.angleParam.value;
        const step = angle / segs;
        const positions = this.getVertexAttribute('positions');
        if (positions) {
            for (let i = 0; i < segs; i++) {
                positions.getValueRef(i).set(Math.cos(step * i) * radius, Math.sin(step * i) * radius, 0.0);
            }
        }
    }
}
Registry.register('Circle', Circle);
export { Circle };
//# sourceMappingURL=Circle.js.map