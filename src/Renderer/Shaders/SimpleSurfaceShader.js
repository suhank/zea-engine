import {
    Color
} from '../../Math';
import {
    sgFactory
} from '../../SceneTree';
import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    Shader
} from '../Shader.js';

import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/modelMatrix.js';

class SimpleSurfaceShader extends Shader {
    
    constructor(name) {
        super(name);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('SimpleSurfaceShader.vertexShader', `
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
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif

void main(void) {

    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos    = modelViewMatrix * vec4(positions, 1.);
    gl_Position = projectionMatrix * viewPos;

    mat3 normalMatrix = mat3(transpose(inverse(viewMatrix * modelMatrix)));
    v_viewPos       = -viewPos;
    v_viewNormal    = normalMatrix * normals;

#ifdef ENABLE_TEXTURES
    v_textureCoord  = textureCoords;
#endif
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('SimpleSurfaceShader.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;

#ifdef ENABLE_INLINE_GAMMACORRECTION
<%include file="stack-gl/gamma.glsl"/>
#endif

/* VS Outputs */
varying vec4 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif

uniform mat4 cameraMatrix;

uniform color _baseColor;
uniform float _opacity;


#ifdef ENABLE_TEXTURES

uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;
uniform sampler2D _opacityTex;
uniform bool _opacityTexConnected;

vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoord) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoord));
    else
        return value;
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
    vec3 baseColor      = _baseColor.rgb;
    float opacity = _opacity;
#else
    vec2 texCoord       = vec2(v_textureCoord.x, 1.0 - v_textureCoord.y);
    vec3 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, texCoord).rgb;
    float opacity       = _opacity;//getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, texCoord);
#endif

    // Hacky simple irradiance. 
    vec3 viewVector = normalize(mat3(cameraMatrix) * normalize(v_viewPos.xyz));
    vec3 normal = normalize(mat3(cameraMatrix) * v_viewNormal);
    float ndotv = dot(normal, viewVector);
    if(ndotv < 0.0){
        normal = -normal;
        ndotv = dot(normal, viewVector);

        // Note: these 2 lines can be used to debug inverted meshes.
        //baseColor = vec4(1.0, 0.0, 0.0, 1.0);
        //ndotv = 1.0;
    }
    gl_FragColor = vec4(ndotv * baseColor, opacity);

#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb);
#endif

}
`);

        this.addParameter('baseColor', new Color(1.0, 1.0, 0.5));
        this.addParameter('opacity', 1.0);
        this.nonSelectable = true;
        this.finalize();
    }
};

sgFactory.registerClass('SimpleSurfaceShader', SimpleSurfaceShader);
export {
    SimpleSurfaceShader
};