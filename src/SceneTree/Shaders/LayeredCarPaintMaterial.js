import { Color } from '../../Math/Color';
import { sgFactory } from '../SGFactory.js';
import { shaderLibrary } from '../ShaderLibrary.js';
import { Material } from '../Material.js';
import './GLSL/constants.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/GGX_Specular.js';
import './GLSL/modelMatrix.js';
import './GLSL/debugColors.js';
import './GLSL/ImagePyramid.js';

class LayeredCarPaintMaterial extends Material {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('LayeredCarPaintMaterial.vertexShader', `
precision highp float;


attribute vec3 positions;
attribute vec3 normals;
// #ifdef ENABLE_LIGHTMAPS
attribute vec2 lightmapCoords;
// #endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

// #ifdef ENABLE_LIGHTMAPS
attribute float clusterIDs;
uniform vec2 lightmapSize;
// #endif

/* VS Outputs */
// #ifndef ENABLE_LIGHTMAPS
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
// #else
varying vec2 v_lightmapCoord;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
varying float v_clusterID;
varying vec4 v_geomItemData;
#endif
// #endif
// #ifdef ENABLE_SPECULAR
// varying vec4 v_viewPos;
// varying vec3 v_viewNormal;
// #endif
#ifdef ENABLE_TEXTURES
varying vec3 v_worldPos;
#elseif ENABLE_CROSS_SECTIONS
varying vec3 v_worldPos;
#endif
/* VS Outputs */

void main(void) {

    vec4 geomItemData = getInstanceData();

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos    = modelViewMatrix * pos;
    gl_Position     = projectionMatrix * viewPos;

// #ifndef ENABLE_LIGHTMAPS
//     mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
//     v_viewPos       = -viewPos;
//     v_viewNormal    = normalMatrix * normals;
// #else
    v_lightmapCoord = (lightmapCoords + geomItemData.xy) / lightmapSize;

    // mat4 mvp = projectionMatrix * viewMatrix * modelMatrix;
    // gl_Position = mvp * vec4((lightmapCoords + geomItemData.xy), 0., 1.);
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
    v_clusterID = clusterIDs;
    v_geomItemData = geomItemData;
#endif
// #endif

#ifdef ENABLE_TEXTURES
    v_worldPos      = (modelMatrix * pos).xyz;
#elseif ENABLE_CROSS_SECTIONS
    v_worldPos      = (modelMatrix * pos).xyz;
#endif

// #ifdef ENABLE_SPECULAR
    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
// #endif
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('LayeredCarPaintMaterial.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;

<%include file="math/constants.glsl"/>
#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_lightmapCoord;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
varying float v_clusterID;
varying vec4 v_geomItemData;
#endif
#ifdef ENABLE_TEXTURES
varying vec3 v_worldPos;
#elseif ENABLE_CROSS_SECTIONS
varying vec3 v_worldPos;
#endif
/* VS Outputs */


uniform sampler2D lightmap;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
<%include file="debugColors.glsl"/>
uniform vec2 lightmapSize;
uniform bool debugLightmapTexelSize;
#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;

#ifdef ENABLE_CROSS_SECTIONS
uniform float planeDist;
uniform float planeAngle;
#endif

uniform color _paintColor1;
uniform color _paintColor2;
uniform color _paintColor3;
uniform color _flakesColor;

uniform float _microflakePerturbation;
uniform float _microflakePerturbationA;
uniform sampler2D _flakesNormalTex;
uniform float _flakesScale;

#ifdef ENABLE_SPECULAR
<%include file="glslutils.glsl"/>
<%include file="GGX_Specular.glsl"/>
uniform float _roughness;
uniform float _metallic;
uniform float _reflectance;
#endif

#ifdef ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;

uniform sampler2D _roughnessTex;
uniform bool _roughnessTexConnected;

uniform sampler2D _metallicTex;
uniform bool _metallicTexConnected;

uniform sampler2D _reflectanceTex;
uniform bool _reflectanceTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
uniform float _normalScale;


vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoords));
    else
        return toLinear(value);
}

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

float getLuminanceParamValue(float value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return luminanceFromRGB(texture2D(tex, texCoords).rgb);
    else
        return value;
}
#endif

// Followup: Normal Mapping Without Precomputed Tangents
// http://www.thetenthplanet.de/archives/1180
mat3 cotangent_frame( vec3 normal, vec3 position, vec2 uv )
{
    // get edge vectors of the pixel triangle
    vec3 dp1 = dFdx( position );
    vec3 dp2 = dFdy( position );
    vec2 duv1 = dFdx( uv );
    vec2 duv2 = dFdy( uv );
 
    // solve the linear system
    vec3 dp2perp = cross( dp2, normal );
    vec3 dp1perp = cross( normal, dp1 );
    vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 bitangent = dp2perp * duv1.y + dp1perp * duv2.y;
 
    // construct a scale-invariant frame 
    float invmax = inversesqrt( max( dot(tangent,tangent), dot(bitangent,bitangent) ) );
    return mat3( tangent * invmax, bitangent * invmax, normal );
}

#define WITH_NORMALMAP_UNSIGNED 1

vec3 sampleNormalMap( sampler2D texture, vec2 texcoord )
{
    // assume normal, the interpolated vertex normal and 
    // viewVec, the view vector (vertex to eye)
    vec3 map = texture2D( texture, texcoord ).xyz;
#ifdef WITH_NORMALMAP_UNSIGNED
    map = map * 255./127. - 128./127.;
#endif
#ifdef WITH_NORMALMAP_2CHANNEL
    map.z = sqrt( 1. - dot( map.xy, map.xy ) );
#endif
#ifdef WITH_NORMALMAP_GREEN_UP
    map.y = -map.y;
#endif
    return map;
}

void main(void) {

#ifndef ENABLE_TEXTURES
    vec3 paintColor1      = toLinear(_paintColor1.rgb);
    vec3 paintColor2      = toLinear(_paintColor2.rgb);
    vec3 paintColor3      = toLinear(_paintColor3.rgb);

#ifdef ENABLE_SPECULAR
    float roughness     = _roughness;
    float metallic      = _metallic;
    float reflectance   = _reflectance;
#endif

#else
    // Planar YZ projection for texturing, repeating every meter.
    vec2 texCoords      = v_worldPos.xz * 0.2;
    vec3 paintColor1      = getColorParamValue(_paintColor1, _paintColor1Tex, _paintColor1TexConnected, texCoords);
    vec3 paintColor2      = getColorParamValue(_paintColor2, _paintColor2Tex, _paintColor2TexConnected, texCoords);
    vec3 paintColor3      = getColorParamValue(_paintColor3, _paintColor3Tex, _paintColor3TexConnected, texCoords);
    float roughness     = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoords);
    float metallic      = getLuminanceParamValue(_metallic, _metallicTex, _metallicTexConnected, texCoords);
    float reflectance   = _reflectance;//getLuminanceParamValue(_reflectance, _reflectanceTex, _reflectanceTexConnected, texCoords);
#endif


#ifdef ENABLE_CROSS_SECTIONS
    // Only do cross sections on opaque surfaces. 
    vec3 planeNormal = vec3(cos(planeAngle),0,sin(planeAngle));
    vec3 planePos = planeNormal * planeDist;
    vec3 planeDir = v_worldPos - planePos;
    float planeOffset = dot(planeDir, planeNormal);
    if(planeOffset < 0.0){
        discard;
        return;
    }
    if(!gl_FrontFacing){
        discard;
        return;
    }
#endif 

    vec3 viewNormal = normalize(v_viewNormal);
    //vec3 surfacePos = -v_viewPos.xyz;
    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos.xyz));
    vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);

#ifdef ENABLE_TEXTURES
    if(_normalTexConnected){

        vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoords).rgb * 2.0 - 1.0);
        viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
    }
#endif
    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb;

    ////////////////////////////////////////////////////////////////////////
    // http://www.chrisoat.com/papers/Oat-Tatarchuk-Isidoro-Layered_Car_Paint_Shader_Print.pdf

    mat3 TBN = cotangent_frame( normal, -viewVector, v_lightmapCoord );
    vec3 flakesNormal = TBN * -sampleNormalMap( _flakesNormalTex, (v_lightmapCoord * lightmapSize) / _flakesScale );

    float NdotV = dot(normal, viewVector);
    if(NdotV < 0.0){
        flakesNormal = -flakesNormal;
        normal = -normal;
        NdotV = dot(normal, viewVector);

        // Note: these 2 lines can be used to debug inverted meshes.
        //baseColor = vec3(1.0, 0.0, 0.0);
        //NdotV = 1.0;
    }


    vec3 vNp1 = _microflakePerturbationA * flakesNormal;// + _normalPerturbation * normal;
    vec3 vNp2 = _microflakePerturbation * ( flakesNormal + normal ) ;

    //float fresnel = dot( -viewVector, normal );
    float  fresnel1 = clamp(dot( -viewVector, vNp1 ), 0.0, 1.0);
    float  fresnel2 = clamp(dot( -viewVector, vNp2 ), 0.0, 1.0);

    float fresnel1Sq = fresnel1 * fresnel1;
    vec3 baseColor =   fresnel1 * paintColor1  + 
                        fresnel1Sq * paintColor2 +
                        fresnel1Sq * fresnel1Sq * paintColor3 +
                        pow( fresnel2, 16.0 ) * _flakesColor.rgb;

#ifdef ENABLE_DEBUGGING_LIGHTMAPS
    if(debugLightmapTexelSize)
    {
        vec2 coord_texelSpace = (v_lightmapCoord * lightmapSize) - v_geomItemData.xy;
        float total = floor(coord_texelSpace.x) +
                      floor(coord_texelSpace.y);
                      
        vec3 clustercolor = getDebugColor(v_clusterID);

        if(mod(total,2.0)==0.0){
            baseColor = clustercolor;
            irradiance = vec3(1.0);
        }
        else
            baseColor = baseColor * 1.5;

    }
#endif

#ifndef ENABLE_SPECULAR
    vec3 diffuseReflectance = baseColor * irradiance;
    gl_FragColor = vec4(diffuseReflectance, 1);
#else

    // -------------------------- Diffuse Reflectance --------------------------

    vec3 diffuseReflectance = baseColor * irradiance;

    // From the Disney dielectric BRDF    
    // Need to check if this is useful for us but the implementation works based on their paper
    diffuseReflectance = (diffuseReflectance / PI);
    // diffuseReflectance = vec3(mix(diffuseReflectance, diffuseReflectance * mix(0.5, 2.5, roughness), pow(1.0 - NdotV, 5.0)));
    diffuseReflectance = vec3(mix(diffuseReflectance, diffuseReflectance * mix(0.5, 1.0, roughness), pow(1.0 - NdotV, 5.0)));


    // -------------------------- Color at normal incidence --------------------------
    
    // Need to use 'reflectance' here instead of 'ior'
    //vec3 F0 = vec3(abs((1.0 - ior) / (1.0 + ior)));    
    //F0 = F0 * F0;
    //F0 = mix(F0, baseColor, metallic);      


    // -------------------------- Specular Reflactance --------------------------
    // vec3 ks = vec3(0.0);
    // vec3 specular = GGX_Specular_PrefilteredEnv(normal, viewVector, roughness, F0, ks );
    // vec3 kd = (vec3(1.0) - ks) * vec3(1.0 - metallic);    

    float schlickFresnel = reflectance + pow((1.0-reflectance)*(1.0-NdotV), 5.0);

    vec3 specularReflectance = GGX_Specular_PrefilteredEnv(normal, viewVector, roughness, schlickFresnel);


    // -------------------------- Specular Occlusion --------------------------
    // Fast and quick way of reducing specular reflection in areas that are less exposed to the environment
    // A better approch is to try screen space specular occlusion but need to check performance and feasibility in webGL
    float specularOcclusion = clamp(length(irradiance), 0.01, 1.0);    
    specularReflectance = (specularReflectance * specularOcclusion);  
      

    // -------------------------- Metallic --------------------------
    // We need to do few things given a higher > 0 metallic value
    //      1. tint specular reflectance by the albedo color (not at grazing angles)
    //      2. almost elliminate all diffuse reflactance (in reality metals have some diffuse due to layering (i.e. dust, prints, etc.))
    //      3. set "specular" artistic value to metallic range (0.6 - 0.85)

    specularReflectance = mix(specularReflectance, specularReflectance * baseColor, metallic);
    diffuseReflectance = mix(diffuseReflectance, vec3(0.0,0.0,0.0), metallic); // Leaveing at pure black for now but always need some %3 diffuse left for imperfection of pulished pure metal
    // Would be best to compute reflectace internally and set here to 0.6-0.85 for metals
   

    // -------------------------- Final color --------------------------
    // Energy conservation already taken into account in both the diffuse and specular reflectance
    vec3 radiance = diffuseReflectance + specularReflectance;    

    // gl_FragColor = vec4( kd * diffuse + /*ks */ specular, 1);
    gl_FragColor = vec4(radiance, 1);

#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);

        this.addParameter('paintColor1', new Color(1.0, 0.0, 0.0));
        this.addParameter('paintColor2', new Color(1.0, 0.0, 0.0));
        this.addParameter('paintColor3', new Color(1.0, 0.0, 0.0));
        this.addParameter('flakesColor', new Color(1.0, 1.0, 1.0));
        this.addParameter('flakesNormal', new Color(0.0, 0.0, 0.0));
        this.addParameter('flakesScale', 0.1, false);
        //this.addParameter('normalPerturbation', 0.1, false);
        this.addParameter('microflakePerturbationA', 0.1, false);
        this.addParameter('microflakePerturbation', 0.48, false);

        this.addParameter('metallic', 0.9);
        this.addParameter('roughness', 0.05);
        
        // F0 = reflectance and is a physical property of materials
        // It also has direct relation to IOR so we need to dial one or the other
        // For simplicity sake, we don't need to touch this value as metalic can dictate it
        // such that non metallic is mostly around (0.01-0.025) and metallic around (0.7-0.85)
        this.addParameter('reflectance', 0.85);
        this.finalize();
    }
};

sgFactory.registerClass('LayeredCarPaintMaterial', LayeredCarPaintMaterial);
export {
    LayeredCarPaintMaterial
};