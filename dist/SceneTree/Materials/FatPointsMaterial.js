import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class FatPointsMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.pointSizeParam = new NumberParameter('PointSize', 1);
        this.roundedParam = new NumberParameter('Rounded', 1);
        this.borderWidthParam = new NumberParameter('BorderWidth', 0.2);
        this.overlayParam = new NumberParameter('Overlay', 0.0);
        this.__shaderName = 'FatPointsShader';
        this.addParameter(this.baseColorParam);
        this.addParameter(this.pointSizeParam);
        this.addParameter(this.roundedParam);
        this.addParameter(this.borderWidthParam);
        this.addParameter(this.overlayParam);
    }
}
Registry.register('FatPointsMaterial', FatPointsMaterial);
//# sourceMappingURL=FatPointsMaterial.js.map