import { MaterialColorParam } from '../Parameters/MaterialColorParam';
import { MaterialFloatParam } from '../Parameters/MaterialFloatParam';
import { Material } from '../Material';
export declare class StandardSurfaceMaterial extends Material {
    baseColorParam: MaterialColorParam;
    normalParam: MaterialColorParam;
    ambientOcclusion: MaterialFloatParam;
    metallicParam: MaterialFloatParam;
    roughnessParam: MaterialFloatParam;
    reflectanceParam: MaterialFloatParam;
    emissiveStrengthParam: MaterialFloatParam;
    opacityParam: MaterialFloatParam;
    constructor(name?: string);
}
