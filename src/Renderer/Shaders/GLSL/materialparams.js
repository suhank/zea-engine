import { shaderLibrary } from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('materialparams.glsl', `

////////////////////////
// Material Param Helpers.

vec4 getColorParamValue(vec4 value, sampler2D tex, bool texConnected, vec2 texCoord) {
    if(texConnected){
        // TODO: Use SRGB textures.
        return toLinear(texture2D(tex, texCoord));
    }
    else
        return value;
}

float luminanceFromRGB(vec3 rgb) {
    return 0.2126*rgb.r + 0.7152*rgb.g + 0.0722*rgb.b;
}

float getLuminanceParamValue(float value, sampler2D tex, bool texConnected, vec2 texCoord) {
    if(texConnected)
        return luminanceFromRGB(texture2D(tex, texCoord).rgb);
    else
        return value;
}
`);