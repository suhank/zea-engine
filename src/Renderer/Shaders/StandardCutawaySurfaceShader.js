import {
    Vec3,
    Color
} from '../../Math';
import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    GLShader
} from '../GLShader.js';

import './GLSL/constants.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/materialparams.js';
import './GLSL/GGX_Specular.js';
import './GLSL/PBRSurface.js';
import './GLSL/modelMatrix.js';
import './GLSL/debugColors.js';
import './GLSL/ImagePyramid.js';
import './GLSL/cutaways.js';

class StandardCutawaySurfaceShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('StandardCutawaySurfaceShader.vertexShader', `
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
varying vec3 v_viewPos;
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

    mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
    v_viewPos       = -viewPos.xyz;
    v_viewNormal    = normalMatrix * normals;


    if(dot(v_viewNormal, v_viewPos) > 0.0) {

        // Move backfaces towards the camera to fix issues with zfighting of backfaces and frontfaces.
        gl_Position.z += 0.000003 / gl_Position.w;
    }

}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('StandardCutawaySurfaceShader.fragmentShader', `
precision highp float;

<%include file="math/constants.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>

<%include file="GGX_Specular.glsl"/>
<%include file="PBRSurfaceRadiance.glsl"/>
<%include file="cutaways.glsl"/>

/* VS Outputs */
varying vec3 v_viewPos;
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


uniform sampler2D lightmap;
uniform bool lightmapConnected;
#ifdef ENABLE_DEBUGGING_LIGHTMAPS
<%include file="debugColors.glsl"/>
uniform vec2 lightmapSize;
uniform bool debugLightmapTexelSize;
#endif

#ifdef ENABLE_INLINE_GAMMACORRECTION
uniform float exposure;
#endif

uniform mat4 cameraMatrix;

uniform color _baseColor;
uniform float _emissiveStrength;


#ifdef ENABLE_SPECULAR
uniform float _roughness;
uniform float _metallic;
uniform float _reflectance;
#endif

#ifdef ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;

#ifdef ENABLE_SPECULAR
uniform sampler2D _roughnessTex;
uniform bool _roughnessTexConnected;

uniform sampler2D _metallicTex;
uniform bool _metallicTexConnected;

uniform sampler2D _reflectanceTex;
uniform bool _reflectanceTexConnected;

uniform sampler2D _normalTex;
uniform bool _normalTexConnected;
uniform float _normalScale;
#endif

uniform sampler2D _emissiveStrengthTex;
uniform bool _emissiveStrengthTexConnected;


#endif

void main(void) {

    // Cutaways
    if(cutaway(v_worldPos))
        return;

    MaterialParams material;

#ifndef ENABLE_TEXTURES
    material.baseColor      = _baseColor.rgb;
    float emission      = _emissiveStrength;

#ifdef ENABLE_SPECULAR
    material.roughness     = _roughness;
    material.metallic      = _metallic;
    material.reflectance   = _reflectance;
#endif

#else
    // Planar YZ projection for texturing, repeating every meter.
    // vec2 texCoord      = v_worldPos.xz * 0.2;
    vec2 texCoord       = vec2(v_textureCoord.x, 1.0 - v_textureCoord.y);
    material.baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoord).rgb;

#ifdef ENABLE_SPECULAR
    material.roughness     = getLuminanceParamValue(_roughness, _roughnessTex, _roughnessTexConnected, texCoord);
    material.metallic      = getLuminanceParamValue(_metallic, _metallicTex, _metallicTexConnected, texCoord);
    material.reflectance   = getLuminanceParamValue(_reflectance, _reflectanceTex, _reflectanceTexConnected, texCoord);
#endif
    float emission      = getLuminanceParamValue(_emissiveStrength, _emissiveStrengthTex, _emissiveStrengthTexConnected, texCoord);
#endif

    vec3 viewNormal = normalize(v_viewNormal);
    //vec3 surfacePos = -v_viewPos;

#ifdef ENABLE_TEXTURES
#ifdef ENABLE_SPECULAR
    if(_normalTexConnected){
        vec3 textureNormal_tangentspace = normalize(texture2D(_normalTex, texCoord).rgb * 2.0 - 1.0);
        viewNormal = normalize(mix(viewNormal, textureNormal_tangentspace, 0.3));
    }
#endif
#endif

    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos));
    vec3 normal = normalize(mat3(cameraMatrix) * viewNormal);
    if(dot(normal, viewVector) < 0.0){
        normal = -normal;
        // Note: this line can be used to debug inverted meshes.
        //material.baseColor = vec3(1.0, 0.0, 0.0);
    }

    vec3 irradiance;
    if(lightmapConnected){
        irradiance = texture2D(lightmap, v_lightmapCoord).rgb;
    }
    else{
#ifndef ENABLE_SPECULAR
        irradiance = sampleEnvMap(normal, 1.0);
#else
        irradiance = vec3(dot(normal, viewVector));
#endif
        
    }

#ifdef ENABLE_DEBUGGING_LIGHTMAPS
    if(debugLightmapTexelSize)
    {
        vec2 coord_texelSpace = (v_lightmapCoord * lightmapSize) - v_geomItemData.xy;
        //vec2 coord_texelSpace = (v_textureCoord * lightmapSize);
        float total = floor(coord_texelSpace.x) +
                      floor(coord_texelSpace.y);
                      
        vec3 clustercolor = getDebugColor(v_clusterID);

        material.metallic = 0.0;
        material.reflectance = 0.0;
        if(mod(total,2.0)==0.0){
            material.baseColor = clustercolor;
            irradiance = vec3(1.0);
        }
        else{
            material.baseColor = material.baseColor * 1.5;
        }
    }
#endif

#ifndef ENABLE_SPECULAR
    vec3 radiance = material.baseColor * irradiance;
#else
    vec3 radiance = pbrSurfaceRadiance(material, irradiance, normal, viewVector);
#endif
    gl_FragColor = vec4(radiance + (emission * material.baseColor), 1.0);
    //gl_FragColor = vec4(material.baseColor * irradiance, 1.0);

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

        // cutaway params
        this.addParameter('cutawayEnabled', true);
        this.addParameter('cutColor', new Color(0.7, 0.2, 0.2));
        this.addParameter('planeNormal', new Vec3(0.0, 0.0, 1.0), false);
        this.addParameter('planeDist', 0.0, false);

        this.finalize();
    }
};

sgFactory.registerClass('StandardCutawaySurfaceShader', StandardCutawaySurfaceShader);
export {
    StandardCutawaySurfaceShader
};