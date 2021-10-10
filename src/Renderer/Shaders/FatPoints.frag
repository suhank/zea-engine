
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
  uniform int isOrthographic;
  import 'surfaceGeomData.glsl'
#elif defined(DRAW_HIGHLIGHT)
  import 'surfaceHighlight.glsl'
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
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId,v_drawItemId, isOrthographic);
#elif defined(DRAW_HIGHLIGHT)
  fragColor = setFragColor_highlight(v_drawItemId);
#endif // DRAW_HIGHLIGHT


  

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
