import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Material } from '../Material';
export declare class FatLinesMaterial extends Material {
    baseColorParam: MaterialColorParam;
    opacityParam: NumberParameter;
    lineThicknessParam: NumberParameter;
    overlayParam: NumberParameter;
    constructor(name?: string);
}
