
import {
    shaderLibrary
} from '../../SceneTree/ShaderLibrary.js';
import {
    Shader
} from '../../SceneTree/Shader.js';

import '../../SceneTree/Shaders/stack-gl/inverse.js';
import '../../SceneTree/Shaders/stack-gl/transpose.js';

class BillboardShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PointsMaterial.vertexShader', `
precision highp float;

instancedattribute float instancedBillboardIds;    // instanced attribute..
uniform sampler2D billboardDataTexture;
uniform int billboardDataTextureSize;

<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>


const int cols_per_instance = 4;

mat4 getBillboardMatrix() {
    int index = int(instancedBillboardIds);

    // Unpack 3 x 4 matix columns into a 4 x 4 matrix.
    vec4 col0 = texelFetch(texture, textureSize, (index * cols_per_instance));
    vec4 col1 = texelFetch(texture, textureSize, (index * cols_per_instance) + 1);
    vec4 col2 = texelFetch(texture, textureSize, (index * cols_per_instance) + 2);
    mat4 result = mat4(col0, col1, col2, vec4(0.0, 0.0, 0.0, 1.0));
    return transpose(result);
}


vec4 getBillboardData() {
    int index = int(instancedBillboardIds);
    return texelFetch(billboardDataTexture, billboardDataTextureSize, (index * cols_per_instance) + 3);
}


uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 texDim;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    int vertexID = int(vertexIDs);

    mat4 modelMatrix = getBillboardMatrix();
    vec4 billboardData = getBillboardData();
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

uniform sampler2D texture;

void main(void) {
    gl_FragColor = texture2D(texture, v_texCoord);
}
`);
    }
};

export {
    BillboardShader
};



