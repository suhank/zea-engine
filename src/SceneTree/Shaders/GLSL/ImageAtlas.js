
import {
    shaderLibrary
} from '../../ShaderLibrary.js';

// shaderLibrary.setShaderModule('utils/imageAtlas.glsl', `

// uniform sampler2D atlas_ATLAS_NAME;
// uniform vec2 atlasSize_ATLAS_NAME;
// const int atlasCount_ATLAS_NAME = ATLAS_NAME_COUNT;

// vec4 getAtlasSubImageParams_ATLAS_NAME(int imageId){
//     ATLAS_NAME_LAYOUT;
// }

// vec4 sampleAtlasImage_ATLAS_NAME(vec2 uv, int imageId){
//     vec4 subImageParams = getAtlasSubImageParams_ATLAS_NAME(imageId);
//     vec2 subImagePos = vec2(subImageParams.x, subImageParams.y);
//     vec2 subImageSize = vec2(subImageParams.z, subImageParams.w);
//     return texture2D(atlas_ATLAS_NAME, (subImagePos + (uv*subImageSize))/atlasSize_ATLAS_NAME);
// }

// `);

shaderLibrary.setShaderModule('utils/imageAtlas.glsl', `

uniform sampler2D atlasATLAS_NAME;
uniform sampler2D atlasLayoutATLAS_NAME;
uniform vec4 atlasDescATLAS_NAME;

vec4 getSubImageLayoutATLAS_NAME(int imageId){
    return texelFetch1D(atlasLayoutATLAS_NAME, int(atlasDescATLAS_NAME.x), imageId);
}

vec2 calcSubImageTexCoordsATLAS_NAME(vec2 texCoord, int imageId){
    vec4 layoutData = getSubImageLayoutATLAS_NAME(imageId);
    return (texCoord * layoutData.zw) + layoutData.xy;
}

vec4 sampleSubImageATLAS_NAME(vec2 texCoord, int imageId){
    return texture2D(atlasATLAS_NAME, calcSubImageTexCoordsATLAS_NAME(texCoord, imageId));
}

`);
