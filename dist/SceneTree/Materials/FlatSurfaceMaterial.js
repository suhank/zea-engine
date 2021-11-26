import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class FlatSurfaceMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.__shaderName = 'FlatSurfaceShader';
        this.addParameter(this.baseColorParam);
    }
}
Registry.register('FlatSurfaceMaterial', FlatSurfaceMaterial);
//# sourceMappingURL=FlatSurfaceMaterial.js.map