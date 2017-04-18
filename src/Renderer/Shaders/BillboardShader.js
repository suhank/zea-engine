
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

instancedattribute float instancedIds;    // instanced attribute..

<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="matrixTexture.glsl"/>
 ///<%include file="utils/imageAtlas.glsl" ATLAS_NAME="Billboards"/>

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform sampler2D atlasLayoutBillboards;
uniform vec4 atlasDescBillboards;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    int instanceID = int(instancedIds);

    mat4 modelMatrix = getModelMatrix(instanceID);
    vec4 billboardData = getInstanceData(instanceID);
    vec2 quadVertex = getQuadVertexPositionFromID();

    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;

    v_texCoord = vec2(quadVertex.x, -quadVertex.y) + vec2(0.5, 0.5);
    vec4 layoutData = texelFetch1D(atlasLayoutBillboards, int(atlasDescBillboards.x), int(billboardData.z));
    v_texCoord *= layoutData.zw;
    v_texCoord += layoutData.xy;

    float scl = 0.006;
    float width = layoutData.z * atlasDescBillboards.y * scl;
    float height = layoutData.w * atlasDescBillboards.z * scl;
    gl_Position = modelViewProjectionMatrix * vec4(quadVertex.x * width, (quadVertex.y + 0.5) * height, 0.0, 1.0);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('BillboardShader.fragmentShader', `
precision highp float;

 ///<%include file="glslutils.glsl"/>
 ///<%include file="utils/imageAtlas.glsl" ATLAS_NAME="Billboards"/>

uniform sampler2D atlasBillboards;

/* VS Outputs */
varying vec2 v_texCoord;

void main(void) {
    vec4 color = texture2D(atlasBillboards, v_texCoord);
    gl_FragColor = vec4(0.0,0.0,0.0, 1.0-color.r);
}
`);
    }
};

export {
    BillboardShader
};



