import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { NumberParameter } from '../Parameters/NumberParameter';
import { Material } from '../Material';
export declare class LinesMaterial extends Material {
    baseColorParam: MaterialColorParam;
    opacityParam: MaterialFloatParam;
    overlayParam: MaterialFloatParam;
    stippleScaleParam: NumberParameter;
    stippleValueParam: NumberParameter;
    occludedStippleValueParam: NumberParameter;
    constructor(name?: string);
}
