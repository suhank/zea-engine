
import {
    shaderLibrary
} from '../../ShaderLibrary.js';

import './ImageAtlas.js';

shaderLibrary.setShaderModule('utils/imagePyramid.glsl', `

<%include file="utils/imageAtlas.glsl"/>

vec4 sampleImagePyramid_ATLAS_NAME(vec2 uv, float lod){
    float imageIndex = lod * float(atlasCount_ATLAS_NAME-1);
    int image0 = int(floor(imageIndex));
    int image1 = image0+1;
    float blend = fract(imageIndex);
    vec4 c0 = sampleAtlasImage_ATLAS_NAME(uv, image0);
    vec4 c1 = sampleAtlasImage_ATLAS_NAME(uv, image1);
    return mix(c0, c1, blend);
}

// vec2 sampleMipMappedImage_ATLAS_NAME(vec2 uv){
//     vec2 texel = uv * atlasSize_ATLAS_NAME;
//     float level = (dydx(texel.x) + dydx(texel.y)) * 0.5;
//     if(level >= 1.0)
//         return sampleAtlasImage_ATLAS_NAME(0, uv);
//     else{
//         return sampleImagePyramid_ATLAS_NAME(uv, level);
//     }
// }

`);
