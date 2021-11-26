import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class StandardSurfaceMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.normalParam = new MaterialColorParam('Normal', new Color(1.0, 1, 0.5));
        this.ambientOcclusion = new MaterialFloatParam('AmbientOcclusion', 1, [0, 1]);
        this.metallicParam = new MaterialFloatParam('Metallic', 0.05, [0, 1]);
        this.roughnessParam = new MaterialFloatParam('Roughness', 0.5, [0, 1]);
        this.reflectanceParam = new MaterialFloatParam('Reflectance', 0.5, [0, 1]);
        this.emissiveStrengthParam = new MaterialFloatParam('EmissiveStrength', 0, [0, 1]);
        this.opacityParam = new MaterialFloatParam('Opacity', 1, [0, 1]);
        this.__shaderName = 'StandardSurfaceShader';
        this.addParameter(this.baseColorParam);
        this.addParameter(this.normalParam);
        this.addParameter(this.ambientOcclusion);
        this.addParameter(this.metallicParam);
        this.addParameter(this.roughnessParam);
        this.addParameter(this.reflectanceParam);
        this.addParameter(this.emissiveStrengthParam);
        this.addParameter(this.opacityParam);
    }
}
Registry.register('StandardSurfaceMaterial', StandardSurfaceMaterial);
//# sourceMappingURL=StandardSurfaceMaterial.js.map