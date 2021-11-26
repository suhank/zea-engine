import { Registry } from '../../Registry';
import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Color } from '../../Math/Color';
import { Material } from '../Material';
export class FatLinesMaterial extends Material {
    constructor(name) {
        super(name);
        this.baseColorParam = new MaterialColorParam('BaseColor', new Color(1.0, 1, 0.5));
        this.opacityParam = new NumberParameter('Opacity', 1.0);
        this.lineThicknessParam = new NumberParameter('LineThickness', 0.01);
        this.overlayParam = new NumberParameter('Overlay', 0.0);
        this.__shaderName = 'FatLinesShader';
        this.addParameter(this.baseColorParam);
        this.addParameter(this.opacityParam);
        this.addParameter(this.overlayParam);
        this.addParameter(this.lineThicknessParam);
    }
}
Registry.register('FatLinesMaterial', FatLinesMaterial);
//# sourceMappingURL=FatLinesMaterial.js.map