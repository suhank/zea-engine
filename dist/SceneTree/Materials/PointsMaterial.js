import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class PointsMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.pointSizeParam = new MaterialFloatParam('PointSize', 2);
        this.overlayParam = new MaterialFloatParam('Overlay', 0.00002); // Provide a slight overlay so lines draw over meshes
        this.__shaderName = 'PointsShader';
        this.addParameter(this.baseColorParam);
        this.addParameter(this.pointSizeParam);
        this.addParameter(this.overlayParam);
    }
}
Registry.register('PointsMaterial', PointsMaterial);
//# sourceMappingURL=PointsMaterial.js.map