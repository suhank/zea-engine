
precision highp float;
precision highp int;

attribute vec3 positions;
attribute vec3 normals;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// Now that we render multiple types of geometry from a single shader
// we need to know what kind of geometry it is...
uniform int geomType;

// should be imported by bottom 3
import 'GLSLUtils.glsl'
import 'transpose.glsl'
import 'inverse.glsl'

import 'geomItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

/* VS Outputs */
varying vec4 v_drawItemIds;
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

  v_drawItemIds = getDrawItemIds();
  int geomItemId = int(v_drawItemIds.x + 0.5);
  v_geomItemData = getInstanceData(geomItemId);
  mat4 modelMatrix = getModelMatrix(geomItemId);

  vec4 pos = vec4(positions, 1.);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;
  vec4 viewPos    = modelViewMatrix * pos;
  gl_Position     = projectionMatrix * viewPos;
  v_viewPos = -viewPos.xyz;
  v_worldPos      = (modelMatrix * pos).xyz;

  mat3 normalMatrix = mat3(transpose(inverse(modelViewMatrix)));
  v_viewPos       = -viewPos.xyz;
  v_viewNormal    = normalMatrix * normals;
  
  // offset slightly the lines and points to make them clearly defined.
  // This ensures that lines drawn over surfaces are solid and not clipped
  // at all by the surface.
  if (geomType == 1) { // start 'LINES'
    float overlay = 0.000001;
    gl_Position.z = mix(gl_Position.z, -gl_Position.w, overlay);
  } // end 'LINES'
  else if (geomType == 0) { // start 'POINTS'
    float overlay = 0.000003;
    gl_Position.z = mix(gl_Position.z, -gl_Position.w, overlay);
  }  // end 'POINTS'

#ifdef ENABLE_TEXTURES
  v_textureCoord  = texCoords;
#endif

}
