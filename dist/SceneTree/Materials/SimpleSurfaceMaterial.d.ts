import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { Material } from '../Material';
export declare class SimpleSurfaceMaterial extends Material {
    baseColorParam: MaterialColorParam;
    opacityParam: MaterialFloatParam;
    emissiveStrengthParam: MaterialFloatParam;
    constructor(name?: string);
}
