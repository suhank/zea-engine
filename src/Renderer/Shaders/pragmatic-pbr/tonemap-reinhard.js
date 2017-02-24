import {
    shaderLibrary
} from '../../../SceneTree/SceneTree.js';

shaderLibrary.setShaderModule('pragmatic-pbr/tonemap-reinhard.glsl', `

//Based on Filmic Tonemapping Operators http://filmicgames.com/archives/75
vec3 tonemapReinhard(vec3 color) {
  return color / (color + vec3(1.0));
}

`);
