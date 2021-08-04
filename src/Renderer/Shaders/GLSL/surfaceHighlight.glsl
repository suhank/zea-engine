// int drawItemId = int(v_drawItemId + 0.5);
// fragColor =  getHighlightColor(drawItemId);


  import 'GLSLUtils.glsl'
  import 'drawItemTexture.glsl'

  #ifdef ENABLE_FLOAT_TEXTURES
  vec4 getHighlightColor(int id) {
    return fetchTexel(instancesTexture, instancesTextureSize, (id * pixelsPerItem) + 4);
  }
  #else

  uniform vec4 highlightColor;

  vec4 getHighlightColor(int id) {
      return highlightColor;
  }

  #endif