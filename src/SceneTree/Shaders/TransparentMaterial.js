import Color from '../../Math/Color';
import sgFactory from '../SGFactory.js';
import shaderLibrary from '../ShaderLibrary.js';
import Material from '../Material.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/GGX_Specular.js';
import './GLSL/modelMatrix.js';
import './GLSL/debugColors.js';

class TransparentMaterial extends Material {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('TransparentMaterial.vertexShader', `
precision highp float;


attribute vec3 positions;
attribute vec3 normals;

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

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

    // mat4 mvp = projectionMatrix * viewMatrix * modelMatrix;
    // gl_Position = mvp * vec4((lightmapCoords + geomItemData.xy), 0., 1.);

#ifdef ENABLE_TEXTURES
    v_worldPos      = (modelMatrix * pos).xyz;
#elseif ENABLE_CROSS_SECTIONS
    v_worldPos      = (modelMatrix * pos).xyz;
#endif

    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('TransparentMaterial.fragmentShader', `
precision highp float;

#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;

#ifdef ENABLE_TEXTURES
varying vec3 v_worldPos;
#elseif ENABLE_CROSS_SECTIONS
varying vec3 v_worldPos;
#endif
/* VS Outputs */

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;
uniform float planeDist;
uniform float planeAngle;

uniform color _baseColor;
uniform float _opacity;

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

uniform sampler2D _opacityTex;
uniform bool _opacityTexConnected;

uniform sampler2D _roughnessTex;
uniform bool _roughnessTexConnected;

uniform sampler2D _reflectanceTex;
uniform bool _reflectanceTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
uniform float _normalScale;

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoords));
    else
        return toLinear(value);
}

float getLuminanceParamValue(float value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return luminanceFromRGB(texture2D(tex, texCoords).rgb);
    else
        return value;
}
#endif

void main(void) {

#ifndef ENABLE_TEXTURES
    vec4 baseColor      = toLinear(_baseColor);
    float opacity       = _opacity;

#ifdef ENABLE_SPECULAR
    float roughness     = _roughness;
    float metallic      = _metallic;
    float reflectance   = _reflectance;
#endif

#else
    // Planar YZ projection for texturing, repeating every meter.
    vec2 texCoords      = v_worldPos.xz * 0.2;
    vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoords);
    float opacity       = getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoords);
    float roughness     = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoords);
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

    // Hacky simple irradiance. 
    vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
    vec3 normal = mat3(cameraMatrix) * v_viewNormal;
    float NdotV = dot(normalize(normal), normalize(viewVector));
    vec3 irradiance;
    if(NdotV < 0.0){
        normal = -normal;
        NdotV = dot(normalize(normal), normalize(viewVector));

        // Note: these 2 lines can be used to debug inverted meshes.
        baseColor = vec4(1.0, 0.0, 0.0, 1.0);
        irradiance = vec3(1.0, 1.0, 1.0);
    }
    //else{
        irradiance = vec3(NdotV);
    //}

#ifndef ENABLE_SPECULAR
    // I'm not sure why we must reduce the irradiance here.
    // If not, the scene is far to bright. 
    gl_FragColor = vec4(baseColor.rgb, opacity);
#else

    vec3 viewNormal = normalize(v_viewNormal);
    //vec3 surfacePos = -v_viewPos.xyz;

#ifdef ENABLE_TEXTURES
    if(_normalTexConnected){
        vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoords).rgb * 2.0 - 1.0);
        viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
    }
#endif

    vec3 albedoLinear = baseColor.rgb;  

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
      
    // Would be best to compute reflectace internally and set here to 0.6-0.85 for metals
   
    // gl_FragColor = vec4( kd * diffuse + /*ks */ specular, 1);
    gl_FragColor = vec4(specularReflectance, opacity);


#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb * exposure);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
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

sgFactory.registerClass('TransparentMaterial', TransparentMaterial);

export default TransparentMaterial;