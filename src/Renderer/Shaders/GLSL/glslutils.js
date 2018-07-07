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

vec4 fetchTexel(sampler2D texture, ivec2 textureSize, ivec2 coords) {
    return texelFetch(texture, coords, 0);
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
    float x = (float(imod(index, textureSize))+0.5)/flTexSize;
    float y = (floor(float(index / textureSize))+0.5)/flTexSize;
    return vec2(x, y);
}

vec4 fetchTexel(sampler2D texture, int textureSize, int index) {
    vec2 texCoord = pixelIndexToUV(index, textureSize);
    return texture2D(texture, texCoord);
}

vec4 fetchTexel(sampler2D texture, ivec2 textureSize, ivec2 coords) {
    vec2 ftextureSize = vec2(textureSize);
    vec2 fcoords = vec2(coords);
    return texture2D(texture, (texCoord + vec2(0.5)) / ftextureSize);
}


#endif

int uvToPixelIndex(vec2 uv, int textureSize){
    return int(uv.x * float(textureSize)) + (int(floor(uv.y * float(textureSize))) * textureSize);
}



`);