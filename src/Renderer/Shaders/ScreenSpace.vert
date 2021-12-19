
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

import 'GLSLUtils.glsl'
import 'geomItemId.glsl'
import 'drawItemTexture.glsl'
import 'modelMatrix.glsl'

/* VS Outputs */
varying float v_geomItemId;
varying vec4 v_geomItemData;
#ifdef ENABLE_TEXTURES
varying vec2 v_textureCoord;
#endif


void main(void) {
  int geomItemId = getGeomItemId();
  v_geomItemId = float(geomItemId);
  v_geomItemData  = getInstanceData(geomItemId);

  mat4 modelMatrix = getModelMatrix(geomItemId);

  gl_Position = (modelMatrix * vec4(positions, 1.0));

  v_textureCoord = texCoords;
  v_textureCoord.y = 1.0 - v_textureCoord.y;// Flip y
}
