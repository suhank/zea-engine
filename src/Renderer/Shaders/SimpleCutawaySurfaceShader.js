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

import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/modelMatrix.js';
import './GLSL/materialparams.js';
import './GLSL/cutaways.js';

class SimpleCutawaySurfaceShader extends GLShader {
    constructor(name) {
        super(name);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('SimpleCutawaySurfaceShader.vertexShader', `
precision highp float;

attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 textureCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="stack-gl/inverse.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec3 v_worldPos;
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif

void main(void) {

    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    vec4 pos = vec4(positions, 1.);
    vec4 viewPos    = modelViewMatrix * pos;
    gl_Position = projectionMatrix * viewPos;

    mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
    v_worldPos      = (modelMatrix * pos).xyz;
    v_viewPos       = -viewPos.xyz;
    v_viewNormal    = normalMatrix * normals;

    if(dot(v_viewNormal, v_viewPos) > 0.0) {

        // Move backfaces towards the camera to fix issues with zfighting of backfaces and frontfaces.
        gl_Position.z += 0.000003 / gl_Position.w;
    }

#ifdef ENABLE_TEXTURES
    v_textureCoord  = textureCoords;
#endif
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('SimpleCutawaySurfaceShader.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_EXT_frag_depth
#extension GL_EXT_frag_depth : enable
#endif
precision highp float;


/* VS Outputs */
varying vec3 v_worldPos;
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 cameraMatrix;


uniform color _baseColor;
uniform float _opacity;

#ifdef ENABLE_TEXTURES

uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;
uniform sampler2D _opacityTex;
uniform bool _opacityTexConnected;

#endif


<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>
<%include file="cutaways.glsl"/>

void main(void) {

    // Cutaways
    if(cutaway(v_worldPos))
        return;

#ifndef ENABLE_TEXTURES
    vec4 baseColor      = _baseColor;
    float opacity       = baseColor.a * _opacity;
#else
    vec2 texCoord       = vec2(v_textureCoord.x, 1.0 - v_textureCoord.y);
    vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoord);
    float opacity       = baseColor.a * getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoord);
#endif

    // Hacky simple irradiance. 
    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos));
    vec3 normal = normalize(mat3(cameraMatrix) * v_viewNormal);
    float ndotv = dot(normal, viewVector);
    if(ndotv < 0.0){
        normal = -normal;
        ndotv = dot(normal, viewVector);

        // Note: these 2 lines can be used to debug inverted meshes.
        //baseColor = vec4(1.0, 0.0, 0.0, 1.0);
        //ndotv = 1.0;
    }
    gl_FragColor = vec4(ndotv * baseColor.rgb, opacity);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);

        // cutaway params
        this.addParameter('cutawayEnabled', true);
        this.addParameter('cutColor', new Color(0.7, 0.2, 0.2));
        this.addParameter('planeNormal', new Vec3(0.0, 0.0, 1.0), false);
        this.addParameter('planeDist', 0.0, false);
        this.finalize();
    }
};

sgFactory.registerClass('SimpleCutawaySurfaceShader', SimpleCutawaySurfaceShader);
export {
    SimpleCutawaySurfaceShader
};