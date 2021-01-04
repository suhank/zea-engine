import { shaderLibrary } from '../../ShaderLibrary.js'

import './glslutils.js'

shaderLibrary.setShaderModule(
  'drawItemId.glsl',
  `

uniform int transformIndex;

#ifdef ENABLE_MULTI_DRAW

uniform sampler2D drawIdsLayoutTexture;
uniform int drawIdsLayoutTextureSize;
uniform sampler2D drawIdsTexture;
uniform int drawIdsTextureSize;

uniform int instancedDraw;

int getDrawItemId() {
  if(instancedDraw == 0){
    return transformIndex;
  }
  else {
    ivec2 drawIdLayoutCoords = ivec2(gl_DrawID % drawIdsLayoutTextureSize, gl_DrawID / drawIdsLayoutTextureSize);
    int offset = int(texelFetch(drawIdsLayoutTexture, drawIdLayoutCoords, 0).r + 0.5) + gl_InstanceID;
    ivec2 drawIdsArrayCoords = ivec2(offset % drawIdsTextureSize, offset / drawIdsTextureSize);
    return int(texelFetch(drawIdsTexture, drawIdsArrayCoords, 0).r + 0.5);
  }
}


#else
#ifdef ENABLE_FLOAT_TEXTURES

attribute float instancedIds;    // instanced attribute..
uniform int instancedDraw;

int getDrawItemId() {
  if(instancedDraw == 0){
    return transformIndex;
  }
  else{
    return int(instancedIds);
  }
}


#else

int getDrawItemId() {
  return transformIndex;
}

#endif // ENABLE_FLOAT_TEXTURES
#endif // ENABLE_MULTI_DRAW

`
)

shaderLibrary.setShaderModule(
  'drawItemTexture.glsl',
  `
<%include file="GLSLUtils.glsl"/>
  

#ifdef ENABLE_FLOAT_TEXTURES

uniform sampler2D instancesTexture;
uniform highp int instancesTextureSize;

const int pixelsPerItem = 6;

vec4 getInstanceData(int id) {
    return fetchTexel(instancesTexture, instancesTextureSize, (id * pixelsPerItem) + 0);
}

#else

uniform vec4 drawItemData;

vec4 getInstanceData(int id) {
    return drawItemData;
}

#endif


`
)
