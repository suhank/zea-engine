import { shaderLibrary }  from '../../SceneTree/ShaderLibrary.js';
import { Shader } from '../../SceneTree/Shader.js';

import '../../SceneTree/Shaders/GLSL/stack-gl/inverse.js';
import '../../SceneTree/Shaders/GLSL/stack-gl/transpose.js';

class BillboardShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('PointsMaterial.vertexShader', `
precision highp float;

instancedattribute float instancedIds;    // instanced attribute..

<%include file="glslutils.glsl"/>
<%include file="utils/quadVertexFromID.glsl"/>
<%include file="stack-gl/transpose.glsl"/>
<%include file="utils/imageAtlas.glsl"/>

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform ImageAtlas atlasBillboards;


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
    int instanceID = int(instancedIds);

    mat4 modelMatrix = getModelMatrix(instanceID);
    vec4 billboardData = getInstanceData(instanceID);
    vec2 quadVertex = getQuadVertexPositionFromID();

    mat4 modelViewProjectionMatrix = projectionMatrix * viewMatrix * modelMatrix;


    v_texCoord = vec2(quadVertex.x, -quadVertex.y) + vec2(0.5, 0.5);
    v_gradient = v_texCoord;
    vec4 layoutData = texelFetch1D(atlasBillboards.layout, int(atlasBillboards.desc.z), int(billboardData.z));
    v_texCoord *= layoutData.zw;
    v_texCoord += layoutData.xy;

    float scl = billboardData.x;
    float width = layoutData.z * atlasBillboards.desc.x * scl;
    float height = layoutData.w * atlasBillboards.desc.y * scl;
    gl_Position = modelViewProjectionMatrix * vec4(quadVertex.x * width, (quadVertex.y + 0.5) * height, 0.0, 1.0);

    v_tint = getTintColor(instanceID);
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('BillboardShader.fragmentShader', `
precision highp float;

<%include file="glslutils.glsl"/>
<%include file="utils/imageAtlas.glsl"/>


uniform ImageAtlas atlasBillboards;


/* VS Outputs */
varying vec2 v_texCoord;
varying vec2 v_gradient;
varying vec4 v_tint;

void main(void) {
    vec4 color = texture2D(atlasBillboards.image, v_texCoord);
    if(color.r > 0.95)
        discard;
    gl_FragColor = v_tint * (1.0-color.r);
    gl_FragColor.rgb = gl_FragColor.rgb * (1.25 - v_gradient.y);
}
`);
    }
};

export {
    BillboardShader
};
// export default BillboardShader;



