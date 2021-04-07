import { shaderLibrary } from '../../ShaderLibrary.js'

import './glslutils.js'
import { pixelsPerGLGeomItem } from '../../GLSLConstants.js'

shaderLibrary.setShaderModule(
  'drawItemId.glsl',
  `


#ifdef ENABLE_MULTI_DRAW

uniform sampler2D drawIdsTexture;

uniform int instancedDraw;

int getDrawItemId() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  return int(texelFetch(drawIdsTexture, drawIdsArrayCoords, 0).r + 0.5);
}

#else // ENABLE_MULTI_DRAW

uniform int transformIndex;

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

// Note: this value must always math that defined in 
const int pixelsPerItem = ${pixelsPerGLGeomItem};

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
