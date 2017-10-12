import { shaderLibrary } from '../../ShaderLibrary.js';

import './glslutils.js';

shaderLibrary.setShaderModule('modelMatrix.glsl', `

#ifdef ENABLE_FLOAT_TEXTURES

uniform sampler2D instancesTexture;
uniform int instancesTextureSize;

attribute float instancedIds;    // instanced attribute..
uniform int transformIndex;
uniform int instancedDraw;

<%include file="glslutils.glsl"/>

const int cols_per_instance = 4;

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


int getID() {
    if(instancedDraw == 0){
       return transformIndex;
    }
    else{
       return int(instancedIds);
    }
}

mat4 getModelMatrix() {
    return getModelMatrix(getID());
}

vec4 getInstanceData() {
    return getInstanceData(getID());
}

#else

uniform mat4 modelMatrix;
uniform vec4 drawItemData;

mat4 getModelMatrix() {
    return modelMatrix;
}

vec4 getInstanceData() {
    return drawItemData;
}

#endif


`);