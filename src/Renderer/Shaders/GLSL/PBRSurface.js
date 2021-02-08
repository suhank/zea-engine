import { shaderLibrary } from '../../ShaderLibrary.js'

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
  'GGX.glsl',
  `
vec3 ImportanceSampleGGX(vec2 Xi, vec3 N, float roughness)
{
  float a = roughness*roughness;

  float phi = 2.0 * PI * Xi.x;
  float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
  float sinTheta = sqrt(1.0 - cosTheta*cosTheta);

  // from spherical coordinates to cartesian coordinates
  vec3 H;
  H.x = cos(phi) * sinTheta;
  H.y = sin(phi) * sinTheta;
  H.z = cosTheta;

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
  'PBRSurfaceRadiance.glsl',
  `

const int ENVMAP_FLAG_HEADLIGHT =  1; // 1<<0;
  
struct MaterialParams {
    vec3 baseColor;
    float metallic;
    float roughness;
    float reflectance;
};

vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
}


vec4 pbrSpecularReflectance(in MaterialParams materialParams, vec3 normal, in vec3 viewVector) {

    vec3 N = normal;
    vec3 V = viewVector;
    // Note: Is this correct? F0 is a scalar input, but F0 is a vec3.. 
    vec3 F0 = vec3(materialParams.reflectance);
    float NdotV = dot(N, V);

    vec3 F = FresnelSchlickRoughness(max(NdotV, 0.0), F0, materialParams.roughness);

    vec3 kS = F;
    
    const float MAX_REFLECTION_LOD = 4.0;
    vec3 prefilteredColor = textureLod(prefilterMap, R,  materialParams.roughness * MAX_REFLECTION_LOD).rgb;
    vec2 envBRDF  = texture(brdfLUT, vec2(max(NdotV, 0.0), materialParams.roughness)).rg;  
    vec3 specular = prefilteredColor * (F * envBRDF.x + envBRDF.y);
    
    float specularOpacity = (kS.x + kS.y + kS.z) / 3.0;
    return vec4(specularReflectance, specularOpacity);
}


vec3 pbrSurfaceRadiance(in MaterialParams materialParams, vec3 __irradiance, vec3 normal, in vec3 viewVector) {

    vec3 N = normal;
    vec3 V = viewVector;
    // Note: Is this correct? F0 is a scalar input, but F0 is a vec3.. 
    vec3 F0 = vec3(materialParams.reflectance);
    float NdotV = dot(N, V);

    vec3 F = FresnelSchlickRoughness(max(NdotV, 0.0), F0, materialParams.roughness);

    vec3 kS = F;
    vec3 kD = 1.0 - kS;
    kD *= 1.0 - materialParams.metallic;	  
    
    vec3 irradiance = texture(irradianceMap, N).rgb;
    vec3 diffuse    = irradiance * materialParams.baseColor;
    
    const float MAX_REFLECTION_LOD = 4.0;
    vec3 prefilteredColor = textureLod(prefilterMap, R,  materialParams.roughness * MAX_REFLECTION_LOD).rgb;   
    vec2 envBRDF  = texture(brdfLUT, vec2(max(NdotV, 0.0), materialParams.roughness)).rg;
    vec3 specular = prefilteredColor * (F * envBRDF.x + envBRDF.y);
    
    vec3 radiance = (kD * diffuse + specular) * ao;
    return radiance;
}
`
)
