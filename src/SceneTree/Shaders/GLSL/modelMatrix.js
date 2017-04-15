import {
    shaderLibrary
} from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('matrixTexture.glsl', `

uniform sampler2D instancesTexture;
uniform int instancesTextureSize;

const int cols_per_instance = 4;

vec4 texelFetch(sampler2D texture, int textureSize, int index) {
    float x = mod(float(index), float(textureSize));
    float y = float(index / textureSize);
    vec2 texCoord = vec2((float(x)+0.5)/float(textureSize), (float(y)+0.5)/float(textureSize));
    return texture2D(texture, texCoord);
}

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

`);


shaderLibrary.setShaderModule('modelMatrix.glsl', `

<%include file="matrixTexture.glsl"/>

attribute float instancedIds;    // instanced attribute..
uniform int transformIndex;
uniform int instancedDraw;

mat4 getModelMatrix() {
    if(instancedDraw == 0){
       return getModelMatrix(transformIndex);
    }
    else{
       return getModelMatrix(int(instancedIds));
    }
}

vec4 getInstanceData() {
    if(instancedDraw == 0){
       return getInstanceData(transformIndex);
    }
    else{
       return getInstanceData(int(instancedIds));
    }
}


`);