import shaderLibrary  from '../../SceneTree/ShaderLibrary';
import Shader  from '../../SceneTree/Shader';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';
import '../../SceneTree/Shaders/GLSL/Florian/Lookup.js';

class OctaHedralEnvMapShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('OctaHedralEnvMapShader.vertexShader', `
precision highp float;

attribute vec2 positions;    //(location = 0)

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

<%include file="stack-gl/inverse.glsl"/>
<%include file="stack-gl/transpose.glsl"/>

/* VS Outputs */
varying vec2 vPosition;
varying vec3 wcNormal;
varying vec2 v_texCoord;
 
void main()
{
    mat4 inverseProjection = inverse(projectionMatrix);
    mat3 inverseModelview = transpose(mat3(viewMatrix));

    //transform from the normalized device coordinates back to the view space
    vec3 unprojected = (inverseProjection * vec4(positions, 0, 1)).xyz;

    //transfrom from the view space back to the world space
    //and use it as a sampling vector
    wcNormal = inverseModelview * unprojected;
    v_texCoord = vec2((positions.x+1.0)*0.5, (positions.y+1.0)*0.5);

    vPosition = positions;
    gl_Position = vec4(positions, 0, 1);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('OctaHedralEnvMapShader.fragmentShader', `
#extension GL_OES_standard_derivatives : enable
precision highp float;

<%include file="Florian/Lookup.glsl"/>

uniform mat4 invProjectionMatrix;
uniform mat4 cameraMatrix;

uniform sampler2D envMap;
uniform float backgroundRoughness;

/* VS Outputs */
varying vec2 vPosition;
varying vec3 wcNormal;
varying vec2 v_texCoord;

void main(void) {
    vec4 viewPos = invProjectionMatrix * vec4(vPosition, 1, 1);
    vec3 viewDir = normalize(viewPos.xyz);
    vec3 worldDir = mat3(cameraMatrix) * viewDir;

    //gl_FragColor = texture2D(envMap, v_texCoord);
    gl_FragColor.rgb = textureEnv(envMap, worldDir, backgroundRoughness);

    gl_FragColor.a = 1.0;
}
`);
    }
};

export {
    OctaHedralEnvMapShader
};
//export default OctaHedralEnvMapShader;
