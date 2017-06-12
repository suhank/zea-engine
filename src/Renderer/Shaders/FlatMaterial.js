import { Color } from '../../Math/Color';
import { sgFactory } from '../SGFactory.js';
import { shaderLibrary } from '../ShaderLibrary.js';
import { Material } from '../Material.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/stack-gl/gamma.js';
import './GLSL/modelMatrix.js';

class FlatMaterial extends Material {
    
    constructor(name) {
        super(name);

        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('FlatMaterial.vertexShader', `
precision highp float;
#define ENABLE_TEXTURES

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif


void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    v_viewPos = (modelViewMatrix * vec4(positions, 1.0));
    gl_Position = projectionMatrix * v_viewPos;

    v_texCoords = texCoords;
    v_texCoords.y = 1.0 - v_texCoords.y;// Flip y
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('FlatMaterial.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;
#define ENABLE_TEXTURES

#ifdef ENABLE_INLINE_GAMMACORRECTION

<%include file="stack-gl/gamma.glsl"/>

#endif

uniform mat4 cameraMatrix;

uniform color _baseColor;
uniform float _opacity;

#ifdef ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
uniform bool _baseColorTexConnected;
#endif


/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif

vec4 getColorParamValue(vec4 value, sampler2D tex, bool _texConnected, vec2 texCoords) {
    if(_texConnected)
        return toLinear(texture2D(tex, texCoords));
    else
        return toLinear(value);
}

void main(void) {

#ifndef ENABLE_TEXTURES
    vec4 baseColor = _baseColor;//toLinear(_baseColor);
    float opacity = _opacity;
#else
    vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, v_texCoords);
    float opacity       = baseColor.a;//getLuminanceParamValue(_opacity, _opacityTex, _opacityTexConnected, v_texCoords);
#endif


    // vec3 viewNormal = normalize(cross(dFdy(v_viewPos.xyz), dFdx(v_viewPos.xyz)));

    // int debugLevel = 0;
    // if(debugLevel == 0){
    //     vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
    //     vec3 worldNormal = mat3(cameraMatrix) * viewNormal;
    //     float NdotV = dot(normalize(worldNormal),normalize(viewVector));

    //     vec4 color = baseColor * NdotV;
    //     gl_FragColor = vec4(color.rgb, opacity);
    // }
    // else if(debugLevel == 1){
    //     // Display the world normal
    //     vec3 viewVector = mat3(cameraMatrix) * normalize(v_viewPos.xyz);
    //     vec3 worldNormal = mat3(cameraMatrix) * viewNormal;
    //     gl_FragColor = vec4(worldNormal, opacity);
    // }
    // else{
    //     vec3 wsnormal = mat3(cameraMatrix) * viewNormal;
    //     vec4 color = vec4(abs(wsnormal.x), abs(wsnormal.y), abs(wsnormal.z), 1.0) * abs(viewNormal.z);
    //     gl_FragColor = vec4(color.rgb, opacity);
    // }
    gl_FragColor = vec4(baseColor.rgb, opacity);


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

sgFactory.registerClass('FlatMaterial', FlatMaterial);
export {
    FlatMaterial
};
// FlatMaterial;