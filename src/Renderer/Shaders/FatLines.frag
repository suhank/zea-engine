
precision highp float;


uniform color BaseColor;
uniform mat4 cameraMatrix;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif


/* VS Outputs */
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
varying vec2 v_texCoord;
varying float v_geomItemId;
varying vec4 v_geomItemData;
varying float v_drawItemID;
varying vec3 v_worldPos;

import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl'
import 'cutaways.glsl'
import 'GLSLBits.glsl'

uniform int floatGeomBuffer;
uniform int passId;


#if defined(DRAW_HIGHLIGHT)
  import 'surfaceHighlight.glsl'
#endif


void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

#if defined(DRAW_COLOR)
  int debugLevel = 0;
  if (debugLevel == 0) {

    vec3 viewVector = mat3(cameraMatrix) * normalize(-v_viewPos);
    vec3 normal = mat3(cameraMatrix) * v_viewNormal;
    float NdotV = dot(normalize(normal), normalize(viewVector));

    // Modulate the lighting using the texture coord so the line looks round.
    NdotV *= cos((v_texCoord.x - 0.5) * 2.0);

    vec4 color = BaseColor * NdotV;
    fragColor = vec4(color.rgb, BaseColor.a);
  }
  else {
    fragColor = vec4(v_texCoord.x, 0.0, 0.0, 1.0);
  }
#elif defined(DRAW_GEOMDATA)
  int geomItemId = int(v_geomItemId + 0.5);
  int flags = int(v_geomItemData.r + 0.5);
 // Cutaways
  if (testFlag(flags, GEOMITEM_FLAG_CUTAWAY)) {
    vec4 cutAwayData  = getCutaway(geomItemId);
    vec3 planeNormal = cutAwayData.xyz;
    float planeDist = cutAwayData.w;
    if (cutaway(v_worldPos, planeNormal, planeDist)) {
      discard;
      return;
    }
  }
  if (testFlag(flags, GEOMITEM_INVISIBLE_IN_GEOMDATA)) {
    discard;
    return;
  }

  float dist = length(v_viewPos);

  if (floatGeomBuffer != 0) {
    fragColor.r = float(passId); 
    fragColor.g = float(v_drawItemID);
    fragColor.b = 0.0;// TODO: store poly-id or something.
    fragColor.a = dist;
  }
#elif defined(DRAW_HIGHLIGHT)
  fragColor = setFragColor_highlight(v_geomItemId);
#endif


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
