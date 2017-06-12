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

class StandardMaterial extends Material {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('StandardMaterial.vertexShader', `
precision highp float;

attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 textureCoords;
#endif
attribute vec2 lightmapCoords;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

attribute float clusterIDs;
uniform vec2 lightmapSize;

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec2 v_lightmapCoord;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
varying float v_clusterID;
varying vec4 v_geomItemData;
#endif
varying vec3 v_worldPos;
/* VS Outputs */

void main(void) {

    vec4 geomItemData = getInstanceData();

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos    = modelViewMatrix * pos;
    gl_Position     = projectionMatrix * viewPos;

#ifdef ENABLE_TEXTURES
    v_textureCoord  = textureCoords;
#endif
    v_lightmapCoord = (lightmapCoords + geomItemData.xy) / lightmapSize;

    // mat4 mvp = projectionMatrix * viewMatrix * modelMatrix;
    // gl_Position = mvp * vec4((lightmapCoords + geomItemData.xy), 0., 1.);
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
    v_clusterID = clusterIDs;
    v_geomItemData = geomItemData;
#endif

    v_worldPos      = (modelMatrix * pos).xyz;

    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('StandardMaterial.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec2 v_lightmapCoord;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
varying float v_clusterID;
varying vec4 v_geomItemData;
#endif
varying vec3 v_worldPos;
/* VS Outputs */


// #ifdef ENABLE_LIGHTMAPS
uniform sampler2D lightmap;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
<%include file="debugColors.glsl"/>
uniform vec2 lightmapSize;
uniform bool debugLightmapTexelSize;
#endif
// #endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;

#ifdef ENABLE_CROSS_SECTIONS
uniform float planeDist;
uniform float planeAngle;
#endif

uniform color _baseColor;
uniform float _emissiveStrength;

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

uniform sampler2D _emissiveStrengthTex;
uniform bool _emissiveStrengthTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
uniform float _normalScale;


vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoord) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoord));
    else
        return toLinear(value);
}

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

float getLuminanceParamValue(float value, sampler2D tex, bool _texConnected, vec2 texCoord) {
    if(_texConnected)
        return luminanceFromRGB(texture2D(tex, texCoord).rgb);
    else
        return value;
}
#endif

void main(void) {

#ifndef ENABLE_TEXTURES
    vec3 baseColor      = toLinear(_baseColor).rgb;
    float emission      = _emissiveStrength;

#ifdef ENABLE_SPECULAR
    float roughness     = _roughness;
    float metallic      = _metallic;
    float reflectance   = _reflectance;
#endif

#else
    // Planar YZ projection for texturing, repeating every meter.
    // vec2 texCoord      = v_worldPos.xz * 0.2;
    vec2 texCoord       = vec2(v_textureCoord.x, 1.0 - v_textureCoord.y);
    vec3 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoord).rgb;
    //float opacity       = _opacity;//getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoord);
    float roughness     = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoord);
    float metallic      = getLuminanceParamValue(_metallic, _metallicTex, _metallicTexConnected, texCoord);
    float reflectance   = _reflectance;//getLuminanceParamValue(_reflectance, _reflectanceTex, _reflectanceTexConnected, texCoord);
    float emission      = getLuminanceParamValue(_emissiveStrength, _emissiveStrengthTex, _emissiveStrengthTexConnected, texCoord);
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

#ifdef ENABLE_TEXTURES
    if(_normalTexConnected){
        vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoord).rgb * 2.0 - 1.0);
        viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
    }
#endif

    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos.xyz));
    vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);
    float NdotV = dot(normal, viewVector);
    if(NdotV < 0.0){
        normal = -normal;
        NdotV = dot(normal, viewVector);

        // Note: these 2 lines can be used to debug inverted meshes.
        //baseColor = vec3(1.0, 0.0, 0.0);
        //NdotV = 1.0;
    }

    vec3 irradiance = texture2D(lightmap, v_lightmapCoord).rgb;

#ifdef ENABLE_DEBUGGING_LIGHTMAPS
    if(debugLightmapTexelSize)
    {
        vec2 coord_texelSpace = (v_lightmapCoord * lightmapSize) - v_geomItemData.xy;
        //vec2 coord_texelSpace = (v_textureCoord * lightmapSize);
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
    gl_FragColor = vec4(diffuseReflectance + (emission * baseColor), 1);
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
    gl_FragColor = vec4(radiance + (emission * baseColor), 1);

#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('emissiveStrength', 0.0);
        this.addParameter('metallic', 0.0);
        this.addParameter('roughness', 0.85);
        this.addParameter('normal', new Color(0.0, 0.0, 0.0));
        this.addParameter('texCoordScale', 1.0, false);
        
        // F0 = reflectance and is a physical property of materials
        // It also has direct relation to IOR so we need to dial one or the other
        // For simplicity sake, we don't need to touch this value as metalic can dictate it
        // such that non metallic is mostly around (0.01-0.025) and metallic around (0.7-0.85)
        this.addParameter('reflectance', 0.0001);
        this.finalize();
    }
};

sgFactory.registerClass('StandardMaterial', StandardMaterial);
export {
    StandardMaterial
};
// StandardMaterial;