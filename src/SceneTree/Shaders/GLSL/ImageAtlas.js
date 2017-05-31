import { shaderLibrary } from '../../ShaderLibrary.js';

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

// Note: On mobile, I can't seem to pass around a stuct containing sampler2D.
// I have to unpack the struct and pass its members. :(
// struct ImageAtlas {
//     sampler2D layout;
//     sampler2D image;
//     vec4 desc;
// };

// vec4 getSubImageLayout(int imageId, in ImageAtlas atlas){
//     return texelFetch1D(atlas.layout, int(atlas.desc.z), imageId);
// }

// vec2 calcSubImageTexCoords(vec2 texCoord, int imageId, in ImageAtlas atlas){
//     vec4 layoutData = texelFetch1D(atlas.layout, int(atlas.desc.z), imageId);
//     return (texCoord * layoutData.zw) + layoutData.xy;
// }

// vec4 sampleSubImage(vec2 texCoord, int imageId, in ImageAtlas atlas){
//     vec4 layoutData = texture2D(atlas.layout, vec2((float(imageId)+0.5)/float(5), 0.5));
//     return texture2D(atlas.image, (texCoord * layoutData.zw) + layoutData.xy);
// }

vec4 getSubImageLayout(int imageId, in sampler2D atlasLayout, in vec4 atlasDesc){
    return texelFetch1D(atlasLayout, int(atlasDesc.z), imageId);
}

vec2 calcSubImageTexCoords(vec2 texCoord, int imageId, in sampler2D atlasLayout, in sampler2D atlasImage, in vec4 atlasDesc){
    vec4 layoutData = texelFetch1D(atlasLayout, int(atlasDesc.z), imageId);
    return (texCoord * layoutData.zw) + layoutData.xy;
}

vec4 sampleSubImage(vec2 texCoord, int imageId, in sampler2D atlasLayout, in sampler2D atlasImage, in vec4 atlasDesc){
    vec4 layoutData = texture2D(atlasLayout, vec2((float(imageId)+0.5)/float(5), 0.5));
    return texture2D(atlasImage, (texCoord * layoutData.zw) + layoutData.xy);
}

`);
