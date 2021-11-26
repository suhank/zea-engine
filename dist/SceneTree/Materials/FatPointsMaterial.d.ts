import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Material } from '../Material';
export declare class FatPointsMaterial extends Material {
    baseColorParam: MaterialColorParam;
    pointSizeParam: NumberParameter;
    roundedParam: NumberParameter;
    borderWidthParam: NumberParameter;
    overlayParam: NumberParameter;
    constructor(name?: string);
}
