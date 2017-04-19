
import {
    shaderLibrary
} from '../../ShaderLibrary.js';

import './ImageAtlas.js';

shaderLibrary.setShaderModule('utils/imagePyramid.glsl', `

<%include file="utils/imageAtlas.glsl"/>

vec4 sampleImagePyramid(vec2 uv, float lod, in ImageAtlas atlas){
    float imageIndex = lod * (atlas.desc.z-1.0);
    int image0 = int(floor(imageIndex));
    int image1 = image0+1;
    float blend = fract(imageIndex);
    vec4 c0 = sampleSubImage(uv, image0, atlas);
    vec4 c1 = sampleSubImage(uv, image1, atlas);
    return mix(c0, c1, blend);
}

// vec2 sampleMipMappedImage_ATLAS_NAME(vec2 uv, in ImageAtlas atlas){
//     vec2 texel = uv * atlasDescATLAS_NAME.xy;
//     float level = (dydx(texel.x) + dydx(texel.y)) * 0.5;
//     if(level >= 1.0)
//         return sampleSubImage(0, uv);
//     else{
//         return sampleImagePyramid_ATLAS_NAME(uv, level);
//     }
// }

`);
