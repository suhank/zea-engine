import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('pragmatic-pbr/envmap-equirect.glsl', `


vec2 latLongUVsFromDir(vec3 dir) {
  // Math function taken from...
  // http://gl.ict.usc.edu/Data/HighResProbes/
  // Note: Scaling from u=[0,2], v=[0,1] to u=[0,1], v=[0,1]
  float phi = acos(dir.y);
  float theta = atan(dir.x, -dir.z);
  return vec2((1.0 + theta / PI) / 2.0, phi / PI);
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
