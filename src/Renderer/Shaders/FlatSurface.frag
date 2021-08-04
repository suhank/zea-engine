
precision highp float;

import 'GLSLUtils.glsl'
import 'gamma.glsl'
import 'materialparams.glsl'

#ifndef ENABLE_MULTI_DRAW

uniform color BaseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;
#endif


#endif // ENABLE_MULTI_DRAW

/* VS Outputs */
varying float v_drawItemId;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

#if defined(DRAW_GEOMDATA)

  uniform int floatGeomBuffer;
  uniform int passId;

#elif defined(DRAW_HIGHLIGHT)
  import 'surfaceHighlight.glsl'
#endif // DRAW_HIGHLIGHT

void main(void) {

#if defined(DRAW_COLOR)
    //////////////////////////////////////////////
    // Material

  #ifdef ENABLE_MULTI_DRAW

    vec2 materialCoords = v_geomItemData.zw;
    vec4 baseColor = toLinear(getMaterialValue(materialCoords, 0));

  #else // ENABLE_MULTI_DRAW

  #ifndef ENABLE_TEXTURES
    vec4 baseColor = toLinear(BaseColor);
  #else
    vec4 baseColor = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexType, v_textureCoord);
  #endif // ENABLE_TEXTURES

  #endif // ENABLE_MULTI_DRAW
    //////////////////////////////////////////////

  #ifndef ENABLE_ES3
    vec4 fragColor;
  #endif
    fragColor = baseColor;

  #ifdef ENABLE_INLINE_GAMMACORRECTION
    fragColor.rgb = toGamma(fragColor.rgb);
  #endif
#elif defined(DRAW_GEOMDATA)
  float viewDist = length(v_viewPos);

  if (floatGeomBuffer != 0) {
    fragColor.r = float(passId); 
    fragColor.g = float(v_drawItemId);
    fragColor.b = 0.0;// TODO: store poly-id or something.
    fragColor.a = viewDist;
  }
#elif defined(DRAW_HIGHLIGHT)
  int drawItemId = int(v_drawItemId + 0.5);
  fragColor =  getHighlightColor(drawItemId);
#endif


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
