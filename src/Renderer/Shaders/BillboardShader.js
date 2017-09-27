import {
    shaderLibrary
} from '../ShaderLibrary.js';
import {
    GLShader
} from '../GLShader.js';

import './GLSL/stack-gl/inverse.js';
import './GLSL/stack-gl/transpose.js';
import './GLSL/materialparams.js';

class BillboardShader extends GLShader {
    constructor(gl) {
        super(gl);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('BillboardShader.vertexShader', `
precision highp float;

instancedattribute float instanceIds;

<%include file="glslutils.glsl"/>
<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="utils/imageAtlas.glsl"/>

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

//uniform ImageAtlas atlasBillboards;
uniform sampler2D atlasBillboards_layout;
uniform vec4 atlasBillboards_desc;


uniform sampler2D instancesTexture;
uniform int instancesTextureSize;


const int cols_per_instance = 6;

mat4 getMatrix(sampler2D texture, int textureSize, int index) {
    // Unpack 3 x 4 matix columns into a 4 x 4 matrix.
    vec4 col0 = texelFetch(texture, textureSize, (index * cols_per_instance));
    vec4 col1 = texelFetch(texture, textureSize, (index * cols_per_instance) + 1);
    vec4 col2 = texelFetch(texture, textureSize, (index * cols_per_instance) + 2);
    mat4 result = mat4(col0, col1, col2, vec4(0.0, 0.0, 0.0, 1.0));
    return transpose(result);
    // return mat4(1.0);
}

mat4 getModelMatrix(int id) {
    return getMatrix(instancesTexture, instancesTextureSize, id);
}
vec4 getInstanceData(int id) {
    return texelFetch(instancesTexture, instancesTextureSize, (id * cols_per_instance) + 3);
}
vec4 getTintColor(int id) {
    return texelFetch(instancesTexture, instancesTextureSize, (id * cols_per_instance) + 4);
}


/* VS Outputs */
varying vec2 v_texCoord;
varying vec2 v_gradient;
varying vec4 v_tint;

void main(void) {
    int instanceID = int(instanceIds);

    mat4 modelMatrix = getModelMatrix(instanceID);
    vec4 billboardData = getInstanceData(instanceID);
    vec2 quadVertex = getQuadVertexPositionFromID();



    v_texCoord = vec2(quadVertex.x, -quadVertex.y) + vec2(0.5, 0.5);
    v_gradient = v_texCoord * billboardData.w;
    vec4 layoutData = texelFetch1D(atlasBillboards_layout, int(atlasBillboards_desc.z), int(billboardData.z));
    v_texCoord *= layoutData.zw;
    v_texCoord += layoutData.xy;

    float scl = billboardData.x;
    float width = layoutData.z * atlasBillboards_desc.x * scl * 0.002;
    float height = layoutData.w * atlasBillboards_desc.y * scl * 0.002;
    bool alignedToCamera = billboardData.y > 0.5;
    if(alignedToCamera){
        gl_Position = (viewMatrix * modelMatrix) * vec4(0.0, 0.0, 0.0, 1.0);
        gl_Position += vec4(quadVertex.x * width, (quadVertex.y + 0.5) * height, 0.0, 0.0);
        gl_Position = projectionMatrix * gl_Position;
    }
    else{
        mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;
        gl_Position = modelViewProjectionMatrix * vec4(quadVertex.x * width, (quadVertex.y + 0.5) * height, 0.0, 1.0);
    }

    v_tint = getTintColor(instanceID);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('BillboardShader.fragmentShader', `
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="glslutils.glsl"/>
<%include file="materialparams.glsl"/>
<%include file="utils/imageAtlas.glsl"/>


//uniform ImageAtlas atlasBillboards;
uniform sampler2D atlasBillboards;


/* VS Outputs */
varying vec2 v_texCoord;
varying vec2 v_gradient;
varying vec4 v_tint;

void main(void) {
    vec4 color = texture2D(atlasBillboards, v_texCoord);
    if(color.r > 0.95)
        discard;
    // TODO: for colors images on billbaords, we need to separate the
    // alpah value into an alpha channel, (and maybe the code here can select .a or luminance)
    gl_FragColor.rgb = v_tint.rgb * (1.0 - v_gradient.y);
    gl_FragColor.a = (1.0-color.r);
}
`);
    }
};

export {
    BillboardShader
};