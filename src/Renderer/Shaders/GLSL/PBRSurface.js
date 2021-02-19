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
    float opacity;
    float emission;
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

vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness) {
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(max(1.0 - cosTheta, 0.0), 5.0);
}

float luminance(vec3 color) {
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

vec4 pbrSurfaceRadiance(in MaterialParams material, vec3 normal, in vec3 viewVector) {

    vec3 N = normal;
    vec3 V = viewVector;
    vec3 R = reflect(-V, N);
    float roughness = material.roughness * material.roughness;
    vec3 diffuseColor = (1.0 - material.metallic) * material.baseColor;

    // Note: The specular reflectance of metallic surfaces is chromatic
    // https://google.github.io/filament/Filament.html#listing_fnormal
    vec3 F0 = 0.16 * material.reflectance * material.reflectance * (1.0 - material.metallic) + material.baseColor * material.metallic;

    float NdotV = dot(N, V);

    vec3 F = fresnelSchlickRoughness(max(NdotV, 0.0), F0, roughness);

    vec3 kS = F;
    vec3 kD = 1.0 - kS;
    kD *= 1.0 - material.metallic;
    float ao = 1.0; 
    
    vec3 irradiance;
    vec3 irradianceSampleDir = normal;
    
    bool headLightMode = testFlag(envMapFlags, ENVMAP_FLAG_HEADLIGHT);
    if (headLightMode) {
      irradianceSampleDir = viewVector;
    }
    irradiance = sampleIrradiance(irradianceSampleDir);
   // vec3 irradiance = shGetIrradianceAt(shCoefficients, N);
    vec3 diffuse    = irradiance * diffuseColor;
    
    const float MAX_REFLECTION_LOD = 4.0;
    vec3 prefilteredColor = textureLod(prefilterMap, R,  roughness * MAX_REFLECTION_LOD).rgb;   
    vec2 envBRDF  = texture(brdfLUT, vec2(max(NdotV, 0.0), roughness)).rg;
    vec3 specular = prefilteredColor * (F * envBRDF.x + envBRDF.y);
    
    vec3 radiance = (kD * diffuse + specular) * ao;
    
    // Now handle semi-transparent objects. We need to be able to linearly interpolate
    // opacity to make objects disappear, so we need a continuous change.
    float opacity = material.opacity;
    vec4 transparent = vec4((radiance * opacity) + specular, opacity + luminance(specular) + luminance(F));
    vec4 result = mix(transparent, vec4(radiance, 1.0), opacity);

    // Add emission on as the final component.
    return vec4(result.rgb + (material.emission * material.baseColor), result.a);
}
`
)
