import shaderLibrary from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('glslutils.glsl', `

vec4 texelFetch1D(sampler2D texture, int textureSize, int index) {
    return texture2D(texture, vec2((float(index)+0.5)/float(textureSize), 0.5));
}

vec4 texelFetch(sampler2D texture, int textureSize, int index) {
    float x = mod(float(index), float(textureSize));
    float y = float(index / textureSize);
    vec2 texCoord = vec2((float(x)+0.5)/float(textureSize), (float(y)+0.5)/float(textureSize));
    return texture2D(texture, texCoord);
}


`);