
precision highp float;

import 'constants.glsl'


uniform color BaseColor;
uniform float Rounded;
uniform float BorderWidth;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_drawItemId;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

#if defined(DRAW_GEOMDATA)

  uniform int floatGeomBuffer;
  uniform int passId;

#elif defined(DRAW_HIGHLIGHT)

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
#endif // DRAW_HIGHLIGHT


void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

float dist = length(v_texCoord - 0.5);
if (dist > 0.5)
  discard;

#if defined(DRAW_COLOR)

  if (dist > 0.5 - (BorderWidth * 0.5))
    fragColor = vec4(0.,0.,0.,1.);
  else {
    // Modulate the lighting using the texture coord so the point looks round.
    float NdotV = cos(dist * PI);

    fragColor = BaseColor * mix(1.0, NdotV, Rounded);
  }

#elif defined(DRAW_GEOMDATA)

  float viewDist = length(v_viewPos);

  if (floatGeomBuffer != 0) {
    fragColor.r = float(passId); 
    fragColor.g = float(v_drawItemId);
    fragColor.b = 0.0;// TODO: store poly-id or something.
    fragColor.a = viewDist;
  }
  else {
    ///////////////////////////////////
    // UInt8 buffer
    // fragColor.r = (mod(v_drawItemId, 256.) + 0.5) / 255.;
    // fragColor.g = (floor(v_drawItemId / 256.) + 0.5) / 255.;

    // encode the dist as a 16 bit float
    // vec2 float16bits = encode16BitFloatInto2xUInt8(viewDist);
    // fragColor.b = float16bits.x;
    // fragColor.a = float16bits.y;
  }

#elif defined(DRAW_HIGHLIGHT)
  
  int drawItemId = int(v_drawItemId + 0.5);
  fragColor = getHighlightColor(drawItemId);
 
#endif // DRAW_HIGHLIGHT


  

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
