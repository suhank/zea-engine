import { Vec3 } from '../Math/Vec3';
declare function hammersley(i: number, n: number): number[];
declare function hemisphereSample_uniform(u: number, v: number, vec3: Vec3): void;
declare function hemisphereSample_cos(u: number, v: number, vec3: Vec3): void;
declare function sphereSample_uniform(u: number, v: number, vec3: Vec3): void;
export { hammersley, hemisphereSample_uniform, hemisphereSample_cos, sphereSample_uniform };
