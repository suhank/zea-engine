
import {
    shaderLibrary
} from '../../SceneTree/ShaderLibrary.js';
import {
    Shader
} from '../../SceneTree/Shader.js';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';

class BillboardShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PointsMaterial.vertexShader', `
precision highp float;

instancedattribute float billboardIds;    // instanced attribute..

<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="matrixTexture.glsl"/>

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    int instanceID = int(billboardIds);

    mat4 modelMatrix = getModelMatrix(instanceID);
    vec4 billboardData = getInstanceData(instanceID);
    vec2 quadVertex = getQuadVertexPositionFromID();

    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;

    v_texCoord = quadVertex + vec2(0.5, 0.5);
    v_texCoord *= billboardData.zw;
    v_texCoord += billboardData.xy;

    gl_Position = modelViewProjectionMatrix * vec4(quadVertex.x, quadVertex.y, 0.0, 1.0);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('BillboardShader.fragmentShader', `
precision highp float;

uniform sampler2D texture;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    gl_FragColor = texture2D(texture, v_texCoord);
}
`);
    }
};

export {
    BillboardShader
};



