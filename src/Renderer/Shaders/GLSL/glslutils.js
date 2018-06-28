import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('GLSLUtils.glsl', `

#ifdef ENABLE_ES3


bool testFlag(int flags, int flag) {
    return (flags & flag) != 0;
}

ivec2 pixelIndexToUV(int index, int textureSize){
    return ivec2(index % textureSize, index / textureSize);
}

vec4 fetchTexel(sampler2D texture, int textureSize, int index) {
    return texelFetch(texture, pixelIndexToUV(index, textureSize), 0);
}

#else


int imod(int x, int y) {
    return x-y*(x/y);
}

bool testFlag(int flags, int flag) {
    return imod(flags / flag, 2) != 0;
}

ivec2 pixelIndexToUV(int index, int textureSize){
    float flTexSize = float(textureSize);
    float x = (floor(mod(float(index), flTexSize))+0.5)/flTexSize;
    float y = (floor(float(index / textureSize))+0.5)/flTexSize;
    return vec2(x, y);
}

vec4 fetchTexel(sampler2D texture, int textureSize, int index) {
    vec2 texCoord = pixelIndexToUV(index, textureSize);
    return texture2D(texture, texCoord);
}



#endif

int uvToPixelIndex(vec2 uv, int textureSize){
    return int(uv.x * float(textureSize)) + (int(floor(uv.y * float(textureSize))) * textureSize);
}



`);