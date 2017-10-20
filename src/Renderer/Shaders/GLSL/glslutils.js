import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('glslutils.glsl', `

vec2 pixelIndexToUV(int index, int textureSize){
	float flTexSize = float(textureSize);
	float x = (floor(mod(float(index), flTexSize))+0.5)/flTexSize;
	float y = (floor(float(index / textureSize))+0.5)/flTexSize;
    return vec2(x, y);
}

int uvToPixelIndex(vec2 uv, int textureSize){
    return int(uv.x * float(textureSize)) + (int(floor(uv.y * float(textureSize))) * textureSize);
}

vec4 texelFetch1D(sampler2D texture, int textureSize, int index) {
    return texture2D(texture, vec2((float(index)+0.5)/float(textureSize), 0.5));
}

#ifndef ENABLE_ES3

vec4 texelFetch(sampler2D texture, int textureSize, int index) {
    vec2 texCoord = pixelIndexToUV(index, textureSize);
    return texture2D(texture, texCoord);
}

#endif

`);