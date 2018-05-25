import { shaderLibrary } from '../../ShaderLibrary.js';

import './glslutils.js';

shaderLibrary.setShaderModule('utils/imageAtlas.glsl', `

// Note: On mobile, I can't seem to pass around a stuct containing sampler2D.
// I have to unpack the struct and pass its members. :(
// struct ImageAtlas {
//     sampler2D layout;
//     sampler2D image;
//     vec4 desc;
// };

// vec4 getSubImageLayout(int index, in ImageAtlas atlas){
//     return fetchTexel1D(atlas.layout, int(atlas.desc.z), index);
// }

// vec2 calcSubImageTexCoords(vec2 texCoord, int index, in ImageAtlas atlas){
//     vec4 layoutData = fetchTexel1D(atlas.layout, int(atlas.desc.z), index);
//     return (texCoord * layoutData.zw) + layoutData.xy;
// }

// vec4 sampleSubImage(vec2 texCoord, int index, in ImageAtlas atlas){
//     vec4 layoutData = texture2D(atlas.layout, vec2((float(index)+0.5)/float(5), 0.5));
//     return texture2D(atlas.image, (texCoord * layoutData.zw) + layoutData.xy);
// }

vec4 getSubImageLayout(int index, in sampler2D atlasLayout, in vec4 atlasDesc){
    return fetchTexel1D(atlasLayout, int(atlasDesc.z), index);
}

vec2 calcSubImageTexCoords(vec2 texCoord, int index, in sampler2D atlasLayout, in vec4 atlasDesc){
    vec4 layoutData = fetchTexel1D(atlasLayout, int(atlasDesc.z), index);
    return (texCoord * layoutData.zw) + layoutData.xy;
}

vec4 sampleSubImage(vec2 texCoord, int index, in sampler2D atlasLayout, in sampler2D atlasImage, in vec4 atlasDesc){
    vec4 layoutData = texture2D(atlasLayout, vec2((float(index)+0.5)/float(5), 0.5));
    return texture2D(atlasImage, (texCoord * layoutData.zw) + layoutData.xy);
}

`);
