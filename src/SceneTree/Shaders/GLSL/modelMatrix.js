import {
    shaderLibrary
} from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('modelMatrix.glsl', `

attribute float instancedTransformIds;    // instanced attribute..
uniform sampler2D transformsTexture;
uniform int transformsTextureSize;
uniform int transformIndex;
uniform int instancedDraw;

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

int getID() {
    if(instancedDraw == 0){
       return transformIndex;
    }
    else{
       return int(instancedTransformIds);
    }
}

mat4 getModelMatrix(int id) {
    return getMatrix(transformsTexture, transformsTextureSize, id);
}

mat4 getModelMatrix() {
    return getModelMatrix(getID());
}


vec4 getGeomItemData(int id) {
    return texelFetch(transformsTexture, transformsTextureSize, (id * cols_per_instance) + 3);
}

vec4 getGeomItemData() {
    return getGeomItemData(getID());
}


`);