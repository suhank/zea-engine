import { shaderLibrary } from '../../ShaderLibrary.js'

shaderLibrary.setShaderModule(
  'SHCoeffs.glsl',
  `
  uniform vec3 shCoeffs[9];
  
  vec3 sampleSHCoeffs(vec3 dir) {
    // dir is assumed to have unit length
    float x = dir.x, y = dir.y, z = dir.z;
    // band 0
    vec3 result = shCoeffs[ 0 ] * 0.886227;
    // band 1
    result += shCoeffs[ 1 ] * 2.0 * 0.511664 * y;
    result += shCoeffs[ 2 ] * 2.0 * 0.511664 * z;
    result += shCoeffs[ 3 ] * 2.0 * 0.511664 * x;
    // band 2
    result += shCoeffs[ 4 ] * 2.0 * 0.429043 * x * y;
    result += shCoeffs[ 5 ] * 2.0 * 0.429043 * y * z;
    result += shCoeffs[ 6 ] * ( 0.743125 * z * z - 0.247708 );
    result += shCoeffs[ 7 ] * 2.0 * 0.429043 * x * z;
    result += shCoeffs[ 8 ] * 0.429043 * ( x * x - y * y );
    return result;
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
    // vec3 specularTint;
};

uniform int envMapFlags;
uniform samplerCube irradianceMap;
uniform samplerCube prefilterMap;
uniform sampler2D brdfLUT;

vec3 sampleIrradiance(vec3 dir) {
  return texture(irradianceMap, dir).rgb;
}

uniform vec3 shCoefficients[ 9 ];

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	// normal is assumed to have unit length
	float x = normal.x, y = normal.y, z = normal.z;
	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}


vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)
{
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
}


vec4 pbrSpecularReflectance(in MaterialParams materialParams, vec3 normal, in vec3 viewVector) {

    vec3 N = normal;
    vec3 V = viewVector;
    vec3 R = reflect(-V, N);

    // Note: Is this correct? F0 is a scalar input, but F0 is a vec3.. 
    vec3 F0 = vec3(materialParams.reflectance);
    float NdotV = dot(N, V);

    vec3 F = fresnelSchlickRoughness(max(NdotV, 0.0), F0, materialParams.roughness);

    vec3 kS = F;
    
    const float MAX_REFLECTION_LOD = 4.0;
    vec3 prefilteredColor = textureLod(prefilterMap, R,  materialParams.roughness * MAX_REFLECTION_LOD).rgb;
    vec2 envBRDF  = texture(brdfLUT, vec2(max(NdotV, 0.0), materialParams.roughness)).rg;  
    vec3 specular = prefilteredColor * (F * envBRDF.x + envBRDF.y);
    
    float specularOpacity = (kS.x + kS.y + kS.z) / 3.0;
    return vec4(specular, specularOpacity);
}


vec3 pbrSurfaceRadiance(in MaterialParams materialParams, vec3 irradiance, vec3 normal, in vec3 viewVector) {

    vec3 N = normal;
    vec3 V = viewVector;
    vec3 R = reflect(-V, N);

    // Note: Is this correct? F0 is a scalar input, but F0 is a vec3.. 
    vec3 F0 = vec3(materialParams.reflectance);
    float NdotV = dot(N, V);

    vec3 F = fresnelSchlickRoughness(max(NdotV, 0.0), F0, materialParams.roughness);

    vec3 kS = F;
    vec3 kD = 1.0 - kS;
    kD *= 1.0 - materialParams.metallic;
    float ao = 1.0; 
    
    // vec3 irradiance = texture(irradianceMap, N).rgb;
   // vec3 irradiance = shGetIrradianceAt(shCoefficients, N);
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
