import {
    shaderLibrary
} from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('pragmatic-pbr/envmap-equirect.glsl', `

const float PI = 3.1415926;
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
vec2 latLongUVsFromDir(vec3 dir, float flipEnvMap) {
  //I assume envMap texture has been flipped the WebGL way (pixel 0,0 is a the bottom)
  //therefore we flip dir.y as acos(1) = 0
  //float phi = acos(dir.y);
  //float theta = atan(dir.x, -dir.z) + PI;
  //return vec2(1.0 - (theta / TwoPI), phi / PI);


  // Math function taken from...
  // http://gl.ict.usc.edu/Data/HighResProbes/
  // Note: Scaling from u=[0,2], v=[0,1] to u=[0,1], v=[0,1]
  float phi = acos(dir.y);
  float theta = atan(dir.x, -dir.z);
  return vec2((1.0 + theta / PI) / 2.0, phi / PI);
}

vec2 latLongUVsFromDir(vec3 dir) {
    //-1.0 for left handed coordinate system oriented texture (usual case)
    return latLongUVsFromDir(dir, -1.0);
}

// Note: when u == 0.5 z = 1.0
vec3 dirFromLatLongUVs(float u, float v) {
    // http://gl.ict.usc.edu/Data/HighResProbes/
    float theta = PI*((u * 2.0) - 1.0);
    float phi = PI*v;
    return vec3(sin(phi)*sin(theta), cos(phi), -sin(phi)*cos(theta));
}

vec3 dirFromPolar(vec2 polar) {
    float u = polar.x / (PI * 2.0);
    float v = polar.y / PI;
    return dirFromLatLongUVs(u, v);
}

`);
