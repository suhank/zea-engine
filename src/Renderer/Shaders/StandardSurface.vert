
precision highp float;

attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// should be imported by bottom 3
import 'GLSLUtils.glsl'
import 'transpose.glsl'
import 'inverse.glsl'

import 'drawItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

/* VS Outputs */
varying float v_drawItemId;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
varying vec3 v_viewNormal;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec3 v_worldPos;
/* VS Outputs */

#if defined(DRAW_COLOR)
#elif defined(DRAW_GEOMDATA)
#elif defined(DRAW_HIGHLIGHT)
#endif // DRAW_HIGHLIGHT


void main(void) {


  #if defined(DRAW_COLOR)
      int drawItemId = getDrawItemId();
      v_drawItemId = float(drawItemId);
      v_geomItemData = getInstanceData(drawItemId);

      vec4 pos = vec4(positions, 1.);
      mat4 modelMatrix = getModelMatrix(drawItemId);
      mat4 modelViewMatrix = viewMatrix * modelMatrix;
      vec4 viewPos    = modelViewMatrix * pos;
      gl_Position     = projectionMatrix * viewPos;

      mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
      v_viewPos       = -viewPos.xyz;
      v_viewNormal    = normalMatrix * normals;

    #ifdef ENABLE_TEXTURES
      v_textureCoord  = texCoords;
    #endif

      v_worldPos      = (modelMatrix * pos).xyz;
  #elif defined(DRAW_GEOMDATA)
    int drawItemId = getDrawItemId();
    v_drawItemId = float(drawItemId);
    v_geomItemData = getInstanceData(drawItemId);

    vec4 pos = vec4(positions, 1.);
    mat4 modelMatrix = getModelMatrix(drawItemId);
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos = modelViewMatrix * pos;
    gl_Position = projectionMatrix * viewPos;

    v_viewPos = -viewPos.xyz;

    v_worldPos      = (modelMatrix * pos).xyz;
  #elif defined(DRAW_HIGHLIGHT)
    int drawItemId = getDrawItemId();
    v_drawItemId = float(drawItemId);
    mat4 modelMatrix = getModelMatrix(drawItemId);
    mat4 modelViewMatrix = viewMatrix * modelMatrix;
    vec4 viewPos = modelViewMatrix * vec4(positions, 1.0);
    gl_Position = projectionMatrix * viewPos;
  #endif // DRAW_HIGHLIGHT

}
