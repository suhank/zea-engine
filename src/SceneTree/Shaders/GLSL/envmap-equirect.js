import {
    shaderLibrary
} from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('pragmatic-pbr/envmap-equirect.glsl', `

#define PI 3.1415926
#define TwoPI (2.0 * PI)

/**
 
 Samples equirectangular (lat/long) panorama environment map
 * @param  {sampler2D} envMap - equirectangular (lat/long) panorama texture
 * @param  {vec3} dir - normal in the world coordinate space
 * @param  {float} - flipEnvMap    -1.0 for left handed coorinate system oriented texture (usual case)
 *                                  1.0 for right handed coorinate system oriented texture
 * @return {vec2} equirectangular texture coordinate-
 * @description Based on http://http.developer.nvidia.com/GPUGems/gpugems_ch17.html and http://gl.ict.usc.edu/Data/HighResProbes/
 */
vec2 envMapEquirect_UvFromDir(vec3 dir, float flipEnvMap) {
  //I assume envMap texture has been flipped the WebGL way (pixel 0,0 is a the bottom)
  //therefore we flip dir.y as acos(1) = 0
  float phi = acos(dir.y);
  float theta = atan(flipEnvMap * dir.x, dir.z) + PI;
  return vec2(theta / TwoPI, phi / PI);
}

vec2 envMapEquirect_UvFromDir(vec3 dir) {
    //-1.0 for left handed coordinate system oriented texture (usual case)
    return envMapEquirect_UvFromDir(dir, -1.0);
}


// 
vec3 envMapEquirect_DirFromUV(vec2 uv) {
    float theta= PI*((uv.x * 2.0));
    float phi=PI*uv.y;
    return vec3(sin(phi)*sin(theta), cos(phi), -sin(phi)*cos(theta));
}

`);
