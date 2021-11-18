
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

import 'GLSLUtils.glsl'

import 'drawItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

/* VS Outputs */
varying float v_drawItemId;
varying vec4 v_geomItemData;
varying vec3 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif
varying vec3 v_worldPos;


void main(void) {
  int drawItemId = getDrawItemId();
  v_drawItemId = float(drawItemId);
  v_geomItemData  = getInstanceData(drawItemId);

  mat4 modelMatrix = getModelMatrix(drawItemId);
  mat4 modelViewMatrix = viewMatrix * modelMatrix;

  vec4 pos = vec4(positions, 1.);
  vec4 viewPos = (modelViewMatrix * pos);
  gl_Position = projectionMatrix * viewPos;

  v_viewPos = viewPos.xyz;
#ifdef ENABLE_TEXTURES
  v_textureCoord = texCoords;
  v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
#endif

  v_worldPos      = (modelMatrix * pos).xyz;
}
