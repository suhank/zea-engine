import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Material } from '../Material';
export declare class PointsMaterial extends Material {
    baseColorParam: MaterialColorParam;
    pointSizeParam: NumberParameter;
    overlayParam: MaterialFloatParam;
    constructor(name?: string);
}
