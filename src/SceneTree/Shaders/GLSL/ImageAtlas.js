
import {
    shaderLibrary
} from '../../ShaderLibrary.js';

import './glslutils.js';

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

<%include file="glslutils.glsl"/>


struct ImageAtlas {
    sampler2D image;
    sampler2D layout;
    vec4 desc;
};

vec4 getSubImageLayout(int imageId, in ImageAtlas atlas){
    return texelFetch1D(atlas.layout, int(atlas.desc.z), imageId);
}

vec2 calcSubImageTexCoords(vec2 texCoord, int imageId, in ImageAtlas atlas){
    vec4 layoutData = getSubImageLayout(imageId, atlas);
    return (texCoord * layoutData.zw) + layoutData.xy;
}

vec4 sampleSubImage(vec2 texCoord, int imageId, in ImageAtlas atlas){
    return texture2D(atlas.image, calcSubImageTexCoords(texCoord, imageId, atlas));
}

`);
