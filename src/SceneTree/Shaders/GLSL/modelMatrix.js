import {
    shaderLibrary
} from '../../ShaderLibrary.js';

import './glslutils.js';

shaderLibrary.setShaderModule('modelMatrix.glsl', `

<%include file="glslutils.glsl"/>

attribute float instancedTransformIds;    // instanced attribute..
uniform sampler2D transformsTexture;
uniform int transformsTextureSize;
uniform int transformIndex;
uniform int instancedDraw;


const int cols_per_drawitem = 4;

mat4 getMatrix(sampler2D texture, int textureSize, int index) {
    // Unpack 3 x 4 matix columns into a 4 x 4 matrix.
    vec4 col0 = texelFetch(texture, textureSize, (index * cols_per_drawitem));
    vec4 col1 = texelFetch(texture, textureSize, (index * cols_per_drawitem) + 1);
    vec4 col2 = texelFetch(texture, textureSize, (index * cols_per_drawitem) + 2);
    mat4 result = mat4(col0, col1, col2, vec4(0.0, 0.0, 0.0, 1.0));
    return transpose(result);
    // return mat4(1.0);
}

mat4 getModelMatrix(int id) {
    return getMatrix(transformsTexture, transformsTextureSize, id);
}

mat4 getModelMatrix() {
    int id;
    if(instancedDraw == 0){
       id = transformIndex;
    }
    else{
       id = int(instancedTransformIds);
    }
    return getModelMatrix(id);
}


vec4 getGeomItemData(int id) {
    return texelFetch(transformsTexture, transformsTextureSize, (id * cols_per_drawitem) + 3);
}

vec4 getGeomItemData() {
    int id;
    if(instancedDraw == 0){
       id = transformIndex;
    }
    else{
       id = int(instancedTransformIds);
    }
    return getGeomItemData(id);
}


`);