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


vec4 setFragColor_highlight(float v_geomItemId){
  vec4 fragColor; 
  int geomItemId = int(v_geomItemId + 0.5);
  fragColor = getHighlightColor(geomItemId);
  return fragColor;
}
