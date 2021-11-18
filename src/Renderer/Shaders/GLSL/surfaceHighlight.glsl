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


vec4 setFragColor_highlight(float v_drawItemId){
  vec4 fragColor; 
  int drawItemId = int(v_drawItemId + 0.5);
  fragColor = getHighlightColor(drawItemId);
  return fragColor;
}
