import { shaderLibrary } from '../../ShaderLibrary.js'

import './envmap-octahedral.js'

shaderLibrary.setShaderModule(
  'Hammersley.glsl',
  `
float RadicalInverse_VdC(uint bits) 
{
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return float(bits) * 2.3283064365386963e-10; // / 0x100000000
}
// ----------------------------------------------------------------------------
vec2 Hammersley(uint i, uint N)
{
  return vec2(float(i)/float(N), RadicalInverse_VdC(i));
} 
`
)

shaderLibrary.setShaderModule(
  'ImportanceSampleGGX.glsl',
  `
vec3 ImportanceSampleGGX(vec2 Xi, vec3 N, float roughness)
{
  float a = roughness*roughness;

  float phi = 2.0 * PI * Xi.x;
  float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
  float sinTheta = sqrt(1.0 - cosTheta*cosTheta);

  // from spherical coordinates to cartesian coordinates
  vec3 H = vec3(cos(phi) * sinTheta, sin(phi) * sinTheta, cosTheta);

  // from tangent-space vector to world-space sample vector
  vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  vec3 tangent   = normalize(cross(up, N));
  vec3 bitangent = cross(N, tangent);

  vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;
  return normalize(sampleVec);
} 
      `
)

shaderLibrary.setShaderModule(
  'convolve-helpers.glsl',
  `

  <%include file="Hammersley.glsl"/>
  
  
  #ifdef ENVMAP_CUBE
  
  uniform samplerCube envMap;
  
  vec4 sampleEnvMap(vec3 dir) {
    return texture(envMap, dir);
  }
  
  #else 
  
  uniform sampler2D   envMap;
  
  <%include file="envmap-octahedral.glsl"/>
  
  vec4 sampleEnvMap(vec3 dir) {
    vec2 uv = dirToSphOctUv(dir);
    vec4 texel = texture2D(envMap, vec2(uv.x, 1.0 - uv.y));
    return vec4(texel.rgb/texel.a, 1.0); // TODO: Check this line. Do we need it?
  }
  
  #endif 
  
  
  vec3 cubeFaceUvToDir(float u, float v, int faceId) {
  
    // normalize into [-1, 1] range
    float n_u = 2.0 * u - 1.0;
    float n_v = 2.0 * v - 1.0;
  
    vec3 dir;
    switch (faceId)
    {
    case 0: //TEXTURE_CUBE_MAP_POSITIVE_X:
      dir.x = 1.0f;
      dir.y = n_v;
      dir.z = -n_u;
      break;
    case 1: //TEXTURE_CUBE_MAP_NEGATIVE_X:
      dir.x = -1.0f;
      dir.y = n_v;
      dir.z = n_u;
      break;
    case 3: //TEXTURE_CUBE_MAP_POSITIVE_Y:
      dir.x = n_u;
      dir.y = 1.0f;
      dir.z = -n_v;
      break;
    case 2: //TEXTURE_CUBE_MAP_NEGATIVE_Y:
      dir.x = n_u;
      dir.y = -1.0f;
      dir.z = n_v;
      break;
    case 4: //TEXTURE_CUBE_MAP_POSITIVE_Z:
      dir.x = n_u;
      dir.y = n_v;
      dir.z = 1.0f;
      break;
    case 5: //TEXTURE_CUBE_MAP_NEGATIVE_Z:
      dir.x = -n_u;
      dir.y = n_v;
      dir.z = -1.0f;
      break;
    }
    return normalize(dir);
  }
  

`
)
