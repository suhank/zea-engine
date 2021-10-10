
precision highp float;
precision highp int;

import 'imageAtlas.glsl'

uniform sampler2D atlasBillboards;
uniform int isOrthographic;

/* VS Outputs */
varying float v_instanceID;
varying vec2 v_texCoord;
varying float v_alpha;
varying vec4 v_tint;
varying float v_viewDist;


uniform sampler2D instancesTexture;
uniform int instancesTextureSize;
uniform int passId;

const int cols_per_instance = 7;

vec4 getHilightColor(int id) {
  return fetchTexel(instancesTexture, instancesTextureSize, (id * cols_per_instance) + 6);
}


#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  int instanceID = int(v_instanceID);
  vec4 imageColor = texture2D(atlasBillboards, v_texCoord) * v_tint;
  imageColor.a *= v_alpha;
  if(imageColor.a < 0.1)
    discard;

#if defined(DRAW_COLOR)
  fragColor = imageColor;
  // fragColor.r = 1.0;
  // fragColor.a = 1.0;
#elif defined(DRAW_GEOMDATA)
  fragColor.r = float(passId); 
  fragColor.g = float(instanceID);
  fragColor.b = 0.0;// TODO: store poly-id or something.
  fragColor.a = v_viewDist;
#elif defined(DRAW_HIGHLIGHT)
  fragColor = getHilightColor(instanceID);
  // Skip unhilighting labels.
  if(fragColor.r < 0.001 && fragColor.g < 0.001 && fragColor.b < 0.001)
    discard;
#endif // DRAW_HIGHLIGHT
  
#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
