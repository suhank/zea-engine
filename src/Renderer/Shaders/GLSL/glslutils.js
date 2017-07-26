import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('glslutils.glsl', `

vec2 pixelIndexToUV(int index, int textureSize){
    return vec2((mod(float(index), float(textureSize))+0.5)/float(textureSize), (float(index / textureSize)+0.5)/float(textureSize));
}

int uvToPixelIndex(vec2 uv, int textureSize){
    return int(uv.x * float(textureSize)) + (int(floor(uv.y * float(textureSize))) * textureSize);
}

vec4 texelFetch1D(sampler2D texture, int textureSize, int index) {
    return texture2D(texture, vec2((float(index)+0.5)/float(textureSize), 0.5));
}

vec4 texelFetch(sampler2D texture, int textureSize, int index) {
    vec2 texCoord = pixelIndexToUV(index, textureSize);
    return texture2D(texture, texCoord);
}


`);