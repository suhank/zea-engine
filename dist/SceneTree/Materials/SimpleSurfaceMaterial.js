import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class SimpleSurfaceMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.opacityParam = new MaterialFloatParam('Opacity', 1, [0, 1]);
        this.emissiveStrengthParam = new MaterialFloatParam('EmissiveStrength', 0, [0, 1]);
        this.__shaderName = 'SimpleSurfaceShader';
        this.addParameter(this.baseColorParam);
        this.addParameter(this.opacityParam);
        this.addParameter(this.emissiveStrengthParam);
    }
}
Registry.register('SimpleSurfaceMaterial', SimpleSurfaceMaterial);
//# sourceMappingURL=SimpleSurfaceMaterial.js.map