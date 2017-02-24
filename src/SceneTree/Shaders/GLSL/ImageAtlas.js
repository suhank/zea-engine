
import {
    shaderLibrary
} from '../../ShaderLibrary.js';

shaderLibrary.setShaderModule('utils/imageAtlas.glsl', `

uniform sampler2D atlas_ATLAS_NAME;
uniform vec2 atlasSize_ATLAS_NAME;
const int atlasCount_ATLAS_NAME = ATLAS_NAME_COUNT;

vec4 getAtlasSubImageParams_ATLAS_NAME(int imageId){
    ATLAS_NAME_LAYOUT;
}

vec4 sampleAtlasImage_ATLAS_NAME(vec2 uv, int imageId){
    vec4 subImageParams = getAtlasSubImageParams_ATLAS_NAME(imageId);
    vec2 subImagePos = vec2(subImageParams.x, subImageParams.y);
    vec2 subImageSize = vec2(subImageParams.z, subImageParams.w);
    return texture2D(atlas_ATLAS_NAME, (subImagePos + (uv*subImageSize))/atlasSize_ATLAS_NAME);
}

`);
